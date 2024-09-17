import React from 'react'
import { ToastContainer, Bounce } from "react-toastify";
const toast = () => {
  return (
    <ToastContainer
    position="top-center"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
    transition={Bounce}
    />
  )
}

export default toast