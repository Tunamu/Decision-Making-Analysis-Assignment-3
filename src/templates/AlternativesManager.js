import React, { useState } from "react";

const AlternativesManager = ({ criteria, setAlternatives }) => {
  const [alternatives, setLocalAlternatives] = useState([]);
  const [newAlternative, setNewAlternative] = useState({ name: "" });

  const addAlternative = () => {
    setLocalAlternatives([...alternatives, newAlternative]);
    setAlternatives([...alternatives, newAlternative]);
    setNewAlternative({ name: "" });
  };

  const updateAlternative = (key, value) => {
    setNewAlternative({ ...newAlternative, [key]: value });
  };

  return (
    <div>
      <h2>Alternatifler</h2>
      <input
        type="text"
        placeholder="Alternatif Adı"
        value={newAlternative.name}
        onChange={(e) => updateAlternative("name", e.target.value)}
      />
      {criteria.map((criterion) => (
        <div key={criterion.name}>
          <label>{criterion.name}:</label>
          <input
            type="number"
            placeholder={`0-10 arasında değer`}
            onChange={(e) => updateAlternative(criterion.name, parseFloat(e.target.value))}
          />
        </div>
      ))}
      <button onClick={addAlternative}>Alternatif Ekle</button>
      <ul>
        {alternatives.map((alt, index) => (
          <li key={index}>
            {alt.name} -{" "}
            {criteria.map((criterion) => (
              <span key={criterion.name}>
                {criterion.name}: {alt[criterion.name] || 0},{" "}
              </span>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlternativesManager;
