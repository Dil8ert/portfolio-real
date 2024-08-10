import { Grid, Title } from '@mantine/core';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import dil8ert from '../Images/dil8ert.mp4';
import classes from './MobileNavbar.module.css';

export default function HomePage() {
  const navigate = useNavigate();
  const sendToServices = () => {
    navigate('/services');
    localStorage.setItem('page', '/services');
  };

  const sendToProjects = () => {
    navigate('/projects');
    localStorage.setItem('page', '/projects');
  };

  return (
    <Grid style={{ height: '100%' }}>
      <Grid.Col span={{ base: 12, md: 7, lg: 7 }}>
        <video
          autoPlay
          muted
          width="100%"
          height="100%"
          playsInline
          style={{
            objectFit: 'cover',

            margin: 0,
            padding: 0,
          }}
        >
          <source src={dil8ert} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Grid.Col>
      <Grid.Col
        span={{ base: 12, md: 5, lg: 5 }}
        style={{ backgroundColor: 'white', paddingTop: '7%', color: 'black' }}
        mt={{ base: '4rem', md: 0, lg: 0 }}
      >
        <Title order={1} size="h1" fz={{ base: '2rem', sm: '3rem', lg: '5rem' }}>
          Dil8ert's Development Services
        </Title>
        <div style={{ paddingBlock: '2rem 2rem' }}>
          Make your own service now! A store, a trading website, a gambling website, get what you
          want! Fully Customized ! Cheap rates!
        </div>
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
            onClick={sendToServices}
          >
            Create a ticket!
          </motion.button>
        </div>
      </Grid.Col>
    </Grid>
  );
}
