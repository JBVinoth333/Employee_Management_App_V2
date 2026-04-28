import { useState } from 'react';
import InputField from '../../../components/InputField';

function AddDepartmentForm({ onAdd }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onAdd({ departmentName: name, description });
    setName('');
    setDescription('');
  }

  return (
    <form className="add-dept-form" onSubmit={handleSubmit}>
      <h2>Add Department</h2>
      <div className="grid">
        <InputField label="Department Name" value={name} onChange={setName} />
        <InputField label="Description" value={description} onChange={setDescription} />
      </div>
      <button type="submit">Add Department</button>
    </form>
  );
}

export default AddDepartmentForm;
