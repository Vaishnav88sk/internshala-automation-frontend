import React, { useState } from 'react';

const backendUrl = process.env.BACKEND_URL || "http://localhost:5000"; ;

function InternshipCard({ internship }) {
  const [status, setStatus] = useState(null);

  const handleApply = async () => {
    if (!internship.url ) {
        //alert("Error: No valid internship link found.");
        console.error("Invalid internship link:", internship.url);
        return;
      }
    
      console.log("Applying for internship with URL:", internship.url);
    
      try {
        const response = await fetch(`${backendUrl}/api/apply`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: internship.url }),
        });
    
        const result = await response.json();
        console.log("Response from server:", result);
    
        if (result.status === 'success') {
          setStatus('success');
        } else if (result.status === 'already_applied') {
          setStatus('already_applied');
        } else {
          setStatus('error');
          window.open(internship.url, '_blank');
        }
      } catch (error) {
        console.error("Error applying:", error);
        setStatus('error');
        window.open(internship.url, '_blank');
      }
  };

  return (
    <div className="internship-card">
      <div className="card-header">
        <h2 className="card-title">{internship.title || "Unknown Position"}</h2>
        <span className={`card-status ${status}`}>
          {status === 'success' ? 'Applied' : status === 'already_applied' ? 'Already Applied' : 'Open'}
        </span>
      </div>

      <p className="card-company">📍 {internship.company || "Unknown Company"}</p>
      <p className="card-stipend">💰 Stipend: {internship.stipend || "Unpaid"}</p>
      <p className="card-duration">⏳ Duration: {internship.duration || "N/A"}</p>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "15px" }}>
      <a href={internship.url || "#"} target="_blank" rel="noopener noreferrer" className="card-link">
        View Details
      </a>

      <button
        onClick={handleApply}
        className={`apply-button ${status === 'success' || status === 'already_applied' ? 'applied' : ''}`}
        disabled={status === 'success' || status === 'already_applied'}
      >
        {status === 'success' ? 'Applied' : status === 'already_applied' ? 'Already Applied' : 'Apply Now'}
      </button>
      </div>

      {status === 'error' && <p className="error-text">Failed to apply. Please try again.</p>}
    </div>
  );
}

export default InternshipCard;
