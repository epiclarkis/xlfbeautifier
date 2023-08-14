import React, { useState } from 'react';
import { Alert, Container } from 'react-bootstrap';

const FileUploader2 = ({ onFileUploaded2, onError2 }) => {
  const [errorMessage2, setErrorMessage2] = useState('');

  const handleFileChange2 = (event) => {
    const file2 = event.target.files[0];
    if (file2 && file2.name.endsWith('.xlf')) {
      setErrorMessage2('');
      onFileUploaded2(file2);
    } else {
      setErrorMessage2('Please upload a valid .xlf file.');
      onError2();
    }
  };

  return (
    <Container className='p-0'>
      <input type="file" className="form-control" onChange={handleFileChange2} />
      <small className='fst-italic text-secondary'>tip: upload translated XLF here</small>
      {errorMessage2 && <Alert className='mt-3' variant="danger">{errorMessage2}</Alert>}
  </Container>
  );
};

export default FileUploader2;