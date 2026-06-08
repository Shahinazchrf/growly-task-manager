import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { taskAPI } from '../services/api';
import NbetaPlant from '../components/NbetaPlant';

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    category: 'personal',
    deadline: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const { data } = await taskAPI.getAllTasks();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      await taskAPI.createTask(newTask);
      toast.success('Task added! 🌱');
      setShowForm(false);
      setNewTask({ title: '', category: 'personal', deadline: new Date().toISOString().split('T')[0] });
      fetchTasks();
    } catch (error) {
      toast.error('Failed to add task');
    }
  };

  const handleToggleTask = async (id, completed) => {
    try {
      await taskAPI.toggleTask(id);
      fetchTasks();
      toast.success(completed ? 'Task marked incomplete' : 'Task completed! 🌿');
    } catch (error) {
      toast.error('Failed to update task');
    }
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm('Delete this task?')) {
      try {
        await taskAPI.deleteTask(id);
        toast.success('Task deleted');
        fetchTasks();
      } catch (error) {
        toast.error('Failed to delete task');
      }
    }
  };

  const completedTasks = tasks.filter(t => t.completed).length;
  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter(t => !t.completed).length;
  const overdueTasks = tasks.filter(t => {
    if (t.completed) return false;
    return new Date(t.deadline) < new Date();
  }).length;
  
  const plantScore = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Logged out! 👋');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="relative bg-gradient-to-r from-growly to-growly-dark text-white">
        <div className="container mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Welcome back, {user.name || 'User'}! 🌱</h1>
              <p className="text-growly-light mt-1 text-sm">Here's your productivity overview</p>
            </div>
            <button onClick={handleLogout} className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium">
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <p className="text-gray-500 text-xs">Total</p>
            <p className="text-2xl font-bold text-growly">{totalTasks}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <p className="text-gray-500 text-xs">Completed</p>
            <p className="text-2xl font-bold text-green-600">{completedTasks}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <p className="text-gray-500 text-xs">Pending</p>
            <p className="text-2xl font-bold text-orange-500">{pendingTasks}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <p className="text-gray-500 text-xs">Overdue</p>
            <p className="text-2xl font-bold text-red-500">{overdueTasks}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
          <div className="flex justify-between mb-1">
            <span className="text-gray-600 text-sm">Your Progress</span>
            <span className="text-growly font-bold text-sm">{Math.round(plantScore)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-growly h-2 rounded-full transition-all duration-500"
              style={{ width: `${plantScore}%` }}
            />
          </div>
        </div>

        {/* Nbeta Plant + Quick Actions */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <NbetaPlant 
            score={plantScore}
            completedTasks={completedTasks}
            totalTasks={totalTasks}
          />

          {/* Quick Actions with Add Task Form INSIDE */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            {!showForm ? (
              <>
                <h3 className="text-gray-700 font-medium mb-3 text-center">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => setShowForm(true)}
                    className="bg-growly text-white py-2 rounded-lg text-sm font-medium hover:bg-growly-dark transition"
                  >
                    + Add Task
                  </button>
                  <button className="border border-growly text-growly py-2 rounded-lg text-sm font-medium hover:bg-growly/10 transition">
                    View Tasks
                  </button>
                  <button className="border border-gray-300 text-gray-600 py-2 rounded-lg text-sm hover:bg-gray-50 transition">
                    Categories
                  </button>
                  <button className="border border-gray-300 text-gray-600 py-2 rounded-lg text-sm hover:bg-gray-50 transition">
                    Settings
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-gray-700 font-medium">Add New Task</h3>
                  <button 
                    onClick={() => setShowForm(false)}
                    className="text-gray-400 hover:text-gray-600 text-sm"
                  >
                    ✕
                  </button>
                </div>
                <form onSubmit={handleAddTask} className="space-y-3">
                  <input
                    type="text"
                    placeholder="Task title"
                    className="w-full p-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-growly"
                    value={newTask.title}
                    onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                    required
                  />
                  <select
                    className="w-full p-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-growly"
                    value={newTask.category}
                    onChange={(e) => setNewTask({...newTask, category: e.target.value})}
                  >
                    <option value="study">📚 Study</option>
                    <option value="work">💼 Work</option>
                    <option value="personal">🏠 Personal</option>
                  </select>
                  <input
                    type="date"
                    className="w-full p-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-growly"
                    value={newTask.deadline}
                    onChange={(e) => setNewTask({...newTask, deadline: e.target.value})}
                    required
                  />
                  <button type="submit" className="w-full bg-growly text-white py-2 rounded-lg text-sm font-medium hover:bg-growly-dark transition">
                    Create Task
                  </button>
                </form>
              </>
            )}
          </div>
        </div>

        {/* Tasks List */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-gray-800">Your Tasks</h3>
            {!showForm && (
              <button 
                onClick={() => setShowForm(true)}
                className="text-growly text-sm"
              >
                + New
              </button>
            )}
          </div>

          {loading ? (
            <p className="text-gray-500 text-center py-4 text-sm">Loading...</p>
          ) : tasks.length === 0 ? (
            <p className="text-gray-400 text-center py-4 text-sm">No tasks yet. Add your first task!</p>
          ) : (
            <div className="space-y-2">
              {tasks.map(task => {
                const isOverdue = !task.completed && new Date(task.deadline) < new Date();
                return (
                  <div key={task._id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => handleToggleTask(task._id, task.completed)}
                        className="w-4 h-4"
                      />
                      <div>
                        <p className={`text-sm ${task.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                          {task.title}
                        </p>
                        <p className="text-xs text-gray-400">
                          {task.category} • Due: {new Date(task.deadline).toLocaleDateString()}
                          {isOverdue && <span className="text-red-500 ml-1">Overdue!</span>}
                        </p>
                      </div>
                    </div>
                    <button onClick={() => handleDeleteTask(task._id)} className="text-red-400 text-sm">🗑️</button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
