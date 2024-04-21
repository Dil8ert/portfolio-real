import { Grid, Title } from '@mantine/core';
import React from 'react';
import dil8ert from '../Images/dil8ert.mp4';
import { motion } from 'framer-motion';
import classes from './MobileNavbar.module.css';

export default function HomePage() {
  return (
    <Grid style={{ height: '100%' }}>
      <Grid.Col span={7}>
        <video autoPlay muted width="100%" height="100%">
          <source src={dil8ert} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Grid.Col>
      <Grid.Col span={5} style={{ backgroundColor: 'white', paddingTop: '7%', color: 'black' }}>
        <Title order={1} style={{ fontSize: '5rem' }}>
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
          >
            Create a ticket!
          </motion.button>
        </div>
      </Grid.Col>
    </Grid>
  );
}
