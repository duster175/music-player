import React, { useState } from 'react';
import { Track } from '../types';
import { TrackRow } from './TrackRow';

interface TrackListProps {
  tracks: Track[];
  currentTrackIndex: number;
  isPlaying: boolean;
  onPlayTrack: (index: number) => void;
  playlistName?: string;
  likedTrackIds: (number | string)[];
  onToggleLike: (trackId: number | string) => void;
  isEditablePlaylist?: boolean;
  onRenamePlaylist?: (newName: string) => void;
  onDeletePlaylist?: () => void;
}

export const TrackList: React.FC<TrackListProps> = ({
  tracks,
  currentTrackIndex,
  isPlaying,
  onPlayTrack,
  playlistName = 'ГЛАВНЫЙ АРХИВ',
  likedTrackIds,
  onToggleLike,
  isEditablePlaylist = false,
  onRenamePlaylist,
  onDeletePlaylist,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [titleInput, setTitleInput] = useState(playlistName);
  const [imgError, setImgError] = useState(false);

  const currentHeroTrack = tracks[currentTrackIndex] || tracks[0];

  const handleSaveTitle = () => {
    setIsEditing(false);
    if (onRenamePlaylist && titleInput.trim()) {
      onRenamePlaylist(titleInput.trim());
    }
  };

  return (
    <div className="tracklist-container">
      <div className="tracklist-hero">
        {currentHeroTrack && currentHeroTrack.cover && !imgError ? (
          <img
            src={currentHeroTrack.cover}
            alt={currentHeroTrack.title}
            className="tracklist-hero-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #1e1e24, #2a2a36)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '36px',
              color: '#ff4655',
              fontWeight: 'bold',
              flexShrink: 0,
            }}
          >
            ♫
          </div>
        )}

        <div className="tracklist-hero-info">
          <span className="tracklist-hero-badge">Плейлист</span>

          {isEditing ? (
            <input
              type="text"
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
              onBlur={handleSaveTitle}
              onKeyDown={(e) => e.key === 'Enter' && handleSaveTitle()}
              autoFocus
              style={{
                fontSize: '28px',
                fontWeight: 'bold',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid #ff4655',
                color: '#fff',
                borderRadius: '4px',
                padding: '2px 8px',
                outline: 'none',
              }}
            />
          ) : (
            <h1
              className="tracklist-hero-title"
              onClick={() => isEditablePlaylist && setIsEditing(true)}
              style={{ cursor: isEditablePlaylist ? 'pointer' : 'default' }}
              title={isEditablePlaylist ? 'Нажмите, чтобы переименовать' : ''}
            >
              {playlistName}
            </h1>
          )}

          <span className="tracklist-hero-meta">
            {tracks.length} {tracks.length === 1 ? 'трек' : 'треков'}
            {currentHeroTrack ? ` · ${currentHeroTrack.genre}` : ''}
          </span>

          {isEditablePlaylist && onDeletePlaylist && (
            <button
              onClick={onDeletePlaylist}
              style={{
                marginTop: '8px',
                background: 'transparent',
                border: '1px solid #ff4655',
                color: '#ff4655',
                borderRadius: '4px',
                padding: '4px 12px',
                cursor: 'pointer',
                fontSize: '12px',
              }}
            >
              Удалить плейлист
            </button>
          )}
        </div>
      </div>

      <div className="tracklist-table">
        <div className="tracklist-header">
          <span>#</span>
          <span>НАЗВАНИЕ</span>
          <span>АЛЬБОМ</span>
          <span>ЖАНР</span>
          <span></span>
          <span style={{ textAlign: 'right' }}>ВРЕМЯ</span>
        </div>

        <div className="tracklist-body">
          {tracks.length > 0 ? (
            tracks.map((track, idx) => (
              <TrackRow
                key={track.id}
                track={track}
                index={idx}
                isActive={currentTrackIndex === idx}
                isPlaying={isPlaying}
                isLiked={likedTrackIds.includes(track.id)}
                onPlay={() => onPlayTrack(idx)}
                onToggleLike={() => onToggleLike(track.id)}
              />
            ))
          ) : (
            <div style={{ padding: '24px 0', textAlign: 'center', opacity: 0.6 }}>
              В этом плейлисте пока нет треков
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackList;