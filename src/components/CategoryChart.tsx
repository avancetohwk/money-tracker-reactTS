import React, { Component } from 'react'
import { Chart, registerables } from 'chart.js';

// import classes from "./LineGraph.module.css";


Chart.register(...registerables);
export default class CategoryChart extends Component {
    chartRef:React.RefObject<any> = React.createRef();
    myChart;

    componentDidMount() {
        this.buildChart();
    }

    buildChart(){
        const myChartRef = this.chartRef.current.getContext("2d");
        const {height: graphHeight, width:graphWidth} = myChartRef.canvas;
        // const {data} = this.props;

        // console.log(data)
        if (typeof this.myChart !== "undefined") this.myChart.destroy();
        let gradientLine = myChartRef
                .createLinearGradient(0, 0, graphWidth * 2, 0);
                gradientLine.addColorStop(0, "rgb(76, 149, 150, 1)");
                gradientLine.addColorStop(0.45, "rgb(253, 210, 97, 1)");
                gradientLine.addColorStop(0.55, "rgb(255, 255, 255, 1)");
    
            let spendingsGradientLine = myChartRef
            .createLinearGradient(0, 0, graphWidth * 2, 0);
            spendingsGradientLine.addColorStop(0, "rgb(255, 0, 110, 0.2)");
            spendingsGradientLine.addColorStop(0.5, "rgb(255, 0, 110, 0.35)");
            spendingsGradientLine.addColorStop(1, "rgb(255, 0, 110, 0.7)");

            
        
            this.myChart = new Chart(myChartRef, {
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
                        gradientLine,
                        spendingsGradientLine,
                        'rgb(255, 205, 86)'
                      ],
                      hoverOffset: 4
                    }]
                  },
                  
                options: {
                    cutout: "65%",
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