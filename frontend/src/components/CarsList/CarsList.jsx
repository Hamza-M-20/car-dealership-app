import React, { useState, useEffect } from 'react';
import carService from '../../services/carService';
import { Link } from 'react-router';
import honda2023 from "../../assets/2023 honda.avif";
import frontQuarterTurned from "../../assets/front-quarter-turned.jpg";
import benz from "../../assets/benz.jpg";
import Q8 from "../../assets/Q8.jpg";
import range from "../../assets/range.jpg";
import gWagon from "../../assets/G-wagon.jpeg";



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
    const imageMap = (car) => {
        const mm = `${car.make ?? ''} ${car.model ?? ''}`.toLowerCase();
        if (mm.includes('g-wagon') || mm.includes('g class') || mm.includes('g-class') || mm.includes('g63')) return gWagon;
        if (mm.includes('range rover') || mm.includes('range_rover')) return range;
        if (mm.includes('mercedes')) return benz;
        if (mm.includes('q8')) return Q8;
        // Corrected mapping: HR‑V → honda2023, Civic → frontQuarterTurned
        if (mm.includes('hr-v') || mm.includes('hrv') || mm.includes('hr v')) return honda2023; // Honda HR‑V
        if (mm.includes('civic')) return frontQuarterTurned; // Honda Civic
        if (mm.includes('honda')) return honda2023; // generic Honda fallback
        return frontQuarterTurned; // fallback
    };

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
            <div className="grid grid-cols-2 gap-10 mx-auto place-items-center max-w-6xl">
                {cars.map((car) => (
                    <Link key={car.id} to={`/cars/${car.id}`} className="bg-white p-3 rounded-lg shadow hover:shadow-md transition-shadow border block text-center" style={{ width: '160px' }}>
                        <h2 className="mb-2 text-base font-semibold text-blue-600 hover:text-blue-800 line-clamp-1">{car.name}</h2>
                        <img alt={car.name} src={imageMap(car)} style={{ width: '420px', height: '260px', objectFit: 'cover', borderRadius: '10px', display: 'block', margin: '0 auto' }} />
                    </Link>
                ))}
            </div>
        </main>
    );
};
export default CarsList;   