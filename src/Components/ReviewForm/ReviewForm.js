import React, { useState } from "react";
import "./ReviewForm.css";

const ReviewForm = ({ consultation }) => {
    const [showForm, setShowForm] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState("");
    const [name, setName] = useState("");

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate that all fields are filled out
        if (name && feedback && rating) {
            alert("Thank you for your feedback!");
            setSubmitted(true); // Disable the form after submission
            setShowForm(false); // Hide the form after submission
            setRating(0); // Reset rating
            setFeedback(""); // Reset feedback
            setName(""); // Reset name
        } else {
            alert("Please fill out all fields before submitting.");
        }
    };

    // Handle rating selection (stars)
    const handleRatingClick = (value) => {
        if (!submitted) {
            setRating(value);
        }
    };

    return (
        <div className="review-form-container">
            <h3>Consultation Details</h3>
            <div className="consultation-details">
                <p>
                    <strong>Doctor:</strong> {consultation.doctorName}
                </p>
                <p>
                    <strong>Date:</strong> {consultation.date}
                </p>
                <p>
                    <strong>Time:</strong> {consultation.time}
                </p>
            </div>

            {/* Button to show/hide the feedback form */}
            <button
                className="feedback-button"
                onClick={() => setShowForm(!showForm)}
                disabled={submitted} // Disable button after feedback is submitted
            >
                {showForm ? "Hide Feedback Form" : "Provide Feedback"}
            </button>

            {/* Feedback form */}
            {showForm && !submitted && (
                <form className="feedback-form" onSubmit={handleSubmit}>
                    {/* Name input */}
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                            required
                        />
                    </div>

                    {/* Rating input (stars) */}
                    <div className="form-group">
                        <label>Rating</label>
                        <div className="rating">
                            {[1, 2, 3, 4, 5].map((value) => (
                                <span
                                    key={value}
                                    className={`star ${value <= rating ? "filled" : ""}`}
                                    onClick={() => handleRatingClick(value)}
                                >
                                    ★
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Review textarea */}
                    <div className="form-group">
                        <label>Feedback</label>
                        <textarea
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            placeholder="Share your experience..."
                            required
                        />
                    </div>

                    {/* Submit button */}
                    <button type="submit" className="submit-button">
                        Submit Feedback
                    </button>
                </form>
            )}

            {/* Display the review after submission */}
            {submitted && (
                <div className="submitted-message">
                    <h3>Your review has been submitted!</h3>
                    <p><strong>Name:</strong> {name}</p>
                    <p><strong>Rating:</strong> {rating} / 5</p>
                    <p><strong>Feedback:</strong> {feedback}</p>
                </div>
            )}
        </div>
    );
};

export default ReviewForm;
