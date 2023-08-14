import React, { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import FileUploader from './components/FileUploader';
import Beautifier from './components/Beautifier';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import FileUploader2 from './components/FileUploader2';
import Beautifier2 from './components/Beautifier2';
import FileUploader3 from './components/FileUploader3';
import Beautifier3 from './components/Beautifier3';

const App = () => {

  // Beautifier 1
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

  // Beautifier 2
  const [selectedFile2, setSelectedFile2] = useState(null);
  const [error2, setError2] = useState(false);

  const handleFileUploaded2 = (file2) => {
    setSelectedFile2(file2);
    setError2(false);
  };

  const handleOnError2 = () => {
    setSelectedFile2(null);
    setError2(true);
  };

  // Beautifier 3
  const [selectedFile3, setSelectedFile3] = useState(null);
  const [error3, setError3] = useState(false);

  const handleFileUploaded3 = (file3) => {
    setSelectedFile3(file3);
    setError3(false);
  };

  const handleOnError3 = () => {
    setSelectedFile3(null);
    setError3(true);
  };

  // Beautify one or more XLF
  const [multiple, setMultiple] = useState(false)

  const beautifyMultiple = () => {
    setMultiple(true)
  }

  const beautifySingle = () => {
    setMultiple(false)
  }

  return (
    <Container fluid="true">

      <nav className="navbar navbar-expand-lg bg-secondary sticky-top d-flex align-items-center justify-content-center">
        <h3 className="text-white me-3"><span className="mx-3">&#128537;</span>epic XLF beautifier</h3>
        <small className='text-white fst-italic me-5'>by johnrey x ChatGPT</small>
        <button className='btn btn-outline-info me-3' onClick={beautifySingle}>single XLF file</button>
        <button className='btn btn-outline-warning' onClick={beautifyMultiple}>multiple XLF files</button>
      </nav>

      {multiple &&       
      <Container fluid="true" className="d-flex justify-content-around align-items-start px-3">
        <Row className='w-50 mt-3 px-2'>
          <FileUploader onFileUploaded={handleFileUploaded} onError={handleOnError} />
          {selectedFile && !error && <Beautifier clas file={selectedFile} />}
        </Row>
        <Row className='w-50 mt-3 px-2'>
          <FileUploader2 onFileUploaded2={handleFileUploaded2} onError2={handleOnError2} />
          {selectedFile2 && !error2 && <Beautifier2 file2={selectedFile2} />}
        </Row>
      </Container>}

      {!multiple && 
        <Container>
          <FileUploader3 onFileUploaded3={handleFileUploaded3} onError3={handleOnError3} />
          {selectedFile3 && !error3 && <Beautifier3 file3={selectedFile3} />}
        </Container>
      }

    </Container>
  );
};  

export default App;

/* 

<h1>&#128537; epic XLF beautifier</h1>
<p>
  <span>Verily, the grace of code abides in its readability.</span> <br />
  <small>johnrey x ChatGPT</small>
</p> 

{multipleBtn &&
<Container>
  <button onClick={beautifyMultiple}>compare XLF side-by-side</button>
</Container>
}

{!multipleBtn && 
<Container>
  <button onClick={beautifySingle}>beautify XLF file</button>
</Container>
}

*/