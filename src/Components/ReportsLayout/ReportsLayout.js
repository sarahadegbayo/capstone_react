// src/components/ReportsLayout/ReportsLayout.js
import React, { useState } from "react";
import "./ReportsLayout.css";

const ReportsLayout = () => {
    const [reports] = useState([
        { id: 1, title: "Consultation Report - January", date: "2025-01-01", file: "/patient_report.pdf" },
        { id: 2, title: "Consultation Report - February", date: "2025-02-01", file: "/patient_report.pdf" },
        { id: 3, title: "Consultation Report - March", date: "2025-03-01", file: "/patient_report.pdf" }
    ]);

    return (
        <div className="reports-layout">
            <h2>Your Reports</h2>
            <div className="reports-list">
                {reports.length > 0 ? (
                    reports.map((report) => (
                        <div className="report-card" key={report.id}>
                            <h3>{report.title}</h3>
                            <p>{report.date}</p>
                            <div className="report-actions">
                                {/* Button to open the report in a new tab */}
                                <a href={report.file} target="_blank" rel="noopener noreferrer">
                                    <button className="view-report-btn">View Report</button>
                                </a>
                                {/* Button to download the report */}
                                <a href={report.file} download={`${report.title}.pdf`}>
                                    <button className="download-report-btn">Download Report</button>
                                </a>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No reports available.</p>
                )}
            </div>
        </div>
    );
};

export default ReportsLayout;

