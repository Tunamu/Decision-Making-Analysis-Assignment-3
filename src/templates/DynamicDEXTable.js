import React, { useState } from "react";

const DynamicDEXTable = () => {
  const [criteria, setCriteria] = useState([]);
  const [alternatives, setAlternatives] = useState([]);
  const [newCriterion, setNewCriterion] = useState("");
  const [newCategory, setNewCategory] = useState("Medium");
  const [selectedCriterion, setSelectedCriterion] = useState(null); // Kriter seçimi
  const [newAlternative, setNewAlternative] = useState("");

  // Kriter veya alt kriter ekleme
  const addCriterion = () => {
    if (newCriterion.trim() !== "") {
      const newEntry = {
        id: Date.now(),
        name: newCriterion,
        category: newCategory,
        subCriteria: [],
      };

      if (!selectedCriterion) {
        // Ana kriter ekle
        setCriteria([...criteria, newEntry]);
      } else {
        // Alt kriter ekle
        const updatedCriteria = addSubCriterion(criteria, selectedCriterion, newEntry);
        setCriteria(updatedCriteria);
      }

      setNewCriterion("");
      setSelectedCriterion(null);
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
            {criterion.name} ({criterion.category})
          </td>
          <td>
            {criterion.subCriteria.length > 0 ? (
              <span>-</span> // Alt kriteri olan kriterler için çizgi
            ) : (
              <select
                value={alternative.values[criterion.id] || "Medium"}
                onChange={(e) =>
                  updateAlternative(alternative.id, criterion.id, e.target.value)
                }
              >
                <option value="High">Yüksek</option>
                <option value="Medium">Orta</option>
                <option value="Low">Düşük</option>
              </select>
            )}
          </td>
          <td>
            <button onClick={() => setSelectedCriterion(criterion.id)}>
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

      {/* Ana ve Alt Kriter Ekleme */}
      <div style={{ marginBottom: "20px" }}>
        <h3>Kriter Ekle</h3>
        <input
          type="text"
          placeholder="Kriter Adı"
          value={newCriterion}
          onChange={(e) => setNewCriterion(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <select
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          style={{ marginRight: "10px" }}
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <button onClick={addCriterion}>
          {selectedCriterion ? "Alt Kriter Ekle" : "Kriter Ekle"}
        </button>
        {selectedCriterion && (
          <div style={{ marginTop: "10px", color: "green" }}>
            "{criteria.find((c) => c.id === selectedCriterion)?.name}" kriterine ekleniyor
          </div>
        )}
      </div>

      {/* Alternatif ekleme */}
      <div style={{ marginBottom: "20px" }}>
        <h3>Alternatif Ekle</h3>
        <input
          type="text"
          placeholder="Alternatif Adı"
          value={newAlternative}
          onChange={(e) => setNewAlternative(e.target.value)}
          style={{ marginRight: "10px" }}
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
