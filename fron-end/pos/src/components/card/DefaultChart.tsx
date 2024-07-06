import { defaults } from "chart.js/auto";
import { Line } from "react-chartjs-2";
defaults.responsive = true;
defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.color = "black";

interface DefaultChartProps {
    chartData: number[];
}

const DefaultChart:React.FC<DefaultChartProps>=({chartData})=> {
    const data={
        labels:["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November","December"],
        datasets:[
            {
                lable:'data',
                data:chartData,
                fill:false
            }
        ]
    }

    const option={
        
        scales:{
            y:{
                beginAtZero:true,
                
            },
        },
    }
    return(
        <>
            <div>
                <Line 
                    options={option}
                    data={data}
                    
                />
            </div>
        </>
    )
}
   

export default DefaultChart