import React, { Component } from 'react'
import { Chart, registerables } from 'chart.js';

// import classes from "./LineGraph.module.css";


Chart.register(...registerables);

export interface IIncomeChartProps{
    data:null
}

export default class IncomeChart extends Component<IIncomeChartProps> {
    chartRef:React.RefObject<any> = React.createRef();
    myChart;

    constructor(props){
        super(props);
    }

    componentDidMount() {
        this.buildChart();
    }

    componentDidUpdate(){
        this.buildChart();
    }

    buildChart=()=>{
        const myChartRef = this.chartRef.current.getContext("2d");
        const {height: graphHeight, width:graphWidth} = myChartRef.canvas;
        const {data} = this.props;
        console.log(data)
        if (typeof this.myChart !== "undefined") this.myChart.destroy();

        let gradientLine = myChartRef
            .createLinearGradient(0, 0, graphWidth * 2, 0);
            gradientLine.addColorStop(0, "rgb(76, 149, 150, 1)");
            gradientLine.addColorStop(0.45, "rgb(253, 210, 97, 1)");
            gradientLine.addColorStop(0.55, "rgb(255, 255, 255, 1)");

        this.myChart = new Chart(myChartRef, {
            type: "line",
            data: {
                //Bring in data
                // labels: ["Jan", "Feb", "March"],
                datasets: [
                    {
                        label: "Spendings",
                        data: data,
                        fill: true,
                        backgroundColor:gradientLine,
                        tension: 0.5
                    }
                ]
            },
            options: {
                responsive:true,
                maintainAspectRatio: false,
                elements: {
                    point:{
                        radius: 0
                    }
                },
                scales: {
                    xAxes: {
                        ticks: { display: false },
                        grid: {
                            display: false,
                            drawBorder: false
                        }
                    },
                    yAxes: {
                        //ticks: { display: false },
                        grid: {
                            display: false,
                            drawBorder: false
                        }
                    }
                }
                //Customize chart options
            }
        });
    }

    render() {
        return (
            <div style={{height:'100%'}}>
                <canvas
                    id="myChart"
                    ref={this.chartRef}
                />
            </div>
        )
    }
}