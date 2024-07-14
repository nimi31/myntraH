// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Category from './components/Category';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import categories from './components/categories';
import logo from './logo.png';
import SkinToneRecommendations from './components/SkinToneRecommendations';
import CommunityChat from './components/CommunityChat';

function App() {
  const [data, setData] = useState(categories);
  const [selectedCategory, setSelectedCategory] = useState('Select Your Next Destination Fashion');

  const filterResult = (catItem) => {
    const result = categories.filter((CurData) => CurData.category === catItem);
    setData(result);
    setSelectedCategory(catItem);
  };

  const resetFilter = () => {
    setData(categories);
    setSelectedCategory('Select Your Next Destination Fashion');
  };

  return (
    <Router>
      <Navbar expand="lg" style={{ backgroundColor: 'white' }} className="bg-white shadow-sm">
        <Navbar.Brand href="/" className="custom-navbar-brand">
          <img
            src={logo}
            width="40"
            height="30"
            className="d-inline-block align-top mr-4 ml-4"
            alt="Fashion Store Logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown
              className="custom-dropdown"
              title={selectedCategory}
              id="basic-nav-dropdown"
              style={{ backgroundColor: 'pink', borderRadius: '5px' }}
            >
              <NavDropdown.Item onClick={() => filterResult('Vrindavan')}>Vrindavan</NavDropdown.Item>
              <NavDropdown.Item onClick={() => filterResult('Goa')}>Goa</NavDropdown.Item>
              <NavDropdown.Item onClick={() => filterResult('dharamshala')}>dharamshala</NavDropdown.Item>
              <NavDropdown.Item onClick={resetFilter}>All</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/skin-tone-recommendations">
              Skin Tone Recommendations
            </Nav.Link>
            <Nav.Link as={Link} to="/community-chat">
              Community Chat
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Routes>
        <Route exact path="/" element={<Category data={data} />} />
        <Route path="/skin-tone-recommendations" element={<SkinToneRecommendations />} />
        <Route path="/community-chat" element={<CommunityChat />} />
      </Routes>
    </Router>
  );
}

export default App;
