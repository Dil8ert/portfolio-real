import { Text, Box, Stack, rem } from '@mantine/core';

import classes from './ContactIcons.module.css';
import { RxDiscordLogo } from 'react-icons/rx';
import { PiTelegramLogoLight } from 'react-icons/pi';

interface ContactIconProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'title'> {
  icon: typeof RxDiscordLogo;
  title: React.ReactNode;
  description: React.ReactNode;
}

function ContactIcon({ icon: Icon, title, description, ...others }: ContactIconProps) {
  return (
    <div className={classes.wrapper} {...others}>
      <Box mr="md">
        <Icon style={{ width: rem(24), height: rem(24) }} />
      </Box>

      <div>
        <Text size="xs" className={classes.title}>
          {title}
        </Text>
        <Text className={classes.description}>{description}</Text>
      </div>
    </div>
  );
}

const MOCKDATA = [
  { title: 'Discord', description: 'dil8ert', icon: RxDiscordLogo },
  { title: 'Telegram', description: 'Dil8ert', icon: PiTelegramLogoLight },
];

export function ContactIconsList() {
  const items = MOCKDATA.map((item, index) => <ContactIcon key={index} {...item} />);
  return <Stack>{items}</Stack>;
}
