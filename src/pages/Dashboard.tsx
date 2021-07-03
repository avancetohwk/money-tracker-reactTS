import React, { Component } from 'react';
import { IWordcloudItem, Wordcloud } from '../components/Wordcloud';
import {withRouter} from 'react-router-dom'
import '../App.css';
import { RouteComponentProps } from '@reach/router';
import { isFunctionTypeNode } from 'typescript';

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
      console.log('bruh')
      console.log(this.props)
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
      <div style={{position:'relative',height: '100%', width: '100%'}}>
        <div style={{position:'absolute',opacity:0.2,height: '100%', width: '100%'}}>
            {this.state.wordcloudWords? <Wordcloud words={this.state.wordcloudWords}></Wordcloud>: null}    
        </div>
      
      
      </div>
    </div>
      

      
    )
  }
  
}


export default (Dashboard);