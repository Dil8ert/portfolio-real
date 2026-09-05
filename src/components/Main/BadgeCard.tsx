import { Button, Card, Group, Text } from '@mantine/core';
import classes from './BadgeCard.module.css';
import { ImageWithLoading } from '../Loading';

interface EnumServiceItem {
  image: string;
  title: string;
  description: string;
  url: string;
  active?: boolean;
  onReady?: () => void;
}

export function BadgeCard({
  image,
  title,
  description,
  url,
  active = true,
  onReady,
}: EnumServiceItem) {
  const openDiscord = () => {
    window.open(url, '_blank');
  };

  return (
    <Card withBorder radius="md" p="md" className={classes.card} h="100%" w="100%">
      <Card.Section>
        <ImageWithLoading
          src={image}
          alt={title}
          height={220}
          fit="cover"
          active={active}
          onReady={onReady}
        />
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
