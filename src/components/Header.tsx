import React from 'react';

interface HeaderProps {
  onClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onClick }) => {
  return (
    <div
      className="h-14 shadow-lg rounded-2xl flex items-center justify-center text-lg md:text-2xl font-bold w-full 
        bg-gray-900 bg-opacity-60 backdrop-blur-lg text-white cursor-pointer transition duration-300 hover:bg-opacity-80"
      onClick={onClick}
    >
      <h1>Rick and Morty Character Viewer</h1>
    </div>
  );
};

export default Header;
