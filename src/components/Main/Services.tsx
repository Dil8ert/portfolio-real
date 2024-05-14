import React from 'react';
import { BadgeCard } from './BadgeCard';
import { Grid, Paper, Text, Title } from '@mantine/core';
import botDev from '../Images/botDev.png';
import webDev from '../Images/webDev.png';
import graphicDesign from '../Images/graphics.jpg';

export default function Services() {
  const mockdata = [
    {
      image: webDev,
      title: 'Web Development',
      description:
        'Our web development service specializes in creating responsive, user-friendly websites tailored to your business needs. We do MERN stack, typescript based reusable code structures. Create your service now! ',
      url: 'https://discord.gg/ckVweGmhaY',
    },
    {
      image: botDev,
      title: 'Bot Development',
      description:
        'Create python, javascript based bots or any that you like! Telegram , discord ,streaming, whatever your request, we provide a tailored solution. Create a ticket now!',
      url: 'https://discord.gg/byMgpqzVjq',
    },
    {
      image: graphicDesign,
      title: 'Graphics Design',
      description:
        'Create beautiful designs with out talented designers. Mention your requirements and get the most aesthetic designs to your taste!  We do Figma , Adobe XD , signatures, video edits and much more. Create a ticket now!!',
      url: 'https://discord.gg/rPBRKrdvcP',
    },
  ];

  return (
    <>
      <Grid>
        {mockdata.map((item, index) => (
          <Grid.Col span={{ base: 12, md: 4, lg: 4 }}>
            <BadgeCard
              key={index}
              image={item.image}
              title={item.title}
              description={item.description}
              url={item.url}
            />
          </Grid.Col>
        ))}
      </Grid>
    </>
  );
}
