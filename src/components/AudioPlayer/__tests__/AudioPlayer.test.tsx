import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import AudioPlayer from "../AudioPlayer";
import useAudioPlayer from "@/hooks/useAudioPlayer";
import { AudioDownload } from "@/types";

vi.mock("@/hooks/useAudioPlayer", () => ({
  default: vi.fn(),
}));

vi.mock("next/image", () => ({
  default: ({ alt }: { alt: string }) => <img alt={alt} />,
}));

vi.mock("next/link", () => ({
  default: ({
    href,
    download,
    className,
    children,
  }: {
    href: string;
    download?: boolean;
    className?: string;
    children: React.ReactNode;
  }) => (
    <a href={href} download={download} className={className}>
      {children}
    </a>
  ),
}));

const songs: Array<AudioDownload> = [
  {
    id: "a",
    title: "Song A",
    date: "2026-01-01T00:00:00",
    file: "song-a.mp3",
    spotify: "https://open.spotify.com/track/a",
  },
];

const basePlayer = {
  audioRef: { current: null },
  currentSong: songs[0],
  isPlaying: false,
  currentTime: 30,
  duration: 180,
  volume: 0.8,
  togglePlay: vi.fn(),
  seek: vi.fn(),
  restart: vi.fn(),
  next: vi.fn(),
  previous: vi.fn(),
  setVolume: vi.fn(),
};

beforeEach(() => {
  vi.mocked(useAudioPlayer).mockReturnValue({ ...basePlayer });
});

describe("AudioPlayer", () => {
  it("renders without crashing", () => {
    const { container } = render(
      <AudioPlayer
        songs={songs}
        selectedSongId="a"
        onSelectedSongIdChange={() => {}}
      />,
    );
    expect(container).toBeTruthy();
  });

  it("passes songs, selectedSongId, and onSelectedSongIdChange through to the hook", () => {
    const onChange = vi.fn();
    render(
      <AudioPlayer
        songs={songs}
        selectedSongId="a"
        onSelectedSongIdChange={onChange}
      />,
    );
    expect(useAudioPlayer).toHaveBeenCalledWith(songs, "a", onChange);
  });

  it("shows a Play control when not playing, and calls togglePlay when clicked", () => {
    render(
      <AudioPlayer
        songs={songs}
        selectedSongId="a"
        onSelectedSongIdChange={() => {}}
      />,
    );
    const button = screen.getByRole("button", { name: "Play" });
    fireEvent.click(button);
    expect(basePlayer.togglePlay).toHaveBeenCalled();
  });

  it("shows a Pause control when playing", () => {
    vi.mocked(useAudioPlayer).mockReturnValue({
      ...basePlayer,
      isPlaying: true,
    });
    render(
      <AudioPlayer
        songs={songs}
        selectedSongId="a"
        onSelectedSongIdChange={() => {}}
      />,
    );
    expect(screen.getByRole("button", { name: "Pause" })).toBeTruthy();
  });

  it("renders the progress slider with min/max/value bound to currentTime/duration and seeks on change", () => {
    render(
      <AudioPlayer
        songs={songs}
        selectedSongId="a"
        onSelectedSongIdChange={() => {}}
      />,
    );
    const slider = screen.getByRole("slider", {
      name: "Progress",
    }) as HTMLInputElement;
    expect(slider.min).toBe("0");
    expect(slider.max).toBe("180");
    expect(slider.value).toBe("30");
    fireEvent.change(slider, { target: { value: "99" } });
    expect(basePlayer.seek).toHaveBeenCalledWith(99);
  });

  it("renders the volume slider with min/max/value bound to volume and calls setVolume on change", () => {
    render(
      <AudioPlayer
        songs={songs}
        selectedSongId="a"
        onSelectedSongIdChange={() => {}}
      />,
    );
    const slider = screen.getByRole("slider", {
      name: "Volume",
    }) as HTMLInputElement;
    expect(slider.min).toBe("0");
    expect(slider.max).toBe("1");
    expect(slider.value).toBe("0.8");
    fireEvent.change(slider, { target: { value: "0.5" } });
    expect(basePlayer.setVolume).toHaveBeenCalledWith(0.5);
  });

  it("calls restart, next, and previous when their buttons are clicked", () => {
    render(
      <AudioPlayer
        songs={songs}
        selectedSongId="a"
        onSelectedSongIdChange={() => {}}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Restart" }));
    expect(basePlayer.restart).toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: "Next" }));
    expect(basePlayer.next).toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: "Previous" }));
    expect(basePlayer.previous).toHaveBeenCalled();
  });

  it("renders a download link pointing at the current song's file", () => {
    render(
      <AudioPlayer
        songs={songs}
        selectedSongId="a"
        onSelectedSongIdChange={() => {}}
      />,
    );
    const link = screen.getByText("Download").closest("a");
    expect(link?.getAttribute("href")).toBe("/audio/song-a.mp3");
  });

  it("does not nest a button inside the download link (invalid HTML content model)", () => {
    render(
      <AudioPlayer
        songs={songs}
        selectedSongId="a"
        onSelectedSongIdChange={() => {}}
      />,
    );
    const link = screen.getByText("Download").closest("a");
    expect(link?.querySelector("button")).toBeNull();
  });

  it("renders a spotify link pointing at the current song's spotify url, opening in a new tab", () => {
    render(
      <AudioPlayer
        songs={songs}
        selectedSongId="a"
        onSelectedSongIdChange={() => {}}
      />,
    );
    const link = screen.getByText("Spotify").closest("a");
    expect(link?.getAttribute("href")).toBe("https://open.spotify.com/track/a");
    expect(link?.getAttribute("target")).toBe("_blank");
    expect(link?.getAttribute("rel")).toBe("noopener noreferrer");
  });

  it("renders gracefully when there is no current song", () => {
    vi.mocked(useAudioPlayer).mockReturnValue({
      ...basePlayer,
      currentSong: null,
    });
    const { container } = render(
      <AudioPlayer
        songs={[]}
        selectedSongId={null}
        onSelectedSongIdChange={() => {}}
      />,
    );
    expect(container).toBeTruthy();
    expect(screen.queryByText("Download")).toBeNull();
  });
});
