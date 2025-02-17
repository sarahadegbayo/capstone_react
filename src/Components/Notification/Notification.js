import React, { useState, useEffect } from "react";
import "./Notification.css";

const Notification = () => {
    // State to manage notification visibility and appointment details
    const [showNotification, setShowNotification] = useState(false);
    const [appointmentDetails, setAppointmentDetails] = useState({
        userName: "",
        appointmentDate: "",
        appointmentTime: "",
        doctorName: "",
    });

    // Simulate appointment booking (can be replaced with actual booking logic)
    useEffect(() => {
        // Example: Simulate fetching appointment details from localStorage or an API
        const storedAppointment = JSON.parse(localStorage.getItem("appointment"));
        if (storedAppointment) {
            setAppointmentDetails(storedAppointment);
            setShowNotification(true);
        }
    }, []);

    // Handle cancellation of appointment
    const handleCancelAppointment = () => {
        // Clear appointment details from localStorage (or backend)
        localStorage.removeItem("appointment");

        // Hide the notification
        setShowNotification(false);
    };

    return (
        <div className="notification-container">
            {/* Display notification if showNotification is true */}
            {showNotification && (
                <div className="notification">
                    <h3>Appointment Booked Successfully!</h3>
                    <div className="notification-details">
                        <p>
                            <strong>User:</strong> {appointmentDetails.userName}
                        </p>
                        <p>
                            <strong>Doctor:</strong> {appointmentDetails.doctorName}
                        </p>
                        <p>
                            <strong>Date:</strong> {appointmentDetails.appointmentDate}
                        </p>
                        <p>
                            <strong>Time:</strong> {appointmentDetails.appointmentTime}
                        </p>
                    </div>
                    <button className="cancel-button" onClick={handleCancelAppointment}>
                        Cancel Appointment
                    </button>
                </div>
            )}
        </div>
    );
};

export default Notification;