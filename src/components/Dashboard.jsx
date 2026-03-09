import { Link } from "react-router-dom";
import { useState } from "react";
import "./Dashboard.css";

export default function Dashboard() {
  const [showWarning, setShowWarning] = useState(false);

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>

      <div className="dashboard-links">
        {/* OPGAVER – ikon indeni boksen */}
        <Link to="/tasks" className="dashboard-card">
          <h2>Opgaver</h2>
          <p>Se og administrer dine opgaver.</p>

          {/* Advarselsikon – absolut placeret */}
          <div
            className="warning-icon"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowWarning(!showWarning);
            }}
          >
            !
          </div>

          {/* Tooltip */}
          {showWarning && (
            <div className="warning-tooltip">
              Du har en opgave der nærmer sig deadline! 
            </div>
          )}
        </Link>

        {/* Tidsregistrering – uændret */}
        <Link to="/timetracking" className="dashboard-card">
          <h2>Tidsregistrering</h2>
          <p>Registrer dine timer.</p>
        </Link>

        {/* Økonomi – uændret */}
        <Link to="/finance" className="dashboard-card">
          <h2>Økonomi</h2>
          <p>Se budget og kunder.</p>
        </Link>
      </div>
    </div>
  );
}
