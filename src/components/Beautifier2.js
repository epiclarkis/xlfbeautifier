import React, { useState } from 'react';
import { Alert, Container } from 'react-bootstrap';
import xmlFormatter from 'xml-formatter';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const Beautifier2 = ({ file2 }) => {
  const [beautifiedContent2, setBeautifiedContent2] = useState('');
  const [error2, setError2] = useState(null);
  const [isButtonVisible2, setButtonVisibility2] = useState(true);
  const [isCopied2, setCopied2] = useState(false);

  const resetContent2 = () => {
    setBeautifiedContent2('');
    setError2(null);
    setButtonVisibility2(true);
    setCopied2(false);    
  };

  const beautifyXLF2 = () => {
    const reader = new FileReader();
    reader.onloadend = () => {
      try {
        const xmlContent = reader.result;
        const x = xmlContent
        const updatedXmlContent = x.replace('xml:space="preserve"', 'xml:space="default"')
        const formattedXML = xmlFormatter(updatedXmlContent, { 
          indentation: '  ',
          collapseContent: true,
        });
        setBeautifiedContent2(formattedXML);
        setError2(null);
        setButtonVisibility2(false);
      } catch (error) {
        setBeautifiedContent2('');
        setError2(`File Error: ${error.message}.`);
      }
    };
    reader.readAsText(file2);
  };

  const copyToClipboard2 = () => {
    navigator.clipboard.writeText(beautifiedContent2);
    setCopied2(true);
  };

  return (
    <Container className='p-0 mb-4'>
      
      <Container className='p-0'>
      {isButtonVisible2 && (
        <button className='btn btn-secondary w-25 mt-1' onClick={beautifyXLF2}>
          beautify XLF 2
        </button>
      )}
      </Container>

      {error2 && <Alert variant="danger">{error2}</Alert>}

      <Container className='p-0 mt-1 mb-2'>
        {beautifiedContent2 && (
            <button className='btn btn-secondary w-25 me-3' onClick={resetContent2}>
              choose another file
            </button>
        )}
        {beautifiedContent2 && (
            <button className='btn btn-secondary w-25' onClick={copyToClipboard2}>
              {isCopied2 ? 'copied' : 'copy to clipboard'}
            </button>
        )}
      </Container>

      {beautifiedContent2 && (
        <Container className='p-0' style={{ maxHeight: '750px', overflowY: 'auto' }}>
          <SyntaxHighlighter 
            language="xml" 
            showLineNumbers
            showInlineLineNumbers
            startingLineNumber={1}
            lineNumberContainerStyle={{ paddingRight: '20px' }}
            lineNumberStyle={(lineNumber) => ({ color: 'gray' })} 
            style={atomDark}>
            {beautifiedContent2}
          </SyntaxHighlighter>
        </Container>
      )}
      
    </Container>
  );
};

export default Beautifier2;