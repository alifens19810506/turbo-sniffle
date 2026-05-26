import { create } from 'zustand';
import { Slide } from '../types/slide';
import { slides } from '../data/slides';

interface SlideStore {
  currentSlideIndex: number;
  slides: Slide[];
  totalSlides: number;
  nextSlide: () => void;
  prevSlide: () => void;
  goToSlide: (index: number) => void;
}

export const useSlideStore = create<SlideStore>((set) => ({
  currentSlideIndex: 0,
  slides: slides,
  totalSlides: slides.length,
  nextSlide: () => set((state) => ({
    currentSlideIndex: Math.min(state.currentSlideIndex + 1, state.totalSlides - 1)
  })),
  prevSlide: () => set((state) => ({
    currentSlideIndex: Math.max(state.currentSlideIndex - 1, 0)
  })),
  goToSlide: (index: number) => set(() => ({
    currentSlideIndex: Math.max(0, Math.min(index, slides.length - 1))
  }))
}));
