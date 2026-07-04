/* eslint-disable react-hooks/refs -- useAudioPlayer only reads audioRef.current inside
   effects/handlers, never during render, but this rule taints every property of a hook's
   return value as ref-unsafe once the hook touches a ref anywhere internally. */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { useState } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import useAudioPlayer from "../useAudioPlayer";
import { AudioDownload } from "@/types";

const songs: Array<AudioDownload> = [
  {
    id: "a",
    title: "Song A",
    date: "2026-01-01T00:00:00",
    file: "a.mp3",
    spotify: "https://spotify/a",
  },
  {
    id: "b",
    title: "Song B",
    date: "2026-02-01T00:00:00",
    file: "b.mp3",
    spotify: "https://spotify/b",
  },
  {
    id: "c",
    title: "Song C",
    date: "2026-03-01T00:00:00",
    file: "c.mp3",
    spotify: "https://spotify/c",
  },
];

function Harness({
  initialSelectedId,
  onIdChange = () => {},
  songsOverride = songs,
}: {
  initialSelectedId: string | null;
  onIdChange?: (id: string) => void;
  songsOverride?: Array<AudioDownload>;
}) {
  const [selectedSongId, setSelectedSongId] = useState(initialSelectedId);
  const handleIdChange = (id: string) => {
    setSelectedSongId(id);
    onIdChange(id);
  };
  const player = useAudioPlayer(songsOverride, selectedSongId, handleIdChange);

  return (
    <div>
      <audio ref={player.audioRef} data-testid="audio" />
      <span data-testid="current-song-id">{player.currentSong?.id ?? ""}</span>
      <span data-testid="is-playing">{String(player.isPlaying)}</span>
      <span data-testid="current-time">{player.currentTime}</span>
      <span data-testid="duration">{player.duration}</span>
      <span data-testid="volume">{player.volume}</span>
      <button onClick={player.togglePlay}>toggle</button>
      <button onClick={player.restart}>restart</button>
      <button onClick={player.next}>next</button>
      <button onClick={player.previous}>previous</button>
      <button onClick={() => player.seek(42)}>seek42</button>
      <button onClick={() => player.setVolume(0.3)}>vol0.3</button>
    </div>
  );
}

beforeEach(() => {
  vi.restoreAllMocks();
  vi.spyOn(HTMLMediaElement.prototype, "load").mockImplementation(() => {});
  vi.spyOn(HTMLMediaElement.prototype, "play").mockImplementation(function (
    this: HTMLMediaElement,
  ) {
    Object.defineProperty(this, "paused", { value: false, configurable: true });
    this.dispatchEvent(new Event("play"));
    return Promise.resolve();
  });
  vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(function (
    this: HTMLMediaElement,
  ) {
    Object.defineProperty(this, "paused", { value: true, configurable: true });
    this.dispatchEvent(new Event("pause"));
  });
});

