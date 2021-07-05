import React, { Component } from 'react';
import  { IFileInfo } from 'react-csv-reader';
import { FileInput } from '../components/FileInput';
import { withRouter } from 'react-router-dom';
import history from '../utils/history';



interface IFinanceTrackings{
  date:Date,
  account:string,
  category:string,
  amount:number,
  "converted amount": number,
  currency:string,
  description:string
}


class Home extends Component {
//   history = useHistory();
  
  allFinanceTrackings: IFinanceTrackings[];

  state={
    wordcloudWords: null,
    allFinanceTrackings:null
  }

  render() {
    return (
        <div className="App">
            <h1>Home</h1>
            <FileInput onFileUploaded={this._onUpload}></FileInput>
        </div>
    )
  }

  

  navigateToDashboard = async()=> {
    console.log(this.props)
    console.log(this.state)
    history.push("/dashboard", this.state.allFinanceTrackings);
  }

  
  private _onUpload = (data: Array<any>, fileInfo: IFileInfo) =>{
    this.allFinanceTrackings =  data;
    var groups = this.allFinanceTrackings.filter(t=>t.amount<0).reduce((p,c)=>{
      let currAmount = isNaN(c.amount)?  +c.amount.toString().replace(/,/g, ''):+c.amount; //caters for thousand separated values where its a string
      p[c.description] = p[c.description]? {Frequency:++p[c.description].Frequency, Sum: p[c.description].Sum+= currAmount} : {Frequency:1, Sum: currAmount};
      return p
    },{})
    var wordcloudWords = Object.keys(groups).map(g=>{return {text: g, value: groups[g].Frequency, amount: groups[g].Sum, frequency: groups[g].Frequency}});
    this.setState({wordcloudWords: wordcloudWords,allFinanceTrackings: this.allFinanceTrackings})
    this.navigateToDashboard()
  }
}


export default (Home);