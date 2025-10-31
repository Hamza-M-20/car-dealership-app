import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { useParams } from 'react-router';
import carService from '../../services/carService';
import dealershipService from '../../services/dealershipService';
import { useNavigate } from 'react-router';
import benz from "../../assets/benz.jpg";
import civic from "../../assets/civic.webp";
import honda2023 from "../../assets/2023_honda.avif";
import gWagon from "../../assets/G-wagon.jpeg";
import rangeRover from "../../assets/range rover.jpeg";
import audi from "../../assets/audi.jpg";



const CarDetail = () => {
    const { user } = useContext(UserContext);
    const { id } = useParams();
    const navigate = useNavigate();
    const [car, setCar] = useState(null);
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
    const [isEditing, setIsEditing] = useState(false);
    const [dealerships, setDealerships] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
               
                const carData = await carService.getCar(id);
                setCar(carData);
                setCarFormData({
                    name: carData.name,
                    make: carData.make,
                    model: carData.model,
                    year: carData.year,
                    price: carData.price,
                    color: carData.color,
                    mileage: carData.mileage,
                    dealership: carData.dealership?.id || ''
                });

               
                const dealershipsData = await dealershipService.getDealerships();
                setDealerships(dealershipsData);
            } catch (error) {
                console.error('Could not fetch data:', error);
            }
        }
        fetchData();
    }, [id]);

    const handleChange = (e) => {
        setCarFormData({
            ...carFormData,
            [e.target.name]: e.target.value
        });
    };
    

    const handleEditCar = async (e) => {
        e.preventDefault();
        try {
            const updatedCar = await carService.updateCar(id, carFormData);
            setCar(updatedCar);
            setIsEditing(false);
            navigate(`/cars/${id}`);
        } catch (error) {
            console.error('Error updating car:', error);
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this car?')) {
            try {
                await carService.deleteCar(id);
                navigate('/cars');
            } catch (error) {
                console.error('Error deleting car:', error);
            }
        }
    };

    if (!car) {
        return <p>Loading...</p>;
    }

    if (isEditing) {
        return (
            <main className='max-w-4xl mx-auto p-6'>
                <h1 className='text-3xl font-bold mb-6'>Edit Car</h1>
                <form onSubmit={handleEditCar}>
                    <div className='bg-white rounded-lg shadow-md p-6 mb-4'>
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" value={carFormData.name} onChange={handleChange} required />
                    </div>
                    <div className='bg-white rounded-lg shadow-md p-6 mb-4'>
                        <label htmlFor="make">Make:</label>
                        <input type="text" id="make" name="make" value={carFormData.make} onChange={handleChange} required />
                    </div>
                    <div className='bg-white rounded-lg shadow-md p-6 mb-4'>
                        <label htmlFor="model">Model:</label>
                        <input type="text" id="model" name="model" value={carFormData.model} onChange={handleChange} required />
                    </div>
                    <div className='bg-white rounded-lg shadow-md p-6 mb-4'>
                        <label htmlFor="year">Year:</label>
                        <input type="number" id="year" name="year" value={carFormData.year} onChange={handleChange} required />
                    </div>
                    <div className='bg-white rounded-lg shadow-md p-6 mb-4'>
                        <label htmlFor="price">Price:</label>
                        <input type="number" id="price" name="price" value={carFormData.price} onChange={handleChange} required />
                    </div>
                    <div className='bg-white rounded-lg shadow-md p-6 mb-4'>
                        <label htmlFor="color">Color:</label>
                        <input type="text" id="color" name="color" value={carFormData.color} onChange={handleChange} required />
                    </div>
                    <div className='bg-white rounded-lg shadow-md p-6 mb-4'>
                        <label htmlFor="mileage">Mileage:</label>
                        <input type="number" id="mileage" name="mileage" value={carFormData.mileage} onChange={handleChange} required />
                    </div>
                    <div className='bg-white rounded-lg shadow-md p-6 mb-4'>
                        <label htmlFor="dealership">Dealership:</label>
                        <select id="dealership" name="dealership" value={carFormData.dealership} onChange={handleChange} required>
                            <option value="">Select a dealership</option>
                            {dealerships.map((dealership) => (
                                <option key={dealership.id} value={dealership.id}>
                                    {dealership.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button style={{ marginRight: '10px' }} type="submit" className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'>Save</button>
                    <button type="button" onClick={() => setIsEditing(false)} className='bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600'>Cancel</button>
                </form>
            </main>
        );
    }

    return (
        <main className='max-w-4xl mx-auto p-6'>
            <h1 className='text-3xl font-bold mb-6' style={{ fontWeight: 'bold', fontSize: '24px', marginBottom: '24px', color: '#374151' }}>Car Detail</h1>
            <div className='mb-3 '> 
            {(car.model?.toLowerCase().includes("g-wagon") || car.model?.toLowerCase().includes("g wagon") || car.model?.toLowerCase().includes("g-class") || car.model?.toLowerCase().includes("g class") || car.model?.toLowerCase().includes("g63") || car.make === "G-Wagon" || car.make === "G Wagon") ? (
                <img src={gWagon} alt="G-Wagon" style={{ width: '800px', height: '600px' }} />
            ) : (car.make === "Range Rover" || car.make === "Range_Rover") ? (
                <img src={rangeRover} alt="Range Rover" style={{ width: '800px', height: '600px' }} />
            ) : car.make === "Honda" ? (
                <img src={honda2023} alt="Honda" style={{ width: '800px', height: '600px' }} />
            ) : car.make === "Mercedes Benz" ? (
                <img src={benz} alt="Mercedes Benz" style={{ width: '800px', height: '600px' }} />
            ) : (car.make === "Civic" || car.make === "civic") ? (
                <img src={civic} alt="Civic" style={{ width: '800px', height: '600px' }} />
            ) : (car.make === "Audi" || car.make === "audi") ? (
                <img src={audi} alt="Audi" style={{ width: '800px', height: '600px' }} />
            ) : (
                <img src={car.image} alt={car.name} style={{ width: '800px', height: '600px' }} />
            )}
             </div>
            <p>Name: {car.name}</p>
            <p className='text-lg font-bold mb-2'>Make: {car.make}</p>
            <p>Model: {car.model}</p>
            <p>Year: {car.year}</p>
            <p>Price: ${car.price}</p>
            <p>Color: {car.color}</p>
            <p>Mileage: {car.mileage} miles</p>
            <p>Dealership: {car.dealership?.name || 'N/A'}</p>
            <p>Reviews: {car.reviews?.length || 0}</p>
            {car.reviews && car.reviews.length > 0 && (
                <div>
                    <h3>Review Comments:</h3>
                    {car.reviews.map((review, idx) => (
                        <p key={idx}>{review.text}</p>
                    ))}
                </div>
            )}
            
            {user && car.owner && user.id === car.owner.id && (
                <div>
                    <button style={{ marginRight: '10px',
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
                        
                     }} onClick={() => setIsEditing(true)} className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'>Edit </button>
                    <button onClick={handleDelete} className='bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600'
                    style={{ marginRight: '10px',
                backgroundColor: '#dc2626', 
                color: 'white', 
                padding: '8px 16px', 
                borderRadius: '4px',
                border: 'none', 
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '500',
                width: '100px',
                    }}
                    >Delete </button>
                </div>
            )}
        </main>
    );
};
export default CarDetail;