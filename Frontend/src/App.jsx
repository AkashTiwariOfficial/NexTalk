import { useState } from 'react';
import './App.css';
import SignUp from './Pages/authorize/SignIn';
import { Route, Routes } from 'react-router-dom';
import Login from './Pages/authorize/Login';
import Home from './Pages/home/Home';
import { useChat } from './hookes/context/useChat';
import LoadingBar from 'react-top-loading-bar';
import toast, { Toaster } from 'react-hot-toast';



function App() {

  const { progress, setProgress } = useChat
  const notify = () => toast('Here is your toast');

  return (
    <>
      <LoadingBar
        height={2}
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => { setProgress(0) }}
      />
      <div>
        <button onClick={notify} className='d-none'>This is a toast</button>
        <Toaster
          position="bottom-right"
          toastOptions={{
            success: { duration: 3000 },
            error: { duration: 3000 },
            loading: { duration: Infinity },
            style: {
              background: "#ffffff",
              color: "#0f172a",
            },
            dark: {
              style: {
                background: "rgba(31, 41, 55, 0.8)",
                color: "#f9fafb",
                backdropFilter: "blur(8px)",
              },
            },
          }}
        />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>

    </>
  )
}

export default App
