import React, { useState } from "react";

const DynamicTable = ({ setCriteria, setAlternatives }) => {
  const [columns, setColumns] = useState(["Kriter Adı", "Alternatif 1"]); // Varsayılan kolonlar
  const [rows, setRows] = useState([]); // Başlangıçta boş bir tablo
  const [newColumn, setNewColumn] = useState(""); // Yeni kolon adı için state

  // Kolon ekleme
  const addColumn = () => {
    if (newColumn.trim() !== "") {
      setColumns([...columns, newColumn]);
      setNewColumn("");
    }
  };

  // Satır ekleme
  const addRow = () => {
    setRows([...rows, {}]);
  };

  // Hücre güncelleme
  const updateCell = (rowIndex, columnName, value) => {
    const updatedRows = [...rows];
    updatedRows[rowIndex][columnName] = value;
    setRows(updatedRows);

    // Alternatifleri ve kriterleri güncelle
    const alternatives = updatedRows.map((row) =>
      columns.slice(1).reduce((acc, col) => {
        acc[col] = row[col];
        return acc;
      }, {})
    );
    setAlternatives(alternatives);

    const criteria = columns.slice(1).map((col) => ({
      name: col,
      weights: { düşük: 1, orta: 2, yüksek: 3 },
    }));
    setCriteria(criteria);
  };

  return (
    <div>
      <h2>Dinamik Tablo</h2>

      {/* Kolon ekleme */}
      <div>
        <input
          type="text"
          placeholder="Yeni kolon adı"
          value={newColumn}
          onChange={(e) => setNewColumn(e.target.value)}
        />
        <button onClick={addColumn}>Kolon Ekle</button>
      </div>

      {/* Tablo */}
      <table border="1" style={{ marginTop: "20px", width: "100%" }}>
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col, colIndex) => (
                <td key={colIndex}>
                  <input
                    type="text"
                    value={row[col] || ""}
                    onChange={(e) =>
                      updateCell(rowIndex, col, e.target.value)
                    }
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Satır ekleme */}
      <button onClick={addRow} style={{ marginTop: "10px" }}>
        Satır Ekle
      </button>
    </div>
  );
};

export default DynamicTable;
