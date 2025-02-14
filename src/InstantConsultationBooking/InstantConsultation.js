import React, { useEffect, useState } from 'react';
import './InstantConsultation.css';
import { useSearchParams } from 'react-router-dom';
import FindDoctorSearchIC from './FindDoctorSearchIC/FindDoctorSearchIC';
import DoctorCardIC from './DoctorCardIC/DoctorCardIC';

const InstantConsultation = () => {
    const [searchParams] = useSearchParams();
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);  // Added loading state
    const [error, setError] = useState(null);  // Added error state

    // Fetch doctors details
    const getDoctorsDetails = () => {
        setIsLoading(true);
        fetch('https://api.npoint.io/9a5543d36f1460da2f63')
            .then(res => res.json())
            .then(data => {
                setDoctors(data);  // Set all doctors
                filterDoctors(data);  // Filter doctors based on search params or text
                setIsLoading(false);
            })
            .catch(err => {
                setError('Failed to load doctor data');
                setIsLoading(false);
            });
    };

    // Filter doctors based on search text or URL params
    const filterDoctors = (doctorList) => {
        const location = searchParams.get('location') || '';  // Using location
        const speciality = searchParams.get('speciality') || '';

        let filtered = doctorList;

        // Apply speciality filter if present
        if (speciality) {
            filtered = filtered.filter(doctor =>
                doctor.speciality.toLowerCase() === speciality.toLowerCase()
            );
        }

        // Apply location filter if present
        if (location) {
            filtered = filtered.filter(doctor =>
                doctor.location.toLowerCase().includes(location.toLowerCase())
            );
        }

        // Always update filtered doctors
        setFilteredDoctors(filtered);
    };

    // Handle search functionality
    const handleSearch = (searchText) => {
        if (searchText === '') {
            // Re-apply the URL params filtering when resetting the search
            filterDoctors(doctors);
        } else {
            const filtered = doctors.filter(doctor =>
                doctor.speciality.toLowerCase().includes(searchText.toLowerCase())
            );
            setFilteredDoctors(filtered);
        }
    };

    // Fetch doctors on component mount
    useEffect(() => {
        getDoctorsDetails();
    }, [getDoctorsDetails]);  // Empty dependency array to run only once

    return (
        <div className="searchpage-container">
            <FindDoctorSearchIC onSearch={handleSearch} />

            <div className="search-results-container">
                {isLoading ? (
                    <p>Loading doctors...</p>
                ) : error ? (
                    <p style={{ color: 'red' }}>{error}</p>
                ) : (
                    <>
                        {filteredDoctors.length > 0 ? (
                            <>
                                <h2>{filteredDoctors.length} doctors are available in {searchParams.get('location')}</h2>
                                <h3>Book appointments with minimum wait-time & verified doctor details</h3>
                                {filteredDoctors.map(doctor => (
                                    <DoctorCardIC className="doctorcard" {...doctor} key={doctor.name} />
                                ))}
                            </>
                        ) : (
                            <p>No doctors found.</p>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default InstantConsultation;