// components/BaseLayout.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './BaseLayout.css'; // your custom CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fullcalendar/core/main.css';

const BaseLayout: React.FC = ({ children }) => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container">
          <Link className="navbar-brand" to="/">Event Management</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/participants">Participants</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/feedback">Feedback</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container-fluid p-0">
        <div className="image-container">
          <img src="/static/images/event.jpg" className="img-fluid w-100" alt="Event" />
          <div className="overlay">
            <h2 className="text-center text-white">Welcome to Event Management</h2>
            <p className="text-center text-white">Join us for exciting events and workshops!</p>
          </div>
        </div>
      </div>

      {children}

      {/* Bootstrap JS (Optional if using React-Bootstrap) */}
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

      {/* FullCalendar script should be handled via React component */}

      {/* Tawk.to Chat Script */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
              var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
              s1.async=true;
              s1.src='https://embed.tawk.to/67fea724ca85eb1901077e31/1iotbpqhf';
              s1.charset='UTF-8';
              s1.setAttribute('crossorigin','*');
              s0.parentNode.insertBefore(s1,s0);
            })();`
        }}
      />
    </>
  );
};

export default BaseLayout;
