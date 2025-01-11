import React, { useState } from "react";
import DynamicDEXTable from "./templates/DynamicDEXTable";
import EvaluationResults from "./templates/EvaluationResults";
import "./App.css";

const App = () => {
  const [criteria, setCriteria] = useState([]);
  const [alternatives, setAlternatives] = useState([]);
  const [results, setResults] = useState([]);

  const evaluateAlternatives = () => {
    const weights = { High: 3, Medium: 2, Low: 1 };

    const calculateScore = (criterion, alt) => {
      const category = criterion.category || "Medium";
      const weight = weights[category] || 0;
      const value = alt[criterion.name] || 0;
      const adjustedValue = criterion.impact === "Negative" ? -value : value;

      // Alt kriterlerin hesaplanması
      const subCriteriaScore = (criterion.subCriteria || []).reduce(
        (subTotal, subCriterion) => {
          return subTotal + calculateScore(subCriterion, alt);
        },
        0
      );

      return weight * adjustedValue + subCriteriaScore;
    };

    const evaluated = alternatives.map((alt) => {
      let totalScore = 0;

      criteria.forEach((criterion) => {
        totalScore += calculateScore(criterion, alt);
      });

      return { ...alt, totalScore };
    });

    const sortedResults = evaluated.sort((a, b) => b.totalScore - a.totalScore);
    setResults(sortedResults);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>DEX Karar Destek Sistemi</h1>
      </header>
      <main className="app-main">
        <DynamicDEXTable
          criteria={criteria}
          setCriteria={setCriteria}
          alternatives={alternatives}
          setAlternatives={setAlternatives}
        />
        <button
          onClick={evaluateAlternatives}
          className="evaluate-button"
        >
          Alternatifleri Değerlendir
        </button>
        <EvaluationResults criteria={criteria} alternatives={results} />
      </main>
    </div>
  );
};

export default App;
