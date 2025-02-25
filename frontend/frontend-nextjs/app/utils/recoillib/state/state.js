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

export const toggleSearchState = atom({
  key: "toggleSearchState",
  default: false
})

export const searchTriggerState = atom({
  key: "searchTriggerState",
  default: false
})

export const filterViewState = atom({
  key: "filterViewState",
  default: "all"
})

export const tempFilterViewState = atom({
  key: "tempFilterViewState",
  default: "all"
})

export const filterQueryState = atom({
  key: "filterQueryState",
  default: {
    video_filter: true,
    clip_filter: {
        reference_data: true,
        category_data: true,
        event_data: true,
        place_data: true,
        narration_data: true,
        data_data: true,
        tag_data: true
    }
    
  }
})

export const tempFilterQueryState = atom({
  key: "tempFilterQueryState",
  default: {
    video_filter: true,
    clip_filter: {
        reference_data: true,
        category_data: true,
        event_data: true,
        place_data: true,
        narration_data: true,
        data_data: true,
        tag_data: true
    } 
  }
})