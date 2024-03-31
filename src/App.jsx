import { useState, useEffect } from 'react'
import Templates from './components/Templates'
import './App.css'

import Popup from './components/Popup';
import {v4 as uuidv4} from 'uuid';
import EditPopup from './components/EditPopup';
import DeletePopup from './components/DeletePopup';

function App() {
   const [buttonPopup, setButtonPopup] = useState(false);
   const [showResult, setShowResult] = useState(false);
   const [taskData, setTaskData] = useState([]);
   const [editPopup, setEditPopup] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [deletePopup, setDeletePopup] = useState(false);
  const [deleteTaskId, setDeleteTaskId] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [assigneeFilter, setAssigneeFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [sortOption, setSortOption] = useState('');

   useEffect(() => {
    // Retrieve task data from localStorage when component mounts
    const storedData = localStorage.getItem('taskData');
    if (storedData) {
       const parsedData = JSON.parse(storedData);
      setTaskData(parsedData);
      setFilteredData(parsedData);
      setShowResult(true);
    }
  }, []);

   const handleFormSubmit = (data) => {
    const updatedTaskData = [...taskData, { ...data, id: uuidv4(),  startDate: data.startDate, endDate: data.endDate, }];
    setTaskData(updatedTaskData);
    setFilteredData(updatedTaskData);
    setShowResult(true);
    setButtonPopup(false);

    localStorage.setItem('taskData', JSON.stringify(updatedTaskData));
  };


  //checks if the status is completed or not
  const handleDelete = (id) => {
    const taskToDelete = taskData.find((task) => task.id === id);

  // if (taskToDelete && taskToDelete.status === "Completed") {
  //   alert('Cannot delete completed task.');
  //   return; 
  //}

  setDeleteTaskId(id);
  setDeletePopup(true);
  };

 const confirmDelete = () => {
  if (deleteTaskId) {
    const updatedTaskData = taskData.filter((task) => task.id !== deleteTaskId);
    setTaskData(updatedTaskData);
    setFilteredData(updatedTaskData);
    localStorage.setItem('taskData', JSON.stringify(updatedTaskData));
    setDeletePopup(false);
  }
  };

  const handleEdit = (task) => {
    setEditTask(task);
    setEditPopup(true);
  };

  const handleEditSave = (updatedTask) => {
    const updatedTaskData = taskData.map(task => (task.id === updatedTask.id ? updatedTask : task));
    setTaskData(updatedTaskData);
    setFilteredData(updatedTaskData);
    localStorage.setItem('taskData', JSON.stringify(updatedTaskData));
    setEditPopup(false);
  };

  const applyFilter = (assignee, priority) => {
    if (!assignee && !priority) {
      setFilteredData(taskData); // Reset filter if both fields are empty
    } else {
      const filteredTasks = taskData.filter(task =>
        (!assignee || task.assignee === assigneeFilter) &&
        (!priority || task.priority === priorityFilter)
      );
      setFilteredData(filteredTasks);
    }
  };

  //sorts the tasks n basis of priority, start and end date
  const handleSort = (option) => {
    let sortedTasks = [...filteredData];

    if (option === 'priority') {
      sortedTasks.sort((a, b) => {
        if (a.priority < b.priority) return -1;
        if (a.priority > b.priority) return 1;
        return 0;
      });
    } else if (option === 'startDate') {
      sortedTasks.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
    } else if (option === 'endDate') {
      sortedTasks.sort((a, b) => new Date(a.endDate) - new Date(b.endDate));
    }

    setFilteredData(sortedTasks);
  };



  return (
    <div className="background">
    <div className='header'>
        <h2>Task Board</h2>
        
    </div>

    <div className='filter'>
      <div className='filter-head'>
      <div className='filter-div'>
          <label><b>Filter Assignee:</b> &nbsp;</label>
          <input placeholder="@assignee" type='text' value={assigneeFilter} onChange={(e) => setAssigneeFilter(e.target.value)}  style={{ width: '120px', height: '20px' }} />
        </div> 

        <div className='filter-div'>
        <label><b>Filter Priority:</b> &nbsp;</label>
          <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)} style={{ width: '150px', height: '27px' }}>
          <option value="">Select Priority</option>
          <option value="P0">P0</option>
          <option value="P1">P1</option>
          <option value="P2">P2</option>
        </select>
        </div>
        <button className="filter-btn" onClick={applyFilter}>Apply Filter</button>
        </div>

        <div className='sort-section'>
        <label><b>Sort by : </b></label>
        <select value={sortOption} onChange={(e) => setSortOption(e.target.value)} style={{ width: '130px', height: '27px' }}>
          <option value="">Select Sort Option</option>
          <option value="priority">Priority</option>
          <option value="startDate">Start Date</option>
          <option value="endDate">End Date</option>
        </select>
        <button onClick={() => handleSort(sortOption)}>Apply Sort</button>
      </div>

    </div>

    <div className='newTask'>
      <button onClick={()=> setButtonPopup(true)}>Add New Task</button>
      {buttonPopup && ( // Check if buttonPopup is true before rendering Popup
          <Popup trigger={buttonPopup} setTrigger={setButtonPopup} onSubmit={handleFormSubmit}>
            <h3>Create a Task</h3>
          </Popup>
        )}
    </div>
    <div className='template-div'>
    {showResult && filteredData.map((task) => (
          <Templates key={task.id} {...task} onDelete={handleDelete} onEdit={() => handleEdit(task)}/>
        ))}
    </div> <br />
    <div>
      {editPopup && (
        <EditPopup task={editTask} onClose={() => setEditPopup(false)} onSave={handleEditSave} />
      )}
    </div> 
    <div>
    {deletePopup && (
        <DeletePopup onClose={() => setDeletePopup(false)} onDelete={confirmDelete} />
      )}
    </div>
  </div>
  )
}

export default App
