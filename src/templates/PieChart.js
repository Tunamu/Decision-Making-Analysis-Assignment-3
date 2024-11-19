import React from 'react';
import { VictoryPie, VictoryTheme } from 'victory';
import './Charts.css'

const PieChart = () => {
  const xValues = ["Cats","Dogs","Birds","Rabbits"];
  const yValues = [30,35,25,10];

  const data = xValues.map((values,index)=>({
    x:values,
    y:yValues[index]
  }))

  return (
    <div className='chart'>
      <VictoryPie
      radius={({ datum }) => datum.y + 75}
      data={data}
      theme={VictoryTheme.clean}
      />
    </div>
  );
};

export default PieChart;
