'use client';

import { useState } from 'react';
import { handleResumeUpload } from './config/handleResumeUpload';
import { handleGenerate } from './config/handleGenerate';
import { handleDownload } from './config/handleDownload';
import { handleWordLimitChange } from './config/handleWordLimitChange';

import { ResumeUpload } from './components/ResumeUpload';
import { JobDescription } from './components/JobDescription';
import { CoverLetterOutput } from './components/CoverLetterOutput';
import { ErrorMessage } from './components/ErrorMessage';
import { GenerateButton } from './components/GenerateButton';
import { StyleControls } from './components/StyleControls';
import { WordCount } from './components/WordCount';

// Simple Ad Block component
function AdBlock({ position }) {
  return (
    <div className="w-64 space-y-4">
      <div className="bg-blue-100 rounded-lg p-4 shadow-sm">
        <h3 className="font-bold text-lg mb-2">Advertisement {position}</h3>
        <div className="bg-white p-4 rounded">
          <p className="text-gray-600">Sample Ad Content</p>
          <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
            Click Here
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [resume, setResume] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState('');
  const [styleValue, setStyleValue] = useState(50);
  const [wordLimit, setWordLimit] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col lg:flex-row justify-center gap-4">
          {/* Left Ad Block */}
          <div className="hidden md:block sticky top-4">
            <AdBlock position="Left" />
          </div>

          {/* Main Content */}
          <div className="w-full max-w-3xl bg-white rounded-xl shadow-md p-6">
            <h1 className="text-3xl font-bold text-center mb-8 text-black">
              Cover Letter Generator
            </h1>

            <div className="space-y-6">
              <ResumeUpload
                resume={resume}
                setResume={setResume}
                fileName={fileName}
                setFileName={setFileName}
                onFileUpload={(event) => 
                  handleResumeUpload(event, setFileName, setError, setResume)
                }
              />

              <JobDescription
                jobDescription={jobDescription}
                setJobDescription={setJobDescription}
              />

              <StyleControls 
                styleValue={styleValue}
                onStyleChange={setStyleValue}
                wordLimit={wordLimit}
                onWordLimitChange={(value) => 
                  handleWordLimitChange(value, setWordLimit, setError)
                }
              />

              <ErrorMessage error={error} />

              <GenerateButton
                onClick={() => 
                  handleGenerate(
                    resume,
                    jobDescription,
                    styleValue,
                    wordLimit,
                    setError,
                    setIsLoading,
                    setCoverLetter
                  )
                }
                isLoading={isLoading}
              />

              <CoverLetterOutput
                coverLetter={coverLetter}
                setCoverLetter={setCoverLetter}
                onDownload={() => handleDownload(coverLetter)}
              />
              
              {coverLetter && <WordCount text={coverLetter} />}
            </div>
          </div>

          {/* Right Ad Block */}
          <div className="hidden md:block sticky top-4">
            <AdBlock position="Right" />
          </div>
        </div>
      </div>
    </div>
  );
}