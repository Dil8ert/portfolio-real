import { Card, Text, Button, Group } from '@mantine/core';
import { VideoWithLoading } from '../Loading';

interface card {
  text: string;
  url?: string;
  title: string;
  img: string;
  active?: boolean;
  onReady?: () => void;
}

export default function CardComponent({ text, url, title, img, active = true, onReady }: card) {
  const handleClick = (target?: string) => {
    if (target) {
      window.open(target, '_blank');
    }
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <VideoWithLoading
          src={img}
          width="100%"
          height={200}
          autoPlay
          loop
          muted
          active={active}
          onReady={onReady}
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
