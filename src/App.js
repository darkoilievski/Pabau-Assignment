import React, { useState } from 'react';
import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './components/Home/Home';
import Details from './components/Details/Details';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'https://api.spacex.land/graphql/'
});

const App = () => {
  const [state, setState] = useState('');
  let navigate = useNavigate();
  const handleClick = (e) => {
    navigate('/details');
    setState(e.target.id);
  };
  const returnHomepageHandler = () => {
    navigate('/');
  };
  return (
    <ApolloProvider client={client}>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="grid-layout">
                <Home click={handleClick} />
              </div>
              <Footer />
            </>
          }
        />
        <Route path="/details" element={<Details state={state} click={returnHomepageHandler} />} />
      </Routes>
    </ApolloProvider>
  );
};
export default App;
