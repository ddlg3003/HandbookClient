import React from 'react';
import { Container } from '@material-ui/core';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PostDetails from './components/PostDetails/PostDetails';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import { GoogleOAuthProvider } from '@react-oauth/google';

const App = () => {
    const user = JSON.parse(localStorage.getItem('profile'));

    return (
        <GoogleOAuthProvider clientId="762136212964-3s1ihp28731i0lkrfoh07k2rahelpumu.apps.googleusercontent.com">
            <Container maxWidth="xl"> 
                <BrowserRouter>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Navigate to="/posts" />} />
                        <Route path="/posts" element={<Home />} />
                        <Route path="/posts/search" element={<Home />} />
                        <Route path="/posts/:id" element={<PostDetails />} />
                        <Route path="/auth" element={ !user ? <Auth /> : <Navigate replace to="/" /> } />  
                    </Routes>
                </BrowserRouter>
            </Container>
        </GoogleOAuthProvider>
    )
}

export default App;