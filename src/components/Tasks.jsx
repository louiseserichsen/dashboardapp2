import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import "./Tasks.css";

const statusOrder = [
  "haste",
  "nye",
  "undervejs",
  "delte",
  "færdige",
  "annullerede",
];

// Ensretter status fra Firestore
const normalizeStatus = (status) => {
  if (!status) return "nye";

  const s = status.toLowerCase();

  if (s === "haster") return "haste";
  if (s === "ny") return "nye";
  if (s === "i gang" || s === "igang") return "undervejs";
  if (s === "færdig") return "færdige";
  if (s === "annulleret") return "annullerede";

  return s;
};

// Hjælpefunktion: dato før deadline
const getRandomDateBeforeDeadline = (deadline) => {
  if (!deadline?.toDate) return "—";

  const deadlineDate = deadline.toDate();
  const daysBefore = Math.floor(Math.random() * 7) + 3;
  const randomDate = new Date(deadlineDate);
  randomDate.setDate(deadlineDate.getDate() - daysBefore);

  return randomDate.toLocaleDateString();
};

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [openTaskId, setOpenTaskId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const snapshot = await getDocs(collection(db, "tasks"));

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          status: normalizeStatus(doc.data().status),
        }));

        setTasks(data);
      } catch (error) {
        console.error("Fejl ved hentning af tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const toggleTask = (id) => {
    setOpenTaskId(openTaskId === id ? null : id);
  };

  // Sortér efter statusOrder
  const sortedTasks = [];
  statusOrder.forEach((status) => {
    tasks
      .filter((task) => task.status === status)
      .forEach((task) => sortedTasks.push(task));
  });

  if (loading) {
    return <p style={{ padding: "20px" }}>Indlæser opgaver...</p>;
  }

  return (
    <div className="tasks-wrapper">
      <div className="tasks-container">
        <h1>Opgaver</h1>

        {sortedTasks.length === 0 && (
          <p style={{ opacity: 0.6 }}>Ingen opgaver fundet</p>
        )}

        <div className="tasks-grid">
          {sortedTasks.map((task) => {
            const isOpen = openTaskId === task.id;

            const cancelledDate =
              task.cancelledAt?.toDate?.()?.toLocaleDateString() ||
              getRandomDateBeforeDeadline(task.deadline);

            return (
              <div
                key={task.id}
                className={`task-box ${task.status}`}
                onClick={() => toggleTask(task.id)}
              >
                <h2>{task.title || "Ingen titel"}</h2>

                <p>
                  <strong>Kunde:</strong> {task.Customer || "—"}
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  {task.status === "haste" ? "Haster" : task.status}
                </p>

                <p>
                  <strong>Deadline:</strong>{" "}
                  {task.deadline?.toDate?.()?.toLocaleDateString() || "—"}
                </p>

                {isOpen && (
                  <div className="task-details">
                    {task.status === "delte" && (
                      <p>
                        <strong>Delt med:</strong> Jens Hansen
                      </p>
                    )}

                    {task.status === "annullerede" && (
                      <>
                        <p>
                          <strong>Annulleret af:</strong> Jens Hansen
                        </p>
                        <p>
                          <strong>Annulleret den:</strong> {cancelledDate}
                        </p>
                      </>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Tasks;
