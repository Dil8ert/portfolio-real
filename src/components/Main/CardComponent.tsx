import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import { Navigate, useNavigate } from 'react-router-dom';
import { VideoWithLoading } from '../Loading';

interface card {
  text: string;
  url?: string;
  title: string;
  img: string;
}

export default function CardComponent({ text, url, title, img }: card) {
  const navigate = useNavigate();
  const handleClick = (url?: string) => {
    if (url) {
      window.open(url, '_blank');
    }
  };
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section component="a">
        <VideoWithLoading
          src={img}
          width="100%"
          height="200px"
          autoPlay
          loop
          muted
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{title}</Text>
        <Button variant="outline" onClick={() => handleClick(url)}>
          Link
        </Button>
      </Group>

      <Text size="xs" c="dimmed">
        {text}
      </Text>
    </Card>
  );
}
