import React from 'react';
import { Container } from '@material-ui/core';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import { GoogleOAuthProvider } from '@react-oauth/google';

const App = () => {
    return (
        <GoogleOAuthProvider clientId="762136212964-3s1ihp28731i0lkrfoh07k2rahelpumu.apps.googleusercontent.com">
            <Container maxwidth="lg"> 
                <BrowserRouter>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/auth" element={<Auth />} />
                    </Routes>
                </BrowserRouter>
            </Container>
        </GoogleOAuthProvider>
    )
}

export default App;