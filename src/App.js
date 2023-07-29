// App.js
import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import FileUploader from './components/FileUploader';
import Beautifier from './components/Beautifier';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(false);

  const handleFileUploaded = (file) => {
    setSelectedFile(file);
    setError(false);
  };

  const handleOnError = () => {
    setSelectedFile(null);
    setError(true);
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center">&#128537; epic XLF beautifier</h1>
      <p className="text-center text-secondary">johnrey x chatGPT</p>
      <FileUploader onFileUploaded={handleFileUploaded} onError={handleOnError} />
      {selectedFile && !error && <Beautifier file={selectedFile} />}
    </Container>
  );
};

export default App;
