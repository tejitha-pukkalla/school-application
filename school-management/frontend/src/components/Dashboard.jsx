import React, { useContext } from 'react';
import { AuthContext } from '../context/Authcontext';
import './styles/Dashboard.css';

const Dashboard = () => {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="container header-container">
          <div className="logo">
            <h1>My App</h1>
          </div>
          <div className="user-info">
            <span>Welcome, {currentUser.name}</span>
            <button className="btn btn-outline" onClick={logout}>Logout</button>
          </div>
        </div>
      </header>
      
      <main className="container dashboard-content">
        <div className="welcome-card">
          <h2>Dashboard</h2>
          <p>You are logged in as <strong>{currentUser.email}</strong></p>
          <p>Role: <strong>{currentUser.role}</strong></p>
        </div>
        
        <div className="dashboard-grid">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">Account Info</h3>
              <div className="card-content">
                <p><strong>Name:</strong> {currentUser.name}</p>
                <p><strong>Email:</strong> {currentUser.email}</p>
                <p><strong>User ID:</strong> {currentUser.id}</p>
                <p><strong>Account Type:</strong> {currentUser.role}</p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">Activity</h3>
              <div className="card-content">
                <p>Last login: {new Date().toLocaleString()}</p>
                <p>Status: Active</p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">Quick Actions</h3>
              <div className="card-content">
                <button className="btn btn-primary">Edit Profile</button>
                <button className="btn btn-outline mt-2">Change Password</button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="dashboard-footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} My App. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
