import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import carService from '../../services/carService';
import { useNavigate } from 'react-router';

const ReviewsList = () => {
    const { id } = useParams();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const reviews = await carService.getReviews(id);
                setReviews(reviews);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };
        fetchReviews();
    }, [id]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const reviewData = {
                text: e.target.text.value,
            };
            const review = await carService.addReview(id, reviewData);
            setReviews([...reviews, review]);
            navigate(`/cars/${id}`);
        } catch (error) {
            console.error('Error adding review:', error);
        }
    };
    return (
        <div>
            <h1 style={{ fontWeight: 'bold', fontSize: '24px', marginBottom: '24px', color: '#374151' }}>Reviews</h1> 
            <form onSubmit={handleSubmit}>
                <input type="text" name="text" required minLength={1} maxLength={200} placeholder="Write your review..." />
                <button type="submit" disabled={loading} style={{ 
                    flex: 1, 
                    backgroundColor: '#2563eb', 
                    color: 'white', 
                    padding: '8px 16px', 
                    borderRadius: '4px', 
                    border: 'none', 
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: '500',
                    width: '100px',
                }}>{loading ? 'Adding...' : 'Add Review'}</button>
            </form>

        </div>
    );
};

export default ReviewsList;