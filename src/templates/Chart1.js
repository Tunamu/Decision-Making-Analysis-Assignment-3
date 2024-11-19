import './Charts.css';
import { VictoryChart, VictoryBar, VictoryAxis, VictoryTheme } from 'victory';


function Chart1({resultList, jobList,}){
    const quarterArray = [1,2,3,4];
    const convertedResults = resultList.map(item => (typeof item === 'number' ? item : 0));
    let max = convertedResults[0]
    for(let i=1;i<convertedResults.length;i++){
        if(max<convertedResults[i]){
            max=convertedResults[i]
        }
    }

    var arrangedJobList=[]
    for(let i = 0 ; i<jobList.length;i++){
        if(jobList[i]==='')
            arrangedJobList.push('Job '+(i+1))
        else
            arrangedJobList.push(jobList[i])
    }

    const data = arrangedJobList.map((jobs,index)=>({
    salary : resultList[index+2],
    job : jobs,
    isMax : resultList[index+2]=== max,
    }))

    return (
        <div className='chart'>
            <VictoryChart theme={VictoryTheme.grayscale} domainPadding={50}>
            <VictoryAxis
                // X 
                tickValues={quarterArray}
                tickFormat={jobList}
            />
            <VictoryAxis
                dependentAxis
                // Y 
                tickFormat={(x) => `${x}`}
            />
            <VictoryBar
                data={data}
                x="job"
                y="salary"
                style={{
                data: { fill: ({ datum }) => datum.isMax ? 'lightgreen' : 'grey', }
                }}
            />
            </VictoryChart>
        </div>
    );
    };

export default Chart1;

