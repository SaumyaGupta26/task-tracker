import React from 'react'
import './Popup.css'

function Templates({ id, title, description, assignee, priority, status , startDate, endDate, onDelete, onEdit}) {
  
  const formatDate = (dateString) => {
    const parsedDate = new Date(dateString);
    return parsedDate.toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric' });
  };
  
  const handleDelete = () => {
    // Implement delete functionality here
    console.log(id);
    onDelete(id);
  };
  

  return (
    
    <div className="template-container">
      <div className="template">
        <div className="template-header">
          <h2>{title}</h2>
          <span className={`priority priority-${priority.toLowerCase()}`}>{priority}</span>
        </div> <hr />
        <div className="template-body">
          <p>{description}</p>
          <p><b>@{assignee}</b> </p>
          <div className='status-p'>{status}</div>
          <p><strong>Start Date:</strong> {startDate ? formatDate(startDate): ''}</p>
          <p><strong>Submit By :</strong> {endDate ? formatDate(endDate) : ''}</p>
        </div>

        <div className='footer'>
           <button className='last' onClick={onEdit}>Edit</button>
           <button className='last' onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
    
  )
}

export default Templates;
