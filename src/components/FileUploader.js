import React, { useState } from 'react';
import { Alert, Container } from 'react-bootstrap';

const FileUploader = ({ onFileUploaded, onError }) => {
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.name.endsWith('.xlf')) {
      setErrorMessage('');
      onFileUploaded(file);
    } else {
      setErrorMessage('Please upload a valid .xlf file.');
      onError();
    }
  };

  return (
    <Container className='p-0'>
      <input type="file" className="form-control" onChange={handleFileChange} />
      <small className='fst-italic text-secondary'>tip: upload original XLF here</small>
      {errorMessage && <Alert className='mt-3' variant="danger">{errorMessage}</Alert>}
  </Container>
  );
};

export default FileUploader;