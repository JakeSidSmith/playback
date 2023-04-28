// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { render, createElement } from './reactish';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const main = document.getElementsByTagName('main')[0]!;

interface RequirementError {
  error: string;
}

interface Requirements {
  mediaDevices: MediaDevices;
  audioContext: AudioContext;
  gainNode: GainNode;
}

const getRequirements = (): Requirements | RequirementError => {
  const { mediaDevices } = window.navigator;

  if (!mediaDevices) {
    return { error: 'Media devices are unavailable' };
  }

  const { AudioContext } = window;

  if (!AudioContext) {
    return { error: 'Audio context is unavailable' };
  }

  const audioContext = new AudioContext();

  const gainNode = audioContext.createGain();
  gainNode.gain.value = 1;

  gainNode.connect(audioContext.destination);

  return {
    mediaDevices,
    audioContext,
    gainNode,
  };
};

const requirements = getRequirements();

const accessMic = async ({
  mediaDevices,
  audioContext,
  gainNode,
}: Requirements) => {
  const stream = await mediaDevices.getUserMedia({
    audio: {
      noiseSuppression: false,
    },
  });

  const gainSource = audioContext.createMediaStreamSource(stream);

  gainSource.connect(gainNode);
};

let error: Error | null = null;

// eslint-disable-next-line @typescript-eslint/no-use-before-define
const rerender = () => render(main, <App />);

const App = () => {
  if ('error' in requirements) {
    return <p>{requirements.error}</p>;
  }

  return (
    <div className="content">
      <p>Press the button, allow access, and adjust the gain to your needs.</p>
      <button
        onClick={() => {
          accessMic(requirements)
            .then(() => {
              error = null;
              rerender();
            })
            .catch((err) => {
              error = err;
              rerender();
            });
        }}
      >
        Allow microphone access
      </button>
      <input
        type="range"
        min={0}
        max={2}
        step={0.01}
        value={requirements.gainNode.gain.value}
        onChange={(event) => {
          const { value } = event.currentTarget;
          requirements.gainNode.gain.value = parseFloat(value);
        }}
      />
      {error && <p>{error.message}</p>}
    </div>
  );
};

rerender();
