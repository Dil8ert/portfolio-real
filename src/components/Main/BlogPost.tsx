import { useEffect, useState } from 'react';
import { Badge, Button, Group, Skeleton, Stack, Text, Title, TypographyStylesProvider } from '@mantine/core';
import Markdown from 'react-markdown';
import { Link, useParams } from 'react-router-dom';
import { RevealFromSkeleton } from '../Loading';
import { fetchBlogPost, type BlogPost as BlogPostData } from '../../lib/blog';
import classes from './BlogPost.module.css';

export default function BlogPost() {
  const { slug = '' } = useParams();
  const [post, setPost] = useState<BlogPostData | null | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;
    setPost(undefined);
    fetchBlogPost(slug).then((result) => {
      if (!cancelled) {
        setPost(result);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (post === undefined) {
    return (
      <Stack maw={760} mx="auto" gap="md" className={classes.page} data-mantine-color-scheme="light">
        <Skeleton height={14} width={80} />
        <Skeleton height={36} width="70%" />
        <Skeleton height={14} width="40%" />
        <Skeleton height={220} radius={0} />
        <Skeleton height={14} width="100%" />
        <Skeleton height={14} width="95%" />
        <Skeleton height={14} width="80%" />
      </Stack>
    );
  }

  if (!post) {
    return (
      <Stack maw={560} gap="sm" className={classes.page} data-mantine-color-scheme="light">
        <Title order={2} c="#111">
          Post not found
        </Title>
        <Text c="#333">This article is missing or still a draft in Notion.</Text>
        <Button
          component={Link}
          to="/blog"
          variant="outline"
          color="dark"
          radius={0}
          w="fit-content"
        >
          Back to blog
        </Button>
      </Stack>
    );
  }

  const published = post.date
    ? new Date(post.date).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  return (
    <Stack maw={760} mx="auto" gap="md" className={classes.page} data-mantine-color-scheme="light">
      <Button
        component={Link}
        to="/blog"
        variant="outline"
        color="dark"
        radius={0}
        w="fit-content"
      >
        Back to blog
      </Button>
      <RevealFromSkeleton delay={80} skeleton={<Skeleton height={36} width="75%" />}>
        <Title order={1} c="#111">
          {post.title}
        </Title>
      </RevealFromSkeleton>
      <RevealFromSkeleton delay={220} skeleton={<Skeleton height={14} width="35%" />}>
        <Group gap="sm">
          {published && (
            <Text size="sm" c="#111">
              {published}
            </Text>
          )}
          {post.tags.map((tag) => (
            <Badge key={tag} radius={0} color="dark">
              {tag}
            </Badge>
          ))}
        </Group>
      </RevealFromSkeleton>
      <RevealFromSkeleton
        delay={380}
        skeleton={
          <>
            <Skeleton height={14} width="100%" />
            <Skeleton height={14} width="96%" mt="sm" />
            <Skeleton height={14} width="88%" mt="sm" />
          </>
        }
      >
        <TypographyStylesProvider>
          <div className={classes.body}>
            <Markdown>{post.content}</Markdown>
          </div>
        </TypographyStylesProvider>
      </RevealFromSkeleton>
    </Stack>
  );
}
