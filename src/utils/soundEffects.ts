// Web Audio API emergency buzzer simulation for science fair demonstration
let audioCtx: AudioContext | null = null;
let oscillator: OscillatorNode | null = null;
let gainNode: GainNode | null = null;
let lfo: OscillatorNode | null = null;

export function playEmergencySiren(frequency = 600) {
  try {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtx = new AudioContextClass();
    }

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    stopEmergencySiren();

    oscillator = audioCtx.createOscillator();
    gainNode = audioCtx.createGain();
    lfo = audioCtx.createOscillator();
    const lfoGain = audioCtx.createGain();

    oscillator.type = 'sawtooth';
    oscillator.frequency.value = frequency;

    // LFO to create emergency siren warble effect (2 Hz frequency modulation)
    lfo.frequency.value = 2.5;
    lfoGain.gain.value = 180;

    lfo.connect(oscillator.frequency);
    oscillator.connect(gainNode);

    gainNode.gain.setValueAtTime(0.08, audioCtx.currentTime); // Gentle volume
    gainNode.connect(audioCtx.destination);

    lfo.start();
    oscillator.start();
  } catch (err) {
    console.warn('Web Audio not available or user blocked audio', err);
  }
}

export function stopEmergencySiren() {
  try {
    if (oscillator) {
      oscillator.stop();
      oscillator.disconnect();
      oscillator = null;
    }
    if (lfo) {
      lfo.stop();
      lfo.disconnect();
      lfo = null;
    }
    if (gainNode) {
      gainNode.disconnect();
      gainNode = null;
    }
  } catch (err) {
    console.warn('Error stopping siren', err);
  }
}
