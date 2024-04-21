import { Grid } from '@mantine/core';
import React from 'react';
import CardComponent from './CardComponent';
import lemon from '../Images/lemon.mp4';
import fortune from '../Images/fortune.mp4';
import onlyFans from '../Images/onlyfans.mp4';
import boostify from '../Images/boostify.mp4';
import alphaQuest from '../Images/alphaQuest.mp4';
import telegramBot from '../Images/SeiGambling.mp4';
import treeNews from '../Images/treeNews.mp4';

export default function Projects() {
  return (
    <Grid>
      <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
        <CardComponent
          text="Trading Website"
          title="Lemon Terminal"
          img={lemon}
          url="https://lemonterminal.com/"
        />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
        <CardComponent text="Gambling Website" title="Fortune Bets" img={fortune} />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
        <CardComponent text="OnlyFans Portfolio" title="OnlyFans Store" img={onlyFans} />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
        <CardComponent
          text="Discord Boosting Website"
          title="Boostify"
          img={boostify}
          url="https://boostify.to/"
        />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
        <CardComponent
          text="Trading Analytics Website(In Progress)"
          title="Alpha Quest"
          img={alphaQuest}
        />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
        <CardComponent text="SEI Chain Gambling Bot" title="Telegram Bot" img={telegramBot} />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
        <CardComponent text="Crypto Feed Website" title="Tree News" img={treeNews} />
      </Grid.Col>
    </Grid>
  );
}
