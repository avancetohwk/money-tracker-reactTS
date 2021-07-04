import React, { Component } from 'react';
import './App.scss';
import CSVReader, { IFileInfo } from 'react-csv-reader';
import { IWordcloudItem, Wordcloud } from './components/Wordcloud';
import {Router, Switch,Route} from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import history from './utils/history';
import { Suspense } from 'react';
import Sidebar from './components/Sidebar';
import styled from 'styled-components';


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

class App extends Component {
  
  
  allFinanceTrackings: IFinanceTrackings[];
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
    // return (
    //   // <FileInput onFileUploaded={this._onUpload}></FileInput>
    //   <div className="App">
    //   <header className="App-header">
    //     {/* <img src={logo} className="App-logo" alt="logo" /> */}
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    //   <div style={{display:'flex'}}>
    //   {this.state.wordcloudWords? <Wordcloud words={this.state.wordcloudWords}></Wordcloud>: null}
      
    //   </div>
    //   <FileInput onFileUploaded={this._onUpload}></FileInput>
    // </div>
      

      
    // )
    return (
      <>
       {/* <Sidebar />
      <Pages>
      </Pages> */}
      <Router history={history}>
        <Suspense fallback="loading...">
          <Switch>
            <Route path="/" exact component={Home}></Route>
            <Route path="/dashboard" exact component={Dashboard}></Route>
          </Switch>
        </Suspense>
        
      </Router>
      </>
    )
  }
  
  private _onUpload = (data: Array<any>, fileInfo: IFileInfo) =>{
    this.allFinanceTrackings =  data;
    var groups = this.allFinanceTrackings.filter(t=>t.amount<0).reduce((p,c)=>{
      let currAmount = isNaN(c.amount)?  +c.amount.toString().replace(/,/g, ''):+c.amount; //caters for thousand separated values where its a string
      p[c.description] = p[c.description]? {Frequency:++p[c.description].Frequency, Sum: p[c.description].Sum+= currAmount} : {Frequency:1, Sum: currAmount};
      return p
    },{})
    var wordcloudWords = Object.keys(groups).map(g=>{return {text: g, value: groups[g].Frequency, amount: groups[g].Sum, frequency: groups[g].Frequency}});
    // var wordcloudWords2 = Object.keys(groups).map(g=>{return {text: g, value: Math.abs(groups[g].Sum), amount: groups[g].Sum, frequency:groups[g].Frequency}});
    this.setState({wordcloudWords: wordcloudWords})
  }
}


export default App;