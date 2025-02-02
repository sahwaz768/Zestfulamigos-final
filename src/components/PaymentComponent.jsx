'use client';
import React, { useState } from 'react';
// import axios from 'axios';

const PaymentComponent = () => {
  const [amount, setAmount] = useState('100');
  const [email, setEmail] = useState('user@example.com');
  const [firstName, setFirstName] = useState('John');
  const [phone, setPhone] = useState('1234567890');
  const [productInfo, setProductInfo] = useState('Product');
  const [html, setHtml] = useState('');

  const handlePayment = async () => {
    const paymentData = {
      amount,
      email,
      firstname: firstName,
      productinfo: productInfo
    };

    try {
      const { initiateTransaction } = await import(
        '../services/transactions/makepayement.service'
      );
      const values = {
        ...paymentData,
        phone,
        surl: 'http://localhost:3000/transaction/success',
        furl: 'http://localhost:3000/transaction/failure'
      };
      const response = await initiateTransaction(values);
      const formContainer = document.createElement('div');
        formContainer.innerHTML = response;
        document.body.appendChild(formContainer);
        const form = document.forms['payment_post'];
        if (form) {
          form.submit();
        }
    } catch (error) {
      console.log('Payment Request Failed', error);
    }
  };

  return (
    <div>
      <h2>PayU Payment Integration</h2>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
      />
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="First Name"
      />
      <input
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Phone"
      />
      <input
        type="text"
        value={productInfo}
        onChange={(e) => setProductInfo(e.target.value)}
        placeholder="Product Info"
      />
      <button onClick={handlePayment}>Pay Now</button>
      {html && <div dangerouslySetInnerHTML={{ __html: html }} />}
    </div>
  );
};

export default PaymentComponent;
