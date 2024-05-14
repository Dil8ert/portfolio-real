import {
  Text,
  Title,
  SimpleGrid,
  TextInput,
  Textarea,
  Button,
  Group,
  ActionIcon,
  NativeSelect,
} from '@mantine/core';

import { ContactIconsList } from './ContactIcons';
import classes from './ContactUs.module.css';
import { useState } from 'react';

export function ContactUs() {
  var service = localStorage.getItem('service');
  const [value, setValue] = useState(service ? service : '');

  return (
    <div className={classes.wrapper}>
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={50}>
        <div>
          <Title className={classes.title}>Contact us</Title>
          <Text className={classes.description} mt="sm" mb={30}>
            Raise a ticket and we will get back to you within 24 hours
          </Text>

          <ContactIconsList />
        </div>
        <div className={classes.form}>
          <TextInput
            label="Discord Username"
            placeholder="@"
            required
            classNames={{ input: classes.input, label: classes.inputLabel }}
          />

          <NativeSelect
            value={value}
            label="Select service"
            classNames={{
              input: classes.input,
              root: classes.nativeSelect,
              label: classes.inputLabel,
            }}
            onChange={(event) => setValue(event.currentTarget.value)}
            data={['Web Development', 'Graphic Design', 'Bot Development']}
          />
          <Textarea
            required
            label="Send us a description about your next big thing!"
            placeholder="Need a shop set up for..."
            minRows={4}
            mt="md"
            classNames={{ input: classes.input, label: classes.inputLabel }}
          />

          <Group justify="flex-end" mt="md">
            <Button className={classes.control}>Send message</Button>
          </Group>
        </div>
      </SimpleGrid>
    </div>
  );
}
