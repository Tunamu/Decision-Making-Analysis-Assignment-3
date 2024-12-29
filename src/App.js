import React, { useState } from "react";
import DynamicDEXTable from "./templates/DynamicDEXTable";
import EvaluationResults from "./templates/EvaluationResults";

const App = () => {
  const [criteria, setCriteria] = useState([]);
  const [alternatives, setAlternatives] = useState([]);
  const [results, setResults] = useState([]);

  const evaluateAlternatives = () => {
    const weights = { High: 3, Medium: 2, Low: 1 }; // Kategorik ağırlıklar

    const evaluated = alternatives.map((alt) => {
      let totalScore = 0;

      criteria.forEach((criterion) => {
        const category = criterion.category || "Medium";
        const weight = weights[category] || 0;
        const value = alt[criterion.name] || 0;

        // Etki yönüne göre hesaplama
        const adjustedValue =
          criterion.impact === "Negative" ? -value : value;

        totalScore += weight * adjustedValue;
      });

      return { ...alt, totalScore };
    });

    const sortedResults = evaluated.sort((a, b) => b.totalScore - a.totalScore);
    setResults(sortedResults);
  };

  return (
    <div>
      <h1>DEX Karar Destek Sistemi</h1>
      <DynamicDEXTable
        criteria={criteria}
        setCriteria={setCriteria}
        alternatives={alternatives}
        setAlternatives={setAlternatives}
      />
      <button onClick={evaluateAlternatives} style={{ marginTop: "20px" }}>
        Alternatifleri Değerlendir
      </button>
      <EvaluationResults results={results} />
    </div>
  );
};

export default App;
