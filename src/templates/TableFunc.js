import './TableFunc.css'

function headerArrayCreator(columnSize){
    const columnHeaders = [];
    for (let i = 0; i <= columnSize; i++) {
        if (i === 0)    
            columnHeaders.push("Alternatives");
        else if (i === columnSize)
            columnHeaders.push("Results");
        else
            columnHeaders.push("Parameter " + (i - 1));
    }
    return columnHeaders
}

function headerCreator(columnSize) {
    const columnHeaders = headerArrayCreator(columnSize);
    const columns = [];
    for (let i = 0; i <= columnSize; i++) {
        if(i===0 || i===columnSize)
            columns.push(<th className='Header-Type'>{columnHeaders[i]}</th>);
        else{
            columns.push(
                <th className='Header-Type'>
                    {columnHeaders[i]}
                    <input type='text' placeholder="Job" className='Alternative-Inputs'/>
                </th>)
        }
    }

    return (
        <tr>
            {columns}
        </tr>
    );
}

function rowCreator(rowSize,columnSize,result,biggest) {
    const rows = [];
    for (let i = 0; i < rowSize; i++) {
        rows.push(rowGen(i,columnSize,result[i],biggest));  
    }
    return rows;
}

function rowGen(index, columnSize, tempResult , biggest) {
    const columns = [];
    for (let i = 0; i <= columnSize; i++) {
        if(i===0)
            columns.push(<td key={i} className="First-Row-Element">
                <input type='checkbox' className='Row-Inputs checkboxes'/>
                <input type='text' placeholder="Alternative Name" className='Row-Inputs texte'/>
            </td>);
        else if(i=== columnSize){
            if(biggest!=0 && tempResult===biggest)
                columns.push(<td key={i} className='Result-Section Biggest-Result'>{tempResult}</td>)
            else
                columns.push(<td key={i} className='Result-Section'>{tempResult}</td>)
        }else   
            columns.push(<td key={i}><input type="number" placeholder="0" className="numberArea"></input></td>)
    }

    return (
        <tr key={index}>
            {columns}
        </tr>
    );
}

function TableFunc({rowSize, columnSize,results,biggest}) {
    return(
        <div className="fiels">
            <table>
                <thead>
                    {headerCreator(columnSize)}
                </thead>
                <tbody>
                    {rowCreator(rowSize,columnSize ,results, biggest)}
                </tbody>
            </table>    
        </div>
    );
}

export default TableFunc;