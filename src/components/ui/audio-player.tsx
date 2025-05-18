
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
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Check if this audio has played in this session
  useEffect(() => {
    const hasPlayed = sessionStorage.getItem('jinglePlayed') === 'true';
    setHasPlayedOnce(hasPlayed);
    
    if (autoPlay && !hasPlayed) {
      const playPromise = audioRef.current?.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            sessionStorage.setItem('jinglePlayed', 'true');
          })
          .catch(error => {
            console.error("Audio playback prevented:", error);
            // User interaction might be needed before playing
          });
      }
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [audioUrl, autoPlay]);
  
  const togglePlayPause = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          if (!hasPlayedOnce) {
            setHasPlayedOnce(true);
            sessionStorage.setItem('jinglePlayed', 'true');
          }
        })
        .catch(error => {
          console.error("Audio playback prevented:", error);
        });
    }
  };
  
  const toggleMute = () => {
    if (!audioRef.current) return;
    
    const newMutedState = !isMuted;
    audioRef.current.muted = newMutedState;
    setIsMuted(newMutedState);
  };
  
  return (
    <>
      <audio 
        ref={audioRef}
        src={audioUrl}
        loop={false}
        onEnded={() => setIsPlaying(false)}
      />
      
      <button
        onClick={toggleMute}
        className={`fixed bottom-6 right-20 p-4 rounded-full shadow-lg transition-all duration-300 z-50 flex items-center justify-center ${
          isMuted ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-green-500 text-white hover:bg-green-600'
        }`}
        title={isMuted ? 'Unmute audio' : 'Mute audio'}
      >
        {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
      </button>
    </>
  );
};

export default AudioPlayer;
