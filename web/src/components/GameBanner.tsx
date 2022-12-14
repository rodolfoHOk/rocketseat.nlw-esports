import { Link } from 'react-router-dom';

interface GameBannerProps {
  id: string;
  title: string;
  bannerUrl: string;
  adsCount: number;
}

export function GameBanner(props: GameBannerProps) {
  return (
    <Link
      to={`/games/${props.id}?title=${props.title}&banner=${props.bannerUrl}&count=${props.adsCount}`}
      className="relative flex rounded-lg overflow-hidden max-w-[230px] md:max-w-[285px]"
    >
      <img src={props.bannerUrl} alt="" />

      <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
        <strong className="font-bold text-white block">{props.title}</strong>

        <span className="text-zinc-300 text-sm block">
          {props.adsCount} anúncio(s)
        </span>
      </div>
    </Link>
  );
}
