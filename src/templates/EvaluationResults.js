import React from "react";

const EvaluationResults = ({ criteria = [], alternatives = [] }) => {
  const weights = { High: 9, Medium: 6, Low: 3 };

  // Kriter puanını hesaplayan fonksiyon
  const calculateScore = (criterion, alternativeValues) => {
    const criterionValue = alternativeValues[criterion.id] || "Medium"; // Varsayılan olarak Medium
    const weight = weights[criterion.category] || 6; // Kendi kategorisinin ağırlığı
    const valueWeight = weights[criterionValue]; // Alternatifin seçilen değeri

    // Alt kriterlerin puanlarını toplayarak ana kriterin puanına ekle
    const subCriteriaScore = (criterion.subCriteria || []).reduce(
      (total, subCriterion) => total + calculateScore(subCriterion, alternativeValues),
      0
    );

    return weight * valueWeight + subCriteriaScore;
  };

  // Tüm alternatiflerin puanlarını hesapla
  const evaluatedAlternatives = alternatives.map((alternative) => {
    const totalScore = criteria.reduce(
      (total, criterion) => total + calculateScore(criterion, alternative.values),
      0
    );

    return { ...alternative, totalScore };
  });

  // Alternatifleri puanlara göre sırala (büyükten küçüğe)
  const sortedAlternatives = [...evaluatedAlternatives].sort(
    (a, b) => b.totalScore - a.totalScore
  );

  // En yüksek puanı belirle
  const highestScore = sortedAlternatives[0]?.totalScore || 0;

  return (
    <div className="evaluation-results">
      <h3>Değerlendirme Sonuçları</h3>
      <table border="1" style={{ width: "100%", marginTop: "20px" }}>
        <thead>
          <tr>
            <th>Alternatif</th>
            <th>Puan</th>
          </tr>
        </thead>
        <tbody>
          {sortedAlternatives.map((alternative) => (
            <tr
              key={alternative.id}
              style={{
                backgroundColor:
                  alternative.totalScore === highestScore ? "#d4edda" : "white",
              }}
            >
              <td>{alternative.name}</td>
              <td>{alternative.totalScore}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EvaluationResults;
