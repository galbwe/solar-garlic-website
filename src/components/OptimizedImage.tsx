import Image from "next/image";
import { CSSProperties, ImgHTMLAttributes } from "react";

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  /** Base image path or imported static image */
  src: string | any;
  /** Alt text for accessibility (required) */
  alt: string;
  /** Optional CSS classes */
  className?: string;
  /** Optional inline styles */
  style?: CSSProperties;
  /** Width for Next.js Image (required for static imports) */
  width?: number;
  /** Height for Next.js Image (required for static imports) */
  height?: number;
  /** Use Next.js Image for optimization (default: true) */
  useNextImage?: boolean;
  /** Enable lazy loading (default: true) */
  loading?: "lazy" | "eager";
}

/**
 * OptimizedImage Component
 *
 * Intelligently serves images with Next.js Image optimization when possible,
 * or uses picture element for format variants when needed.
 *
 * For static imports with width/height: uses Next.js Image (best optimization)
 * For string paths: uses picture element with AVIF/WebP variants
 *
 * Usage:
 * ```tsx
 * import bandPhoto from "../../../public/band-photo-02.jpg";
 * <OptimizedImage src={bandPhoto} alt="Band photo" width={1200} height={675} />
 * ```
 */
export default function OptimizedImage({
  src,
  alt,
  className,
  style,
  loading = "lazy",
  width,
  height,
  useNextImage = true,
  ...props
}: OptimizedImageProps) {
  // Check if src is a static import (object with src property) or string
  const isStaticImport = typeof src === "object" && src.src;
  const srcPath = isStaticImport ? src.src : src;

  // If we have width/height and useNextImage is true, use Next.js Image
  // This works for both static imports and string paths
  if (useNextImage && width && height) {
    return (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        style={style}
        loading={loading}
        {...props}
      />
    );
  }

  // For string paths without explicit width/height, use picture element
  // with format variants (AVIF, WebP) for better compression
  if (typeof src === "string") {
    // Remove file extension to build variant paths
    const basePath = src.replace(/\.(jpg|png)$/i, "");

    return (
      <picture>
        {/* AVIF: Best compression, modern browsers */}
        <source srcSet={`${basePath}.avif`} type="image/avif" />

        {/* WebP: Good compression, broad support */}
        <source srcSet={`${basePath}.webp`} type="image/webp" />

        {/* Fallback to original JPG/PNG */}
        <img
          src={src}
          alt={alt}
          className={className}
          style={style}
          loading={loading}
          {...props}
        />
      </picture>
    );
  }

  // Fallback: static import without explicit dimensions
  // Use NextImage with default sizing
  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      style={style}
      loading={loading}
      {...props}
    />
  );
}
