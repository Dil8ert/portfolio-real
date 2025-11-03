import { useState } from 'react';
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
}

export function ImageWithLoading({
  src,
  alt,
  width = '100%',
  height = 200,
  radius = 'md',
  fit = 'cover',
  className,
  style,
}: ImageWithLoadingProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    setLoading(false);
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  return (
    <Box style={{ position: 'relative', width, height, ...style }}>
      {loading && (
        <Skeleton
          height={height}
          width={width}
          radius={radius}
          style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}
        />
      )}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        radius={radius}
        fit={fit}
        className={className}
        onLoad={handleLoad}
        onError={handleError}
        style={{
          opacity: loading ? 0 : 1,
          transition: 'opacity 0.3s ease-in-out',
          ...style,
        }}
        fallbackSrc="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik04NyA3NEg5M1Y4MEg4N1Y3NFoiIGZpbGw9IiNEREREREQiLz4KPHA+CjxyZWN0IHg9Ijc0IiB5PSI5NCIgd2lkdGg9IjUyIiBoZWlnaHQ9IjIiIGZpbGw9IiNEREREREQiLz4KPC9zdmc+"
      />
    </Box>
  );
}
