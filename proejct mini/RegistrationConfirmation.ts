// components/RegistrationConfirmation.tsx
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Props {
  name: string;
  email: string;
  event: string;
}

const RegistrationConfirmation: React.FC<Props> = ({ name, email, event }) => {
  return (
    <div className="bg-light min-vh-100">
      <div className="container mt-5">
        <h1 className="text-center text-success">Registration Successful! 🎉
