import React, { useState } from 'react';
import './modal.css';

export default function Modal({ open }) {

    const [openModal, setopenModal] = useState(open)

    function handleModal() {
        setopenModal(false)
        
    }

  return (
    <>
        {
            openModal && 
            <div className="modal-overlay">
            <div className="modal-content">
                <h2>Product added to cart</h2>
                <div className="modal-buttons">
                <button className="modal-button" onClick={setopenModal(false)}>Continue Shopping</button>
                <button className="modal-button" onClick={handleModal}>Checkout</button>
                </div>
            </div>
            </div>
        }
    </>
  );
}