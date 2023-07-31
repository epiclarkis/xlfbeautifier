import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';

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
    <div className="mt-5 px-4 w-100 mx-auto">
      <input type="file" class="form-control " onChange={handleFileChange} />
      {errorMessage && <Alert className="mt-3" variant="danger">{errorMessage}</Alert>}
    </div>
  );
};

export default FileUploader;