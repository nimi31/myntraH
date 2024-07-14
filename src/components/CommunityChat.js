// src/components/CommunityChat.js
import React, { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaReply, FaShare, FaSave, FaArrowLeft } from 'react-icons/fa';

const CommunityChat = () => {
  const [posts, setPosts] = useState([]);
  const [description, setDescription] = useState("");
  const [showForm, setShowForm] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const item = location.state?.item;

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handlePost = () => {
    const newPost = {
      id: posts.length + 1,
      image: item.image,
      description: description,
      comments: [],
    };
    setPosts([...posts, newPost]);
    setDescription("");
    setShowForm(false); // Hide the form after posting
  };

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div>
      {showForm && (
        <Card className="mt-4 mx-auto" style={{ width: '500px' }}>
          <Card.Body>
            <Card.Title></Card.Title>
            <Form>
              {item && <Card.Img variant="top" src={item.image} />}
              <Form.Group>
                <Form.Label>Add Your Idea</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={description}
                  onChange={handleDescriptionChange}
                  placeholder="Add your idea..."
                />
              </Form.Group>
              <div className="d-flex justify-content-between mt-3">
                <Button variant="primary" onClick={handlePost}>
                  Post
                </Button>
                <Button variant="secondary" onClick={handleBack}>
                  <FaArrowLeft /> Back
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      )}

      <div className="mt-4">
        {posts.map((post) => (
          <Card key={post.id} className="mt-4 mx-auto" style={{ width: '500px' }}>
            <Card.Body>
              {post.image && <Card.Img variant="top" src={post.image} />}
              <Card.Text>{post.description}</Card.Text>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button variant="secondary">
                  <FaReply /> Reply
                </Button>
                <Button variant="secondary">
                  <FaShare /> Share
                </Button>
                <Button variant="secondary">
                  <FaSave /> Save
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CommunityChat;
