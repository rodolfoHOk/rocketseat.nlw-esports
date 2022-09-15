import axios from 'axios';

export const twitchClient = axios.create({
  baseURL: 'https://api.twitch.tv/helix',
});
