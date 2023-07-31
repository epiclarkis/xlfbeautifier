import React, { useState } from 'react';
import { Button, Alert, Container } from 'react-bootstrap';
import xmlFormatter from 'xml-formatter';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const Beautifier = ({ file }) => {
  const [beautifiedContent, setBeautifiedContent] = useState('');
  const [error, setError] = useState(null);
  const [isButtonVisible, setButtonVisibility] = useState(true);
  const [isCopied, setCopied] = useState(false);
  const resetContent = () => {
    window.location.reload();
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
          collapseContent: true,
        });
        setBeautifiedContent(formattedXML);
        setError(null);
        setButtonVisibility(false);
      } catch (err) {
        setBeautifiedContent('');
        setError('Error beautifying the .xlf file.');
      }
    };
    reader.readAsText(file);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(beautifiedContent);
    setCopied(true);
  };

  return (
    <Container className="mt-2">
      <Container className="d-flex justify-content-center">
      {isButtonVisible && (
        <Button className="w-100 btn" variant="outline-primary" onClick={beautifyXLF}>
          Beautify XLF
        </Button>
      )}
      </Container>
      {beautifiedContent && (
        <Container className="d-flex justify-content-center mb-2">
          <Button variant={isCopied ? "outline-secondary" : "outline-success"} className="w-100" onClick={copyToClipboard}>
            {isCopied ? 'Boom! Copied' : 'Copy to Clipboard'}
          </Button>
        </Container>
      )}
      {error && <Alert variant="danger">{error}</Alert>}
      {beautifiedContent && (
        <Container style={{ maxHeight: '500px', overflowY: 'auto' }}>
          <SyntaxHighlighter language="xml" style={atomDark}>
            {beautifiedContent}
          </SyntaxHighlighter>
        </Container>
      )}
      {beautifiedContent && (
        <Container className="d-flex justify-content-center mt-3">
          <Button variant="outline-danger" className="w-100" onClick={resetContent}>
            Choose Another File
          </Button>
        </Container>
      )}
    </Container>
  );
};

export default Beautifier;