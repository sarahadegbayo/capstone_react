import React, { useState } from "react";
import "./AppointmentForm.css";

const AppointmentForm = ({ doctorName, onClose }) => {
    const [formData, setFormData] = useState({
        patientName: "",
        appointmentDate: "",
        appointmentTime: "",
    });
    const [errors, setErrors] = useState({});

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length === 0) {
            alert("Appointment booked successfully!");
            onClose(); // Close the form after submission
        } else {
            setErrors(validationErrors);
        }
    };

    // Validate form inputs
    const validateForm = () => {
        const errors = {};
        if (!formData.patientName.trim()) {
            errors.patientName = "Patient name is required";
        }
        if (!formData.appointmentDate) {
            errors.appointmentDate = "Appointment date is required";
        }
        if (!formData.appointmentTime) {
            errors.appointmentTime = "Appointment time is required";
        }
        return errors;
    };

    return (
        <div className="appointment-form-overlay">
            <div className="appointment-form">
                <h2>Book Appointment with {doctorName}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Patient Name</label>
                        <input
                            type="text"
                            name="patientName"
                            value={formData.patientName}
                            onChange={handleInputChange}
                        />
                        {errors.patientName && (
                            <span className="error">{errors.patientName}</span>
                        )}
                    </div>
                    <div className="form-group">
                        <label>Appointment Date</label>
                        <input
                            type="date"
                            name="appointmentDate"
                            value={formData.appointmentDate}
                            onChange={handleInputChange}
                        />
                        {errors.appointmentDate && (
                            <span className="error">{errors.appointmentDate}</span>
                        )}
                    </div>
                    <div className="form-group">
                        <label>Appointment Time</label>
                        <input
                            type="time"
                            name="appointmentTime"
                            value={formData.appointmentTime}
                            onChange={handleInputChange}
                        />
                        {errors.appointmentTime && (
                            <span className="error">{errors.appointmentTime}</span>
                        )}
                    </div>
                    <div className="form-buttons">
                        <button type="submit">Book Appointment</button>
                        <button type="button" onClick={onClose}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AppointmentForm;