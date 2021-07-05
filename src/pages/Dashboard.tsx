import React, { Component } from 'react';
import { IWordcloudItem, Wordcloud } from '../components/Wordcloud';
import {withRouter} from 'react-router-dom'
import './Dashboard.css';
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
    this.getIncomeChartData(this.props.location.state);
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
    combinedChartData:null
  }

  render() {
    const { incomeChartData,combinedChartData } = this.state;
    return (
        // <FileInput onFileUploaded={this._onUpload}></FileInput>
        <div className="App">
            <h1>Dashboard</h1>
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

              <input type="radio" className="btn-check" name="btnradio" id="btnradioday" autoComplete="off"></input>
              <label className="btn btn-outline-primary" htmlFor ="btnradioday">Day</label>

              <input type="radio" className="btn-check" name="btnradio" id="btnradiomonth" autoComplete="off"></input>
              <label className="btn btn-outline-primary" htmlFor ="btnradiomonth">Month</label>

              <input type="radio" className="btn-check" name="btnradio" id="btnradioyear" autoComplete="off"></input>
              <label className="btn btn-outline-primary" htmlFor ="btnradioyear">Yea</label>
            </div>
              <div id="graph-card" >
              {this.state.incomeChartData? <IncomeChart data={incomeChartData}></IncomeChart>: null}
              {this.state.combinedChartData? <CombinedChart data={combinedChartData}></CombinedChart>: null}
              </div>
            </section>
            <section id="category-section">
              <div style={{display:"flex",padding:'1em 0'}} >
                <div className="col-6">
                  <CategoryChart></CategoryChart>
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
    var spendingGroup = data.filter(t=>+t.amount.toString().replace(/,/g, '')<0).reduce((p,c)=>{
      let currAmount = isNaN(c.amount)? +c.amount.toString().replace(/,/g, ''):+c.amount; //caters for thousand separated values where its a string
      let year = moment(c.date,'DD/MM/YYYY').format("MMM YYYY")
      p[year] = p[year]? {x:year, y: p[year].y+=  Math.abs(currAmount)} : {x:year, y:  Math.abs(currAmount)};
      return p
    },{})

    var incomeGroup = data.filter(t=>+t.amount.toString().replace(/,/g, '')>0).reduce((p,c)=>{
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
  
}


export default (Dashboard);