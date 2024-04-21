import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import { Navigate, useNavigate } from 'react-router-dom';

interface card {
  text: string;
  url?: string;
  title: string;
  img: string;
}

export default function CardComponent({ text, url, title, img }: card) {
  const navigate = useNavigate();
  const handleClick = (url) => {
    navigate(url);
  };
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section component="a">
        <video autoPlay width="100%" height={'100%'}>
          <source src={img} type="video/mp4" />
        </video>
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
