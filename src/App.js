import './App.css';
import ButtonPropt from './templates/ButtonPropt';
import TableFunc from './templates/TableFunc';
import { useState, useEffect} from 'react';

function App() {
  
  const [row,setRow ] = useState(1)
  const [column , setColumn] = useState(2)
  const [resultArray,setResultArray] = useState(new Array(2).fill(""))
  const [reRender,setReRender] = useState(true)

    
    //This section for finding all names and values
    //For checkboxes
    const checkboxElements = [...document.querySelectorAll('.checkboxes')];
    const checkboxValues = checkboxElements.map(element => element.checked);

    //For weigths
    const weightElements = [...document.querySelectorAll('.Weight-Inputs')];
    const weightValues = weightElements.map(input => parseInt(input.value));
    //console.log("Weight values : "+weightValues)

    //Fro the all values 
    const inputElements = [...document.querySelectorAll('.numberArea')];
    const inputValues = inputElements.map(input => parseInt(input.value));
    //console.log("Input elements : "+inputValues)

    //For job names
    //const jobElements = [...document.querySelectorAll('.Alternative-Inputs')];
    //const jobValues = jobElements.map(input=>input.value);
    //console.log("Job values : "+jobValues)

    //For parameter names 
    //const AlternativeElements = [...document.querySelectorAll('.texte')];
    //const AlternativeValue = AlternativeElements.map(input=>input.value);
    //console.log("Alternative values : "+AlternativeValue)

  useEffect(() => {
      //TODO burası yapılacak
      if (checkboxValues.length && inputValues.length && weightValues.length) {
        
        const newMatrix = Array(column - 1).fill(null).map(() => Array(row).fill(0));
        
        for (let i = 0; i < row; i++) {
          for (let j = 0; j < column - 1; j++) {
            newMatrix[j][i] = inputValues[((column - 1) * i) + j] || 0;
          }
      }
    
      const tempResultsArray = resultsArrayFinder(weightValues,newMatrix,checkboxValues);
      setResultArray(tempResultsArray);
      }
    }, [reRender]);

  function valueReaderAndCalculator(){
      const newMatrix = Array(column-1).fill(null).map(() => Array(row).fill(0));

      for (let i = 0; i < row; i++) {
        for (let j = 0; j < column - 1; j++) {
          newMatrix[j][i] = inputValues[((column - 1) * i) + j] || 0;
        }
    }
  
    const tempResultsArray = resultsArrayFinder(weightValues,newMatrix,checkboxValues);
    setResultArray(tempResultsArray);
  }

  function resultsArrayFinder(weightValuesArray,numbersArray,isCheckedArray){
    
    var tempResultsFromFirstStep = FirstStep(numbersArray,isCheckedArray);
    var resultsArray  = SecondStep(weightValuesArray,tempResultsFromFirstStep,isCheckedArray);
    
    return resultsArray;
  }
  
  function FirstStep(numbersArray, isCheckedArray){
    //TODO buradaki logic hata düzeltilecek
    const floatMatrix = numbersArray.map(row => 
      row.map(element => parseFloat(element) || 0) 
  );
    //console.log(floatMatrix);

    var tempResultArray = Array(column-1).fill(null).map(() => Array(row).fill(0));
    

    console.log(numbersArray)
    for(let i = 0 ; i < column-1 ; i++){
      for(let j = 0 ; j < row ; j++){
        
        //console.log(floatMatrix[i][j]+" == "+isCheckedArray[j])
        //console.log(Math.max(...floatMatrix[i]))
        if(isCheckedArray[j]){
          console.log("Math.max = "+Math.max(...floatMatrix[i])+"  Math.min = "+Math.min(...floatMatrix[i])+"  numbersArray = "+numbersArray[i][j]+" HHH "+(Math.max(...floatMatrix[i])-numbersArray[i][j])/(Math.max(...floatMatrix[i])-Math.min(...floatMatrix[i])));
          tempResultArray[i][j] = ((Math.max(...floatMatrix[i])-numbersArray[i][j])/(Math.max(...floatMatrix[i])-Math.min(...floatMatrix[i])));
        }
      }
    }
    
    //console.log(tempResultArray)

    return tempResultArray;
  }

  function SecondStep(weightValues , resultsFromFirstStep , isCheckedArray){

    var resultArray = new Array(row).fill(0); 
    //console.log(resultsFromFirstStep)


    for(let i = 0 ; i < row ; i++){
      let tempWeighted = 0
      for(let j = 0 ; j < column-1 ; j++){
        //console.log(i+"  "+j+"  "+weightValues[j]+"  "+resultsFromFirstStep[j][i])
        tempWeighted += resultsFromFirstStep[j][i]*weightValues[j]/100.0;
      }
      resultArray[i]=tempWeighted;
    }

    //console.log(resultArray);
    return resultArray;
  }

  function valueFormatter(){
    
    setRow(1);
    setColumn(2);
    setResultArray([])

    //For formatting the input areas

    const checkboxElements = [...document.querySelectorAll('.checkboxes')];
    checkboxElements.forEach(checkbox => checkbox.checked = true);

    const weightElements = [...document.querySelectorAll('.Weigth-Inputs')];
    weightElements.forEach(input=>input.value = '')

    const inputElements = [...document.querySelectorAll('.numberArea')];
    inputElements.forEach(input=>input.value = '')

    const jobElements = [...document.querySelectorAll('.Alternative-Inputs')];
    jobElements.forEach(element=>element.value = '')

    const AlternativeElements = [...document.querySelectorAll('.texte')]
    AlternativeElements.forEach(element=> element.value='')

    const resultElements = [...document.querySelectorAll('.Result-Section')]
    resultElements.forEach(element=> element.value='')
  }
  
  
  return (
    <div className="Field">
      <h1>Assignment 3 - Multi Attribute Utility Theory </h1>
      <div className="First-Buttons-Part">
        <ButtonPropt name="Add Alternative" bgColor="lightblue" onClickFunc={()=>setRow(prevRow => prevRow + 1)}/>
        <ButtonPropt name="Add Parameter" bgColor="lightblue" onClickFunc={()=>setColumn(prevColumn => prevColumn + 1)}/>

      </div>
      <div className="Input-Area">
        <TableFunc rowSize={row} columnSize={column} results={resultArray} biggest={Math.max(...resultArray.filter(value => typeof value === 'number'))}/>
      </div>
      <div className="Second-Buttons-Part">
        <ButtonPropt name="Calculate" bgColor="yellowgreen" onClickFunc={()=>{setReRender(!reRender);valueReaderAndCalculator()}}/>
        <ButtonPropt name="Reset Form" bgColor="yellow" color="black" onClickFunc={()=>{valueFormatter()}}/>
      </div>
    </div>
  );
}

export default App;