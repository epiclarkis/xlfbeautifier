import React, { useState } from 'react';
import { Alert, Container } from 'react-bootstrap';
import xmlFormatter from 'xml-formatter';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const Beautifier = ({ file }) => {
  const [beautifiedContent, setBeautifiedContent] = useState('');
  const [error, setError] = useState(null);
  const [isButtonVisible, setButtonVisibility] = useState(true);
  const [isCopied, setCopied] = useState(false);

  const resetContent = () => {
    setBeautifiedContent('');
    setError(null);
    setButtonVisibility(true);
    setCopied(false);
  };

  const beautifyXLF = () => {

    const reader = new FileReader();
    reader.onloadend = () => {
      try {
        const xmlContent = reader.result;
        const formattedXML = xmlFormatter(xmlContent, { 
          indentation: '  ',
          collapseContent: true
        });
        setBeautifiedContent(formattedXML);
        setError(null);
        setButtonVisibility(false);
      } catch (error) {
        setBeautifiedContent('');
        setError(`File Error: ${error.message}.`);
      }
    };
    reader.readAsText(file);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(beautifiedContent);
    setCopied(true);
  };

  return (
    <Container fluid="true" className='p-0 mb-4'>

      <Container className='p-0'>
        {isButtonVisible && (
          <button className='btn btn-secondary w-25 mt-1' onClick={beautifyXLF}>
            beautify XLF 1
          </button>
        )}
      </Container>

      {error && <Alert variant="danger">{error}</Alert>}

      <Container className='p-0 mt-1 mb-2'>
        {beautifiedContent && (
            <button className='btn btn-secondary w-25 me-3' onClick={resetContent}>
              choose another file
            </button>
        )}
        {beautifiedContent && (
            <button className='btn btn-secondary w-25' onClick={copyToClipboard}>
              {isCopied ? 'copied' : 'copy to clipboard'}
            </button>
        )}
      </Container>

      {beautifiedContent && (
        <Container className='p-0' style={{ maxHeight: '750px', overflowX: 'hidden', overflowY: 'auto' }}>
          <SyntaxHighlighter
            language="xml"
            showLineNumbers
            showInlineLineNumbers
            startingLineNumber={1}
            lineNumberContainerStyle={{ paddingRight: '20px' }}
            lineNumberStyle={(lineNumber) => ({ color: 'gray' })} 
            style={atomDark}>
            {beautifiedContent}
          </SyntaxHighlighter>
        </Container>
      )}
      
    </Container>
  );
};

export default Beautifier;