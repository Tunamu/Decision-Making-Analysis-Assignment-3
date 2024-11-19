import './App.css';
import ButtonPropt from './templates/ButtonPropt';
import TableFunc from './templates/TableFunc';
import { useState, useEffect} from 'react';
import Chart1 from './templates/Chart1';
import Chart2 from './templates/Chart2';

function App() {
  
  const [row,setRow ] = useState(1)
  const [column , setColumn] = useState(3)
  const [resultArray,setResultArray] = useState(new Array(2).fill(""))
  const [reRender,setReRender] = useState(true)

    //This section for finding all names and values
    //For checkboxes
    const checkboxElements = [...document.querySelectorAll('.checkboxes')];
    const checkboxValues = checkboxElements.map(element => element.checked);

    //For weigths
    const weightElements = [...document.querySelectorAll('.weigthInputs')];
    const weightValues = weightElements.map(input => parseInt(input.value));

    //Fro the all values 
    const inputElements = [...document.querySelectorAll('.numberArea')];
    const inputValues = inputElements.map(input => parseInt(input.value));

    //For job names
    const jobElements = [...document.querySelectorAll('.Alternative-Inputs')];
    const jobValues = jobElements.map(input=>input.value);

    //For parameter names 
    const parameterElements = [...document.querySelectorAll('.texte')];
    const parameterValues = parameterElements.map(input=>input.value);

  useEffect(() => {
      
      if (checkboxValues.length && inputValues.length && weightValues.length) {
        
        const newMatrix = Array(column - 2).fill(null).map(() => Array(row).fill(0));
  
        for (let i = 0; i < row; i++) {
          for (let j = 0; j < column - 2; j++) {
            newMatrix[j][i] = inputValues[((column - 2) * i) + j] || 0;
          }
        }
  
        const tempResultsArray = resultsArrayFinder(weightValues, newMatrix, checkboxValues);
        setResultArray(tempResultsArray);
      }
    }, [reRender]);

  function valueReaderAndCalculator(){
      const newMatrix = Array(column-2).fill(null).map(() => Array(row).fill(0));
      
      for (let i = 0; i < row; i++) {
        for (let j = 0; j < column - 2; j++) {
          newMatrix[j][i] = inputValues[((column - 2) * i) + j] || 0;
        }
    }
  
    const tempResultsArray = resultsArrayFinder(weightValues,newMatrix,checkboxValues);
    setResultArray(tempResultsArray);
  }

  useEffect(() => {}, [resultArray]);

  //Finding the column results 

  function resultsArrayFinder(weightValuesArray,numbersArray,isCheckedArray){
    var resultsArray = new Array(2).fill("")
    
    
    for(let i = 0 ; i < (column-2) ;i++){
      let tempResult = 0;
      for(let j = 0 ; j< weightValuesArray.length ; j++){
        
        if(isCheckedArray[j]){
          const weight = weightValuesArray[j] ?? 0; 
          const number = numbersArray[i] && numbersArray[i][j] ? numbersArray[i][j] : 0;
          tempResult+= weight*number;
        }
      }
      resultsArray.push(tempResult)
    }
    
    
    return resultsArray;
  }
  


  function valueFormatter(){
    setRow(1);
    setColumn(3);
    setResultArray([])

    //For formatting the input areas

    const checkboxElements = [...document.querySelectorAll('.checkboxes')];
    checkboxElements.forEach(checkbox => checkbox.checked = true);

    const weightElements = [...document.querySelectorAll('.weigthInputs')];
    weightElements.forEach(input=>input.value = '')

    const inputElements = [...document.querySelectorAll('.numberArea')];
    inputElements.forEach(input=>input.value = '')

    const jobElements = [...document.querySelectorAll('.Alternative-Inputs')];
    jobElements.forEach(element=>element.value = '')

    const parameterElements = [...document.querySelectorAll('.texte')]
    parameterElements.forEach(element=> element.value='')

    const resultElements = [...document.querySelectorAll('.Result-Section')]
    resultElements.forEach(element=> element.value='')
  }

  return (
    <div className="Field">
      <h1>Kepner-Tregoe Method</h1>
      <div className="First-Buttons-Part">
        <ButtonPropt name="Add Parameter" bgColor="lightblue" onClickFunc={()=>setRow(prevRow => prevRow + 1)}/>
        <ButtonPropt name="Add Alternative" bgColor="lightblue" onClickFunc={()=>setColumn(prevColumn => prevColumn + 1)}/>

      </div>
      <div className="Input-Area">
        <TableFunc rowSize={row} columnSize={column} results={resultArray} biggest={Math.max(...resultArray.filter(value => typeof value === 'number'))}/>
      </div>
      <div className="Second-Buttons-Part">
        <ButtonPropt name="Calculate" bgColor="yellowgreen" onClickFunc={()=>{setReRender(!reRender);valueReaderAndCalculator()}}/>
        <ButtonPropt name="Reset Form" bgColor="yellow" color="black" onClickFunc={()=>{valueFormatter()}}/>
      </div>
      <div className='Graph-Part'>
          <Chart1 resultList = {resultArray} jobList = {jobValues} />
          <Chart2 checkboxValues = {checkboxValues} parameterNames = {parameterValues} resultList = {resultArray} weightValues={weightValues}/>
      </div>
    </div>
  );
}

export default App;