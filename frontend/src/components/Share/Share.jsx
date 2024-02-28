import React, { useEffect, useState } from 'react';
import styles from "./Share.module.css";
import greydot from '../../assets/greydot.png';
import bluedot from '../../assets/bluedot.png';
import reddot from '../../assets/reddot.png';
import { getTask } from '../../apis/task';

const Share = ({ id }) => {
  console.log({ id });
  const [task, setTask] = useState();
  const [completed, setCompleted] = useState(0);
  const [total, setTotal] = useState(0);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      let task = await getTask({id});
      setTask(task);
      console.log(task)
      const items = task?.checklist || [];
      console.log({items})
      setItems(items);
      const completed = items.filter(item => item.completed).length;
      setCompleted(completed);
      setTotal(items.length);
    };
    fetchTasks();
  }, [id]); // Include 'id' in the dependencies array

  let dot_color;
  if(task?.priority==="Low")dot_color=greydot;
  if(task?.priority==="Moderate")dot_color=bluedot;
  if(task?.priority==="High")dot_color=reddot;
  const date = new Date(task?.due_date);
  const formatted_due_date = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });  

  return (
    <div className={styles.main}>
      <div className={styles.task_header}>
        <h6><span className={styles.task_header_picon}><img src={dot_color}/></span>   {task?.priority} Priority</h6>
          
      </div>
      <h2 style={{ marginTop: "-1rem", marginBottom: "2rem" }}>{task?.name}</h2>
      <div className={styles.checklist}>
        <div className={styles.checklist_header}>
          <h4>Checklist {completed}/{total}</h4>
        </div>

        <div className={`${styles.checklist_items}`}>
          {items.map((item, index) => (
            <div key={index} className={styles.item}>
              <label className={styles.checkboxContainer}>
                    <input 
                      type="checkbox" 
                      checked={item.completed} 
                      onChange={() => handleCheckboxChange(index)}
                      className={styles.hiddenCheckbox}
                    />
                    <span className={styles.customCheckbox}></span>
                    {item.label}
                  </label>
            </div>
          ))}
        </div>
      
        <div className={styles.footer}>
          <div style={{display:"flex",alignItems:"center"}}>
            <h5 className={`${task?.due_date ? "" : styles.invisible}`}>Due Date</h5>
            <div className={`${styles.footer_date} ${task?.due_date ? "" : styles.invisible} ${date > Date.now() ? styles.alert : ""}`}>
              {formatted_due_date}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Share;
