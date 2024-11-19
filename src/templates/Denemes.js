import React from 'react';
import { VictoryChart, VictoryBar, VictoryAxis, VictoryTheme } from 'victory';

const Denemes = () => {
  // Örnek veri kümeleri
const quarterArray = [1,2,3,4];
const earingsArray = [13000,16500,14250,19000];
const tickFormatArray = ["Job1", "Job2", "Job3", "Job4"]

const data = earingsArray.map((earings,index)=>({
  salary : earings,
  job : tickFormatArray[index]
}))

  return (
    <VictoryChart theme={VictoryTheme.grayscale} domainPadding={25}>
      <VictoryAxis
        // X ekseni etiketlerini ayarla
        tickValues={quarterArray}
        tickFormat={tickFormatArray}
      />
      <VictoryAxis
        dependentAxis
        // Y ekseninin etiket aralığını ayarla
        tickFormat={(x) => `$${x / 1000}k`}
      />
      <VictoryBar
        data={data}
        x="job"
        y="salary"
        style={{
          data: { fill: "black" }
        }}
      />
    </VictoryChart>
  );
};

export default Denemes;
