import React, { useState, useEffect } from 'react';
import './resumeReview.css';
import { geminiGenerate } from '../../utils/ai/gemini/gemini.js' 
import ReactMarkdown from 'react-markdown';
import * as pdfjs from 'pdfjs-dist/build/pdf.min.mjs'
await import('pdfjs-dist/build/pdf.worker.mjs')


function ResumeReview() {

  const [pdfText, setPdfText] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');

  const readPdfText = async (file) => {
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const arrayBuffer = reader.result;

        const pdf = await pdfjs.getDocument(arrayBuffer).promise;
        let text = '';
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          content.items.forEach((item) => {
            text += item.str + ' ';
          });
        }
        const reviewText = await geminiGenerate(text)
        setPdfText(reviewText);
      };
      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.error('Error reading PDF:', error);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPdfUrl(fileReader.result);
      };
      fileReader.readAsDataURL(file);
      readPdfText(file);
    }
  };

  return (
    <div className={'page'}>
      <div className={``}>
        <div className="header">
          <h3>Upload your resume</h3>
        </div>
        <div className="body">
          <input type="file" accept="application/pdf" onChange={handleFileChange} />
          <div className='reviewContainer'>
            <div className='markdownContainer'>
              <ReactMarkdown>{pdfText}</ReactMarkdown>
            </div>
          </div>
        </div>
        <div className="footer">
          {pdfUrl && (
            <embed
              src={pdfUrl}
              type="application/pdf"
              width="100%"
              height="600px"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ResumeReview;
