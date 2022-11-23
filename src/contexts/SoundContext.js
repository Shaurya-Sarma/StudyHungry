import { createContext } from "react";
import { Audio } from "expo-av";

const SoundContext = createContext();

const SoundProvider = ({ children }) => {
  async function playTimerEndSound() {
    // load sound
    const sound = new Audio.Sound();
    await sound
      .loadAsync(require(`../../assets/sounds/timer_end.mp3`))
      .then(() => {
        sound.playAsync();
      });
  }

  async function playTimerBuzzSound() {
    // load sound
    const sound = new Audio.Sound();
    await sound
      .loadAsync(require(`../../assets/sounds/timer_buzz.mp3`))
      .then(() => {
        sound.playAsync();
      });
  }

  async function playErrorSound() {
    // load sound
    const sound = new Audio.Sound();
    await sound.loadAsync(require(`../../assets/sounds/error.mp3`)).then(() => {
      sound.playAsync();
    });
  }

  return (
    <SoundContext.Provider
      value={{
        playTimerBuzzSound,
        playTimerEndSound,
        playErrorSound,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
};

export { SoundContext, SoundProvider };
