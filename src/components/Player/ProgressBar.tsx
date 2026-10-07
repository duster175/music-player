import React from 'react';

interface ProgressBarProps {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
  formatTime: (time: number) => string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentTime,
  duration,
  onSeek,
  formatTime,
}) => {
  return (
    <div className="progress-bar-container">
      <span className="time-text">{formatTime(currentTime)}</span>
      <input
        type="range"
        min={0}
        max={duration || 100}
        value={currentTime}
        onChange={(e) => onSeek(Number(e.target.value))}
        className="progress-slider"
      />
      <span className="time-text">{formatTime(duration)}</span>
    </div>
  );
};

export default ProgressBar;