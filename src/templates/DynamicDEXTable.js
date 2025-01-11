import React, { useState } from "react";

const DynamicDEXTable = () => {
  const [criteria, setCriteria] = useState([]);
  const [alternatives, setAlternatives] = useState([]);
  const [newCriterion, setNewCriterion] = useState("");
  const [newCategory, setNewCategory] = useState("Medium");
  const [newImpact, setNewImpact] = useState("Positive");
  const [parentCriterionId, setParentCriterionId] = useState(null);
  const [newAlternative, setNewAlternative] = useState("");

  // Kriter veya alt kriter ekleme
  const addCriterion = (parentId = null) => {
    if (newCriterion.trim() !== "") {
      const newEntry = {
        id: Date.now(),
        name: newCriterion,
        category: newCategory,
        impact: newImpact,
        subCriteria: [],
      };

      if (parentId === null) {
        // Ana kriter ekle
        setCriteria([...criteria, newEntry]);
      } else {
        // Alt kriter ekle
        const updatedCriteria = addSubCriterion(criteria, parentId, newEntry);
        setCriteria(updatedCriteria);
      }

      setNewCriterion("");
      setParentCriterionId(null);
    }
  };

  // Alt kriter ekleme işlevi (hiyerarşi destekli)
  const addSubCriterion = (list, parentId, newEntry) =>
    list.map((item) =>
      item.id === parentId
        ? {
            ...item,
            subCriteria: [...item.subCriteria, newEntry],
          }
        : {
            ...item,
            subCriteria: addSubCriterion(item.subCriteria, parentId, newEntry),
          }
    );

  // Alternatif ekleme
  const addAlternative = () => {
    if (newAlternative.trim() !== "") {
      const newAlt = { id: Date.now(), name: newAlternative, values: {} };
      setAlternatives([...alternatives, newAlt]);
      setNewAlternative("");
    }
  };

  // Alternatif değerlerini güncelleme
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

  // Kriterlerin ve alt kriterlerin hiyerarşik olarak tabloya eklenmesi
  const renderCriteria = (criteriaList, alternative, depth = 0) =>
    criteriaList.flatMap((criterion) => {
      const mainRow = (
        <tr key={`${alternative.id}-${criterion.id}`}>
          <td style={{ paddingLeft: `${depth * 20}px` }}>
            {criterion.name} ({criterion.category}, {criterion.impact})
          </td>
          <td>
            <input
              type="number"
              placeholder={criterion.name}
              value={alternative.values[criterion.id] || ""}
              onChange={(e) =>
                updateAlternative(alternative.id, criterion.id, e.target.value)
              }
            />
          </td>
          <td>
            <button onClick={() => setParentCriterionId(criterion.id)}>
              Alt Kriter Ekle
            </button>
          </td>
        </tr>
      );

      const subRows = renderCriteria(
        criterion.subCriteria,
        alternative,
        depth + 1
      );

      return [mainRow, ...subRows];
    });

  return (
    <div>
      <h2>Kriterler ve Alternatifler</h2>

      {/* Yeni kriter ekleme */}
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
        {parentCriterionId === null ? (
          <button onClick={() => addCriterion(null)}>Kriter Ekle</button>
        ) : (
          <button onClick={() => addCriterion(parentCriterionId)}>
            Alt Kriter Ekle
          </button>
        )}
      </div>

      {/* Alternatif ekleme */}
      <div>
        <input
          type="text"
          placeholder="Alternatif Adı"
          value={newAlternative}
          onChange={(e) => setNewAlternative(e.target.value)}
        />
        <button onClick={addAlternative}>Alternatif Ekle</button>
      </div>

      {/* Dinamik Tablo */}
      <table border="1" style={{ marginTop: "20px", width: "100%" }}>
        <thead>
          <tr>
            <th>Kriter</th>
            <th>Değer</th>
            <th>İşlemler</th>
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
