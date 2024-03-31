import React, { useState } from 'react'
import './Popup.jsx'
import './Popup.css'
import Template from './Templates';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


function Popup({trigger, setTrigger, onSubmit}) {
  const priorities = ['P0', 'P1', 'P2'];
  const statuses = ['Assign', 'In Progress', 'Completed', 'Deployed', 'Deffered'];

  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignee, setAssignee] = useState('');
  const [priority, setPriority] = useState('');
  const [status, setStatus] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log({ title, description, assignee, priority, status });
    // Reset form fields after submission
    onSubmit({ title, description, assignee, priority, status, startDate, endDate });
    setTitle('');
    setDescription('');
    setAssignee('');
    setPriority('');
    setStartDate(null);
    setEndDate(null);

    //setShowResult(true);
  };



  return (trigger) ? (
    <div className='popup'>
      <div className='popup-inner'>
        <div className='popup-heading'>
          <h3>Create A Task</h3>
          {/* <button className='close-btn' onClick={() => setTrigger(false)}>close</button> */}
          <img src="src/components/cancelIcon.svg" className='close-btn' alt="" onClick={() => setTrigger(false)}/>
        </div>

       <div>
        <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title"><b>Title:</b></label> <br />
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="description"><b>Description:</b></label> <br />
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
      </div>
      <div>
        <label htmlFor="assignee"><b>Assignee:</b></label> <br />
        <input
          type="text"
          id="assignee"
          value={assignee}
          onChange={(e) => setAssignee(e.target.value)}
        />
      </div> <br />

      <div className='inline-inputs'>
      <div>
        <label htmlFor="priority"><b>Priority:</b></label> &nbsp; 
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
        <label htmlFor="status"><b>Status:</b></label> &nbsp;&nbsp;
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

        </div> <br />

        <div className='startDate'>
              <label htmlFor="startDate"><b>Start Date :</b></label> &nbsp;
              <DatePicker
                selected={startDate}
                onChange={date => setStartDate(date)}
                dateFormat="MM/dd/yyyy"
              />
            </div>
            <div>
              <label htmlFor="endDate"><b>End Date :</b></label> &nbsp;
              <DatePicker
                selected={endDate}
                onChange={date => setEndDate(date)}
                dateFormat="MM/dd/yyyy"
              />
            </div>
        
      <button className="submit" type="submit">Submit</button>
    </form>
    </div>
  
        </div>
      </div>
  
    
  ) : "";
}


export default Popup;
