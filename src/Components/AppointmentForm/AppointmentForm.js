import React, { useState } from 'react'

const AppointmentForm = ({ doctorName, doctorSpeciality, onSubmit }) => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [date, setDate] = useState()
    const [selectedSlot, setSelectedSlot] = useState(null);

    const timeSlots = [
        '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
        '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM',
        '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
    ];

    const handleSlotSelection = (slot) => {
        setSelectedSlot(slot);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        onSubmit({ name, phoneNumber });
        setName('');
        setPhoneNumber('');
    };
    const today = new Date().toISOString().split('T')[0];
    return (
        <form onSubmit={handleFormSubmit} className="appointment-form">
            <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number:</label>
                <input
                    type="tel"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="date" >
                    Date of Appointment
                </label>
                <input
                    type="date"
                    id="date"
                    value={date}
                    min={today}
                    onChange={(e) => setDate(e.target.value)}

                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="slot">
                    Select Time Slot
                </label>
                <select
                    id="slot"
                    value={selectedSlot}
                    onChange={(e) => setSelectedSlot(e.target.value)}

                    required
                >
                    <option value="">Select a time slot</option>
                    {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>
                            {slot}
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit">Book Now</button>
        </form>
    );
};

export default AppointmentForm