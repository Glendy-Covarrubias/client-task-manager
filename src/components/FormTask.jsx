import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, updateTask } from '../features/tasks/tasksSlice';
import { fetchUserName } from '../features/users/usersSlice';

const FormTask = ({ onClose, task }) => {

    const user = useSelector((state) => state.users.user);

    const [title, setTitle] = useState('');
    const [status, setStatus] = useState('');
    const [description, setDescription] = useState('');
    const [ownerId, setOwnerId] = useState(null);

    const dispatch = useDispatch();

    useEffect(() => {
        const username = localStorage.getItem('user');
        if (username) {
            dispatch(fetchUserName(username)).then((action) => {
                if (action.payload) {
                    setOwnerId(action.payload.result.id);
                }
            });
        }
    }, []);

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
            setStatus(task.status);
        }
    }, [task]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newTask = {
            id: task?.id,
            title,
            description,
            status,
            ownerId,
        };

        if (task?.id) {
            dispatch(updateTask(newTask)); // Editar tarea existente
        } else {
            dispatch(addTask(newTask)); // Crear nueva tarea
        }

        setTitle('');
        setDescription('');
        setStatus('');
        onClose();
    };

    return (
        <div className="card p-3 mb-4">
            <h3>{task ? 'Edit Task' : 'Add Task'}</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Task Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <textarea
                        className="form-control"
                        placeholder="Task Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <select
                        className="form-control form-select"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="Pendiente">Pendiente</option>
                        <option value="En Progreso">En Progreso</option>
                        <option value="Completada">Completada</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">
                    {task ? 'Update Task' : 'Add Task'}
                </button>
            </form>
        </div>
    );
};

export default FormTask;