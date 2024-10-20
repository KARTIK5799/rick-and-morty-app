import './App.css';
import CharacterGrid from './components/CharacterGrid';
import EpisodeList from './components/EpisodeList';
import Header from './components/Header';
import { useState } from 'react';

const App: React.FC = () => {
  const [selectedEpisode, setSelectedEpisode] = useState<number | null>(null);

  const handleEpisodeSelect = (episodeId: number | null) => {
    setSelectedEpisode(episodeId);
  };

  const handleHeaderClick = () => {
    setSelectedEpisode(null);
  };

  return (
    <div className="grid grid-rows-[auto_1fr] h-screen w-screen p-5 gap-5">
      <Header onClick={handleHeaderClick} />
      <div className="grid grid-cols-10 gap-5 h-full">
        <div className="col-span-10 md:col-span-2 max-h-[85vh] overflow-y-auto">
          <EpisodeList
            selectedEpisode={selectedEpisode}
            onEpisodeSelect={handleEpisodeSelect}
          />
        </div>
        <div className="col-span-10 md:col-span-8 max-h-[85vh] overflow-y-auto">
          <CharacterGrid selectedEpisode={selectedEpisode} />
        </div>
      </div>
    </div>
  );
};

export default App;
