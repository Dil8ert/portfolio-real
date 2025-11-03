import { useState, useRef } from 'react';
import { Skeleton, Box, Loader, Center } from '@mantine/core';

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
}: VideoWithLoadingProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleLoadedData = () => {
    setLoading(false);
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  const handleCanPlay = () => {
    setLoading(false);
  };

  return (
    <Box style={{ position: 'relative', width, height, ...style }}>
      {loading && (
        <Box
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 2,
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
          }}
        >
          <Skeleton height="60%" width="100%" radius="md" mb="sm" />
          <Center style={{ height: '40%' }}>
            <Loader size="md" />
          </Center>
        </Box>
      )}
      <video
        ref={videoRef}
        width={width}
        height={height}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        controls={controls}
        className={className}
        onLoadedData={handleLoadedData}
        onCanPlay={handleCanPlay}
        onError={handleError}
        style={{
          opacity: loading ? 0 : 1,
          transition: 'opacity 0.3s ease-in-out',
          borderRadius: '8px',
          ...style,
        }}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {error && !loading && (
        <Box
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#868e96',
            fontSize: '14px',
          }}
        >
          Video failed to load
        </Box>
      )}
    </Box>
  );
}
