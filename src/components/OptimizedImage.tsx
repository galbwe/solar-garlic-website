import Image from "next/image";
import { CSSProperties, ComponentProps } from "react";

interface OptimizedImageProps extends Omit<ComponentProps<typeof Image>, "src"> {
  /** Base image path or imported static image (without extension) */
  src: string | any;
  /** Alt text for accessibility (required) */
  alt: string;
  /** Optional CSS classes */
  className?: string;
  /** Optional inline styles */
  style?: CSSProperties;
  /** Enable lazy loading (default: true) */
  loading?: "lazy" | "eager";
}

/**
 * OptimizedImage Component
 *
 * Serves modern image formats (AVIF, WebP) with fallback to JPG/PNG.
 * Automatically generates correct paths for all format variants.
 *
 * Usage:
 * ```tsx
 * import bandPhoto from "../../../public/band-photo-02.jpg";
 * <OptimizedImage src={bandPhoto} alt="Band photo" width={1200} height={675} />
 * ```
 *
 * This component will serve:
 * - AVIF to modern browsers (87%+ support)
 * - WebP to older browsers that don't support AVIF (94%+ support)
 * - JPG/PNG to legacy browsers
 */
export default function OptimizedImage({
  src,
  alt,
  className,
  style,
  loading = "lazy",
  width,
  height,
  priority = false,
  ...props
}: OptimizedImageProps) {
  // Handle both static imports and string paths
  let srcPath: string;

  if (typeof src === "string") {
    srcPath = src;
  } else {
    // For static imports, use the src property
    srcPath = src.src || src;
  }

  // Remove file extension to build variant paths
  const basePath = srcPath.replace(/\.(jpg|png)$/i, "");

  return (
    <picture>
      {/* AVIF: Best compression, modern browsers */}
      <source srcSet={`${basePath}.avif`} type="image/avif" />

      {/* WebP: Good compression, broad support */}
      <source srcSet={`${basePath}.webp`} type="image/webp" />

      {/* Fallback to original JPG/PNG */}
      <Image
        src={srcPath}
        alt={alt}
        width={width as number}
        height={height as number}
        className={className}
        style={style}
        loading={loading}
        priority={priority}
        {...props}
      />
    </picture>
  );
}
