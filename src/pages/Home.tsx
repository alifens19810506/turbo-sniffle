import React, { useEffect } from 'react';
import { useSlideStore } from '../store/useSlideStore';
import { IntroSlide } from '../components/IntroSlide';
import { ChapterSlide } from '../components/ChapterSlide';
import { ConclusionSlide } from '../components/ConclusionSlide';
import { NavigationControls } from '../components/NavigationControls';

export default function Home() {
  const { currentSlideIndex, slides, nextSlide, prevSlide } = useSlideStore();
  const currentSlide = slides[currentSlideIndex];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const renderSlide = () => {
    switch (currentSlide.type) {
      case 'intro':
        return <IntroSlide slide={currentSlide} />;
      case 'chapter':
        return <ChapterSlide slide={currentSlide} />;
      case 'conclusion':
        return <ConclusionSlide slide={currentSlide} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTAgMGw2MCA2ME02MCAwbC02MCA2MCIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utb3BhY2l0eT0iMC4wMiIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-50"></div>
      
      <main className="relative h-screen pb-32">
        {renderSlide()}
      </main>

      <NavigationControls />
    </div>
  );
}