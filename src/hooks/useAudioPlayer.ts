import { useState, useRef, useEffect } from 'react';
import { Track } from '../types';

export const useAudioPlayer = (tracks: Track[]) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0.8);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isShuffle, setIsShuffle] = useState<boolean>(false);
  const [isRepeat, setIsRepeat] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
    };
  }, []);

  const currentTrack = tracks[currentTrackIndex] || null;

  const playTrack = (index: number) => {
    if (!tracks[index] || !audioRef.current) return;

    if (currentTrackIndex === index && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    setCurrentTrackIndex(index);
    audioRef.current.src = tracks[index].src;
    audioRef.current.play().then(() => {
      setIsPlaying(true);
    }).catch((err) => {
      console.error('Ошибка воспроизведения:', err);
      setIsPlaying(false);
    });
  };

  const togglePlay = () => {
    if (!audioRef.current || !currentTrack) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      if (!audioRef.current.src) {
        audioRef.current.src = currentTrack.src;
      }
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => console.error(err));
    }
  };

  const nextTrack = () => {
    const nextIndex = (currentTrackIndex + 1) % tracks.length;
    playTrack(nextIndex);
  };

  const prevTrack = () => {
    const prevIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    playTrack(prevIndex);
  };

  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const changeVolume = (val: number) => {
    setVolume(val);
    if (audioRef.current) audioRef.current.volume = val;
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return {
    currentTrack,
    currentTrackIndex,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    isShuffle,
    isRepeat,
    playTrack,
    togglePlay,
    nextTrack,
    prevTrack,
    seek,
    changeVolume,
    toggleMute,
    toggleShuffle: () => setIsShuffle(!isShuffle),
    toggleRepeat: () => setIsRepeat(!isRepeat),
    formatTime,
  };
};