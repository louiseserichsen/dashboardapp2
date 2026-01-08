// src/pages/Tasks.jsx
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import "./Tasks.css";

const statusOrder = ["haste", "nye", "undervejs", "delte", "færdige", "annullerede"];

const statusColors = {
  haste: "haste",
  nye: "nye",
  undervejs: "undervejs",
  delte: "delte",
  færdige: "færdige",
  annullerede: "annullerede",
};

function Tasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const querySnapshot = await getDocs(collection(db, "tasks"));
      const data = querySnapshot.docs.map((doc) => {
        let status = doc.data().status?.toLowerCase();
        if (status === "haster") status = "haste"; // Normaliser til "haste"
        return {
          id: doc.id,
          ...doc.data(),
          status,
        };
      });
      setTasks(data);
    };
    fetchTasks();
  }, []);

  // Sorter opgaver efter statusOrder
  const sortedTasks = [];
  statusOrder.forEach((status) => {
    tasks
      .filter((task) => task.status === status)
      .forEach((task) => sortedTasks.push(task));
  });

  return (
    <div className="tasks-wrapper">
      <div className="tasks-container">
        <h1>Opgaver</h1>
        <div className="tasks-grid">
          {sortedTasks.map((task) => (
            <div
              key={task.id}
              className={`task-box ${statusColors[task.status]}`}
            >
              <h2>{task.title}</h2>
              <p><strong>Kunde:</strong> {task.Customer}</p>
              <p>
                <strong>Status:</strong>{" "}
                {task.status === "haste" ? "Haster" : task.status}
              </p>
              <p>
                <strong>Deadline:</strong>{" "}
                {task.deadline?.toDate?.()?.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Tasks;
