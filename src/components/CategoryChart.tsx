import React, { Component } from 'react'
import { Chart, registerables } from 'chart.js';

// import classes from "./LineGraph.module.css";


Chart.register(...registerables);
export default class CategoryChart extends Component {
    chartRef:React.RefObject<any> = React.createRef();
    componentDidMount() {
        const myChartRef = this.chartRef.current.getContext("2d");
        
        new Chart(myChartRef, {
            type: "doughnut",
            
            data: {
                labels: [
                  'Red',
                  'Blue',
                  'Yellow'
                ],
                datasets: [{
                  label: 'My First Dataset',
                  data: [300, 50, 100],
                  backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)'
                  ],
                  hoverOffset: 4
                }]
              },
              
            options: {
                plugins: {
                    legend: {
                        display: false
                    }
                }
                //Customize chart options
            }
        });
    }
    render() {
        return (
            <div >
                <canvas
                    id="myChart"
                    ref={this.chartRef}
                />
            </div>
        )
    }
}