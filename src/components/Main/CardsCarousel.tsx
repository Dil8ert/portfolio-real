import { Carousel } from '@mantine/carousel';
import { useMediaQuery } from '@mantine/hooks';
import { Button, Paper, Title, useMantineTheme, Text } from '@mantine/core';
import classes from './CardsCarousel.module.css';
import graphicDesign from '../Images/graphics.jpg';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import purpleImg from '../Images/purple.jpg';
import Autoplay from 'embla-carousel-autoplay';
import botDev from '../Images/botDev.png';
import webDev from '../Images/webDev.png';

const data = [
  {
    image: graphicDesign,
    title: 'Graphic Design',
    category: 'nature',
  },
  {
    image: webDev,
    title: 'Web Development',
    category: 'beach',
  },
  {
    image: botDev,
    title: 'Bot Development',
    category: 'nature',
  },
  {
    image: graphicDesign,
    title: 'Graphic Design',
    category: 'nature',
  },
];

interface CardProps {
  image: string;
  title: string;
  category: string;
}

function Card({ image, title, category }: CardProps) {
  const navigate = useNavigate();
  const [backGroundImg, setBackGroundImg] = useState(1);

  const variants = {
    animate: { y: '2rem' },
  };

  const selectService = () => {
    localStorage.setItem('service', title);
    navigate('/contact');
    localStorage.setItem('page', '/contact');
  };

  return (
    <Paper
      onHoverStart={(e) => {
        setBackGroundImg(0.6);
      }}
      onHoverEnd={(e) => {
        setBackGroundImg(1);
      }}
      shadow="md"
      p="xl"
      radius="md"
      component={motion.div}
      animate={{
        opacity: backGroundImg, // This will work
      }}
      transition={{ delay: 0.2 }}
      style={{ backgroundImage: `url(${image})`, width: '100%', height: '100%' }}
      className={classes.card}
      whileHover="animate"
    >
      <Button
        variant="white"
        color="dark"
        onClick={selectService}
        component={motion.button}
        variants={variants}
        whileHover={{ scale: 2, top: '40%', left: '40%' }}
      >
        Create a ticket!
      </Button>
    </Paper>
  );
}

export function CardsCarousel() {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const autoplay = useRef(Autoplay({ delay: 4000 }));
  const slides = data.map((item) => (
    <Carousel.Slide key={item.title}>
      <Card {...item} />
    </Carousel.Slide>
  ));

  return (
    <Carousel
      slideSize={{ base: '100%', sm: '50%' }}
      slideGap={{ base: 'xl', sm: 2 }}
      align="start"
      slidesToScroll={mobile ? 1 : 2}
      plugins={[autoplay.current]}
      onMouseEnter={autoplay.current.stop}
      onMouseLeave={autoplay.current.reset}
    >
      {slides}
    </Carousel>
  );
}
