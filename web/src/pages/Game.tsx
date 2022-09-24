import { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { useKeenSlider } from 'keen-slider/react';
import * as Dialog from '@radix-ui/react-dialog';
import { House } from 'phosphor-react';

import { AdInfos } from '../components/AdInfos';
import { Arrow } from '../components/Arrow';
import { ConnectModal } from '../components/ConnectModal';
import { Ad, getAdDiscord, getGameAds } from '../services/api';

import logoImg from '../assets/logo-nlw-esports.svg';
import 'keen-slider/keen-slider.min.css';
import { LoginArea } from '../components/LoginArea';

export function Game() {
  const { id } = useParams();
  const [queryParams] = useSearchParams();

  const [ads, setAds] = useState<Ad[]>([]);
  const [selectedDiscord, setSelectedDiscord] = useState('');
  const [loading, setLoading] = useState(false);
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
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  function handleConnect(adId: string) {
    setLoading(true);
    getAdDiscord(adId)
      .then((response) => setSelectedDiscord(response.discord))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    if (id) {
      getGameAds(id).then(setAds);
    }
  }, []);

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center mt-10 mb-4 relative">
      <div className="absolute top-2 sm:top-0 right-6">
        <LoginArea />
      </div>

      <img src={logoImg} alt="" className="w-[185px] sm:w-[285px]" />

      <Link
        to="/"
        className="absolute top-0 sm:top-1 left-6 flex flex-col sm:flex-row items-center gap-1 sm:gap-2 bg-black/5 hover:bg-black/30 px-2 py-2 border-[1px] border-violet-500 rounded-lg text-zinc-400 hover:text-white transition-colors duration-200"
      >
        <House size={20} />
        <span className="text-sm sm:text-base">Voltar</span>
      </Link>

      <div className="w-full my-4 px-6">
        <div className="flex flex-col items-center gap-3 pt-4 pb-8 px-4 bg-ad-gradient">
          <div className="w-40 h-40 rounded-full overflow-hidden">
            <img src={queryParams.get('banner') as string} alt="" />
          </div>

          <strong className="font-bold text-2xl text-white block">
            {queryParams.get('title') as string}
          </strong>
        </div>
      </div>

      {ads.length > 0 ? (
        <div className="max-w-[1344px] w-full mx-auto flex relative">
          <Dialog.Root>
            <div ref={sliderRef} className="keen-slider mx-6">
              {ads.map((ad) => (
                <div className="keen-slider__slide" key={ad.id}>
                  <AdInfos
                    ad={ad}
                    onConnect={() => handleConnect(ad.id as string)}
                  />
                </div>
              ))}
            </div>
            <ConnectModal loading={loading} discord={selectedDiscord} />
          </Dialog.Root>
          {loaded && instanceRef.current && (
            <>
              <Arrow
                left
                onClick={(e: any) =>
                  e.stopPropagation() || instanceRef.current?.prev()
                }
                disabled={currentSlide === 0}
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
      ) : (
        <div className="max-w-[1344px] mx-auto flex flex-col items-center mt-10 mb-4">
          <span className="font-bold text-white text-xl">
            Sem anúncios ainda
          </span>
        </div>
      )}
    </div>
  );
}
