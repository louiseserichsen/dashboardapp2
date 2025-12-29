import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import "./BottomNav.css";

export default function BottomNav() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/login");
  };

  return (
    <nav className="bottom-nav">
      <button onClick={() => navigate("/")} className="nav-btn">
        Dashboard
      </button>
      <button onClick={() => navigate("/tasks")} className="nav-btn">
        Opgaver
      </button>
      <button onClick={() => navigate("/timetracking")} className="nav-btn">
        Tidslog
      </button>
      <button onClick={() => navigate("/finance")} className="nav-btn">
        Økonomi
      </button>
      <button onClick={handleLogout} className="nav-btn logout">
        Log ud
      </button>
    </nav>
  );
}
