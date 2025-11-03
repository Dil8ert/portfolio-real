import { useState, useEffect } from 'react';
import { Paper, Skeleton, Box } from '@mantine/core';
import { motion } from 'framer-motion';

interface BackgroundImageWithLoadingProps {
  image: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onHoverStart?: (event: any) => void;
  onHoverEnd?: (event: any) => void;
  animate?: any;
  transition?: any;
  whileHover?: any;
  shadow?: string;
  p?: string;
  radius?: string;
  component?: any;
}

export function BackgroundImageWithLoading({
  image,
  children,
  className,
  style,
  onHoverStart,
  onHoverEnd,
  animate,
  transition,
  whileHover,
  shadow = 'md',
  p = 'xl',
  radius = 'md',
  component = motion.div,
}: BackgroundImageWithLoadingProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setLoading(false);
    };
    img.onerror = () => {
      setLoading(false);
      setError(true);
    };
    img.src = image;
  }, [image]);

  return (
    <Box style={{ position: 'relative', width: '100%', height: '100%' }}>
      {loading && (
        <Skeleton
          height="100%"
          width="100%"
          radius={radius}
          style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}
        />
      )}
      <Paper
        onHoverStart={onHoverStart}
        onHoverEnd={onHoverEnd}
        shadow={shadow}
        p={p}
        radius={radius}
        component={component}
        animate={animate}
        transition={transition}
        style={{
          backgroundImage: loading ? 'none' : `url(${image})`,
          width: '100%',
          height: '100%',
          opacity: loading ? 0 : 1,
          transition: loading ? 'none' : 'opacity 0.3s ease-in-out',
          ...style,
        }}
        className={className}
        whileHover={whileHover}
      >
        {!loading && children}
      </Paper>
    </Box>
  );
}
