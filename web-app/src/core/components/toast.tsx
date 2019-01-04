import React, { Children } from 'react';
import styled from 'react-emotion';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toast = styled('div')`
  .Toastify__toast--success {
    background: #cc0000;
    opacity: 0.95;
    text-align: center;
    font-size: 16px;
    border-radius: 6px;
  }
`;


export const Toaster = ({duration}: { duration: number }) => {
  return (
    <Toast>
       <ToastContainer autoClose={duration}/>
    </Toast>
  )
};
