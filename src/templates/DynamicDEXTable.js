import React, { useState } from "react";

const DynamicDEXTable = ({ criteria, setCriteria, alternatives, setAlternatives }) => {
  const [newCriterion, setNewCriterion] = useState("");
  const [newCategory, setNewCategory] = useState("Medium");
  const [selectedCriterion, setSelectedCriterion] = useState(null);
  const [newAlternative, setNewAlternative] = useState("");

  const addCriterion = () => {
    if (newCriterion.trim() !== "") {
      const newEntry = {
        id: Date.now(),
        name: newCriterion,
        category: newCategory,
        subCriteria: [],
      };

      if (!selectedCriterion) {
        setCriteria([...criteria, newEntry]);
      } else {
        const updatedCriteria = addSubCriterion(criteria, selectedCriterion, newEntry);
        setCriteria(updatedCriteria);
      }

      setNewCriterion("");
      setSelectedCriterion(null);
    }
  };

  const addSubCriterion = (list, parentId, newEntry) =>
    list.map((item) =>
      item.id === parentId
        ? { ...item, subCriteria: [...item.subCriteria, newEntry] }
        : { ...item, subCriteria: addSubCriterion(item.subCriteria, parentId, newEntry) }
    );

  const addAlternative = () => {
    if (newAlternative.trim() !== "") {
      const newAlt = { id: Date.now(), name: newAlternative, values: {} };
      setAlternatives([...alternatives, newAlt]);
      setNewAlternative("");
    }
  };

  const updateAlternative = (alternativeId, criterionId, value) => {
    const updatedAlternatives = alternatives.map((alternative) =>
      alternative.id === alternativeId
        ? {
            ...alternative,
            values: {
              ...alternative.values,
              [criterionId]: value,
            },
          }
        : alternative
    );
    setAlternatives(updatedAlternatives);
  };

  const renderCriteria = (criteriaList, alternative, depth = 0) =>
    criteriaList.flatMap((criterion) => {
      const mainRow = (
        <tr key={`${alternative.id}-${criterion.id}`}>
          <td style={{ paddingLeft: `${depth * 20}px` }}>
            {criterion.name} ({criterion.category})
          </td>
          <td>
            {criterion.subCriteria.length > 0 ? (
              <span>-</span>
            ) : (
              <select
                value={alternative.values[criterion.id] || "Medium"}
                onChange={(e) =>
                  updateAlternative(alternative.id, criterion.id, e.target.value)
                }
              >
                <option value="High">Good/High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Bad/Low</option>
              </select>
            )}
          </td>
          <td>
            <button onClick={() => setSelectedCriterion(criterion.id)}>
              Add Sub-Criterion
            </button>
          </td>
        </tr>
      );

      const subRows = renderCriteria(criterion.subCriteria, alternative, depth + 1);

      return [mainRow, ...subRows];
    });

  return (
    <div>
      <h2>Criteria and Alternatives</h2>

      <div style={{ marginBottom: "20px" }}>
        <h3>Add Criterion</h3>
        <input
          type="text"
          placeholder="Criterion Name"
          value={newCriterion}
          onChange={(e) => setNewCriterion(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <select
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          style={{ marginRight: "10px" }}
        >
          <option value="High">Good/High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Bad/Low</option>
        </select>
        <button onClick={addCriterion}>
          {selectedCriterion ? "Add Sub-Criterion" : "Add Criterion"}
        </button>
        {selectedCriterion && (
          <div style={{ marginTop: "10px", color: "green" }}>
            Adding to "{criteria.find((c) => c.id === selectedCriterion)?.name}" criterion
          </div>
        )}
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h3>Add Alternative</h3>
        <input
          type="text"
          placeholder="Alternative Name"
          value={newAlternative}
          onChange={(e) => setNewAlternative(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <button onClick={addAlternative}>Add Alternative</button>
      </div>

      <table border="1" style={{ marginTop: "20px", width: "100%" }}>
        <thead>
          <tr>
            <th>Criterion</th>
            <th>Value</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {alternatives.map((alternative) => (
            <React.Fragment key={alternative.id}>
              <tr>
                <td colSpan="3">
                  <strong>{alternative.name}</strong>
                </td>
              </tr>
              {renderCriteria(criteria, alternative)}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicDEXTable;
