import { Dimensions } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const vw = (percentage: number) => (SCREEN_WIDTH * percentage) / 100;
export const vh = (percentage: number) => (SCREEN_HEIGHT * percentage) / 100;

export const screen = {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
};

// Baselines based on common phone sizes (iPhone X/11-ish)
const BASE_WIDTH = 375;
const BASE_HEIGHT = 812;

// Scale utilities similar to react-native-size-matters (kept inline to avoid extra deps)
export const scale = (size: number) => (SCREEN_WIDTH / BASE_WIDTH) * size;
export const verticalScale = (size: number) => (SCREEN_HEIGHT / BASE_HEIGHT) * size;
export const moderateScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;

