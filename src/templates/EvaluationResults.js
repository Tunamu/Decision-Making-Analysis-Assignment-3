import React from "react";

const EvaluationResults = ({ results }) => {
  return (
    <div>
      <h2>Değerlendirme Sonuçları</h2>
      <table border="1" style={{ marginTop: "20px", width: "100%" }}>
        <thead>
          <tr>
            <th>Alternatif</th>
            <th>Skor</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr key={index}>
              <td>{result.name || `Alternatif ${index + 1}`}</td>
              <td>{result.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EvaluationResults;
