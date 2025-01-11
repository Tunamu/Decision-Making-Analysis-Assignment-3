import React, { useState } from "react";
import DynamicDEXTable from "./templates/DynamicDEXTable";
import EvaluationResults from "./templates/EvaluationResults";

const App = () => {
  const [criteria, setCriteria] = useState([]);
  const [alternatives, setAlternatives] = useState([]);
  const [results, setResults] = useState([]);

  const evaluateAlternatives = () => {
    const weights = { High: 3, Medium: 2, Low: 1 };

    const evaluated = alternatives.map((alt) => {
      let totalScore = 0;

      const calculateScore = (criterion) => {
        const category = criterion.category || "Medium";
        const weight = weights[category] || 0;
        const value = alt[criterion.name] || 0;
        const adjustedValue =
          criterion.impact === "Negative" ? -value : value;

        // Alt kriterlerin hesaplanması
        const subCriteriaScore =
          (criterion.subCriteria || []).reduce((subTotal, subCriterion) => {
            const subCategory = subCriterion.category || "Medium";
            const subWeight = weights[subCategory] || 0;
            const subValue = alt[subCriterion.name] || 0;
            const subAdjustedValue =
              subCriterion.impact === "Negative" ? -subValue : subValue;
            return subTotal + subWeight * subAdjustedValue;
          }, 0);

        return weight * adjustedValue + subCriteriaScore;
      };

      // Her kriter ve alt kriterin skoru toplanır
      criteria.forEach((criterion) => {
        totalScore += calculateScore(criterion);
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
