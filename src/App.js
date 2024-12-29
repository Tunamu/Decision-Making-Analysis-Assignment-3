import React, { useState } from "react";
import CriteriaManager from "./templates/CriteriaManager";
import AlternativesManager from "./templates/AlternativesManager";
import EvaluationResults from "./templates/EvaluationResults";

const App = () => {
  const [criteria, setCriteria] = useState([]);
  const [alternatives, setAlternatives] = useState([]);
  const [results, setResults] = useState([]);

  const evaluateAlternatives = () => {
    // Alternatifleri değerlendir
    const evaluated = alternatives.map((alt) => {
      let totalScore = 0;

      criteria.forEach((criterion) => {
        const weight = criterion.weight || 1;
        const value = alt[criterion.name] || 0;
        totalScore += weight * value; // Kriter ağırlığını kullan
      });

      return { ...alt, totalScore };
    });

    // Alternatifleri skora göre sırala
    const sortedResults = evaluated.sort((a, b) => b.totalScore - a.totalScore);
    setResults(sortedResults);
  };

  return (
    <div>
      <h1>DEX Karar Destek Sistemi</h1>
      <CriteriaManager setCriteria={setCriteria} />
      <AlternativesManager criteria={criteria} setAlternatives={setAlternatives} />
      <button onClick={evaluateAlternatives} style={{ marginTop: "20px" }}>
        Alternatifleri Değerlendir
      </button>
      <EvaluationResults results={results} />
    </div>
  );
};

export default App;
