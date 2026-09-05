import { FormEvent, useState } from 'react';
import {
  Text,
  Title,
  SimpleGrid,
  TextInput,
  Textarea,
  Button,
  Group,
  NativeSelect,
} from '@mantine/core';
import { SequentialItem } from '../../Loading';
import { ContactIconsList } from './ContactIcons';
import classes from './ContactUs.module.css';

const SERVICES = ['Web Development', 'Graphic Design', 'Bot Development'];

export function ContactUs() {
  const storedService = localStorage.getItem('service');
  const initialService =
    storedService && SERVICES.includes(storedService) ? storedService : SERVICES[0];

  const [username, setUsername] = useState('');
  const [service, setService] = useState(initialService);
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) {
      return;
    }

    setError('');
    setSent(false);
    setSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, service, message }),
      });
      const data = (await response.json().catch(() => ({}))) as { error?: string };
      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setUsername('');
      setMessage('');
      setSent(true);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Failed to send message');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={classes.wrapper}>
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={50}>
        <SequentialItem index={0}>
          <Title className={classes.title}>Contact us</Title>
          <Text className={classes.description} mt="sm" mb={30}>
            Raise a ticket and we will get back to you within 24 hours
          </Text>
          <ContactIconsList />
        </SequentialItem>
        <SequentialItem index={1}>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextInput
              label="Discord Username"
              placeholder="@"
              required
              value={username}
              onChange={(event) => setUsername(event.currentTarget.value)}
              classNames={{ input: classes.input, label: classes.inputLabel }}
            />

            <NativeSelect
              value={service}
              label="Select service"
              classNames={{
                input: classes.input,
                root: classes.nativeSelect,
                label: classes.inputLabel,
              }}
              onChange={(event) => setService(event.currentTarget.value)}
              data={SERVICES}
            />
            <Textarea
              required
              label="Send us a description about your next big thing!"
              placeholder="Need a shop set up for..."
              minRows={4}
              mt="md"
              value={message}
              onChange={(event) => setMessage(event.currentTarget.value)}
              classNames={{ input: classes.input, label: classes.inputLabel }}
            />

            {error && (
              <Text size="sm" mt="sm" className={classes.statusError}>
                {error}
              </Text>
            )}
            {sent && (
              <Text size="sm" mt="sm" className={classes.statusSuccess}>
                Message sent — we will get back to you within 24 hours.
              </Text>
            )}

            <Group justify="flex-end" mt="md">
              <Button type="submit" className={classes.control} loading={submitting}>
                Send message
              </Button>
            </Group>
          </form>
        </SequentialItem>
      </SimpleGrid>
    </div>
  );
}
