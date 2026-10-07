import React from 'react';
import { Track } from '../types';

interface TrackRowProps {
  track: Track;
  index: number;
  isActive: boolean;
  isPlaying: boolean;
  isLiked: boolean;
  onPlay: () => void;
  onToggleLike: () => void;
}

export const TrackRow: React.FC<TrackRowProps> = ({
  track,
  index,
  isActive,
  isPlaying,
  isLiked,
  onPlay,
  onToggleLike,
}) => {
  return (
    <div className={`track-row ${isActive ? 'active' : ''}`} onClick={onPlay}>
      <span className="track-number">{isActive && isPlaying ? '▶' : index + 1}</span>
      <div className="track-title-cell">
        <span className="track-name">{track.title}</span>
        <span className="track-artist-mobile">{track.artist}</span>
      </div>
      <span className="track-album">{track.album}</span>
      <span className="track-genre">{track.genre}</span>
      <button
        className="like-btn"
        onClick={(e) => {
          e.stopPropagation();
          onToggleLike();
        }}
      >
        {isLiked ? '♥' : '♡'}
      </button>
      <span className="track-duration">{track.duration}</span>
    </div>
  );
};

export default TrackRow;