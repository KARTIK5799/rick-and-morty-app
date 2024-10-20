import React from 'react';

interface CharacterCardProps {
  name: string;
  image: string;
  showName: boolean; 
}

const CharacterCard: React.FC<CharacterCardProps> = ({ name, image, showName }) => {
  return (
    <div className="max-w-xs mx-auto bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer">
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-300 transform hover:scale-110"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-opacity duration-300 opacity-0 hover:opacity-100">
          <h3 className="text-lg font-bold text-white text-center">{name}</h3>
        </div>
      </div>
    
        {showName && (
            <div className="p-4">
          <h3 className="text-lg font-semibold text-white text-center truncate">{name}</h3>
          </div>
        )}
      
    </div>
  );
};

export default CharacterCard;
