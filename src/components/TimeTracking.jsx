import { useState, useEffect } from "react";
import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import "./TimeTracking.css";

const daysOfWeek = ["Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag", "Søndag"];
const currentWeek = "Uge 50"; // Kan evt. gøres dynamisk

function TimeTracking() {
  const [timeEntries, setTimeEntries] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTimeEntries = async () => {
      const snapshot = await getDocs(collection(db, "timeTracking"));
      const entries = {};
      snapshot.forEach(docSnap => {
        const data = docSnap.data();
        if (data.week === currentWeek) {
          entries[data.day] = data.hours || "";
        }
      });
      setTimeEntries(entries);
      setLoading(false);
    };

    fetchTimeEntries();
  }, []);

  const handleChange = (day, value) => {
    setTimeEntries(prev => ({ ...prev, [day]: value }));
  };

  const handleSave = async (day) => {
    try {
      await setDoc(doc(db, "timeTracking", `${currentWeek}-${day}`), {
        week: currentWeek,
        day,
        hours: timeEntries[day] || "",
      });
      alert(`Timer gemt for ${day}`);
    } catch (err) {
      console.error("Fejl ved gemning:", err);
    }
  };

  if (loading) {
    return (
      <div className="tasks-container" style={{ textAlign: "center", color: "#C8A800", padding: "50px" }}>
        Indlæser...
      </div>
    );
  }

  return (
    <div className="tasks-container">
      <h1>Tidslog - {currentWeek}</h1>
      <div className="tasks-grid">
        {daysOfWeek.map((day) => (
          <div key={day} className="task-box undervejs">
            <h2>{day}</h2>
            <input
              type="text"
              value={timeEntries[day] || ""}
              onChange={(e) => handleChange(day, e.target.value)}
              placeholder="Indtast timer"
              style={{ padding: "8px", borderRadius: "5px", marginBottom: "10px", width: "100%" }}
            />
            <button
              onClick={() => handleSave(day)}
              style={{
                backgroundColor: "#C8A800",
                border: "none",
                padding: "8px 12px",
                borderRadius: "5px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Gem
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TimeTracking;
