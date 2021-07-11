import React, { Component } from 'react'
import { Chart, registerables } from 'chart.js';
import './CategoryChips.scss'

export interface IChipsProps{
    data:any[],
    groupName:string
}

export default class CategoryChips extends React.Component<IChipsProps>{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div style={{display:'flex',justifyContent:'center'}}>
                <div className="chipsList radio-toolbar" style={{display:'flex',overflowX:'auto'}} >
                    {this.props.data.map(a => {                
                    // Return the element. Also pass key     
                    return (
                            <div className="chipContainer " key={a.text}>
                                <input type="radio" id={'chip_'+a.text} name={this.props.groupName} value={a.text}></input>
                                <label className="rounded neumorphism concave" htmlFor={'chip_'+a.text}>{a.text}</label>
                            </div>
                        ) 
                    })}
                </div>
            </div>
            
        )
        
    }
}