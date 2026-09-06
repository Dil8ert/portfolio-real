import { Grid, Group, Skeleton, Title } from '@mantine/core';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import dil8ert from '../Images/dil8ert.mp4';
import classes from './MobileNavbar.module.css';
import { RevealFromSkeleton, VideoWithLoading } from '../Loading';

export default function HomePage() {
  const navigate = useNavigate();
  const sendToContact = () => {
    navigate('/contact');
    localStorage.setItem('page', '/contact');
  };

  const sendToProjects = () => {
    navigate('/projects');
    localStorage.setItem('page', '/projects');
  };

  return (
    <Grid gutter={0} align="stretch">
      <Grid.Col
        span={{ base: 12, md: 7, lg: 7 }}
        h={{ base: 280, md: 'calc(100dvh - 76px)' }}
        p={0}
        data-mantine-color-scheme="light"
        style={{ backgroundColor: 'var(--mantine-color-gray-1)' }}
      >
        <VideoWithLoading
          src={dil8ert}
          width="100%"
          height="100%"
          autoPlay
          muted
          radius={0}
          style={{
            objectFit: 'cover',
            margin: 0,
            padding: 0,
          }}
        />
      </Grid.Col>
      <Grid.Col
        span={{ base: 12, md: 5, lg: 5 }}
        style={{ backgroundColor: 'white', paddingTop: '7%', color: 'black' }}
        data-mantine-color-scheme="light"
        mt={{ base: '4rem', md: 0, lg: 0 }}
        px="md"
      >
        <RevealFromSkeleton
          delay={180}
          skeleton={
            <>
              <Skeleton height={28} width="70%" mb="sm" />
              <Skeleton height={48} width="90%" mb="sm" />
              <Skeleton height={48} width="55%" />
            </>
          }
        >
          <Title order={1} size="h1" fz={{ base: '2rem', sm: '3rem', lg: '5rem' }}>
            Dil8ert&apos;s Development Services
          </Title>
        </RevealFromSkeleton>

        <div style={{ paddingBlock: '2rem 2rem' }}>
          <RevealFromSkeleton
            delay={420}
            skeleton={
              <>
                <Skeleton height={14} width="100%" mb="sm" />
                <Skeleton height={14} width="95%" mb="sm" />
                <Skeleton height={14} width="60%" />
              </>
            }
          >
            Make your own service now! A store, a trading dashboard, a gaming dashboard, get what
            you want! Fully Customized ! Cheap rates!
          </RevealFromSkeleton>
        </div>

        <RevealFromSkeleton
          delay={680}
          skeleton={
            <Group gap="md">
              <Skeleton height={48} width={160} />
              <Skeleton height={48} width={160} />
            </Group>
          }
        >
          <div>
            <motion.button
              whileHover={{
                y: -2,
                borderBottom: '4px solid rgb(78, 83, 80)',
                borderRight: '2px solid rgb(78, 83, 80)',
              }}
              whileTap={{ scale: 1.2 }}
              className={classes.button}
              onClick={sendToProjects}
            >
              Explore Projects
            </motion.button>
            <motion.button
              whileHover={{
                y: 2,
                borderTop: '4px solid rgb(78, 83, 80)',
                borderLeft: '2px solid rgb(78, 83, 80)',
              }}
              whileTap={{ scale: 1.2 }}
              className={classes.button}
              onClick={sendToContact}
            >
              Create a ticket!
            </motion.button>
          </div>
        </RevealFromSkeleton>
      </Grid.Col>
    </Grid>
  );
}
