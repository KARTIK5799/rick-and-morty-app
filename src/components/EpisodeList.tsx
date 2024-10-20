import React, { useEffect, useState } from 'react';

interface Episode {
  id: number;
  name: string;
}

interface EpisodeListProps {
  selectedEpisode: number | null;
  onEpisodeSelect: (episodeId: number | null) => void;
}

const EpisodeList: React.FC<EpisodeListProps> = ({ selectedEpisode, onEpisodeSelect }) => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [isEpiOpen, setIsEpiOpen] = useState(false);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const response = await fetch('https://rickandmortyapi.com/api/episode');
        const data = await response.json();
        setEpisodes(data.results);
      } catch (error) {
        console.error('Error fetching episodes:', error);
      }
    };
    fetchEpisodes();
  }, []);

  const handleEpisodeClick = () => {
    setIsEpiOpen(prev => !prev);
  };

  const handleSelectEpisode = (id: number) => {
    onEpisodeSelect(id);
    setIsEpiOpen(false);
  };

  return (
    <>
      <div
        className="absolute z-50 top-13 py-3 right-0 rounded-l-lg overflow-hidden bg-gray-900 border-t-2 border-b-2 border-l bg-opacity-60 backdrop-blur-lg text-white px-3 cursor-pointer md:hidden"
        onClick={handleEpisodeClick}
      >
        {!isEpiOpen ? "Episodes" : "X"}
      </div>
      <div
        className={`h-full shadow-lg ${isEpiOpen ? 'block' : 'hidden'} md:block rounded-2xl w-full md:overflow-hidden bg-gray-900 bg-opacity-60 backdrop-blur-lg text-white`}
      >
        <div className={`flex items-center justify-start p-4 h-[10%] text-2xl sticky top-0 z-10 backdrop-blur-md`}>
          <h2 className="font-semibold">Episodes</h2>
        </div>
        <div className="h-[90%] overflow-y-auto p-4">
          <ul className="space-y-4">
            {episodes.map(episode => (
              <li
                key={episode.id}
                onClick={() => handleSelectEpisode(episode.id)}
                className={`p-3 rounded-lg transition duration-300 cursor-pointer 
                  ${selectedEpisode === episode.id ? 'bg-blue-500 text-white' : 'bg-white/30 hover:bg-gray-200 hover:text-black'}`}
              >
                {episode.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default EpisodeList;
