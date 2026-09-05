import { Grid } from '@mantine/core';
import alphaQuest from '../Images/alphaQuest.mp4';
import boostify from '../Images/boostify.mp4';
import coinFlipTele from '../Images/coinFlip.mp4';
import fortune from '../Images/fortune.mp4';
import lemon from '../Images/lemon.mp4';
import onlyFans from '../Images/onlyfans.mp4';
import telegramBot from '../Images/SeiGambling.mp4';
import treeNews from '../Images/treeNews.mp4';
import CardComponent from './CardComponent';
import { SequentialItem, useSequentialMedia } from '../Loading';

const projects = [
  {
    text: 'Trading Website',
    title: 'Lemon Terminal',
    img: lemon,
    url: 'https://lemon-demo-vlsi.vercel.app/',
  },
  {
    text: 'Discord Boosting Website',
    title: 'Boostify',
    img: boostify,
    url: 'https://boostify-app-bay.vercel.app/',
  },
  {
    text: 'Gaming Website',
    title: 'Fortune Bets',
    img: fortune,
  },
  {
    text: 'SEI Chain Gaming Bot',
    title: 'Telegram Bot',
    img: telegramBot,
  },
  {
    text: 'Crypto Feed Website',
    title: 'Tree News',
    img: treeNews,
  },
  {
    text: 'Solana Chain Gaming Bot',
    title: 'Telegram Bot',
    img: coinFlipTele,
  },
];

export default function Projects() {
  const { canLoad, markLoaded } = useSequentialMedia(projects.length, 1, 160);

  return (
    <Grid>
      {projects.map((item, index) => (
        <Grid.Col key={`${item.title}-${item.text}`} span={{ base: 12, md: 6, lg: 3 }}>
          <SequentialItem index={index}>
            <CardComponent
              text={item.text}
              title={item.title}
              img={item.img}
              url={item.url}
              active={canLoad(index)}
              onReady={() => markLoaded(index)}
            />
          </SequentialItem>
        </Grid.Col>
      ))}
    </Grid>
  );
}
