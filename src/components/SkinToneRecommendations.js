import React, { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Card, Button } from 'react-bootstrap';
import { analyzeSkinTone, getRecommendations } from '../skinToneAnalysis';
import { useNavigate } from 'react-router-dom';

const SkinToneRecommendations = () => {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    setError(null);
    analyzeSkinTone(imageSrc).then((skinTone) => {
      if (skinTone === "unknown") {
        setError("Could not analyze skin tone. Please try again.");
        setRecommendations([]);
      } else {
        const recommendedItems = getRecommendations(skinTone);
        setRecommendations(recommendedItems);
      }
    });
  }, [webcamRef]);

  const reset = () => {
    setCapturedImage(null);
    setRecommendations([]);
    setError(null);
  };

  return (
    <Card className="mt-4 mx-auto" style={{ width: '500px' }}>
      <Card.Body>
        <Card.Title>Skin Tone Recommendations</Card.Title>
        {capturedImage ? (
          <div className="text-center">
            <img src={capturedImage} alt="Captured" width="320" height="240" />
          </div>
        ) : (
          <div className="text-center">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={320}
              height={240}
            />
          </div>
        )}
        <div className="d-flex justify-content-between mt-3">
          <Button variant="primary" onClick={capture}>Click Picture</Button>
          <Button variant="danger" onClick={reset}>Reset</Button>
          <Button variant="secondary" onClick={() => navigate(-1)}>Back</Button>
        </div>
        {error && <div className="mt-3 text-danger">{error}</div>}
        {recommendations.length > 0 && (
          <div className="mt-4">
            <h5>Recommendations</h5>
            <ul>
              {recommendations.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default SkinToneRecommendations;
