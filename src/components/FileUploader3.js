import React, { useState } from 'react';
import { Alert, Container } from 'react-bootstrap';

const FileUploader3 = ({ onFileUploaded3, onError3 }) => {
  const [errorMessage3, setErrorMessage3] = useState('');

  const handleFileChange3 = (event) => {
    const file3 = event.target.files[0];
    if (file3 && file3.name.endsWith('.xlf')) {
      setErrorMessage3('');
      onFileUploaded3(file3);
    } else {
      setErrorMessage3('Please upload a valid .xlf file.');
      onError3();
    }
  };

  return (
    <Container className='my-3'>
      <input type="file" className="form-control" onChange={handleFileChange3} />
      <small className='fst-italic text-secondary'>The process is done on the browser only. Your file is never stored or transmitted to a remote server.</small>
      {errorMessage3 && <Alert className='mt-3' variant="danger">{errorMessage3}</Alert>}
    </Container>
  );
};

export default FileUploader3;