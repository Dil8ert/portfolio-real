import { AppShell, Burger, Grid, Group, Text, UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
// import { MantineLogo } from '@mantinex/mantine-logo';
import classes from './MobileNavbar.module.css';

import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import HomePage from './HomePage';

import Projects from './Projects';

import { ContactUs } from './Contact/ContactUs';

import Services from './Services';

export function MobileNavbar() {
  const [opened, { toggle }] = useDisclosure();
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const [select, setSelect] = useState(pathname);

  useEffect(() => {
    localStorage.setItem('page', pathname);
  }, []);

  const handleClick = (param: string) => {
    navigate('/' + param);
    setSelect('/' + param);
    localStorage.setItem('page', '/' + param);
  };

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="lg" className={classes.main}>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group justify="space-between" style={{ flex: 1 }}>
            <Text>Dil8ert</Text>
            <Group ml="xl" gap={0} visibleFrom="sm">
              <UnstyledButton
                className={classes.control}
                style={{
                  backgroundColor:
                    select === '/home'
                      ? 'light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-6))'
                      : '',
                }}
                onClick={() => handleClick('home')}
              >
                Home
              </UnstyledButton>
              <UnstyledButton
                className={classes.control}
                style={{
                  backgroundColor:
                    select === '/services'
                      ? 'light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-6))'
                      : '',
                }}
                onClick={() => handleClick('services')}
              >
                Services
              </UnstyledButton>
              <UnstyledButton
                className={classes.control}
                style={{
                  backgroundColor:
                    select === '/projects'
                      ? 'light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-6))'
                      : '',
                }}
                onClick={() => handleClick('projects')}
              >
                Projects
              </UnstyledButton>
              <UnstyledButton
                className={classes.control}
                style={{
                  backgroundColor:
                    select === '/contact'
                      ? 'light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-6))'
                      : '',
                }}
                onClick={() => handleClick('contact')}
              >
                Contact Us!
              </UnstyledButton>
            </Group>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar py="md" px={4}>
        <UnstyledButton className={classes.control} onClick={() => handleClick('home')}>
          Home
        </UnstyledButton>
        <UnstyledButton className={classes.control} onClick={() => handleClick('services')}>
          Services
        </UnstyledButton>
        <UnstyledButton className={classes.control} onClick={() => handleClick('projects')}>
          Projects
        </UnstyledButton>
        <UnstyledButton className={classes.control} onClick={() => handleClick('contact')}>
          Contact Us!
        </UnstyledButton>
      </AppShell.Navbar>

      <AppShell.Main
        style={{
          height: '100%',
          backgroundColor: localStorage.getItem('page') === '/contact' ? 'black' : 'white',
        }}
      >
        {localStorage.getItem('page') === '/home' ? <HomePage /> : ''}
        {localStorage.getItem('page') === '/projects' ? <Projects /> : ''}
        {localStorage.getItem('page') === '/contact' ? <ContactUs /> : ''}
        {localStorage.getItem('page') === '/services' ? <Services /> : ''}
      </AppShell.Main>
    </AppShell>
  );
}
