import { useEffect, useState } from 'react';
import axios from 'axios';
import * as Dialog from '@radix-ui/react-dialog';
import { useKeenSlider } from 'keen-slider/react';

import { GameBanner } from './components/GameBanner';
import { CreateAdBanner } from './components/CreateAdBanner';
import { CreateAdModal } from './components/CreateAdModal';
import { Arrow } from './components/Arrow';

import logoImg from './assets/logo-nlw-esports.svg';

import 'keen-slider/keen-slider.min.css';
import './styles/main.css';

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  adsCount: number;
}

function App() {
  const [games, setGames] = useState<Game[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    breakpoints: {
      '(min-width: 288px)': {
        slides: { perView: 1, spacing: 0 },
      },
      '(min-width: 440px)': {
        slides: { perView: 2, spacing: 6 },
      },
      '(min-width: 667px)': {
        slides: { perView: 3, spacing: 12 },
      },
      '(min-width: 900px)': {
        slides: { perView: 4, spacing: 12 },
      },
      '(min-width: 1120px)': {
        slides: { perView: 5, spacing: 18 },
      },
      '(min-width: 1344px)': {
        slides: { perView: 6, spacing: 24 },
      },
    },
    slides: { perView: 1 },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel + 5);
    },
    created() {
      setLoaded(true);
    },
  });

  useEffect(() => {
    axios
      .get('http://localhost:3333/games')
      .then((response) => setGames(response.data));
  }, []);

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} alt="" />

      <h1 className="text-6xl text-white font-black mt-20">
        Seu{' '}
        <span className="text-transparent bg-nlw-gradient bg-clip-text">
          duo
        </span>{' '}
        está aqui.
      </h1>

      {games.length > 0 && (
        <div className="max-w-[1344px] mx-auto flex relative">
          <div ref={sliderRef} className="keen-slider mt-16">
            {games.map((game) => (
              <div className="keen-slider__slide" key={game.id}>
                <GameBanner
                  id={game.id}
                  title={game.title}
                  bannerUrl={game.bannerUrl}
                  adsCount={game.adsCount}
                />
              </div>
            ))}
          </div>

          {loaded && instanceRef.current && (
            <>
              <Arrow
                left
                onClick={(e: any) =>
                  e.stopPropagation() || instanceRef.current?.prev()
                }
                disabled={currentSlide <= 5}
              />

              <Arrow
                onClick={(e: any) =>
                  e.stopPropagation() || instanceRef.current?.next()
                }
                disabled={
                  instanceRef.current.track.details &&
                  currentSlide ===
                    instanceRef.current.track.details.slides.length - 1
                }
              />
            </>
          )}
        </div>
      )}

      <Dialog.Root>
        <CreateAdBanner />

        <CreateAdModal />
      </Dialog.Root>
    </div>
  );
}

export default App;
