import React, { useState } from 'react';
import { Alert, Container } from 'react-bootstrap';
import xmlFormatter from 'xml-formatter';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const Beautifier3 = ({ file3 }) => {
  const [beautifiedContent3, setBeautifiedContent3] = useState('');
  const [error3, setError3] = useState(null);
  const [isButtonVisible3, setButtonVisibility3] = useState(true);
  const [isCopied3, setCopied3] = useState(false);

  const resetContent3 = () => {
    setBeautifiedContent3('');
    setError3(null);
    setButtonVisibility3(true);
    setCopied3(false);    
  };

  const beautifyXLF3 = () => {
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
        setBeautifiedContent3(formattedXML);
        setError3(null);
        setButtonVisibility3(false);
      } catch (error) {
        setBeautifiedContent3('');
        setError3(`File Error: ${error.message}.`);
      }
    };
    reader.readAsText(file3);
  };

  const copyToClipboard3 = () => {
    navigator.clipboard.writeText(beautifiedContent3);
    setCopied3(true);
  };

  return (
    <Container>
     
      <Container className='p-0'>
      {isButtonVisible3 && (
        <button className='btn btn-secondary w-25' onClick={beautifyXLF3}>
          beautify XLF
        </button>
      )}
      </Container>

      {error3 && <Alert variant="danger">{error3}</Alert>}

      <Container className='p-0 my-3'>
        {beautifiedContent3 && (
            <button className='btn btn-secondary w-25 me-3' onClick={resetContent3}>
              choose another file
            </button>
        )}
        {beautifiedContent3 && (
            <button className='btn btn-secondary w-25' onClick={copyToClipboard3}>
              {isCopied3 ? 'copied' : 'copy to clipboard'}
            </button>
        )}
      </Container>

      {beautifiedContent3 && (
        <Container className='p-0 mb-3' style={{ maxHeight: '800px', overflowY: 'auto' }}>
          <SyntaxHighlighter 
            language="xml" 
            showLineNumbers
            showInlineLineNumbers
            startingLineNumber={1}
            lineNumberContainerStyle={{ paddingRight: '20px' }}
            lineNumberStyle={(lineNumber) => ({ color: 'gray' })} 
            style={atomDark}>
            {beautifiedContent3}
          </SyntaxHighlighter>
        </Container>
      )}

    </Container>
  );
};

export default Beautifier3;