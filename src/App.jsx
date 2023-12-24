import { useState } from 'react'
import { ethers } from 'ethers'
import { Link, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Page1 from './pages/chain-info.jsx'
import FakeBayc from './pages/fakeBayc.jsx';
import TokenPage from './pages/TokenPage.jsx';
import FakeNefturians from './pages/fakeNefturians.jsx';
import UserTokensPage from './pages/UserTokensPage.jsx';


import './App.css'

function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<>
            <div>
              <Link to="/chain-info">Chain Info</Link>
            </div>
            <div>
              <Link to="/fakeBayc">FakeBayc</Link>
            </div>
            <div>
              <Link to="/fakeNefturians">FakeNefturians</Link>
            </div>
          </>} />
          <Route exact path="/chain-info" element={<Page1 />} />
          <Route exact path="/fakeBayc" element={<FakeBayc />} />
          <Route path="/fakeBayc/:tokenId" element={<TokenPage />} />
          <Route exact path="/fakeNefturians" element={<FakeNefturians />} />
          <Route exact path="/fakeNefturians/:userAddress" element={<UserTokensPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
