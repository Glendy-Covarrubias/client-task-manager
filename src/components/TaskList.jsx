import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks, deleteTask } from '../features/tasks/tasksSlice';
import FormTask from '../components/FormTask';

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleCloseForm = () => {
    setShowForm(false);
    setTaskToEdit(null);
  };

  const handleEdit = (task) => {
    setTaskToEdit(task);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };


  if (!Array.isArray(tasks)) {
    return <div>Loading or no tasks available</div>;
  }

  return (
    <div className="card p-3">
      <div className="card-body">
        <div className='d-flex justify-content-between align-items-center mb-2'>
          <div>
            <h3>Task List</h3>
          </div>
          <div className="d-flex gap-2">
            <button
              className="btn btn-primary"
              onClick={() => setShowForm(true)}
            >
              Agregar
            </button>
          </div>
        </div>
        <hr />

        {showForm ? (
          <FormTask onClose={handleCloseForm} task={taskToEdit} />
        ) : (
          <>
            {tasks.map((task) => (
              <div key={task.id} className="d-flex justify-content-between align-items-center mb-2">
                <div>
                  <h5>{task.title}</h5>
                  <p>{task.description}</p>
                </div>
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-secondary me-3"
                    onClick={() => handleEdit(task)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(task.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default TaskList;
