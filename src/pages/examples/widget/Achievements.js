import React, { useState } from 'react';
import { Modal, ProgressBar } from '@themesberg/react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMedal } from '@fortawesome/free-solid-svg-icons';

export default () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
  return (
    <Modal centered className='mx-0 box-shadow-dark' show={show} modal-dialog modal-tertiary text-white modal-dialog-centered onHide={handleClose}>
      <div className='dark-modal-view'>
      <Modal.Header className='dark-border'>
        <Modal.Title className='w-100 text-center'>
            <span className='f-16 fc-white'>You just unlocked a new badge</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='py-3 px-5 text-center'>
        <div className='d-flex justify-content-center f-80 fc-white'>
            <FontAwesomeIcon icon={faMedal} />
        </div>
        <div className='text-center fc-white'>
            <h2 class="h3 modal-title mb-4 text-center fc-white"> Level 1</h2>
            <p class="mb-3">Complete 10 trips and reach next level!</p>
            <ProgressBar variant="primary" value={25} />
        </div>
      </Modal.Body>
      </div>
    </Modal>
  );
};
