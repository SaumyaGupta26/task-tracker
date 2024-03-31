// EditPopup.jsx
import React, { useState } from 'react';
import './Popup.css';

function EditPopup({ task, onClose, onSave }) {
  const [status, setStatus] = useState(task.status);
  const [priority, setPriority] = useState(task.priority);
  const priorities = ['P0', 'P1', 'P2'];
  const statuses = ['Assign', 'In Progress', 'Completed', 'Deployed', 'Deffered'];

  const handleSave = () => {
    onSave({ ...task, status, priority });
    onClose();
  };

  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  return (
    <div className='popup'>
      <div className='popup-inner-edit'>
      <img src="src/components/cancelIcon.svg" className='close-dlt-edit' alt="" onClick={onClose}/>
        <div className='popup-heading'>
          <h3>Edit Task</h3>
          
        </div>
        <div className='popup-content'>
        <div>
            <label>Title:</label> &nbsp;
            <span>{task.title}</span>
          </div>
          <div>
            <label>Description:</label> &nbsp;
            <span>{task.description}</span>
          </div>
          <div>
            <label>Assignee:</label> &nbsp;
            <span>{task.assignee}</span>
          </div>

            
        <div>
        <label htmlFor="priority">Priority:</label> &nbsp;
        <select
          id="priority"
          value={priority}
          onChange={handlePriorityChange}
          required
        >
          <option value="">Select Priority</option>
          {priorities.map((p, index) => (
            <option key={index} value={p}>
              {p}
            </option>
          ))}
        </select>
        </div>

        <div>
        <label htmlFor="status">Status:</label> &nbsp;
        <select
          id="status"
          value={status}
          onChange={handleStatusChange}
          required
        >
          <option value="">Select Status</option>
          {statuses.map((s, index) => (
            <option key={index} value={s}>
              {s}
            </option>
          ))}
        </select>
        </div>


          <button onClick={handleSave} className='save'>Save</button>
        </div>
      </div>
    </div>
  );
}

export default EditPopup;
