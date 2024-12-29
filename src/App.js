import React, { useState } from "react";
import DynamicTable from "./templates/DynamicTable";
import EvaluationResults from "./templates/EvaluationResults";

const App = () => {
  const [alternatives, setAlternatives] = useState([]);
  const [criteria, setCriteria] = useState([]);
  const [results, setResults] = useState([]);

  const evaluateAlternatives = () => {
    // Basit değerlendirme algoritması
    const evaluated = alternatives.map((alt) => {
      let score = 0;
      criteria.forEach((criterion) => {
        const value = alt[criterion.name];
        score += criterion.weights[value] || 0; // Ağırlıkları kullan
      });
      return { ...alt, score };
    });

    // Alternatifleri sıralama
    setResults(evaluated.sort((a, b) => b.score - a.score));
  };

  return (
    <div>
      <h1>Karar Destek Sistemi</h1>

      <DynamicTable setCriteria={setCriteria} setAlternatives={setAlternatives} />

      <button onClick={evaluateAlternatives} style={{ marginTop: "20px" }}>
        Alternatifleri Değerlendir
      </button>

      <EvaluationResults results={results} />
    </div>
  );
};

export default App;
