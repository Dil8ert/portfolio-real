import { AppShell, Burger, Grid, Group, Text, UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
// import { MantineLogo } from '@mantinex/mantine-logo';
import classes from './MobileNavbar.module.css';

import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import HomePage from './HomePage';

import Projects from './Projects';

import { ContactUs } from './Contact/ContactUs';

import Services from './Services';

interface MobileNavbarProps {
  component: React.ComponentType<any>; // Use React.ComponentType to represent any component type
}

export function MobileNavbar({ component: Component }: MobileNavbarProps) {
  const [opened, { toggle }] = useDisclosure();
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

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
              <Link to={'/home'} className={classes.control} style={{ textDecoration: 'none' }}>
                Home
              </Link>
              <Link to={'/services'} className={classes.control} style={{ textDecoration: 'none' }}>
                Services
              </Link>
              <Link to={'/projects'} className={classes.control} style={{ textDecoration: 'none' }}>
                Projects
              </Link>
              <Link to={'/contact'} className={classes.control} style={{ textDecoration: 'none' }}>
                Contact Us!
              </Link>
            </Group>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar py="md" px={4}>
        <Link to={'/home'} className={classes.control} style={{ textDecoration: 'none' }}>
          Home
        </Link>
        <Link to={'/services'} className={classes.control} style={{ textDecoration: 'none' }}>
          Services
        </Link>
        <Link to={'/projects'} className={classes.control} style={{ textDecoration: 'none' }}>
          Projects
        </Link>
        <Link to={'/contact'} className={classes.control} style={{ textDecoration: 'none' }}>
          Contact Us!
        </Link>
      </AppShell.Navbar>

      <AppShell.Main
        style={{
          height: '100%',
          backgroundColor: pathname === '/contact' ? 'black' : 'white',
        }}
      >
        <Component />
      </AppShell.Main>
    </AppShell>
  );
}
