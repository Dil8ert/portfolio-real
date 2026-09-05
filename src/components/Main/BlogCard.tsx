import { useEffect } from 'react';
import { Badge, Card, Group, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import { ImageWithLoading } from '../Loading';
import type { BlogPostSummary } from '../../lib/blog';
import classes from './BlogCard.module.css';

interface BlogCardProps {
  post: BlogPostSummary;
  active?: boolean;
  onReady?: () => void;
}

export function BlogCard({ post, active = true, onReady }: BlogCardProps) {
  useEffect(() => {
    if (!post.cover) {
      onReady?.();
    }
  }, [post.cover, onReady]);

  const published = post.date
    ? new Date(post.date).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : null;

  return (
    <Card
      component={Link}
      to={`/blog/${post.slug}`}
      radius={0}
      p={0}
      withBorder={false}
      className={classes.card}
    >
      <Card.Section>
        {post.cover ? (
          <ImageWithLoading
            src={post.cover}
            alt={post.title}
            height={180}
            fit="cover"
            radius={0}
            active={active}
            onReady={onReady}
          />
        ) : (
          <div className={classes.coverFallback} />
        )}
      </Card.Section>

      <div className={classes.section}>
        <Text size="xs" mb={6} className={classes.date}>
          {published ?? '\u00a0'}
        </Text>
        <Text fz="lg" fw={700} lineClamp={2} className={classes.title}>
          {post.title}
        </Text>
        <Text fz="sm" mt="xs" lineClamp={3} className={classes.summary}>
          {post.summary || '\u00a0'}
        </Text>
        <Group gap={6} mt="sm" className={classes.tags}>
          {post.tags.map((tag) => (
            <Badge key={tag} size="sm" radius={0} variant="filled" color="dark" className={classes.tag}>
              {tag}
            </Badge>
          ))}
        </Group>
      </div>
    </Card>
  );
}
