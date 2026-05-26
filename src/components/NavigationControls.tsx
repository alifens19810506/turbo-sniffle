import React from 'react';
import { useSlideStore } from '../store/useSlideStore';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const NavigationControls: React.FC = () => {
  const { currentSlideIndex, totalSlides, nextSlide, prevSlide, goToSlide, slides } = useSlideStore();
  const isFirstSlide = currentSlideIndex === 0;
  const isLastSlide = currentSlideIndex === totalSlides - 1;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent py-6 px-4 z-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={prevSlide}
            disabled={isFirstSlide}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              isFirstSlide
                ? 'bg-gray-600/50 text-gray-400 cursor-not-allowed'
                : 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm'
            }`}
          >
            <ChevronLeft size={20} />
            上一页
          </button>

          <div className="flex items-center gap-2 overflow-x-auto">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => goToSlide(index)}
                className={`min-w-[3rem] h-10 rounded-lg font-medium transition-all ${
                  index === currentSlideIndex
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'bg-white/20 text-white/70 hover:bg-white/30'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <button
            onClick={nextSlide}
            disabled={isLastSlide}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              isLastSlide
                ? 'bg-gray-600/50 text-gray-400 cursor-not-allowed'
                : 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm'
            }`}
          >
            下一页
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="mt-4 text-center">
          <span className="text-white/80 text-sm">
            第 {currentSlideIndex + 1} / {totalSlides} 页
          </span>
        </div>
      </div>
    </div>
  );
};
