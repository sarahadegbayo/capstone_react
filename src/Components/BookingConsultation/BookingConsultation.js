import React, { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import DoctorCardIC from "../../DoctorCardIC/DoctorCardIC";
import FindDoctorSearchIC from "../../FindDoctorSearchIC/FindDoctorSearchIC";
import "./BookingConsultation.css";

const BookingConsultation = () => {
    const [searchParams] = useSearchParams();
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Filter doctors based on location and speciality
    const filterDoctors = useCallback((doctorList) => {
        const location = searchParams.get('location') || '';
        const speciality = searchParams.get('speciality') || '';

        let filtered = doctorList;

        // Apply location filter if present
        if (location) {
            filtered = filtered.filter(doctor =>
                doctor.location.toLowerCase().includes(location.toLowerCase())
            );
        }

        // Apply speciality filter if present
        if (speciality) {
            filtered = filtered.filter(doctor =>
                doctor.speciality.toLowerCase() === speciality.toLowerCase()
            );
        }

        setFilteredDoctors(filtered);
    }, [searchParams]);  // Add searchParams as a dependency to ensure it updates on change

    // Fetch doctors details
    const getDoctorsDetails = useCallback(() => {
        setIsLoading(true);
        fetch('https://api.npoint.io/9a5543d36f1460da2f63')
            .then(res => res.json())
            .then(data => {
                setDoctors(data);
                filterDoctors(data);  // Now it's safe to call filterDoctors here
                setIsLoading(false);
            })
            .catch(err => {
                setError('Failed to load doctor data');
                setIsLoading(false);
            });
    }, [filterDoctors]);  // Add filterDoctors as a dependency

    // Handle search functionality
    const handleSearch = (searchText) => {
        if (searchText === '') {
            filterDoctors(doctors); // Reapply the URL params filtering
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
    }, [getDoctorsDetails]);

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
                                    <DoctorCardIC className="doctorcard" {...doctor} key={doctor.id} />
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

export default BookingConsultation;