import axios from 'axios';

const baseURL = 'http://localhost:3333';

export const api = axios.create({
  baseURL,
});

export interface Ad {
  id?: string;
  gameId?: string;
  name: string;
  yearsPlaying: number;
  discord?: string;
  weekDays: number[];
  hourEnd: string;
  hourStart: string;
  useVoiceChannel: boolean;
}

export interface Discord {
  discord: string;
}

export interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  adsCount: number;
}

export async function getTopGames(): Promise<Game[]> {
  const { data } = await api.get<Game[]>('/games');
  return data;
}

export async function getGameAds(gameId: string): Promise<Ad[]> {
  const { data } = await api.get<Ad[]>(`/games/${gameId}/ads`);
  return data;
}

export async function getAdDiscord(adId: string): Promise<Discord> {
  const { data } = await api.get<Discord>(`/ads/${adId}/discord`);
  return data;
}

export async function createAd(gameId: string, ad: Ad): Promise<Ad> {
  const { data } = await api.post<Ad>(`/games/${gameId}/ads`, ad);
  return data;
}
