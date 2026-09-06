import { AppShell, Burger, Group, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
// import { MantineLogo } from '@mantinex/mantine-logo';
import classes from './MobileNavbar.module.css';

import { Link, useLocation } from 'react-router-dom';

interface MobileNavbarProps {
  component: React.ComponentType<any>; // Use React.ComponentType to represent any component type
}

export function MobileNavbar({ component: Component }: MobileNavbarProps) {
  const [opened, { toggle, close }] = useDisclosure();
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
              <Link
                to={'/home'}
                className={classes.control}
                style={{ textDecoration: 'none', color: 'white' }}
              >
                Home
              </Link>
              <Link
                to={'/blog'}
                className={classes.control}
                style={{ textDecoration: 'none', color: 'white' }}
              >
                Blog
              </Link>
              <Link
                to={'/projects'}
                className={classes.control}
                style={{ textDecoration: 'none', color: 'white' }}
              >
                Projects
              </Link>
              <Link
                to={'/contact'}
                className={classes.control}
                style={{ textDecoration: 'none', color: 'white' }}
              >
                Contact Us!
              </Link>
            </Group>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar py="md" px={4}>
        <Link
          to={'/home'}
          className={classes.control}
          style={{ textDecoration: 'none', color: 'white' }}
          onClick={close}
        >
          Home
        </Link>
        <Link
          to={'/blog'}
          className={classes.control}
          style={{ textDecoration: 'none', color: 'white' }}
          onClick={close}
        >
          Blog
        </Link>
        <Link
          to={'/projects'}
          className={classes.control}
          style={{ textDecoration: 'none', color: 'white' }}
          onClick={close}
        >
          Projects
        </Link>
        <Link
          to={'/contact'}
          className={classes.control}
          style={{ textDecoration: 'none', color: 'white' }}
          onClick={close}
        >
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