describe("useAudioPlayer", () => {
  it("exposes the initially selected song as currentSong", () => {
    render(<Harness initialSelectedId="a" />);
    expect(screen.getByTestId("current-song-id").textContent).toBe("a");
  });

  it("next() advances to the next song and wraps from the last song to the first", () => {
    render(<Harness initialSelectedId="a" />);
    fireEvent.click(screen.getByText("next"));
    expect(screen.getByTestId("current-song-id").textContent).toBe("b");
    fireEvent.click(screen.getByText("next"));
    expect(screen.getByTestId("current-song-id").textContent).toBe("c");
    fireEvent.click(screen.getByText("next"));
    expect(screen.getByTestId("current-song-id").textContent).toBe("a");
  });

  it("previous() goes to the previous song and wraps from the first song to the last", () => {
    render(<Harness initialSelectedId="a" />);
    fireEvent.click(screen.getByText("previous"));
    expect(screen.getByTestId("current-song-id").textContent).toBe("c");
    fireEvent.click(screen.getByText("previous"));
    expect(screen.getByTestId("current-song-id").textContent).toBe("b");
  });

  it("next()/previous() notify the caller via onSelectedSongIdChange", () => {
    const onIdChange = vi.fn();
    render(<Harness initialSelectedId="a" onIdChange={onIdChange} />);
    fireEvent.click(screen.getByText("next"));
    expect(onIdChange).toHaveBeenCalledWith("b");
  });

  it("next()/previous() on a single-song playlist re-select the same song", () => {
    const onIdChange = vi.fn();
    const singleSong = [songs[0]];
    render(
      <Harness
        initialSelectedId="a"
        songsOverride={singleSong}
        onIdChange={onIdChange}
      />,
    );
    fireEvent.click(screen.getByText("next"));
    expect(onIdChange).toHaveBeenCalledWith("a");
    expect(screen.getByTestId("current-song-id").textContent).toBe("a");
    fireEvent.click(screen.getByText("previous"));
    expect(onIdChange).toHaveBeenCalledWith("a");
    expect(screen.getByTestId("current-song-id").textContent).toBe("a");
  });

  it("togglePlay() calls play() when paused and pause() when playing, reflected in isPlaying", () => {
    render(<Harness initialSelectedId="a" />);
    expect(screen.getByTestId("is-playing").textContent).toBe("false");
    fireEvent.click(screen.getByText("toggle"));
    expect(screen.getByTestId("is-playing").textContent).toBe("true");
    fireEvent.click(screen.getByText("toggle"));
    expect(screen.getByTestId("is-playing").textContent).toBe("false");
  });

  it("seek() updates currentTime on the audio element and in state", () => {
    render(<Harness initialSelectedId="a" />);
    fireEvent.click(screen.getByText("seek42"));
    expect(screen.getByTestId("current-time").textContent).toBe("42");
    const audio = screen.getByTestId("audio") as HTMLAudioElement;
    expect(audio.currentTime).toBe(42);
  });

  it("restart() seeks to 0 without changing the current play/pause state", () => {
    render(<Harness initialSelectedId="a" />);
    fireEvent.click(screen.getByText("toggle")); // start playing
    fireEvent.click(screen.getByText("seek42"));
    fireEvent.click(screen.getByText("restart"));
    expect(screen.getByTestId("current-time").textContent).toBe("0");
    expect(screen.getByTestId("is-playing").textContent).toBe("true");
  });

  it("setVolume() updates volume on the audio element and in state", () => {
    render(<Harness initialSelectedId="a" />);
    fireEvent.click(screen.getByText("vol0.3"));
    expect(screen.getByTestId("volume").textContent).toBe("0.3");
    const audio = screen.getByTestId("audio") as HTMLAudioElement;
    expect(audio.volume).toBe(0.3);
  });

  it("mirrors playing state across track changes: autoplays the new track if the previous one was playing", () => {
    render(<Harness initialSelectedId="a" />);
    fireEvent.click(screen.getByText("toggle")); // start playing song a
    expect(screen.getByTestId("is-playing").textContent).toBe("true");
    fireEvent.click(screen.getByText("next"));
    expect(screen.getByTestId("current-song-id").textContent).toBe("b");
    expect(screen.getByTestId("is-playing").textContent).toBe("true");
  });

  it("does not autoplay the new track if the previous one was paused", () => {
    render(<Harness initialSelectedId="a" />);
    expect(screen.getByTestId("is-playing").textContent).toBe("false");
    fireEvent.click(screen.getByText("next"));
    expect(screen.getByTestId("current-song-id").textContent).toBe("b");
    expect(screen.getByTestId("is-playing").textContent).toBe("false");
  });

  it("advances to the next song (wrapping) when the current song ends", () => {
    render(<Harness initialSelectedId="c" />);
    const audio = screen.getByTestId("audio") as HTMLAudioElement;
    // Per the HTML spec, the browser fires "pause" immediately before "ended"
    // when a track finishes naturally (not via manual pause/next/previous).
    fireEvent(audio, new Event("pause"));
    fireEvent(audio, new Event("ended"));
    expect(screen.getByTestId("current-song-id").textContent).toBe("a");
  });

  it("keeps playing into the next song when the current one ends naturally, even though the native pause event fires first", () => {
    render(<Harness initialSelectedId="a" />);
    fireEvent.click(screen.getByText("toggle")); // start playing song a
    expect(screen.getByTestId("is-playing").textContent).toBe("true");

    const audio = screen.getByTestId("audio") as HTMLAudioElement;
    // Real browsers fire "pause" (setting isPlaying false) before "ended" on
    // natural completion. Auto-advance must not mistake this for a manual pause.
    fireEvent(audio, new Event("pause"));
    fireEvent(audio, new Event("ended"));

    expect(screen.getByTestId("current-song-id").textContent).toBe("b");
    expect(screen.getByTestId("is-playing").textContent).toBe("true");
  });

  it("loops a single-song playlist and keeps playing when it ends naturally", () => {
    const singleSong = [songs[0]];
    render(<Harness initialSelectedId="a" songsOverride={singleSong} />);
    fireEvent.click(screen.getByText("toggle")); // start playing
    expect(screen.getByTestId("is-playing").textContent).toBe("true");

    const audio = screen.getByTestId("audio") as HTMLAudioElement;
    audio.currentTime = 42;
    // Real browsers fire "pause" (setting isPlaying false) before "ended" on
    // natural completion; onSelectedSongIdChange("a") is a no-op re-render since
    // the id doesn't change, so this must not depend on that effect re-running.
    fireEvent(audio, new Event("pause"));
    fireEvent(audio, new Event("ended"));

    expect(screen.getByTestId("current-song-id").textContent).toBe("a");
    expect(screen.getByTestId("is-playing").textContent).toBe("true");
    expect(audio.currentTime).toBe(0);
  });

  it("does not autoplay a later, unrelated song selection after a single-song loop", () => {
    const singleSong = [songs[0]];
    render(<Harness initialSelectedId="a" songsOverride={singleSong} />);
    fireEvent.click(screen.getByText("toggle")); // start playing

    const audio = screen.getByTestId("audio") as HTMLAudioElement;
    fireEvent(audio, new Event("pause"));
    fireEvent(audio, new Event("ended")); // loops song "a"

    fireEvent.click(screen.getByText("toggle")); // user pauses
    expect(screen.getByTestId("is-playing").textContent).toBe("false");
  });

  it("updates duration from the loadedmetadata event", () => {
    render(<Harness initialSelectedId="a" />);
    const audio = screen.getByTestId("audio") as HTMLAudioElement;
    Object.defineProperty(audio, "duration", {
      value: 180,
      configurable: true,
    });
    fireEvent(audio, new Event("loadedmetadata"));
    expect(screen.getByTestId("duration").textContent).toBe("180");
  });

  it("updates currentTime from the timeupdate event", () => {
    render(<Harness initialSelectedId="a" />);
    const audio = screen.getByTestId("audio") as HTMLAudioElement;
    Object.defineProperty(audio, "currentTime", {
      value: 12.5,
      configurable: true,
    });
    fireEvent(audio, new Event("timeupdate"));
    expect(screen.getByTestId("current-time").textContent).toBe("12.5");
  });
});
