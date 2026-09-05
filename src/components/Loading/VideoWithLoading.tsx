import { useEffect, useRef, useState } from 'react';
import { Skeleton, Box } from '@mantine/core';

interface VideoWithLoadingProps {
  src: string;
  width?: string | number;
  height?: string | number;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  className?: string;
  style?: React.CSSProperties;
  active?: boolean;
  onReady?: () => void;
  radius?: string | number;
}

export function VideoWithLoading({
  src,
  width = '100%',
  height = '100%',
  autoPlay = true,
  loop = false,
  muted = true,
  controls = false,
  className,
  style,
  active = true,
  onReady,
  radius = 'md',
}: VideoWithLoadingProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const readyRef = useRef(false);
  const onReadyRef = useRef(onReady);
  onReadyRef.current = onReady;

  useEffect(() => {
    readyRef.current = false;
    setLoading(true);
    setError(false);
  }, [src, active]);

  const finish = (failed = false) => {
    if (readyRef.current) {
      return;
    }
    readyRef.current = true;
    setError(failed);
    setLoading(false);
    onReadyRef.current?.();
  };

  useEffect(() => {
    if (!active) {
      return undefined;
    }
    const timer = window.setTimeout(() => finish(), 20000);
    return () => window.clearTimeout(timer);
  }, [active, src]);

  const showSkeleton = !active || loading;

  return (
    <Box
      style={{
        position: 'relative',
        width,
        height,
        overflow: 'hidden',
      }}
    >
      {showSkeleton && (
        <Skeleton
          height="100%"
          width="100%"
          radius={radius}
          style={{ position: 'absolute', inset: 0, zIndex: 1 }}
        />
      )}
      {active && (
        // Decorative muted preview clips do not need captions
        // eslint-disable-next-line jsx-a11y/media-has-caption
        <video
          width="100%"
          height="100%"
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          controls={controls}
          playsInline
          preload="auto"
          className={className}
          onCanPlay={() => finish()}
          onLoadedData={() => finish()}
          onError={() => finish(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: loading ? 0 : 1,
            transition: 'opacity 0.45s ease',
            display: 'block',
            ...style,
          }}
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      {error && !loading && (
        <Box
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#868e96',
            fontSize: '14px',
            backgroundColor: 'var(--mantine-color-body)',
          }}
        >
          Video failed to load
        </Box>
      )}
    </Box>
  );
}
