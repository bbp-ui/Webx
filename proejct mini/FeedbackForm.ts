// components/FeedbackForm.tsx
import React, { useState } from 'react';

interface FeedbackFormProps {
  events: string[];
  onSubmit: (data: { event: string; name: string; feedback: string }) => void;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ events, onSubmit }) => {
  const [selectedEvent, setSelectedEvent] = useState('');
  const [name, setName] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ event: selectedEvent, name, feedback });

    // Optional: Reset form
    setSelectedEvent('');
    setName('');
    setFeedback('');
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">📝 Event Feedback</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="event" className="form-label">Event</label>
          <select
            className="form-select"
            id="event"
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value)}
            required
          >
            <option value="" disabled>Select an event</option>
            {events.map((event, index) => (
              <option key
