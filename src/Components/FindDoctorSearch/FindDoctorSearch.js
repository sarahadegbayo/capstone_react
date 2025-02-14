import React, { useState } from "react";
import "./FindDoctorSearch.css";

const FindDoctorSearch = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [showSpecialties, setShowSpecialties] = useState(false);

    // Sample list of doctor specialties
    const specialties = [
        "Cardiologist",
        "Dermatologist",
        "Pediatrician",
        "Orthopedic Surgeon",
        "Gynecologist",
        "Neurologist",
        "Psychiatrist",
        "Dentist",
        "General Physician",
    ];

    // Handle input change
    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Handle focus event
    const handleFocus = () => {
        setShowSpecialties(true);
    };

    // Handle blur event
    const handleBlur = () => {
        setTimeout(() => {
            setShowSpecialties(false);
        }, 200); // Delay to allow click on the list items
    };

    // Handle specialty selection
    const handleSpecialtyClick = (specialty) => {
        setSearchQuery(specialty);
        setShowSpecialties(false);
    };

    return (
        <div className="find-doctor-search">
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search by specialty..."
                    value={searchQuery}
                    onChange={handleInputChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
                {showSpecialties && (
                    <div className="specialties-list">
                        {specialties
                            .filter((specialty) =>
                                specialty.toLowerCase().includes(searchQuery.toLowerCase())
                            )
                            .map((specialty, index) => (
                                <div
                                    key={index}
                                    className="specialty-item"
                                    onClick={() => handleSpecialtyClick(specialty)}
                                >
                                    {specialty}
                                </div>
                            ))}
                    </div>
                )}
            </div>
            {/* Optional: Add additional search parameters or filters here */}
        </div>
    );
};

export default FindDoctorSearch;