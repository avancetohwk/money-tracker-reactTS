import * as React from 'react';
import './CategoryCard.scss'
import { FaChartBar, FaDollarSign } from 'react-icons/fa';
import {  FiRepeat } from 'react-icons/fi';

export interface ICategoryCardItem {
    frequency: string,
    amount: string,
    average:string  
}



export interface ICategoryCardState {
    currentSelection: string
}

export interface ICategoryCardProps {
    item: ICategoryCardItem
}



export default class CategoryCard extends React.Component<ICategoryCardProps, ICategoryCardState> {
    categoryCardValues = {
        frequency:{
            text: "Max Frequency",
            value: 0
        },
        amount:{
            text: "Max Amount",
            value: 0
        },
        average:{
            text: "Average Amount",
            value: 0
        }
    }

    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            currentSelection: "frequency",
        };

        Object.keys(this.categoryCardValues).map(k=>{
            if(props.item[k]){
                this.categoryCardValues[k].value =  props.item[k];
            }
        })
    }

    componentDidMount(){

    }

    public render(): React.ReactElement<ICategoryCardProps> {
        const {currentSelection} = this.state;
        return (
            <div className="categoryCard" id="dp-slider">
                <div className="glassmorphism neumorphism accent pressed item" >
                    <div className="content">
                        <h2>{this.categoryCardValues[currentSelection].value}</h2>
                        <p>{this.categoryCardValues[currentSelection].text}</p>
                    </div>
                    <div className="chipsList radio-toolbar" >
                        <div className="chipContainer " >
                            <input type="radio" id={'chip_frequency'} name='categoryDetails' value={'frequency'} onChange={this.onRadioChange}></input>
                            <label className="neumorphism concave" htmlFor={'chip_frequency'}><FiRepeat /></label>
                        </div>
                        <div className="chipContainer " >
                            <input type="radio" id={'chip_amount'} name='categoryDetails' value={'amount'} onChange={this.onRadioChange}></input>
                            <label className="neumorphism concave"  htmlFor={'chip_amount'}><FaDollarSign /></label>
                        </div>
                        <div className="chipContainer " >
                            <input type="radio" id={'chip_average'} name='categoryDetails' value={'average'} onChange={this.onRadioChange}></input>
                            <label className="neumorphism concave " htmlFor={'chip_average'}><FaChartBar /></label>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    onRadioChange=(e)=>{
        this.setState({currentSelection: e.target.value})
    }
}