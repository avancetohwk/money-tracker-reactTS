import React, { Component } from 'react'
import { Chart, registerables } from 'chart.js';

// import classes from "./LineGraph.module.css";


Chart.register(...registerables);

export interface ICombinedChartProps{
    data:any[]
}

export default class CombinedChart extends Component<ICombinedChartProps> {
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

    
    getGradient(ctx, chartArea,hexColor) {
        let gradient,width,height;
        const chartWidth = chartArea.right - chartArea.left;
        const chartHeight = chartArea.bottom - chartArea.top;
        if (gradient === null || width !== chartWidth || height !== chartHeight) {
            // Create the gradient because this is either the first render
            // or the size of the chart has changed
            width = chartWidth;
            height = chartHeight;
            gradient = ctx.createLinearGradient(chartArea.left, 0, chartArea.right, 0);
            gradient.addColorStop(0.1, hexColor+'BF'); //75%
            gradient.addColorStop(0.5, hexColor+'73'); //45%
            gradient.addColorStop(1, hexColor+'40'); //25%
        }


        return gradient;
    }

    buildChart=()=>{
        const myChartRef = this.chartRef.current.getContext("2d");
        const {height: graphHeight, width:graphWidth} = myChartRef.canvas;
        const {data} = this.props;
        console.log(data)
        if (typeof this.myChart !== "undefined") this.myChart.destroy();


        let width, height, gradient;
        function getGradient(ctx, chartArea,hexColor) {
            
            const chartWidth = chartArea.right - chartArea.left;
            const chartHeight = chartArea.bottom - chartArea.top;
            if (gradient === null || width !== chartWidth || height !== chartHeight) {
                // Create the gradient because this is either the first render
                // or the size of the chart has changed
                width = chartWidth;
                height = chartHeight;
                gradient = ctx.createLinearGradient(chartArea.left, 0, chartArea.right, 0);
                //gradient.addColorStop(0.1, hexColor+'BF'); //75%
                gradient.addColorStop(0.1, hexColor+'A6'); //65%
                gradient.addColorStop(0.5, hexColor+'73'); //45%
                gradient.addColorStop(1, hexColor+'40'); //25%
            };


            return gradient;
        }

        // let gradientLine = myChartRef
        //     .createLinearGradient(0, 0, 0, graphHeight);
        // gradientLine.addColorStop(0, "rgb(76, 149, 150, 1)");
        // gradientLine.addColorStop(0.45, "rgb(253, 210, 97, 1)");
        // gradientLine.addColorStop(0.55, "rgb(255, 255, 255, 1)");

        // let spendingsGradientLine = myChartRef
        //     .createLinearGradient(0, 0, 0, graphHeight);
        // spendingsGradientLine.addColorStop(0, "rgb(255, 0, 110, 0.2)");
        // spendingsGradientLine.addColorStop(0.5, "rgb(255, 0, 110, 0.35)");
        // spendingsGradientLine.addColorStop(1, "rgb(255, 0, 110, 0.7)");

        let that = this;
        this.myChart = new Chart(myChartRef, {
            type: "bar",
            data: {
                datasets: [
                    {
                        label: "Spendings",
                        data: data[1],
                        //fill: true,
                        backgroundColor:'rgba(255, 99, 132, 0.2)',
                    //spendingsGradientLine,
                        //tension: 0.5,
                        // borderColor: function(context) {
                        //     const chart = context.chart;
                        //     const {ctx, chartArea} = chart;
                    
                        //     if (!chartArea) {
                        //       // This case happens on initial chart load
                        //       return null;
                        //     }
                        //     return that.getGradient(ctx, chartArea,'#ff1919');
                        //   },
                        borderColor:'rgb(255, 99, 132)'
                    },
                    {
                        label: "Income",
                        data: data[0],
                        //fill: true,
                        backgroundColor:'rgba(255, 205, 86, 0.5)',//gradientLine,
                        
                        //tension: 1,
                        // borderColor: function(context) {
                        //     const chart = context.chart;
                        //     const {ctx, chartArea} = chart;
                    
                        //     if (!chartArea) {
                        //       // This case happens on initial chart load
                        //       return null;
                        //     }
                        //     return that.getGradient(ctx, chartArea,'#ffbf19');
                        //   },
                        borderColor:'rgb(255, 205, 86)',
                    }
                    
                    
                ]
            },
            options: {
                responsive:true,
                maintainAspectRatio: false,
                layout: {
                    padding: 25
                },
                elements: {
                    point:{
                        radius: 1
                    }
                },
                // animations:{
                //     x: {
                //             type: 'number',
                //             easing: 'linear',
                //             duration: delayBetweenPoints,
                //             from: NaN, // the point is initially skipped
                //             delay(myChartRef) {
                //                 var ctx= myChartRef as any;
                //                 if (ctx.type !== 'data' || ctx.xStarted) {
                //                     return 0;
                //                 }
                //                 ctx.xStarted = true;
                //                 return ctx.index * delayBetweenPoints;
                //             }
                //         },
                //         y: {
                //             type: 'number',
                //             easing: 'linear',
                //             duration: delayBetweenPoints,
                //             from: previousY,
                //             delay(myChartRef) {
                //                 var ctx= myChartRef as any;
                //                 if (ctx.type !== 'data' || ctx.yStarted) {
                //                     return 0;
                //                 }
                //                 ctx.yStarted = true;
                //                 return ctx.index * delayBetweenPoints;
                //             }
                //         }
                //     },
                
                scales: {
                    y:{
                        beginAtZero:true,
                        ticks: { display: false, },
                        grid: {
                            display: false,
                            drawBorder: false
                        }
                    },
                    xAxes: {
                        stacked: true,
                        ticks: { display: false },
                        grid: {
                            display: false,
                            drawBorder: false
                        }
                    },
                    // yAxes: {
                    //     stacked: true,
                    //     min:0,
                    //     ticks: { display: false, },
                    //     grid: {
                    //         display: false,
                    //         drawBorder: false
                    //     }
                    // }
                }
                //Customize chart options
            }
        });
    };

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