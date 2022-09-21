import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';

import logoImg from '../assets/logo-nlw-esports.svg';
import { GameBanner } from '../components/GameBanner';
import { AdInfos } from '../components/AdInfos';

interface Ad {
  id: string;
  name: string;
  yearsPlaying: number;
  weekDays: number[];
  hourEnd: string;
  hourStart: string;
  useVoiceChannel: boolean;
}

interface Discord {
  discord: string;
}

export function Game() {
  const { id } = useParams();
  const [queryParams] = useSearchParams();

  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedDiscord, setSelectedDiscord] = useState('');

  async function getGameAds(gameId: string): Promise<Ad[]> {
    const { data } = await axios.get<Ad[]>(
      `http://localhost:3333/games/${gameId}/ads`
    );
    return data;
  }

  async function getAdDiscord(adId: string): Promise<Discord> {
    const { data } = await axios.get<Discord>(
      `http://localhost:3333/ads/${adId}/discord`
    );
    return data;
  }

  function handleConnect(adId: string) {
    getAdDiscord(adId).then((response) => setSelectedDiscord(response.discord));
  }

  useEffect(() => {
    console.log(selectedDiscord);
  }, [selectedDiscord]);

  useEffect(() => {
    if (id) {
      setLoading(true);
      getGameAds(id)
        .then((response) => setAds(response))
        .finally(() => setLoading(false));
    }
  }, []);

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center mt-10">
      <img src={logoImg} alt="" width={200} />

      <div className="rounded-xl overflow-hidden mt-4">
        <GameBanner
          id={id as string}
          title={queryParams.get('title') as string}
          bannerUrl={queryParams.get('banner') as string}
          adsCount={Number(queryParams.get('count') as string)}
        />
      </div>

      {ads.length > 0 && (
        <div className="flex mt-8">
          {ads.map((ad) => (
            <AdInfos
              key={ad.id}
              ad={ad}
              onConnect={() => handleConnect(ad.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
