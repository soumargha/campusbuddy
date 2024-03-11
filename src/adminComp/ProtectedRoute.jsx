import React, { useState } from 'react';

const ProtectedRoute = ({ children }) => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Replace 'adminPassword' with your actual admin password
    if (password === '1234') {
      setIsAuthenticated(true);
    } else {
      setError('Incorrect password');
    }
  };

  if (isAuthenticated) {
    return children;
  }

  return (
    <div className='m-[10%] flex justify-center'>

    <form onSubmit={handleSubmit}>
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="Enter password"
      />
      <button className='border border-black p-2' type="submit">Submit</button>
      {error && <p>{error}</p>}
    </form>
    </div>
  );
};

export default ProtectedRoute;