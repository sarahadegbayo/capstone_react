import React from "react";
import "./DoctorCard.css";

const DoctorCard = ({ doctor }) => {
    const { name, experience, rating, image, specialty } = doctor;

    return (
        <div className="doctor-card">
            <div className="doctor-card-content">
                {/* Doctor Image */}
                {image && (
                    <div className="doctor-image">
                        <img src={image} alt={name} />
                    </div>
                )}

                {/* Doctor Details */}
                <div className="doctor-details">
                    <h3 className="doctor-name">{name}</h3>
                    <p className="doctor-specialty">{specialty}</p>
                    <p className="doctor-experience">{experience} years of experience</p>
                    <p className="doctor-rating">Rating: {rating}/5</p>
                </div>

                {/* Book Appointment Button */}
                <div className="book-appointment-btn-container">
                    <button className="book-appointment-btn">
                        <div>Book Appointment</div>
                        <div>No Booking Fee</div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DoctorCard;