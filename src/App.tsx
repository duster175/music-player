import React, { useState, useMemo } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { TrackList } from './components/TrackList';
import { PlayerControls } from './components/Player/PlayerControls';
import { ProgressBar } from './components/Player/ProgressBar';
import { VolumeControl } from './components/Player/VolumeControl';
import { useAudioPlayer } from './hooks/useAudioPlayer';
import { tracks as allTracks } from './data/tracks';
import { Playlist } from './types';
import './style.css';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeGenre, setActiveGenre] = useState<string>('ВСЕ');
  const [likedTrackIds, setLikedTrackIds] = useState<(number | string)[]>([]);

  const [playlists, setPlaylists] = useState<Playlist[]>([
    { id: '1', name: 'LAYER 7: VIOLENCE', trackIds: [1, 2] },
  ]);

  const player = useAudioPlayer(allTracks);

  const handleNavigate = (view: string) => {
    setCurrentView(view);
    setSelectedPlaylistId(null);
  };

  const handleSelectPlaylist = (id: string) => {
    setSelectedPlaylistId(id);
    setCurrentView('playlist');
  };

  const handleCreatePlaylist = () => {
    const newId = Date.now().toString();
    const newPlaylist: Playlist = {
      id: newId,
      name: `Плейлист #${playlists.length + 1}`,
      trackIds: [],
    };
    setPlaylists((prev) => [...prev, newPlaylist]);
    setSelectedPlaylistId(newId);
    setCurrentView('playlist');
  };

  const handleRenamePlaylist = (id: string, newName: string) => {
    setPlaylists((prev) =>
      prev.map((pl) => (pl.id === id ? { ...pl, name: newName } : pl))
    );
  };

  const handleDeletePlaylist = (id: string) => {
    setPlaylists((prev) => prev.filter((pl) => pl.id !== id));
    if (selectedPlaylistId === id) {
      setCurrentView('home');
      setSelectedPlaylistId(null);
    }
  };

  const handleToggleLike = (trackId: number | string) => {
    setLikedTrackIds((prev) =>
      prev.includes(trackId)
        ? prev.filter((id) => id !== trackId)
        : [...prev, trackId]
    );
  };

  const currentPlaylist = useMemo(() => {
    return playlists.find((p) => p.id === selectedPlaylistId) || null;
  }, [playlists, selectedPlaylistId]);

  const filteredTracks = useMemo(() => {
    return allTracks.filter((track) => {
      if (currentView === 'liked') {
        if (!likedTrackIds.includes(track.id)) return false;
      } else if (currentView === 'playlist' && currentPlaylist) {
        if (!currentPlaylist.trackIds.includes(track.id)) return false;
      }

      const matchesSearch =
        searchQuery === '' ||
        track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        track.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
        track.album.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesGenre =
        activeGenre === 'ВСЕ' ||
        activeGenre === 'ALL' ||
        track.genre.toLowerCase() === activeGenre.toLowerCase();

      return matchesSearch && matchesGenre;
    });
  }, [searchQuery, activeGenre, currentView, currentPlaylist, likedTrackIds]);

  const displayTitle = useMemo(() => {
    if (currentView === 'liked') return 'ЛЮБИМЫЕ ТРЕКИ';
    if (currentView === 'playlist' && currentPlaylist) return currentPlaylist.name;
    return 'ГЛАВНЫЙ АРХИВ';
  }, [currentView, currentPlaylist]);

  return (
    <div className="app-container">
      <div className="app-body">
        <Sidebar
          currentView={currentView}
          onNavigate={handleNavigate}
          playlists={playlists}
          selectedPlaylistId={selectedPlaylistId}
          onSelectPlaylist={handleSelectPlaylist}
          onCreatePlaylist={handleCreatePlaylist}
        />

        <main className="main-content">
          <Header
            onSearch={setSearchQuery}
            activeGenre={activeGenre}
            onGenreFilter={setActiveGenre}
          />

          <TrackList
            tracks={filteredTracks}
            currentTrackIndex={player.currentTrackIndex}
            isPlaying={player.isPlaying}
            onPlayTrack={player.playTrack}
            playlistName={displayTitle}
            likedTrackIds={likedTrackIds}
            onToggleLike={handleToggleLike}
            isEditablePlaylist={currentView === 'playlist' && !!currentPlaylist}
            onRenamePlaylist={(newName) =>
              selectedPlaylistId && handleRenamePlaylist(selectedPlaylistId, newName)
            }
            onDeletePlaylist={() =>
              selectedPlaylistId && handleDeletePlaylist(selectedPlaylistId)
            }
          />
        </main>
      </div>

      <footer className="player-bar">
        <div className="player-current-track">
          {player.currentTrack ? (
            <>
              <img
                src={player.currentTrack.cover}
                alt={player.currentTrack.title}
                className="player-track-cover"
              />
              <div className="player-track-meta">
                <span className="player-track-title">{player.currentTrack.title}</span>
                <span className="player-track-artist">{player.currentTrack.artist}</span>
              </div>
            </>
          ) : (
            <div className="player-track-meta">
              <span className="player-track-title">[ НЕТ АКТИВНОГО ТРЕКА ]</span>
              <span className="player-track-artist">ВЫБЕРИТЕ ЗАПИСЬ ИЗ АРХИВА</span>
            </div>
          )}
        </div>

        <div className="player-center">
          <PlayerControls
            isPlaying={player.isPlaying}
            onTogglePlay={player.togglePlay}
            onNext={player.nextTrack}
            onPrev={player.prevTrack}
            isShuffle={player.isShuffle}
            onToggleShuffle={player.toggleShuffle}
            isRepeat={player.isRepeat}
            onToggleRepeat={player.toggleRepeat}
          />
          <ProgressBar
            currentTime={player.currentTime}
            duration={player.duration}
            onSeek={player.seek}
            formatTime={player.formatTime}
          />
        </div>

        <VolumeControl
          volume={player.volume}
          isMuted={player.isMuted}
          onChangeVolume={player.changeVolume}
          onToggleMute={player.toggleMute}
        />
      </footer>
    </div>
  );
};

export default App;