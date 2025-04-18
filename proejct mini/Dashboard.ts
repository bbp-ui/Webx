// components/Dashboard.tsx
import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

interface DashboardProps {
  eventStats: Record<string, { registrations: number }>;
  feedbackStats: Record<string, { average_score: number }>;
}

const Dashboard: React.FC<DashboardProps> = ({ eventStats, feedbackStats }) => {
  const eventLabels = Object.keys(eventStats);
  const registrationData = Object.values(eventStats).map(stat => stat.registrations);

  const feedbackLabels = Object.keys(feedbackStats);
  const feedbackData = Object.values(feedbackStats).map(stat => stat.average_score);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">📊 Event Analytics Dashboard</h1>

      <div className="mb-5">
        <Bar
          data={{
            labels: eventLabels,
            datasets: [
              {
                label: 'Registrations',
                data: registrationData,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
              },
            ],
          }}
          options={{
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          }}
        />
      </div>

      <div>
        <Line
          data={{
            labels: feedbackLabels,
            datasets: [
              {
                label: 'Average Feedback Score',
                data: feedbackData,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
              },
            ],
          }}
          options={{
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default Dashboard;
