import { atom } from 'recoil';
export const loadingState = atom({
  key: 'loadingState', 
  default: {
    isLoading: false,
    hasAnimated: false,
  },
});

export const componentDataLoadingState = atom({
  key: "componentDataLoadingState",
  default: false
})