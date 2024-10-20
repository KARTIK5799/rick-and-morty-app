import React, { useEffect, useState } from 'react';
import CharacterCard from './CharacterCard';

interface Character {
  id: number;
  name: string;
  image: string;
}

interface CharacterGridProps {
  selectedEpisode: number | null;
}

const CharacterGrid: React.FC<CharacterGridProps> = ({ selectedEpisode }) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchCharacters = async (page: number) => {
    try {
      const url = selectedEpisode
        ? `https://rickandmortyapi.com/api/episode/${selectedEpisode}`
        : `https://rickandmortyapi.com/api/character?page=${page}`;

      if (selectedEpisode) {
        const episodeResponse = await fetch(url);
        const episodeData = await episodeResponse.json();

        const characterPromises = episodeData.characters.map((charUrl: string) =>
          fetch(charUrl).then(res => res.json())
        );
        const characterResults = await Promise.all(characterPromises);
        setCharacters(characterResults);
        setTotalPages(1);
        return;
      }

      const response = await fetch(url);
      const data = await response.json();
      setCharacters(data.results);
      setTotalPages(data.info.pages);
    } catch (error) {
      console.error('Error fetching characters:', error);
    }
  };

  useEffect(() => {
    fetchCharacters(currentPage);
  }, [selectedEpisode, currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="h-full relative bg-gray-900 text-white shadow-lg rounded-2xl p-4 overflow-y-auto backdrop-blur-md bg-opacity-60">
      <div className="flex w-full flex-wrap justify-center gap-4">
        {characters.map(character => (
          <div className="w-full md:w-1/4 lg:w-1/5 xl:w-1/6" key={character.id}>
            <CharacterCard
              name={character.name}
              image={character.image}
              showName={!!selectedEpisode}
            />
          </div>
        ))}
      </div>

      {!selectedEpisode && (
        <div className="sticky bottom-0 bg-gray-900 text-white rounded-lg p-4 shadow-lg backdrop-blur-sm bg-opacity-60">
          <div className="flex justify-center items-center space-x-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg ${
                currentPage === 1 ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              Prev
            </button>

            <span className="text-lg">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg ${
                currentPage === totalPages ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CharacterGrid;
