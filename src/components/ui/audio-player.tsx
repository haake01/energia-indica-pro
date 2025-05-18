
import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

type AudioPlayerProps = {
  audioUrl: string;
  autoPlay?: boolean;
};

const AudioPlayer = ({ audioUrl, autoPlay = true }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Check if this audio has played in this session
  useEffect(() => {
    const hasPlayed = sessionStorage.getItem('jinglePlayed') === 'true';
    setHasPlayedOnce(hasPlayed);
    
    // Create audio element
    const audio = new Audio(audioUrl);
    audioRef.current = audio;
    
    // Set up event listeners
    audio.addEventListener('canplaythrough', () => {
      setAudioLoaded(true);
      
      if (autoPlay && !hasPlayed) {
        playAudio();
      }
    });
    
    audio.addEventListener('ended', () => {
      setIsPlaying(false);
    });
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('canplaythrough', () => {});
        audioRef.current.removeEventListener('ended', () => {});
      }
    };
  }, [audioUrl, autoPlay]);
  
  const playAudio = () => {
    if (!audioRef.current || !audioLoaded) return;
    
    const playPromise = audioRef.current.play();
    
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          sessionStorage.setItem('jinglePlayed', 'true');
          setHasPlayedOnce(true);
        })
        .catch(error => {
          console.error("Audio playback prevented:", error);
        });
    }
  };
  
  const togglePlayPause = () => {
    if (!audioRef.current || !audioLoaded) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      playAudio();
    }
  };
  
  const toggleMute = () => {
    if (!audioRef.current) return;
    
    const newMutedState = !isMuted;
    audioRef.current.muted = newMutedState;
    setIsMuted(newMutedState);
  };
  
  return (
    <button
      onClick={toggleMute}
      className={`fixed bottom-6 right-20 p-4 rounded-full shadow-lg transition-all duration-300 z-50 flex items-center justify-center ${
        isMuted ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-brand-orange text-white hover:bg-brand-orange/90'
      }`}
      title={isMuted ? 'Unmute audio' : 'Mute audio'}
    >
      {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
    </button>
  );
};

export default AudioPlayer;
