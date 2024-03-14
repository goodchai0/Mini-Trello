import React, { useEffect, useState } from 'react'
import styles from "./Home.module.css";
import { formatDate } from '../../utils/functions';
import Group from '../../assets/Group.png';
import add from '../../assets/add.png';
import Delete from '../../assets/Delete.png';
import greydot from '../../assets/greydot.png';
import bluedot from '../../assets/bluedot.png';
import reddot from '../../assets/reddot.png';
import { createTask, filterTask, getAllTasks } from "../../apis/task";
import { useNavigate } from "react-router";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Task } from '../Task/Task';


export const Home = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [tasksFromDb, settasksFromDb] = useState([]);
  const [toggle1, setToggle1] = useState(false);
  const [toggle2, setToggle2] = useState(false);
  const [toggle3, setToggle3] = useState(false);
  const [toggle4, setToggle4] = useState(false);
  const toggleFunction1 = () => {
    setToggle1(!toggle1);
  };
  const toggleFunction2 = () => {
    setToggle2(!toggle2);
  };
  const toggleFunction3 = () => {
    setToggle3(!toggle3);
  };
  const toggleFunction4 = () => {
    setToggle4(!toggle4);
  };
  const [task, setTask] = useState({
    name: '',
    priority: '',
    checklist: [],
    due_date: ''
  });
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);  // // To update the state, you can do:
  const [selectedPriority, setSelectedPriority] = useState('');
  const [reload, setReload] = useState(false);
  const handlePriorityClick = (priority) => {
    setTask(prevState => ({ ...prevState, priority }));
    setSelectedPriority(priority);
  };

  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);
  const handleChange = async (event) => {
    setSelectedPeriod(event.target.value);
    console.log(event.target.value)
    const tasks = await filterTask(event.target.value); // Call the API
    console.log(tasks)
    settasksFromDb(tasks); // Update the state with the result
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const saveTask = async () => {
    // Check if any required fields are empty
    if (!task.name || !task.priority) {
      toast.error('Please fill in all required fields.');
      return;
    }
    // Check if any required fields are empty
    if (task.checklist.length === 0 || task.checklist[0].label === "") {
      toast.error('Checklist should not be empty.');
      return;
    }

      // Check if any checklist item label is empty
    const emptyChecklistItem = task.checklist.find(item => item.label.trim() === "");
    if (emptyChecklistItem) {
      toast.error('One of Checklist item is empty.');
      return;
    }

    // Call your API function here
    const response = await createTask(task);
    console.log(response)
    if (response.success) {
      toast.success("Task Created Successfully");
    } else {
      toast.error("Failed to create task");
    }
    // Handle the response here
    console.log({ response });
    console.log(task)
    setReload(!reload)
    // Close the modal
    closeModal();
  };


  const name = localStorage.getItem('userName')

  useEffect(() => {
    const fetchTasks = async () => {
      let tasks = await getAllTasks();
      tasks = await getAllTasks();
      settasksFromDb(tasks);
    };

    console.log("hi")
    console.log({ tasksFromDb })
    fetchTasks();
  }, [reload]);

  return (
    <>
    {modalIsOpen && <div className={styles.darkOverlay} />}
      <div className={styles.header}>
        <h2>Welcome! {name}</h2>
        <h3>{formatDate(Date.now())}</h3>
      </div>
      <div className={styles.board_details}>
        <h1>Board</h1>
        <select className={styles.selectedPeriod} value={selectedPeriod} onChange={handleChange}>
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
      </div>

      <div className={modalIsOpen ? `${styles.tasks} ${styles.blur}` : styles.tasks}>      <div className={styles.task}>
        <div className={styles.task_header}><h3>Backlog</h3><img src={Group} onClick={() => setToggle1(!toggle1)} /></div>
        <div className={styles.task_div}>
          <div className={styles.task_box}>
            {tasksFromDb.map((task) => {
              if (task.status === 'backlog') {
                return (
                  <Task
                    key={task.id}
                    initialTask={task}
                    setTask={setTask}
                    checklistItems={task.checklist}
                    setReload={setReload}// replace with your actual handler
                    reload={reload}
                    toggling={toggle1}
                  />
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>
        <div className={styles.task}>
          <div className={styles.task_header}><h3>To-Do</h3> <span><img src={add} onClick={openModal} /><img src={Group} onClick={() => setToggle2(!toggle2)} /></span></div>
          <div className={styles.task_div}>
            <div className={styles.task_box}>
              {tasksFromDb.map((task) => {
                if (task.status === 'to-do') {
                  return (
                    <Task
                      key={task.id}
                      initialTask={task}
                      checklistItems={task.checklist}
                      setReload={setReload} // replace with your actual handler
                      reload={reload}
                      toggling={toggle2}
                    />
                  );
                }
                return null;
              })}
            </div>


          </div>
        </div>
        <div className={styles.task}>
          <div className={styles.task_header}><h3>Progress</h3><img src={Group} onClick={() => setToggle3(!toggle3)} /></div>
          <div className={styles.task_div}>
            <div className={styles.task_box}>
              {tasksFromDb.map((task) => {
                if (task.status === 'progress') {
                  return (
                    <Task
                      key={task.id}
                      initialTask={task}
                      checklistItems={task.checklist}
                      setReload={setReload} // replace with your actual handler
                      reload={reload}
                      toggling={toggle3}
                    />
                  );
                }
                return null;
              })}
            </div>
          </div>
        </div>
        <div className={styles.task}>
          <div className={styles.task_header}><h3>Done</h3><img src={Group} onClick={() => setToggle4(!toggle4)} /></div>
          <div className={styles.task_div}>

            <div className={styles.task_box}>
              {tasksFromDb.map((task) => {
                if (task.status === 'done') {
                  return (
                    <Task
                      key={task.id}
                      initialTask={task}
                      checklistItems={task.checklist}
                      setReload={setReload}
                      reload={reload}
                      toggling={toggle4}
                    />
                  );
                }
                return null;
              })}
            </div>
          </div>
        </div>
      </div>

      {modalIsOpen && (
        <div className={styles.modal}>
          <h3>Title<span style={{ color: "red" }}>*</span></h3>
          <input
            className={styles.title}
            type="text"
            value={task.name}
            onChange={e => setTask(prevState => ({ ...prevState, name: e.target.value }))}
            placeholder="Enter Task Title"
          />
          <div className={styles.priority_box}>
            <h3>Select Priority<span style={{ color: "red" }}>*</span></h3>
            <div className={styles.priority}>
              <button
                className={`${styles.priorityButton} ${selectedPriority === 'Low' ? styles.selected : styles.unselected}`}
                onClick={() => handlePriorityClick('Low')}
              >
                <span><img src={greydot} />    </span>Low Priority
              </button>
              <button
                className={`${styles.priorityButton} ${selectedPriority === 'Moderate' ? styles.selected : styles.unselected}`}
                onClick={() => handlePriorityClick('Moderate')}
              >
                <span><img src={bluedot} />    </span>Moderate Priority
              </button>
              <button
                className={`${styles.priorityButton} ${selectedPriority === 'High' ? styles.selected : styles.unselected}`}
                onClick={() => handlePriorityClick('High')}
              >
                <span><img src={reddot} />    </span>High Priority
              </button>
            </div>
          </div>
          <div className={styles.checklist_box}>
            <h3>Checklist<span style={{ color: "red" }}>*</span></h3>
            {task.checklist.map((item, index) => (
              <div key={index} className={styles.checklist_field_box}>
                <label className={styles.checkboxContainer}>

                  <input
                    className={styles.hiddenCheckbox}
                    type="checkbox"
                    checked={item.completed}
                    onChange={e => {
                      const newChecklist = [...task.checklist];
                      newChecklist[index].completed = e.target.checked;
                      setTask(prevState => ({ ...prevState, checklist: newChecklist }));
                    }}

                  />
                  <span className={styles.customCheckbox} style={{ marginTop: "-1rem", marginLeft: "0.5rem" }}></span></label>
                <input
                  type="text"
                  value={item.label}
                  onChange={e => {
                    const newChecklist = [...task.checklist];
                    newChecklist[index].label = e.target.value;
                    setTask(prevState => ({ ...prevState, checklist: newChecklist }));
                  }}
                  className={styles.checklist_input}
                />
                <button className={styles.checklist_cross_button} onClick={() => {
                  const newChecklist = [...task.checklist];
                  newChecklist.splice(index, 1);
                  setTask(prevState => ({ ...prevState, checklist: newChecklist }));
                }}><img src={Delete} style={{ height: "1rem" }} /></button>
              </div>
            ))}


            <div className={styles.checklist_button} onClick={() => setTask(prevState => ({ ...prevState, checklist: [...prevState.checklist, { label: '', completed: false }] }))}>
              + Add New
            </div>

          </div>
          <div className={styles.footer}>
            <div className={styles.dueDate_button} onClick={() => { document.getElementById('dateInput').click(); setDatePickerVisible(true); }}>
              {task.due_date || 'Select Due Date'}
            </div>
            <input
              id="dateInput"
              type="date"
              style={{ visibility: isDatePickerVisible ? 'visible' : 'hidden', position: 'absolute' }}
              value={task.due_date}
              onChange={e => {
                setTask(prevState => ({ ...prevState, due_date: e.target.value }));
                setDatePickerVisible(false);
              }}
            />
            <div className={styles.cancel_save}>
              <div className={styles.cancel_button} onClick={closeModal}>Cancel</div>
              <div className={styles.save_button} onClick={saveTask}>Save</div>
            </div>
          </div>
        </div>
      )}


    </>
  )
}
