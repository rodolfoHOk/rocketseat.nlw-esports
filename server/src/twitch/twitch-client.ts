import axios from 'axios';

export const twitchClient = axios.create({
  baseURL: 'https://api.twitch.tv/helix',
  headers: {
    'Client-Id': process.env.TWITCH_CLIENT_ID as string,
  },
});
