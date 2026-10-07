import React from 'react';

interface HeaderProps {
  onSearch: (query: string) => void;
  activeGenre: string;
  onGenreFilter: (genre: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onSearch,
  activeGenre,
  onGenreFilter,
}) => {
  const genres = ['ВСЕ', 'INDUSTRIAL', 'BREAKCORE', 'CYBERPUNK'];

  return (
    <header className="main-header">
      <div className="search-bar">
        <input
          type="text"
          placeholder="ПОИСК ТРЕКА, ИСПОЛНИТЕЛЯ ИЛИ АЛЬБОМА..."
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      <div className="genre-tags">
        {genres.map((genre) => (
          <button
            key={genre}
            className={`genre-tag ${activeGenre === genre ? 'active' : ''}`}
            onClick={() => onGenreFilter(genre)}
          >
            {genre}
          </button>
        ))}
      </div>
    </header>
  );
};

export default Header;