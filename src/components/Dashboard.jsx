import { Link } from "react-router-dom";
import "./Dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <div className="dashboard-links">
        <Link to="/tasks" className="dashboard-card">
          <h2>Opgaver</h2>
          <p>Se og administrer dine opgaver.</p>
        </Link>
        <Link to="/timetracking" className="dashboard-card">
          <h2>Tidsregistrering</h2>
          <p>Registrer dine timer.</p>
        </Link>
        <Link to="/finance" className="dashboard-card">
          <h2>Økonomi</h2>
          <p>Se budget og kunder.</p>
        </Link>
      </div>
    </div>
  );
}
