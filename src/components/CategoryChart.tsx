import React, { Component } from 'react'
import { Chart, registerables } from 'chart.js';
import { data } from 'jquery';
import './CategoryChart.scss'
import {LightenDarkenColor} from  '../utils/helper';
import * as helpers from 'chart.js/helpers';
//import 'chartjs-plugin-style';  
//import './temp.js';

// import classes from "./LineGraph.module.css";
export interface ICategoryChartProps{
    data:{values:any[], labels:any[]}
}


const ShadowPlugin = {
    id:"shadow",
    beforeDraw: (chart, args, options) => {
      const { ctx } = chart;
      ctx.shadowColor = effectColors.shadow;
      ctx.shadowBlur = 15;
      ctx.shadowOffsetX = 15;
      ctx.shadowOffsetY = 15;




      
    },
    afterUpdate: function (chart) {
      if (chart.config.options.elements.center) {
          //var helpers = Chart.helpers;
          var centerConfig = chart.config.options.elements.center;
          var globalConfig = Chart.defaults;
          //var ctx = chart.chart.ctx;
          const { ctx } = chart;
          var fontStyle = helpers.valueOrDefault(centerConfig.fontStyle, globalConfig.font.style);
          var fontFamily = helpers.valueOrDefault(centerConfig.fontFamily, globalConfig.font.family);

          if (centerConfig.fontSize)
              var fontSize = centerConfig.fontSize;
              // figure out the best font size, if one is not specified
          else {
              ctx.save();
              var fontSize = helpers.valueOrDefault(centerConfig.minFontSize, 1);
              var maxFontSize = helpers.valueOrDefault(centerConfig.maxFontSize, 256);
              var maxText = helpers.valueOrDefault(centerConfig.maxText, centerConfig.text);

              do {
                  ctx.font = helpers.fontString(fontSize, fontStyle, fontFamily);
                  var textWidth = ctx.measureText(maxText).width;

                  // check if it fits, is within configured limits and that we are not simply toggling back and forth
                  if (textWidth < chart.innerRadius * 2 && fontSize < maxFontSize)
                      fontSize += 1;
                  else {
                      // reverse last step
                      fontSize -= 1;
                      break;
                  }
              } while (true)
              ctx.restore();
          }

          // save properties
          chart.center = {
              font: helpers.fontString(fontSize, fontStyle, fontFamily),
              fillStyle: helpers.valueOrDefault(centerConfig.fontColor, globalConfig.color)
          };
      }
  },
  afterDraw: function (chart) {
      if (chart.center) {
          var centerConfig = chart.config.options.elements.center;
          //var ctx = chart.chart.ctx;
          const { ctx } = chart;
          ctx.save();
          ctx.font = chart.center.font;
          ctx.fillStyle = chart.center.fillStyle;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          var centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
          var centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
          ctx.fillText(centerConfig.text, centerX, centerY);
          ctx.restore();
      }
  },
  };

  const effectColors = {
    highlight: 'rgba(255, 255, 255, 0.75)',
    shadow: 'rgba(0, 0, 0, 0.2)',
    glow: 'rgb(255, 255, 0)'	
  };

Chart.register(ShadowPlugin);
export default class CategoryChart extends Component<ICategoryChartProps> {
    chartRef:React.RefObject<any> = React.createRef();
    chartRefShadow:React.RefObject<any> = React.createRef();
    chartRefHighlight:React.RefObject<any> = React.createRef();
    myChart;
    myChartShadow;
    myChartHighlight;
    width;
    height;

    constructor(props){
        super(props);
        //console.log(styleplugin)
    }

    componentDidMount() {
        this.buildChart();
    }

