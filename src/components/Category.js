// src/components/Category.js
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Category = ({ data }) => {
  const navigate = useNavigate();

  const handleShare = (item) => {
    navigate('/community-chat', { state: { item } });
  };

  return (
    <div className="d-flex flex-wrap justify-content-around mt-4">
      {data.map((item) => (
        <Card key={item.id} style={{ width: '12rem', marginBottom: '20px' }}>
          <Card.Img variant="top" src={item.image} style={{ height: '150px' }} />
          <Card.Body>
            <Card.Title style={{ fontSize: '1rem' }}>{item.title}</Card.Title>
            <Card.Text style={{ fontSize: '0.9rem' }}>{item.price}</Card.Text>
            <Button 
              variant="link" 
              style={{ 
                backgroundColor: 'orange', 
                color: 'black', 
                borderRadius: '5px', 
                padding: '5px 10px',
                textDecoration: 'none'
              }} 
              onClick={() => handleShare(item)}
            >
              Share to Community
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default Category;
