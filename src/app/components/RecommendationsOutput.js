import { useRef, useEffect } from 'react';
import { Download, Copy, CheckCheck } from 'lucide-react';
import { useState } from 'react';
import ReactMarkdown from "react-markdown";

export function RecommendationsOutput({ recommendations, setRecommendations}) {
  const recommendationsRef = useRef(null);

  useEffect(() => {
    if (recommendations && recommendationsRef.current) {
      // Scroll to the cover letter section when it's generated
      recommendationsRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, [recommendations]);

  const handleInputChange = (event) => {
    setMarkdownText(event.target.value);
  };

  if (!recommendations) return null;

  return (
    <div className="" ref={recommendationsRef}>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-black">Recommendations</h2>
        {/* <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="p-2 text-blue-600 hover:text-blue-700 rounded-lg hover:bg-blue-50 transition-colors"
            title="Copy to clipboard"
          >
            {copied ? <CheckCheck size={20} /> : <Copy size={20} />}
          </button>
        </div> */}
      </div>
      <div className="relative">
        <textarea
          value={recommendations} onChange={handleInputChange} 
          className="hidden w-full h-96 p-3 border border-gray-300 rounded-lg bg-white text-black resize-vertical"
          placeholder="Your recommendations will appear here..."
        />
        <ReactMarkdown className="text-black">{recommendations}</ReactMarkdown>
      </div>
    </div>
  );
}