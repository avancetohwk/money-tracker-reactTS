import React, { Component } from 'react';
import './App.css';
import { FileInput } from './components/FileInput';
import CSVReader, { IFileInfo } from 'react-csv-reader';
import { IWordcloudItem, Wordcloud } from './components/Wordcloud';

interface IFinanceTrackings{
  date:Date,
  account:string,
  category:string,
  amount:number,
  "converted amount": number,
  currency:string,
  description:string
}


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
  render() {
    return (
      // <FileInput onFileUploaded={this._onUpload}></FileInput>
      <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <div>
      <Wordcloud words={this.wordcloudWords}></Wordcloud>
      <FileInput onFileUploaded={this._onUpload}></FileInput>
      </div>
    </div>
      

      
    )
  }
  
  private _onUpload = (data: Array<any>, fileInfo: IFileInfo) =>{
    this.allFinanceTrackings = data;
    // this.wordcloudWords = this.allFinanceTrackings;
    console.log(data)
    console.log(this.allFinanceTrackings);
    console.log(fileInfo)
  }
}


export default App;