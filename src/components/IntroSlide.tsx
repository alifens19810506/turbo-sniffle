import React from 'react';
import { Slide } from '../types/slide';

interface IntroSlideProps {
  slide: Slide;
}

export const IntroSlide: React.FC<IntroSlideProps> = ({ slide }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <div className="animate-fadeIn">
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6">
          {slide.title}
        </h1>
        {slide.content.subtitle && (
          <p className="text-2xl md:text-3xl text-blue-200 mb-8">
            {slide.content.subtitle}
          </p>
        )}
        {slide.content.headings && slide.content.headings.length > 0 && (
          <div className="max-w-4xl mx-auto">
            {slide.content.headings.map((heading, idx) => (
              <p key={idx} className="text-xl md:text-2xl text-white/90 mb-4 leading-relaxed">
                {heading}
              </p>
            ))}
          </div>
        )}
        <div className="mt-12">
          <div className="inline-block px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
            点击下方导航开始浏览
          </div>
        </div>
      </div>
    </div>
  );
};
