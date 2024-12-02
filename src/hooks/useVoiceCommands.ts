import { useEffect, useRef } from 'react';

interface VoiceCommandsProps {
  onPlay: () => void;
  onPause: () => void;
  onRestart: () => void;
}

export function useVoiceCommands({ onPlay, onPause, onRestart }: VoiceCommandsProps) {
  const recognition = useRef<any>(null);

  const initializeRecognition = () => {
    // @ts-ignore - SpeechRecognition API types
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognition.current = new SpeechRecognition();
      recognition.current.continuous = true;
      recognition.current.interimResults = false;

      recognition.current.onresult = (event: any) => {
        const command = event.results[event.results.length - 1][0].transcript.toLowerCase();
        
        if (command.includes('play')) {
          onPlay();
        } else if (command.includes('pause') || command.includes('stop')) {
          onPause();
        } else if (command.includes('restart')) {
          onRestart();
        }
      };
    }
  };

  const startVoiceRecognition = () => {
    if (!recognition.current) {
      initializeRecognition();
    }
    try {
      recognition.current?.start();
    } catch (error) {
      console.error('Error starting voice recognition:', error);
    }
  };

  const stopVoiceRecognition = () => {
    try {
      recognition.current?.stop();
    } catch (error) {
      console.error('Error stopping voice recognition:', error);
    }
  };

  useEffect(() => {
    return () => {
      stopVoiceRecognition();
    };
  }, []);

  return { startVoiceRecognition, stopVoiceRecognition };
}