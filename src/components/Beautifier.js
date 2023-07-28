// Beautifier.js
import React, { useState } from 'react';
import { Button, Alert, Container, Card } from 'react-bootstrap';
import xmlFormatter from 'xml-formatter';

const Beautifier = ({ file }) => {
  const [beautifiedContent, setBeautifiedContent] = useState('');
  const [error, setError] = useState(null);

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
      } catch (err) {
        setBeautifiedContent('');
        setError('Error beautifying the .xlf file.');
      }
    };
    reader.readAsText(file);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(beautifiedContent);
  };

  return (
    <Container className="mt-3">
      <Button variant="primary" onClick={beautifyXLF}>
        Beautify XLF
      </Button>
      {error && <Alert variant="danger">{error}</Alert>}
      {beautifiedContent && (
        <Card className="mt-3">
          <Card.Body style={{ maxHeight: '500px', overflowY: 'auto' }}>
            <pre style={{ fontSize: '12px' }}>{beautifiedContent}</pre>
          </Card.Body>
          <Card.Footer>
            <Button variant="secondary" onClick={copyToClipboard}>
              Copy to Clipboard
            </Button>
          </Card.Footer>
        </Card>
      )}
    </Container>
  );
};

export default Beautifier;
