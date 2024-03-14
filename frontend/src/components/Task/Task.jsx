import React, { useEffect, useState } from 'react';
import styles from './Task.module.css';
import greydot from '../../assets/greydot.png';
import bluedot from '../../assets/bluedot.png';
import reddot from '../../assets/reddot.png';
import Delete from '../../assets/Delete.png';
import { useNavigate } from "react-router";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { updateTask,updateCompletedChecklist, deleteTask } from "../../apis/task";

export const Task = ({ initialTask, checklistItems,setReload,reload,toggling}) => {
  const [task, setTask] = useState({...initialTask});
  const [showCopied, setShowCopied] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [showChecklist, setShowChecklist] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [items, setItems] = useState(checklistItems);
  const [showOptions, setShowOptions] = useState(false);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);  // // To update the state, you can do:
  const [selectedPriority, setSelectedPriority] = useState(task.priority);


  const navigate = useNavigate();
  useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
          navigate("/login");
      }
      console.log(task)
  }, []);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const editTask = async () => {
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

    const response = await updateTask({id:task._id, body:{...task}});
    setItems(task.checklist)
    if (response.success) {
      toast.success("Task Updated Successfully");
    } else {
        toast.error("Failed to Update task");
        return;
    }
    // Handle the response here
    console.log({response});
    console.log(task)

    setReload(!reload)
    closeModal();
  };
  const handlePriorityClick = (priority) => {
    console.log({priority})
    setTask(prevState => ({ ...prevState, priority }));
    setSelectedPriority(priority);
  };
  const handleShareClick = () => {
    toggleOptions()
    const url = window.location.href + task._id;
    navigator.clipboard.writeText(url);
  
    setShowCopied(true);
  
    setTimeout(() => {
      setShowCopied(false);
    }, 2000);
  };
  const removeTask = async () => {
    const response = await deleteTask({id:task._id});
    if(response.success){
      toast.success("Task Deleted Successfully")
      setReload(!reload)
      // Reload the page after 1.5 seconds
      setTimeout(() => {
        window.location.reload();
      }, 3000);
      console.log({response});
    }
    else {
      console.log(response.message);
      toast.error("Task Delete Failed")
    }
  };
  

  const handleDeleteClick = () => {
    toggleOptions();
    setConfirmDelete(true);
  };
  
  // The function to call when the user confirms the deletion
  const handleConfirmDelete = () => {
    removeTask();
    setConfirmDelete(false);
  };
  
  // The function to call when the user cancels the deletion
  const handleCancelDelete = () => {
    setConfirmDelete(false);
  };
  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };
  const completed = items.filter(item => item.completed).length;
  const total = items.length;
  const toggleChecklist = () => {
    setShowChecklist(!showChecklist);
  };
  let dot_color;
  if(task?.priority==="Low")dot_color=greydot;
  if(task?.priority==="Moderate")dot_color=bluedot;
  if(task?.priority==="High")dot_color=reddot;
  const date = new Date(task?.due_date);
  const formatted_due_date = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });  

  const handleCheckboxChange = async (index) => {
    const newItems = [...items];
    newItems[index].completed = !newItems[index].completed;
    setItems(newItems);

    // Call your API to update the checklist
    const response = await updateCompletedChecklist({checklist:newItems,id:task._id}); // replace with your actual API call

    // If the API call was successful, update the state
    if (response.success) {
      console.log("Hi")
      console.log(response.success)
      console.log(newItems)
    }
    else { console.log("HI"); toast.error("Checklist not updated")}
  };

  
  useEffect(() => {
    setShowChecklist(false);
  }, [toggling]);
  
  return (
    <div className={styles.main}>
      {modalIsOpen && <div className={styles.darkOverlay} />}
      {confirmDelete && <div className={styles.darkOverlay} />}
      <div className={styles.task_header}>
        <h6><span className={styles.task_header_picon}><img src={dot_color}/></span>   {task?.priority} Priority</h6>
        <h4 onClick={toggleOptions}>. . .</h4>
        {showOptions && (
          <div className={styles.options_box}>
            <p onClick={() => { setModalIsOpen(true); toggleOptions(); }}>Edit</p>
            <p onClick={handleShareClick}>Share</p>
            <p className={styles.delete} onClick={handleDeleteClick}>Delete</p>
          </div>
        )}

      </div>
      <h2 style={{ marginTop: "-1rem", marginBottom: "0px" }}>{task?.name}</h2>
      <div className={styles.checklist}>
        <div className={styles.checklist_header}>
          <h4>Checklist {completed}/{total}</h4>
          <button onClick={toggleChecklist}>^</button>
        </div>

        
          <div className={`${styles.checklist_items} ${showChecklist ? styles.show : ''}`}>
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
        
          <div
              className={`${styles.footer_date} ${
                task?.due_date ? "" : styles.invisible
              } ${
                  date > Date.now() && task.status !== "done"
                  ? styles.overdue
                  : date < Date.now() && task.status !== "done"
                  ? styles.alert
                  : task.status === "done"
                  ? styles.completed
                  : ""
              }`}
            >
              {formatted_due_date}
            </div>

          <div className={styles.footer_progress}>
            {task?.status !== 'progress' && <p onClick={() => {updateTask({id:task._id, body:{status:'progress'}}), setReload(!reload)}}>PROGRESS</p>}
            {task?.status !== 'to-do' && <p onClick={() =>{ updateTask({id:task._id, body:{status:'to-do'}}), setReload(!reload)}}>TO-DO</p>}
            {task?.status !== 'done' && <p onClick={() => {updateTask({id:task._id, body:{status:'done'}}), setReload(!reload)}}>DONE</p>}
            {task?.status !== 'backlog' && <p onClick={() => {updateTask({id:task._id, body:{status:'backlog'}}), setReload(!reload)}}>BACKLOG</p>}
          </div>


       </div>
      </div>
      {modalIsOpen && (
      <div className={styles.modal}>
        <h3>Title<span style={{color:"red"}}>*</span></h3>
        <input
          className={styles.title}
          type="text"
          value={task.name}
          onChange={e => setTask(prevState => ({ ...prevState, name: e.target.value }))}
          placeholder="Enter Task Title"
        />
        <div className={styles.priority_box}>
          <h3>Select Priority<span style={{color:"red"}}>*</span></h3>
          <div className={styles.priority}>
            <button
              className={`${styles.priorityButton} ${selectedPriority === 'Low' ? styles.selected : styles.unselected}`}
              onClick={() => handlePriorityClick('Low')}
            >
              <span><img src={greydot}/>    </span>Low Priority
            </button>
            <button
              className={`${styles.priorityButton} ${selectedPriority === 'Moderate' ? styles.selected : styles.unselected}`}
              onClick={() => handlePriorityClick('Moderate')}
            >
              <span><img src={bluedot}/>    </span>Moderate Priority
            </button>
            <button
              className={`${styles.priorityButton} ${selectedPriority === 'High' ? styles.selected : styles.unselected}`}
              onClick={() => handlePriorityClick('High')}
            >
              <span><img src={reddot}/>    </span>High Priority
            </button>
          </div>
        </div>
      <div className={styles.checklist_box}>
        <h3>Checklist<span style={{color:"red"}}>*</span></h3>
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
            <span className={styles.customCheckbox} style={{marginTop:"-1rem",marginLeft:"0.7em"}}></span></label>
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
            }}><img src={Delete} style={{height:"1rem"}}/></button>
          </div>
        ))}


        <div className={styles.checklist_button} onClick={() => setTask(prevState => ({ ...prevState, checklist: [...prevState.checklist, { label: '', completed: false }] }))}>
          + Add New
        </div>

      </div>
      <div className={styles.footer}>
        <div className={styles.dueDate_button} onClick={() => {document.getElementById('dateInput').click();setDatePickerVisible(true);}}>
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
            <div className={styles.save_button} onClick={editTask}>Update</div>
          </div>
      </div>
      </div>
    )}

    {confirmDelete && (
      <div className={styles.modal}>
        <p>Are you sure you want to delete?</p>
        <button className={styles.modal_button_yes} onClick={handleConfirmDelete}>Yes, Delete</button>
        <button className={styles.modal_button_no} onClick={handleCancelDelete}>No</button>
      </div>
    )}
    {showCopied && (
      <div className={styles.copied}>
        Copied
      </div>
    )}
    {/* <ToastContainer /> */}
    </div>
  );
};
