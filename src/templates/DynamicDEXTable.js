import React, { useState } from "react";

const DynamicDEXTable = ({ criteria, setCriteria, alternatives, setAlternatives }) => {
  const [newCriterion, setNewCriterion] = useState("");
  const [newCategory, setNewCategory] = useState("Medium");
  const [newImpact, setNewImpact] = useState("Positive");
  const [newAlternative, setNewAlternative] = useState({ name: "" });

  // Yeni kriter ekleme
  const addCriterion = () => {
    if (newCriterion.trim() !== "") {
      setCriteria([
        ...criteria,
        { name: newCriterion, category: newCategory, impact: newImpact },
      ]);
      setNewCriterion("");
      setNewCategory("Medium");
      setNewImpact("Positive");
    }
  };

  // Yeni alternatif ekleme
  const addAlternative = () => {
    setAlternatives([...alternatives, newAlternative]);
    setNewAlternative({ name: "" });
  };

  // Alternatif güncelleme
  const updateAlternative = (index, criterion, value) => {
    const updatedAlternatives = [...alternatives];
    updatedAlternatives[index] = {
      ...updatedAlternatives[index],
      [criterion]: parseFloat(value),
    };
    setAlternatives(updatedAlternatives);
  };

  return (
    <div>
      <h2>Kriterler ve Alternatifler</h2>

      {/* Kriter Ekleme */}
      <div>
        <input
          type="text"
          placeholder="Kriter Adı"
          value={newCriterion}
          onChange={(e) => setNewCriterion(e.target.value)}
        />
        <select
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <select
          value={newImpact}
          onChange={(e) => setNewImpact(e.target.value)}
        >
          <option value="Positive">Pozitif</option>
          <option value="Negative">Negatif</option>
        </select>
        <button onClick={addCriterion}>Kriter Ekle</button>
      </div>

      {/* Alternatif Ekleme */}
      <div>
        <input
          type="text"
          placeholder="Alternatif Adı"
          value={newAlternative.name}
          onChange={(e) =>
            setNewAlternative({ ...newAlternative, name: e.target.value })
          }
        />
        <button onClick={addAlternative}>Alternatif Ekle</button>
      </div>

      {/* Dinamik Tablo */}
      <table border="1" style={{ marginTop: "20px", width: "100%" }}>
        <thead>
          <tr>
            <th>Alternatifler</th>
            {criteria.map((criterion, index) => (
              <th key={index}>
                {criterion.name} ({criterion.category}, {criterion.impact})
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {alternatives.map((alt, rowIndex) => (
            <tr key={rowIndex}>
              <td>{alt.name}</td>
              {criteria.map((criterion, colIndex) => (
                <td key={colIndex}>
                  <input
                    type="number"
                    value={alt[criterion.name] || ""}
                    onChange={(e) =>
                      updateAlternative(rowIndex, criterion.name, e.target.value)
                    }
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicDEXTable;
