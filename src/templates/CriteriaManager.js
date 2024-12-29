import React, { useState } from "react";

const CriteriaManager = ({ setCriteria }) => {
  const [criteria, setLocalCriteria] = useState([]);
  const [newCriterion, setNewCriterion] = useState("");
  const [weight, setWeight] = useState(1);

  const addCriterion = () => {
    if (newCriterion.trim() !== "") {
      const updatedCriteria = [
        ...criteria,
        { name: newCriterion, weight: parseFloat(weight) },
      ];
      setLocalCriteria(updatedCriteria);
      setCriteria(updatedCriteria);
      setNewCriterion("");
      setWeight(1);
    }
  };

  return (
    <div>
      <h2>Kriterler</h2>
      <input
        type="text"
        placeholder="Kriter Adı"
        value={newCriterion}
        onChange={(e) => setNewCriterion(e.target.value)}
      />
      <input
        type="number"
        placeholder="Ağırlık"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
      />
      <button onClick={addCriterion}>Kriter Ekle</button>
      <ul>
        {criteria.map((criterion, index) => (
          <li key={index}>
            {criterion.name} (Ağırlık: {criterion.weight})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CriteriaManager;
