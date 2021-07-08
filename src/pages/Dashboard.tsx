import React, { Component } from 'react';
import { IWordcloudItem, Wordcloud } from '../components/Wordcloud';
import {withRouter} from 'react-router-dom'
import './Dashboard.scss';
import { RouteComponentProps } from '@reach/router';
import '../global.css'
import Sidebar from '../components/Sidebar';
import styled from "styled-components";
import CategoryCards from '../components/Stackcards';
import CategoryChart from '../components/CategoryChart';
import IncomeChart from '../components/IncomeChart';
import CategoryChips from '../components/CategoryChips';
import moment from 'moment';
import CombinedChart from '../components/CombinedChart';
import history from '../utils/history';
// import CategoryCards from '../components/CategoryCards';

interface IFinanceTrackings{
  date:Date,
  account:string,
  category:string,
  amount:number,
  "converted amount": number,
  currency:string,
  description:string
}


class Dashboard extends Component<RouteComponentProps> {
    constructor(props) {
    super(props);

    }
  componentDidMount(){
    console.log(this.props)
    if(this.props.location.state == undefined){
      history.push("/");
    }
    this.getIncomeChartData(this.props.location.state);
    this.getCategoryChartData(this.props.location.state)
      // this.setState({allFinanceTrackings: this.props.location.state})
      // console.log(this.state)
  }

  wordcloudWords: IWordcloudItem[];
  papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transform: val =>
    val
        .trim()
  }


  state={
    wordcloudWords: null,
    incomeChartData:null,
    incomeChartLabel:null,
    allFinanceTrackings: null,
    combinedChartData:null,
    categoryChartData:null
  }

  render() {
    const { incomeChartData,combinedChartData,categoryChartData } = this.state;
    return (
        // <FileInput onFileUploaded={this._onUpload}></FileInput>
        <div className="App">
            {/* <Sidebar /> */}
            
            {/* <div style={{position:'absolute',opacity:0.2,height: '100%', width: '100%', zIndex:-1}}>
                {this.state.wordcloudWords? <Wordcloud words={this.state.wordcloudWords}></Wordcloud>: null}    
            </div> */}
            {/* <div style={{display:'flex',justifyContent:'center'}}>
                <div className="glassmorphism-black" style={{height:'50vh',width:'50%'}}>
                    <h1>das</h1>
                </div>
            </div> */} 
            
            <section id="graph-section">
              <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                <input type="radio" className="btn-check" name="btnradio" id="btnradioall" autoComplete="off" ></input>
                <label className="btn btn-outline-primary" htmlFor ="btnradioall">All</label>

                {/* <input type="radio" className="btn-check" name="btnradio" id="btnradioday" autoComplete="off"></input>
                <label className="btn btn-outline-primary" htmlFor ="btnradioday">Day</label> */}

                <input type="radio" className="btn-check" name="btnradio" id="btnradiomonth" autoComplete="off"></input>
                <label className="btn btn-outline-primary" htmlFor ="btnradiomonth">Month</label>

                <input type="radio" className="btn-check" name="btnradio" id="btnradioyear" autoComplete="off"></input>
                <label className="btn btn-outline-primary" htmlFor ="btnradioyear">Year</label>
              </div>
                <div id="graph-card" className="neumorphism concave" >
                {this.state.incomeChartData? <IncomeChart data={incomeChartData}></IncomeChart>: null}
                {this.state.combinedChartData? <CombinedChart data={combinedChartData}></CombinedChart>: null}
                </div>
            </section>
            <section id="category-section" className="neumorphism pressed" style={{borderRadius:"1em 1em 0 0"}}>
              <div style={{display:"flex",marginBottom:'1em',padding:'1em', borderRadius:"1em"}} className="neumorphism concave" >
                <div className="col-6">
                {this.state.categoryChartData? <CategoryChart data={categoryChartData}></CategoryChart>: null}
                </div>
                <div className="col-6">
                  <CategoryCards/>        
                  
                </div>
              </div>
              <CategoryChips></CategoryChips>
              </section>
        </div>
      

      
    )
  }

  getIncomeChartData = (data)=>{
    var spendingGroup = data.filter(t=>+t.amount.toString().replace(/,/g, '')<0 && moment(t.date,'DD/MM/YYYY').format('YYYY') == '2019').reduce((p,c)=>{
      let currAmount = isNaN(c.amount)? +c.amount.toString().replace(/,/g, ''):+c.amount; //caters for thousand separated values where its a string
      let year = moment(c.date,'DD/MM/YYYY').format("MMM YYYY")
      p[year] = p[year]? {x:year, y: p[year].y+=  Math.abs(currAmount)} : {x:year, y:  Math.abs(currAmount)};
      return p
    },{})

    var incomeGroup = data.filter(t=>+t.amount.toString().replace(/,/g, '')>0 && moment(t.date,'DD/MM/YYYY').format('YYYY') == '2019').reduce((p,c)=>{
      let currAmount = isNaN(c.amount)? +c.amount.toString().replace(/,/g, ''):+c.amount; //caters for thousand separated values where its a string
      let year = moment(c.date,'DD/MM/YYYY').format("MMM YYYY")
      p[year] = p[year]? {x:year, y: p[year].y+=  Math.abs(currAmount)} : {x:year, y:  Math.abs(currAmount)};
      return p
    },{})
    console.log(data.filter(t=>t.amount>0))
    var incomeData = Object.keys(incomeGroup).map(g=>{return incomeGroup[g]}).sort((a,b)=>{return moment(a,"MMM YYYY")<moment(b,"MMM YYYY")?-1:1 })
    var spendingsData = Object.keys(spendingGroup).map(g=>{return spendingGroup[g]}).sort((a,b)=>{return moment(a,"MMM YYYY")<moment(b,"MMM YYYY")?-1:1 })
    console.log(spendingGroup)

    //var incomeChartData = data.map(t=> Math.abs(t.amount))
    this.setState({combinedChartData:[incomeData,spendingsData]})
  }

  getCategoryChartData = (data)=>{
    var categoryGroup = data.filter(t=>t.category == "Allowance" && moment(t.date,'DD/MM/YYYY').format('YYYY') == '2019').reduce((p,c)=>{
      let currAmount = isNaN(c.amount)? +c.amount.toString().replace(/,/g, ''):+c.amount; //caters for thousand separated values where its a string
      let year = moment(c.date,'DD/MM/YYYY').format("MMM YYYY")
      p[year] = p[year]? {x:year, y: p[year].y+=  Math.abs(currAmount)} : {x:year, y:  Math.abs(currAmount)};
      return p
    },{})
    var values = [];
    var labels=[];
    Object.keys(categoryGroup).forEach(g=>{
      values.push(categoryGroup[g].y)
      labels.push(g)
    })
    var categoryData = {values:values, labels:labels};
    console.log(categoryData)
    this.setState({categoryChartData:categoryData})
  }
  
}


export default (Dashboard);