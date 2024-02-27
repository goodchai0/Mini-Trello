import React, { useEffect, useState } from 'react';
import styles from "./Analytics.module.css";
import neondot from '../../assets/neondot.png';
import { analytics } from "../../apis/task";
import { useNavigate } from "react-router";

export const Analytics = () => {
  const [data, setData] = useState({}); // Initialize state
  const navigate = useNavigate();
  useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
          navigate("/login");
      }
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const result = await analytics(); // Call the API
      console.log(result)
      setData(result); // Update the state with the result
    };

    fetchData(); // Fetch data when component mounts
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <>
        <div className={styles.header}>Analytics</div>

        <div className={styles.stat_box_container}>
            <div className={styles.stat_box}>
                <div><h3><img src={neondot} style={{ marginRight: '20px' }}/>Backlog Tasks</h3> <h3>{data.backlogTasks}</h3></div>
                <div><h3><img src={neondot} style={{ marginRight: '20px' }}/>To-do Tasks</h3> <h3>{data.todoTasks}</h3></div>
                <div><h3><img src={neondot} style={{ marginRight: '20px' }}/>In-Progress Tasks</h3> <h3>{data.inProgressTasks}</h3></div>
                <div><h3><img src={neondot} style={{ marginRight: '20px' }}/>Completed Tasks</h3> <h3>{data.completedTasks}</h3></div>
            </div>

            <div className={styles.stat_box}>
                <div><h3><img src={neondot} style={{ marginRight: '20px' }}/>Low Priority</h3> <h3>{data.lowPriority}</h3></div>
                <div><h3><img src={neondot} style={{ marginRight: '20px' }}/>Moderate Priority</h3> <h3>{data.moderatePriority}</h3></div>
                <div><h3><img src={neondot} style={{ marginRight: '20px' }}/>High Priority</h3> <h3>{data.highPriority}</h3></div>
                <div><h3><img src={neondot} style={{ marginRight: '20px' }}/>Due Date Tasks</h3> <h3>{data.dueDateTasks}</h3></div>
            </div>
        </div>
    </>
  )
}
