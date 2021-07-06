import React, { Component } from 'react'
import { Chart, registerables } from 'chart.js';
import './CategoryChips.scss'
export default class CategoryChips extends React.Component{
    array = [{text:'Food'},{text:'Medical'},{text:'Allowance'},{text:'Technology'},{text:'Games'},{text:'Sports'},{text:'Shirts'},{text:'All'},{text:'Car'},{text:'Trip'},{text:'Education'}]

    render(){
        return(
            <div style={{overflow:'none'}}>
                <div style={{display:'flex',overflowX:'auto'}} >
                {this.array.map(a => {     
                    console.log("Entered");                 
                    // Return the element. Also pass key     
                    return (
                        // <div className="" style={{margin:'5px', minWidth: 0, flexGrow:1,width:'100%'}}  key={a.text}>
                            <div className="chipsContainer" key={a.text}>
                                <button className="btn btn-light rounded"> {a.text}</button>
                            {/* <input type="radio" className="btn-check" name="btnradio" id={a.text} autoComplete="off" ></input>
                            <label className="btn btn-light rounded" htmlFor ={a.text}>{a.text}</label> */}
                                {/* <button style={{padding:'7px'}} className=" chips">{a.text}</button> */}
                                {/* <div style={{padding:'7px'}} className=" chips">
                                    {a.text}
                                    <i className="fa fa-times-circle pointer" ></i>
                                </div> */}
                            </div>
                        // </div>
                        ) 
                })}

            </div>
            </div>
            
        )
        
    }
}