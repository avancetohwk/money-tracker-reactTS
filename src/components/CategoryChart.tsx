import React, { Component } from 'react'
import { Chart, registerables } from 'chart.js';
import { data } from 'jquery';

// import classes from "./LineGraph.module.css";
export interface ICategoryChartProps{
    data:{values:any[], labels:any[]}
}


Chart.register(...registerables);
export default class CategoryChart extends Component<ICategoryChartProps> {
    chartRef:React.RefObject<any> = React.createRef();
    myChart;
    width;
    height;

    constructor(props){
        super(props);
    }

    componentDidMount() {
        this.buildChart();
    }

    buildChart(){
        const myChartRef = this.chartRef.current.getContext("2d");
        const {height: graphHeight, width:graphWidth} = myChartRef.canvas;
        const {data} = this.props;

        const colors = data.values.map(t=>{
            var color = this.getRandomColor();
            var gradient = myChartRef.createLinearGradient(0, 0, graphWidth * 2, 0);
            gradient.addColorStop(0, color);
            gradient.addColorStop(1, color);
            return gradient;
        });
        console.log(colors)
        // console.log(data)
        if (typeof this.myChart !== "undefined") this.myChart.destroy();


//         const gradient = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, canvas.height / 4, canvas.width / 2, canvas.height / 2, canvas.height / 2);

//   const innerColor = "hsla(1, 60%, 30%, 1)"
//   const mainColor = red
//   const outerColor = "hsla(1, 73.7%, 48%, 1)"
//   gradient.addColorStop(0, innerColor);
//   gradient.addColorStop(.12, innerColor);
//   gradient.addColorStop(.121, mainColor);
//   gradient.addColorStop(1, outerColor);
        let gradientLine = myChartRef
                .createLinearGradient(graphWidth / 2, graphHeight / 2, graphHeight / 4, graphWidth / 2, graphHeight / 2, graphHeight / 2);
                gradientLine.addColorStop(0, "rgb(76, 149, 150, 1)");
                gradientLine.addColorStop(0.45, "rgb(253, 210, 97, 1)");
                gradientLine.addColorStop(0.55, "rgb(255, 255, 255, 1)");
    
            let spendingsGradientLine = myChartRef
            .createLinearGradient(0, 0, graphWidth * 2, 0);
            spendingsGradientLine.addColorStop(0, "rgb(255, 0, 110, 0.2)");
            spendingsGradientLine.addColorStop(0.5, "rgb(255, 0, 110, 0.35)");
            spendingsGradientLine.addColorStop(1, "rgb(255, 0, 110, 0.7)");

            var that = this;
            this.myChart = new Chart(myChartRef, {
                type: "doughnut",
                
                data: {
                    labels: data.labels,
                    datasets: [{
                      label: 'My First Dataset',
                      data: data.values,
                      borderWidth:0,
                      backgroundColor: colors,
                    //   backgroundColor: [
                    //     gradientLine,
                    //     spendingsGradientLine,
                    //     'rgb(255, 205, 86)'
                    //   ],
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

    getRandomColor(){
        var r = Math.floor(Math.random() * 200);
        var g = Math.floor(Math.random() * 200);
        var b = Math.floor(Math.random() * 200);
        return 'rgb(' + r + ', ' + g + ', ' + b + ')';
    }

    createRadialGradient3(context, c1, c2, c3) {
        const chartArea = context.chart.chartArea;
        if (!chartArea) {
          // This case happens on initial chart load
          return null;
        }
      
        const chartWidth = chartArea.right - chartArea.left;
        const chartHeight = chartArea.bottom - chartArea.top;
        // if (this.width !== chartWidth || height !== chartHeight) {
        //   cache.clear();
        // }
        var gradient;// = cache.get(c1 + c2 + c3);
        if (!gradient) {
          // Create the gradient because this is either the first render
          // or the size of the chart has changed
          this.width = chartWidth;
          this.height = chartHeight;
          const centerX = (chartArea.left + chartArea.right) / 2;
          const centerY = (chartArea.top + chartArea.bottom) / 2;
          const r = Math.min(
            (chartArea.right - chartArea.left) / 2,
            (chartArea.bottom - chartArea.top) / 2
          );
          var ctx = context.chart.ctx;
          gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, r);
          gradient.addColorStop(0, c1);
          gradient.addColorStop(0.5, c2);
          gradient.addColorStop(1, c3);
          //cache.set(c1 + c2 + c3, gradient);
        }
      
        return gradient;
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