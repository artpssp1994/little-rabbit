import React, { useState, useEffect } from 'react';
import './resumeReview.css';
import * as pdfjs from 'pdfjs-dist/build/pdf.min.mjs'
await import('pdfjs-dist/build/pdf.worker.mjs')


function ResumeReview() {

  const [pdfText, setPdfText] = useState('');

  const readPdfText = async (file) => {
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const arrayBuffer = reader.result;
        const pdf = await pdfjs.getDocument(arrayBuffer).promise;
        let text = '';
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          console.log(page)
          const content = await page.getTextContent();
          content.items.forEach((item) => {
            text += item.str + ' ';
          });
        }
        setPdfText(text);
      };
      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.error('Error reading PDF:', error);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
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
              <input type="file" accept=".pdf" onChange={handleFileChange} />
              <div>{pdfText}</div>
            </div>
            <div className="footer">
              
            </div>
        </div>
      </div>
  );
}

export default ResumeReview;
