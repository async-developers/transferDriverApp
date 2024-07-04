import React from 'react';
import { Spinner } from '@themesberg/react-bootstrap';

const LoaderComponent = () => {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  );
};

export default LoaderComponent;
