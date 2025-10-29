import axios from 'axios';
import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { useNavigate } from 'react-router';

const CreateCars = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [carFormData, setCarFormData] = useState({
        name: '',
        make: '',
        model: '',
        year: '',
        price: '',
        color: '',
        mileage: '',
        dealership: ''
    });
    const [dealerships, setDealerships] = useState([]);
    
    useEffect(() => {
        const fetchDealerships = async () => {
            const res = await axios.get('http://localhost:8000/api/dealerships/');
            setDealerships(res.data);
        };
        fetchDealerships();
    }, []);
    
    const handleChange = (e) => {
        setCarFormData({
            ...carFormData,
            [e.target.name]: e.target.value
        });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const carData = {
                ...carFormData,
                owner: user.id
            };
            const res = await axios.post('http://localhost:8000/api/cars/', carData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(res.data);
            navigate('/');
        } catch (error) {
            console.error('Error creating car:', error);
        }
    };
    

    if (!user) {
        return <p>Please log in to create a car</p>;
    }
    
    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Welcome to the Create Cars Page</h1>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <label htmlFor="name">Name</label>
                <input type="text" name="name" placeholder="Name" value={carFormData.name} onChange={handleChange} style={{ padding: '8px', border: '1px solid #ccc' }} />
                <label htmlFor="make">Make</label>
                <input type="text" name="make" placeholder="Make" value={carFormData.make} onChange={handleChange} style={{ padding: '8px', border: '1px solid #ccc' }} />
                <label htmlFor="model">Model</label>
                <input type="text" name="model" placeholder="Model" value={carFormData.model} onChange={handleChange} style={{ padding: '8px', border: '1px solid #ccc' }} />
                <label htmlFor="year">Year</label>
                <input type="number" name="year" placeholder="Year" value={carFormData.year} onChange={handleChange} style={{ padding: '8px', border: '1px solid #ccc' }} />
                <label htmlFor="price">Price</label>
                <input type="number" name="price" placeholder="Price" value={carFormData.price} onChange={handleChange} style={{ padding: '8px', border: '1px solid #ccc' }} />
                <label htmlFor="color">Color</label>
                <input type="text" name="color" placeholder="Color" value={carFormData.color} onChange={handleChange} style={{ padding: '8px', border: '1px solid #ccc' }} />
                <label htmlFor="mileage">Mileage</label>
                <input type="number" name="mileage" placeholder="Mileage" value={carFormData.mileage} onChange={handleChange} style={{ padding: '8px', border: '1px solid #ccc' }} />
                <label htmlFor="dealership">Dealership</label>
                <select name="dealership" value={carFormData.dealership} onChange={handleChange} required style={{ padding: '8px', border: '1px solid #ccc' }}>
                    <option value="">Select a dealership</option>
                    {dealerships.map((dealership) => (
                        <option key={dealership.id} value={dealership.id}>{dealership.name}</option>
                    ))}
                </select>
                {user && (
                    <button type="submit" style={{ padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer', marginTop: '10px' }}>Create Car</button>
                )}
            </form>
        </div>
    );
};

export default CreateCars;