import React from 'react';

interface PlayerControlsProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  onNext: () => void;
  onPrev: () => void;
  isShuffle: boolean;
  onToggleShuffle: () => void;
  isRepeat: boolean;
  onToggleRepeat: () => void;
}

export const PlayerControls: React.FC<PlayerControlsProps> = ({
  isPlaying,
  onTogglePlay,
  onNext,
  onPrev,
  isShuffle,
  onToggleShuffle,
  isRepeat,
  onToggleRepeat,
}) => {
  return (
    <div className="player-controls">
      <button
        className={`control-btn ${isShuffle ? 'active' : ''}`}
        onClick={onToggleShuffle}
        title="Случайный порядок"
      >
        🔀
      </button>

      <button className="control-btn" onClick={onPrev} title="Предыдущий трек">
        ⏮
      </button>

      <button className="control-btn play-btn" onClick={onTogglePlay}>
        {isPlaying ? '⏸' : '▶'}
      </button>

      <button className="control-btn" onClick={onNext} title="Следующий трек">
        ⏭
      </button>

      <button
        className={`control-btn ${isRepeat ? 'active' : ''}`}
        onClick={onToggleRepeat}
        title="Повтор"
      >
        🔁
      </button>
    </div>
  );
};

export default PlayerControls;