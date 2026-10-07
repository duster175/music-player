import React from 'react';
import { Playlist } from '../types';

interface SidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  playlists: Playlist[];
  selectedPlaylistId: string | null;
  onSelectPlaylist: (id: string) => void;
  onCreatePlaylist: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  playlists,
  selectedPlaylistId,
  onSelectPlaylist,
  onCreatePlaylist,
}) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span className="logo-text">DARWIN PLAYER</span>
      </div>

      <nav className="sidebar-nav">
        <button
          className={`nav-btn ${currentView === 'home' && !selectedPlaylistId ? 'active' : ''}`}
          onClick={() => onNavigate('home')}
        >
          <span>Главная</span>
        </button>

        <button
          className={`nav-btn ${currentView === 'liked' ? 'active' : ''}`}
          onClick={() => onNavigate('liked')}
        >
          <span>Любимые треки</span>
        </button>
      </nav>

      <div className="sidebar-playlists">
        <div className="playlists-header">
          <span>МОИ ПЛЕЙЛИСТЫ</span>
          <button className="create-playlist-btn" onClick={onCreatePlaylist} title="Создать плейлист">
            +
          </button>
        </div>

        <ul className="playlist-list">
          {playlists.map((playlist) => (
            <li key={playlist.id}>
              <button
                className={`playlist-item-btn ${
                  selectedPlaylistId === playlist.id ? 'active' : ''
                }`}
                onClick={() => onSelectPlaylist(playlist.id)}
              >
                {playlist.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;