import React, { useState } from "react";

const CriteriaForm = ({ setCriteria }) => {
  const [criteria, setLocalCriteria] = useState([]);
  const [newCriterion, setNewCriterion] = useState("");

  const addCriterion = () => {
    const updatedCriteria = [
      ...criteria,
      { name: newCriterion, weights: { düşük: 1, orta: 2, yüksek: 3 } },
    ];
    setLocalCriteria(updatedCriteria);
    setCriteria(updatedCriteria);
    setNewCriterion("");
  };

  return (
    <div>
      <h2>Kriterler</h2>
      <input
        type="text"
        placeholder="Kriter adı"
        value={newCriterion}
        onChange={(e) => setNewCriterion(e.target.value)}
      />
      <button onClick={addCriterion}>Ekle</button>
      <ul>
        {criteria.map((criterion, index) => (
          <li key={index}>{criterion.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default CriteriaForm;
