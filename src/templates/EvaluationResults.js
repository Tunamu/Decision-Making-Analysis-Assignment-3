import React from "react";

const EvaluationResults = ({ results }) => {
  return (
    <div>
      <h2>Değerlendirme Sonuçları</h2>
      <table border="1" style={{ marginTop: "20px", width: "100%" }}>
        <thead>
          <tr>
            <th>Alternatif</th>
            <th>Toplam Skor</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr key={index}>
              <td>{result.name}</td>
              <td>{result.totalScore}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EvaluationResults;
