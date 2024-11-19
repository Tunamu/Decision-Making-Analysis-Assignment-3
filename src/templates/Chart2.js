import React from 'react';
import { VictoryPie, VictoryTheme } from 'victory';
import './Charts.css'


function Chart2({checkboxValues, parameterNames, resultList,weightValues}){

    const convertedResults = resultList.map(item => (typeof item === 'number' ? item : 0));
    let max =convertedResults[0]
    
    for(let i=1;i<convertedResults.length;i++){
        if(max<convertedResults[i]){
            max=convertedResults[i]
        }
    }

    var weightValuesWithCheckbox = []
    var parameterNamesWithCheckbox = []
    for(let i = 0 ; i < checkboxValues.length;i++){
        if(checkboxValues[i]){
            weightValuesWithCheckbox.push(weightValues[i])
            parameterNamesWithCheckbox.push(parameterNames[i])
        }
    
    }

    const data = parameterNamesWithCheckbox.map((names,index)=>({
        x:names,
        y:weightValuesWithCheckbox[index]
    }))

    return (
        <div className='chart'>
            <VictoryPie
            radius={({ datum }) => datum.y + 75}
            data={data}
            theme={VictoryTheme.clean}
            style={{
                labels: {
                    fontSize: 15,  
                    fontWeight: "bold",
                }
            }}
            />
        </div>
    );
}

export default Chart2;



