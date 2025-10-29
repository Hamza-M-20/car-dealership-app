import React, { useState, useEffect } from 'react';
import carService from '../../services/carService';
import { Link } from 'react-router';

const CarsList = () => {
    const [cars, setCars] = useState([]);
    useEffect(() => {
       async function fetchCars() {
        try {
            const carsData = await carService.getCars();
            setCars(carsData);
        } catch (error) {
            console.error('Error fetching cars:', error);
        }
       }
       fetchCars();   
    }, []);
    return (
        <main style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            minHeight: 'calc(100vh - 60px)', 
            padding: '32px 16px' 
        }}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                <h1 className="text-8xl font-black mb-4 text-white" style={{ fontWeight: 900, fontSize: '72px' }}>Welcome to the Cars Dealership App</h1>
                <p className="text-4xl font-bold text-white" style={{ fontWeight: 700, fontSize: '32px' }}>Browse Through Our Collection of Cars</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
                {cars.map((car, index) => (
                    <div key={car.id} className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow border">
                        <Link to={`/cars/${car.id}`} className="text-blue-600 hover:text-blue-800">
                            <h2 className="text-xl font-bold mb-2">{index + 1}. {car.name}</h2>
                            {car.dealership && <p>{car.dealership.name}</p>}
                        </Link>
                    </div>
                ))}
            </div>
        </main>
    );
};
export default CarsList;   