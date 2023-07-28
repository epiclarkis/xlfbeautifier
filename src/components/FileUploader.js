// FileUploader.js
import React, { useState } from 'react';
import { Button, Alert } from 'react-bootstrap';

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
    <div>
      <input type="file" onChange={handleFileChange} />
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
    </div>
  );
};

export default FileUploader;
