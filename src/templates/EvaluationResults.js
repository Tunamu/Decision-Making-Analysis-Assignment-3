import React from "react";

const EvaluationResults = ({ criteria = [], alternatives = [] }) => {
  const weights = { High: 9, Medium: 6, Low: 3 };

  const calculateScore = (criterion, alternativeValues) => {
    const criterionValue = alternativeValues[criterion.id] || "Medium"; // Default is Medium
    const weight = weights[criterion.category] || 6; // Weight based on its category
    const valueWeight = weights[criterionValue]; // Weight of the selected value for the alternative

    // Add the scores of sub-criteria to the main criterion's score
    const subCriteriaScore = (criterion.subCriteria || []).reduce(
      (total, subCriterion) => total + calculateScore(subCriterion, alternativeValues),
      0
    );

    return weight * valueWeight + subCriteriaScore;
  };

  // Calculate scores for all alternatives
  const evaluatedAlternatives = alternatives.map((alternative) => {
    const totalScore = criteria.reduce(
      (total, criterion) => total + calculateScore(criterion, alternative.values),
      0
    );

    return { ...alternative, totalScore };
  });

  // Sort alternatives by score (descending order)
  const sortedAlternatives = [...evaluatedAlternatives].sort(
    (a, b) => b.totalScore - a.totalScore
  );

  // Determine the highest score
  const highestScore = sortedAlternatives[0]?.totalScore || 0;

  return (
    <div className="evaluation-results">
      <h3>Evaluation Results</h3>
      <table border="1" style={{ width: "100%", marginTop: "20px" }}>
        <thead>
          <tr>
            <th>Alternative</th>
            <th>Score</th>
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
