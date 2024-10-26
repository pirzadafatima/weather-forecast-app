export const cloudAnimation = {
    animate: {
      x: [0, 20, 0], // Moves 20px right and back to starting position
    },
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "reverse", // Moves back and forth
      ease: "easeInOut",
    },
  };
  
export const sunAnimation = {
    animate: {
      scale: [1, 1.1, 1], // Pulsates slightly
      filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"], // Adds a glowing effect
    },
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  export const thunderAnimation = {
    animate: {
      opacity: [1, 0, 1], // Flickers the opacity
    },
    transition: {
      duration: 0.3,
      repeat: Infinity,
      repeatType: "loop", // Continues flickering
      ease: "easeInOut",
    },
  };

  export const hazeAnimation = {
    animate: {
      scale: [1, 1.02, 1], // Slight zooming effect
      opacity: [0.7, 1, 0.7], // Fading effect
    },
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };
  