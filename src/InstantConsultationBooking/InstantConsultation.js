import React, { useEffect, useState } from 'react';
import './InstantConsultation.css';
import { useSearchParams } from 'react-router-dom';
import FindDoctorSearchIC from './FindDoctorSearchIC/FindDoctorSearchIC';
import DoctorCardIC from './DoctorCardIC/DoctorCardIC';

const InstantConsultation = () => {
    const [searchParams] = useSearchParams();
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [isSearched, setIsSearched] = useState(false);
    // Initialize appointments from localStorage
    const [appointments, setAppointments] = useState(() => {
        const savedAppointments = localStorage.getItem('appointments');
        return savedAppointments ? JSON.parse(savedAppointments) : [];
    });

    // Save appointments to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('appointments', JSON.stringify(appointments));
        console.log('Current appointments:', appointments); // Debug log
    }, [appointments]);

    const getDoctorsDetails = () => {
        fetch('https://api.npoint.io/9a5543d36f1460da2f63')
            .then(res => res.json())
            .then(data => {
                if (searchParams.get('speciality')) {
                    const filtered = data.filter(doctor => 
                        doctor.speciality.toLowerCase() === searchParams.get('speciality').toLowerCase()
                    );
                    setFilteredDoctors(filtered);
                    setIsSearched(true);
                } else {
                    setFilteredDoctors([]);
                    setIsSearched(false);
                }
                setDoctors(data);
            })
            .catch(err => console.log(err));
    };

    const handleSearch = (searchText) => {
        if (searchText === '') {
            setFilteredDoctors([]);
            setIsSearched(false);
        } else {
            const filtered = doctors.filter(
                (doctor) =>
                    doctor.speciality.toLowerCase().includes(searchText.toLowerCase())
            );
            setFilteredDoctors(filtered);
            setIsSearched(true);
        }
    };

    const handleAppointmentBooked = (appointment) => {
        console.log('Booking appointment:', appointment); // Debug log
        setAppointments(prev => {
            const updated = [...prev, appointment];
            console.log('Updated appointments:', updated); // Debug log
            return updated;
        });
    };

    // Handle appointment cancellation
    const handleAppointmentCancelled = (appointmentId) => {
        setAppointments(prev => {
            const updated = prev.filter(apt => apt.id !== appointmentId);
            return updated;
        });
    };

    useEffect(() => {
        getDoctorsDetails();
    }, [searchParams]);

    return (
        <center>
            <div className="searchpage-container">
                <FindDoctorSearchIC onSearch={handleSearch} />
                <div className="search-results-container">
                    {isSearched ? (
                        <center>
                            <h2>{filteredDoctors.length} doctors are available {searchParams.get('location')}</h2>
                            <h3>Book appointments with minimum wait-time & verified doctor details</h3>
                            {filteredDoctors.length > 0 ? (
                                filteredDoctors.map(doctor => (
                                    <DoctorCardIC
                                        className="doctorcard"
                                        {...doctor}
                                        key={doctor.name}
                                        onAppointmentBooked={handleAppointmentBooked}
                                        onAppointmentCancelled={handleAppointmentCancelled}
                                        existingAppointments={appointments.filter(apt => 
                                            apt.doctorName === doctor.name
                                        )}
                                    />
                                ))
                            ) : (
                                <p>No doctors found.</p>
                            )}
                        </center>
                    ) : (
                        ''
                    )}
                </div>
              
            </div>
        </center>
    );
};

export default InstantConsultation;