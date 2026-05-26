import React from 'react';
import { Slide } from '../types/slide';
import { slideImages } from '../data/slideImages';

interface ChapterSlideProps {
  slide: Slide;
}

export const ChapterSlide: React.FC<ChapterSlideProps> = ({ slide }) => {
  const getImageForSlide = () => {
    switch (slide.id) {
      case 1:
        return slideImages.challenge;
      case 2:
        return slideImages.dataOnline;
      case 3:
        return slideImages.processIntelligence;
      case 4:
        return slideImages.dataDriven;
      case 5:
        return slideImages.futurePlanning;
      default:
        return null;
    }
  };

  const slideImage = getImageForSlide();

  return (
    <div className="h-full overflow-y-auto py-8">
      <div className="max-w-6xl mx-auto px-6 animate-fadeIn">
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            {slide.title}
          </h2>
          {slide.content.subtitle && (
            <p className="text-xl text-blue-200">
              {slide.content.subtitle}
            </p>
          )}
        </div>

        {slideImage && (
          <div className="mb-6">
            <img
              src={slideImage.url}
              alt={slideImage.alt}
              className="w-full max-w-3xl mx-auto rounded-xl shadow-xl"
            />
          </div>
        )}

        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
          {slide.content.headings && slide.content.headings.length > 0 && (
            <div className="mb-6">
              {slide.content.headings.map((heading, idx) => (
                <h3 key={idx} className="text-xl font-semibold text-blue-900 mb-3">
                  {heading}
                </h3>
              ))}
            </div>
          )}

          {slide.content.points && slide.content.points.length > 0 && (
            <div className="mb-6">
              <ul className="space-y-4">
                {slide.content.points.map((point, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-500 text-white text-sm font-semibold mr-3 mt-0.5 flex-shrink-0">
                      {idx + 1}
                    </span>
                    <p className="text-gray-700 leading-relaxed">{point}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {slide.content.examples && slide.content.examples.length > 0 && (
            <div>
              <div className="grid gap-4">
                {slide.content.examples.map((example, idx) => (
                  <div key={idx} className="border border-blue-100 rounded-xl p-6 bg-gradient-to-br from-blue-50 to-white hover:shadow-lg transition-shadow">
                    <h4 className="text-lg font-semibold text-blue-800 mb-3">
                      {example.title}
                    </h4>
                    <p className="text-gray-600 mb-3 leading-relaxed">
                      {example.description}
                    </p>
                    {example.metrics && (
                      <div className="inline-block bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                        {example.metrics}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
