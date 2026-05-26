import React from 'react';
import { Slide } from '../types/slide';

interface ConclusionSlideProps {
  slide: Slide;
}

export const ConclusionSlide: React.FC<ConclusionSlideProps> = ({ slide }) => {
  return (
    <div className="h-full overflow-y-auto py-8">
      <div className="max-w-5xl mx-auto px-6 animate-fadeIn">
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {slide.title}
          </h2>
        </div>

        <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-8 shadow-2xl">
          {slide.content.headings && slide.content.headings.length > 0 && (
            <div className="mb-6">
              {slide.content.headings.map((heading, idx) => (
                <h3 key={idx} className="text-2xl font-bold text-blue-900 mb-6">
                  {heading}
                </h3>
              ))}
            </div>
          )}

          {slide.content.points && slide.content.points.length > 0 && (
            <div>
              <div className="space-y-6">
                {slide.content.points.map((point, idx) => (
                  <div key={idx} className="flex items-start bg-white rounded-xl p-5 shadow-md border border-blue-100">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold mr-4 flex-shrink-0">
                      {idx + 1}
                    </div>
                    <p className="text-gray-700 leading-relaxed text-lg">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-10 text-center">
            <div className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-2xl text-xl font-semibold shadow-lg">
              感谢聆听！
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
