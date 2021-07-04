import React, { Component } from 'react';
import { IWordcloudItem, Wordcloud } from '../components/Wordcloud';
import {withRouter} from 'react-router-dom'
import './Dashboard.css';
import { RouteComponentProps } from '@reach/router';
import '../global.css'
import Sidebar from '../components/Sidebar';
import styled from "styled-components";
import CategoryCards from '../components/Stackcards';
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

// const Pages = styled.div`
//   width: 100vw;
//   height: 100vh;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   h1 {
//     font-size: calc(2rem + 2vw);
//     background: linear-gradient(to right, #803bec 30%, #1b1b1b 100%);
//     -webkit-background-clip: text;
//     -webkit-text-fill-color: transparent;
//   }
// `;


class Dashboard extends Component<RouteComponentProps> {
    constructor(props) {
    super(props);

    }
  componentDidMount(){
      this.setState({wordcloudWords: this.props.location.state})
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
    wordcloudWords: null
  }

  render() {
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
              <div id="graph-card" style={{position:'relative'}}>
                
              </div>
            </section>
            <section id="category-section">
              <div style={{display:"flex",height:'100%',padding:'1em 0'}} >
                <div className="col-6">
                <h2>bottom</h2>
                </div>
                <div className="col-6">
                  <CategoryCards/>        
                </div>
              </div>
                  
              </section>
        </div>
      

      
    )
  }
  
}


export default (Dashboard);