    shuffle(array) {
      var currentIndex = array.length,  randomIndex;
    
      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
    
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
    
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex], array[currentIndex]];
      }
    
      return array;
    }

    buildChart(){
        const myChartRef = this.chartRef.current.getContext("2d");
        const myChartRefShadow = this.chartRefShadow.current.getContext("2d");
        const myChartRefHighlight = this.chartRefHighlight.current.getContext("2d");
        const {height: graphHeight, width:graphWidth} = myChartRef.canvas;
        const {data} = this.props;
        


        const colors2 = data.values.map(t=>{
            var color = this.getRandomColor("#ffbf19");
            var gradient = myChartRef.createLinearGradient(0, 0, graphWidth * 2, 0);
            gradient.addColorStop(0, color);
            // gradient.addColorStop(1, color);
            return gradient;
        });
        var colors=[]//["hsl(43,100%,100%,0.5)", "hsl(43,100%,40%,0.5)", "hsl(43,100%,60%,0.5)", "hsl(43,100%,0%,0.5)", "hsl(43,100%,20%,0.5)", "hsl(43,100%,80%,0.5)"]
        //rainbow ["hsl(0,100%,55%,0.5)", "hsl(30,100%,55%,0.5)", "hsl(60,100%,55%,0.5)", "hsl(90,100%,55%,0.5)", "hsl(120,100%,55%,0.5)", "hsl(150,100%,55%,0.5)", "hsl(180,100%,55%,0.5)", "hsl(210,100%,55%,0.5)", "hsl(240,100%,55%,0.5)", "hsl(270,100%,55%,0.5)"];
        var a= [1,3,4,5,6,2]
        a.forEach((c,i)=>{
          //colors.push(LightenDarkenColor('#ffbf19',15*i));
          //colors.push("hsl("+(43)+","+(100-(i*10))+"%,55%,0.5)")
          colors.push("hsl("+(43)+",100%,"+(100-(i*20))+"%,0.5)")
          //colors.push("hsl("+(218)+",100%,"+(100-(i*20))+"%,0.5)")
          //colors.push("hsl("+(i*30)+",100%,55%,0.5)")
        })
        colors = this.shuffle(colors);
        
        console.log(colors)

        var chartData = {
          labels: data.labels,
          datasets: [{
            label: 'My First Dataset',
            data: data.values,
            borderWidth:0,
            backgroundColor: colors,
            pointStrokeColor: "rgba(0,0,0,0)",
            pointHighlightFill: "rgba(0,0,0,0)",
            pointHighlightStroke: "rgba(151,187,205,1)",
            strokeColor: 'red',
            pointColor: 'blue',
            
          }]
        }

        if (typeof this.myChart !== "undefined") this.myChart.destroy();
    
            var that = this;
            this.myChart = new Chart(myChartRef, {
                type: "doughnut",
                
                data: chartData,
                  
                options: {
                    cutout: "65%",
                    layout: {
                      padding: 5
                    },
                    plugins: {
                        legend: {
                            display: false
                        }
                    },animation: {
                      animateScale: true,
                      animateRotate: true
                    },
                    elements: {
                      // center: {
                      //   text: '15%',
                      //   color: '#FF6384', // Default is #000000
                      //   fontStyle: 'Arial', // Default is Arial
                      //   sidePadding: 5, // Default is 20 (as a percentage)
                      //   minFontSize: 10, // Default is 20 (in px), set to false and text will not wrap.
                      //   lineHeight: 25 // Default is 25 (in px), used for when text wraps
                      // }
                      center: {
                        // the longest text that could appear in the center
                        maxText: '100%',
                        text: 'RM 3124.24',
                        // /fontColor: '#FF6684',
                        //fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                        fontStyle: 'bold',
                        fontSize: 14,
                        // if a fontSize is NOT specified, we will scale (within the below limits) maxText to take up the maximum space in the center
                        // if these are not specified either, we default to 1 and 256
                        minFontSize: 1,
                        maxFontSize: 256,
                    }
                    }
                    //Customize chart options
                },
                //plugins:[ShadowPlugin]
        } as any );

    }

    getRandomColor(color){
      var p = 1,
        temp,
        random = Math.random(),
        result = '#';

      while (p < color.length) {
          temp = parseInt(color.slice(p, p += 2), 16)
          temp += Math.floor((255 - temp) * random);
          result += temp.toString(16).padStart(2, '0');
      }
      return result+'80';
      //return "hsl(43,"+(Math.round(Math.random() * 99) + 1)+"%,"+(Math.round(Math.random() * 99) + 1)+"%)";
        // var r = Math.floor(Math.random() * 255);
        // var g = Math.floor(Math.random() * 255);
        // var b = Math.floor(Math.random() * 255);
        // return 'rgba(' + r + ', ' + g + ', ' + b + ',0.65)';
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
            <div className="shadowParent">
                
                
                <canvas id="myChartHighlight"  className="highlight" ref={this.chartRefHighlight} />
                <canvas id="myChartShadow" className="firstShadow" ref={this.chartRefShadow} />
                <canvas id="myChart" className="main" ref={this.chartRef} />
            </div>
        )
    }
}