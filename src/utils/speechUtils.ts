export function speak(message: string, options: SpeechSynthesisUtterance = new SpeechSynthesisUtterance()) {
  const utterance = new SpeechSynthesisUtterance(message);
  utterance.rate = options.rate || 1;
  utterance.pitch = options.pitch || 1;
  utterance.volume = options.volume || 1;
  
  window.speechSynthesis.speak(utterance);
}

export const VOICE_COMMANDS = {
  PLAY: ['play', 'start', 'begin', 'resume'],
  PAUSE: ['pause', 'stop', 'halt', 'break'],
  RESTART: ['restart', 'reset', 'start over'],
  NEXT: ['next', 'forward', 'skip'],
  PREVIOUS: ['previous', 'back', 'return']
};

export function matchCommand(transcript: string, commands: string[]): boolean {
  return commands.some(command => transcript.toLowerCase().includes(command));
}