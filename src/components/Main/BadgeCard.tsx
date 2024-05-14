import { IconHeart } from '@tabler/icons-react';
import { Card, Image, Text, Group, Badge, Button, ActionIcon } from '@mantine/core';
import classes from './BadgeCard.module.css';

interface EnumServiceItem {
  image: string;
  title: string;
  description: string;
  url: string;
}

export function BadgeCard({ image, title, description, url }: EnumServiceItem) {
  const openDiscord = () => {
    window.open(url, '_blank');
  };

  return (
    <Card withBorder radius="md" p="md" className={classes.card}>
      <Card.Section>
        <Image src={image} alt={title} />
      </Card.Section>

      <Card.Section className={classes.section} mt="md">
        <Group justify="apart">
          <Text fz="lg" fw={500}>
            {title}
          </Text>
        </Group>
        <Text fz="sm" mt="xs">
          {description}
        </Text>
      </Card.Section>

      <Group mt="xs">
        <Button radius="md" style={{ flex: 1 }} onClick={openDiscord}>
          Create a ticket!
        </Button>
      </Group>
    </Card>
  );
}
