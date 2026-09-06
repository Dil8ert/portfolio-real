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
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const readyRef = useRef(false);
  const onReadyRef = useRef(onReady);
  onReadyRef.current = onReady;

  useEffect(() => {
    readyRef.current = false;
    setReady(false);
    setError(false);
    setShowSkeleton(true);
  }, [src, active]);

  const finish = (failed = false) => {
    if (readyRef.current) {
      return;
    }
    readyRef.current = true;
    setError(failed);
    setReady(true);
    onReadyRef.current?.();
  };

  useEffect(() => {
    if (!active) {
      return undefined;
    }
    const video = videoRef.current;
    if (video && video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      if (!autoPlay || !video.paused) {
        finish();
      }
    }
    const timer = window.setTimeout(() => finish(), 20000);
    return () => window.clearTimeout(timer);
  }, [active, src, autoPlay]);

  useEffect(() => {
    if (!ready) {
      return undefined;
    }
    const timer = window.setTimeout(() => setShowSkeleton(false), 400);
    return () => window.clearTimeout(timer);
  }, [ready]);

  return (
    <Box
      style={{
        position: 'relative',
        width,
        height,
        overflow: 'hidden',
        backgroundColor: 'transparent',
      }}
    >
      {active && (
        // Decorative muted preview clips do not need captions
        // eslint-disable-next-line jsx-a11y/media-has-caption
        <video
          ref={videoRef}
          width="100%"
          height="100%"
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          controls={controls}
          playsInline
          preload="auto"
          className={className}
          onPlaying={() => finish()}
          onLoadedData={() => {
            if (!autoPlay) {
              finish();
            }
          }}
          onCanPlay={() => {
            if (!autoPlay) {
              finish();
            }
          }}
          onError={() => finish(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            backgroundColor: 'transparent',
            ...style,
          }}
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      {(!active || showSkeleton) && (
        <Skeleton
          height="100%"
          width="100%"
          radius={radius}
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            opacity: active && ready ? 0 : 1,
            transition: 'opacity 0.4s ease',
            pointerEvents: 'none',
          }}
        />
      )}
      {error && ready && (
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
            zIndex: 2,
          }}
        >
          Video failed to load
        </Box>
      )}
    </Box>
  );
}
