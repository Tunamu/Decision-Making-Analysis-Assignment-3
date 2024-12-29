import React, { useState } from "react";

const AlternativesForm = ({ criteria, setAlternatives }) => {
  const [alternatives, setLocalAlternatives] = useState([]);
  const [newAlternative, setNewAlternative] = useState({});

  const addAlternative = () => {
    setLocalAlternatives([...alternatives, newAlternative]);
    setAlternatives([...alternatives, newAlternative]);
    setNewAlternative({});
  };

  return (
    <div>
      <h2>Alternatifler</h2>
      <div>
        {criteria.map((criterion) => (
          <div key={criterion.name}>
            <label>{criterion.name}</label>
            <select
              onChange={(e) =>
                setNewAlternative({
                  ...newAlternative,
                  [criterion.name]: e.target.value,
                })
              }
            >
              <option value="düşük">Düşük</option>
              <option value="orta">Orta</option>
              <option value="yüksek">Yüksek</option>
            </select>
          </div>
        ))}
      </div>
      <button onClick={addAlternative}>Alternatif Ekle</button>
      <ul>
        {alternatives.map((alt, index) => (
          <li key={index}>
            {criteria.map((criterion) => (
              <span key={criterion.name}>
                {criterion.name}: {alt[criterion.name]}{" "}
              </span>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlternativesForm;
