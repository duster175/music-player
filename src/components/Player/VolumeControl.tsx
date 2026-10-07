import React from 'react';

interface VolumeControlProps {
  volume: number;
  isMuted: boolean;
  onChangeVolume: (val: number) => void;
  onToggleMute: () => void;
}

export const VolumeControl: React.FC<VolumeControlProps> = ({
  volume,
  isMuted,
  onChangeVolume,
  onToggleMute,
}) => {
  return (
    <div className="volume-control">
      <button className="mute-btn" onClick={onToggleMute}>
        {isMuted || volume === 0 ? '🔇' : '🔊'}
      </button>
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={isMuted ? 0 : volume}
        onChange={(e) => onChangeVolume(Number(e.target.value))}
        className="volume-slider"
      />
    </div>
  );
};

export default VolumeControl;