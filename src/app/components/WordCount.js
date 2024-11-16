// components/WordCount.js
export function WordCount({ text }) {
    const getWordCount = (text) => {
      if (!text) return 0;
      return text.trim().split(/\s+/).filter(word => word.length > 0).length;
    };
  
    return (
      <div className="text-sm text-gray-600 text-right">
        Word count: {getWordCount(text)}
      </div>
    );
  }