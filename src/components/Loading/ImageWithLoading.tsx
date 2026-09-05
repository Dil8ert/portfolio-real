import { useEffect, useRef, useState } from 'react';
import { Image, Skeleton, Box } from '@mantine/core';

interface ImageWithLoadingProps {
  src: string;
  alt: string;
  width?: string | number;
  height?: string | number;
  radius?: string | number;
  fit?: 'contain' | 'cover' | 'fill' | 'scale-down' | 'none';
  className?: string;
  style?: React.CSSProperties;
  active?: boolean;
  onReady?: () => void;
}

export function ImageWithLoading({
  src,
  alt,
  width = '100%',
  height = 200,
  radius = 0,
  fit = 'cover',
  className,
  style,
  active = true,
  onReady,
}: ImageWithLoadingProps) {
  const [loading, setLoading] = useState(true);
  const readyRef = useRef(false);
  const onReadyRef = useRef(onReady);
  onReadyRef.current = onReady;

  useEffect(() => {
    if (!active) {
      readyRef.current = false;
      setLoading(true);
      return undefined;
    }

    readyRef.current = false;
    setLoading(true);

    const finish = () => {
      if (readyRef.current) {
        return;
      }
      readyRef.current = true;
      setLoading(false);
      onReadyRef.current?.();
    };

    const img = new window.Image();
    img.onload = finish;
    img.onerror = finish;
    img.src = src;
    if (img.complete && img.naturalWidth > 0) {
      finish();
    }

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, active]);

  const showSkeleton = !active || loading;

  return (
    <Box style={{ position: 'relative', width, height, overflow: 'hidden', ...style }}>
      {showSkeleton && (
        <Skeleton
          height="100%"
          width="100%"
          radius={radius}
          style={{ position: 'absolute', inset: 0, zIndex: 1 }}
        />
      )}
      {active && (
        <Image
          src={src}
          alt={alt}
          width="100%"
          height="100%"
          radius={radius}
          fit={fit}
          className={className}
          style={{
            opacity: loading ? 0 : 1,
            transition: 'opacity 0.45s ease',
            height: '100%',
          }}
        />
      )}
    </Box>
  );
}
