import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import './ReviewForm.css';

const ReviewForm = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [reviewedDoctors, setReviewedDoctors] = useState(new Set());
    const [appointments, setAppointments] = useState([]);
    const [formData, setFormData] = useState({
        userName: '',
        review: '',
        rating: 0
    });
    const [hoveredRating, setHoveredRating] = useState(0);

    // Load appointments from localStorage on component mount
    useEffect(() => {
        const savedAppointments = localStorage.getItem('appointments');
        if (savedAppointments) {
            setAppointments(JSON.parse(savedAppointments));
        }
    }, []);

    const handleFeedback = (doctor) => {
        setSelectedDoctor(doctor);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setFormData({ userName: '', review: '', rating: 0 });
        setHoveredRating(0);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const reviewData = {
            doctor: selectedDoctor,
            ...formData
        };
        console.log('Feedback submitted:', reviewData);

        setReviewedDoctors(prev => new Set([...prev, selectedDoctor.serialNumber]));
        handleCloseModal();
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleRatingClick = (rating) => {
        setFormData(prevData => ({
            ...prevData,
            rating
        }));
    };

    const handleRatingHover = (rating) => {
        setHoveredRating(rating);
    };

    // Transform appointments for display
    const doctorsToReview = appointments.map((appointment, index) => ({
        serialNumber: index + 1,
        name: appointment.doctorName,
        speciality: appointment.doctorSpeciality
    }));

    return (
        <div className="table-container">
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <img src="/api/placeholder/150/150" alt="Logo" />
                <div className="search-container">
                    <input 
                        type="text" 
                        placeholder="Search doctors, clinics, hospitals, etc." 
                        className="search-input"
                    />
                </div>
            </div>

            {doctorsToReview.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Serial Number</th>
                            <th>Doctor Name</th>
                            <th>Doctor Speciality</th>
                            <th>Provide feedback</th>
                            <th>Review Given</th>
                        </tr>
                    </thead>
                    <tbody>
                        {doctorsToReview.map((doctor) => (
                            <tr key={doctor.serialNumber}>
                                <td>{doctor.serialNumber}</td>
                                <td>{doctor.name}</td>
                                <td>{doctor.speciality}</td>
                                <td>
                                    <button
                                        className="feedback-button"
                                        onClick={() => handleFeedback(doctor)}
                                        disabled={reviewedDoctors.has(doctor.serialNumber)}
                                        style={{
                                            backgroundColor: reviewedDoctors.has(doctor.serialNumber) ? '#cccccc' : '#007bff',
                                            cursor: reviewedDoctors.has(doctor.serialNumber) ? 'not-allowed' : 'pointer'
                                        }}
                                    >
                                        Click Here
                                    </button>
                                </td>
                                <td style={{ textAlign: 'center' }}>
                                    {reviewedDoctors.has(doctor.serialNumber) && "review received"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div style={{ textAlign: 'center', padding: '20px' }}>
                    No appointments booked yet. Book an appointment to leave a review.
                </div>
            )}

            {isModalOpen && selectedDoctor && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>Provide Feedback for {selectedDoctor.name}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="userName">Your Name:</label>
                                <input
                                    type="text"
                                    id="userName"
                                    name="userName"
                                    value={formData.userName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="review">Your Review:</label>
                                <textarea
                                    id="review"
                                    name="review"
                                    value={formData.review}
                                    onChange={handleInputChange}
                                    required
                                    rows="4"
                                ></textarea>
                            </div>

                            <div className="form-group">
                                <label>Rating:</label>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    {[1, 2, 3, 4, 5].map((rating) => (
                                        <Star
                                            key={rating}
                                            size={24}
                                            style={{ cursor: 'pointer' }}
                                            fill={(hoveredRating || formData.rating) >= rating ? '#ffd700' : 'none'}
                                            stroke={(hoveredRating || formData.rating) >= rating ? '#ffd700' : '#000'}
                                            onClick={() => handleRatingClick(rating)}
                                            onMouseEnter={() => handleRatingHover(rating)}
                                            onMouseLeave={() => handleRatingHover(0)}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="modal-buttons">
                                <button type="submit" className="submit-button">Submit</button>
                                <button 
                                    type="button" 
                                    className="cancel-button"
                                    onClick={handleCloseModal}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReviewForm;
