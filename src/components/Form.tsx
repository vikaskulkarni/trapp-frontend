import React, { useState } from 'react';

interface FormProps {
  addFriend: (friend: { name: string; size: string }) => void;
}

const Form: React.FC<FormProps> = ({ addFriend }) => {
  const [name, setName] = useState<string>('');
  const [size, setSize] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && size) {
      addFriend({ name, size });
      setName('');
      setSize('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
      <select 
        value={size} 
        onChange={(e) => setSize(e.target.value)}
      >
        <option value="">Select Size</option>
        <option value="Small (38 in)">Small (38 in)</option>
        <option value="Medium (40 in)">Medium (40 in)</option>
        <option value="Large (42 in)">Large (42 in)</option>
        <option value="Extra Large (44 in)">Extra Large (44 in)</option>
      </select>
      <button type="submit">Submit</button>
    </form>
  );
}

export default Form;