import { GameBanner } from './components/GameBanner';
import { CreateAdBanner } from './components/CreateAdBanner';
import logoImg from './assets/logo-nlw-esports.svg';
import './styles/main.css';

function App() {
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

      <div className="grid grid-cols-6 gap-6 mt-16">
        <GameBanner
          id="1234"
          title="League of legends"
          bannerUrl="/game-1.png"
          adsCount={4}
        />

        <GameBanner
          id="1235"
          title="DOTA 2"
          bannerUrl="/game-2.png"
          adsCount={2}
        />
      </div>

      <CreateAdBanner />
    </div>
  );
}

export default App;
