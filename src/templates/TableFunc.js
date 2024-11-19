import './TableFunc.css'

function headerArrayCreator(columnSize){
    const columnHeaders = [];
    for (let i = 0; i < columnSize; i++) {
        if (i === 0)    
            columnHeaders.push("Parameters");
        else if (i === 1)
            columnHeaders.push("Weight (0-10)");
        else
            columnHeaders.push("Alternative " + (i - 1));
    }
    return columnHeaders
}

function headerCreator(columnSize) {
    const columnHeaders = headerArrayCreator(columnSize);
    const columns = [];
    for (let i = 0; i < columnSize; i++) {
        if(i>1)
            columns.push(
                <th className='Header-Type'>
                    {columnHeaders[i]}
                    <input type='text' placeholder="Job" className='Alternative-Inputs'/>
                </th>)
        else
            columns.push(<th className='Header-Type'>{columnHeaders[i]}</th>);
    }

    return (
        <tr>
            {columns}
        </tr>
    );
}

function rowCreator(rowSize,columnSize) {
    const rows = [];
    for (let i = 0; i < rowSize; i++) {
        rows.push(rowGen(i,columnSize));  
    }
    return rows;
}

function rowGen(index, columnSize) {
    const columns = [];
    for (let i = 0; i < columnSize; i++) {
        if(i===0)
            columns.push(<td key={i} className="First-Row-Element">
                <input type='checkbox' className='Row-Inputs checkboxes'/>
                <input type='text' placeholder="Alternative Name" className='Row-Inputs texte'/>
            </td>);
        else if(i===1)   
            columns.push(<td key={i}><input type="number" placeholder="0" className="weigthInputs"></input></td>)
        else   
            columns.push(<td key={i}><input type="number" placeholder="0" className="numberArea"></input></td>)
    }

    return (
        <tr key={index}>
            {columns}
        </tr>
    );
}

function resultRowGen(index,columnSize,resultArray,biggestNum){

    const columnsForResults = [];
    for(let i = 0 ; i< columnSize;i++){
            if(biggestNum!== 0 && resultArray[i]===biggestNum)
                columnsForResults.push(<td key={i} className='Result-Section biggestResult'>{resultArray[i]}</td>)
            else
                columnsForResults.push(<td key={i} className='Result-Section'>{resultArray[i]}</td>)
    }

    return(
        <tr key={index}>
            {columnsForResults}
        </tr>
    )
}

function TableFunc({rowSize, columnSize,results,biggest}) {
    return(
        <div className="fiels">
            <table>
                <thead>
                    {headerCreator(columnSize)}
                </thead>
                <tbody>
                    {rowCreator(rowSize,columnSize)}
                    {resultRowGen(rowSize,columnSize,results,biggest)}
                </tbody>
            </table>    
        </div>
    );
}

export default TableFunc;