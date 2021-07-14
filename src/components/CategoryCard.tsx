import * as React from 'react';
import './CategoryCard.scss'
import { FaChartBar, FaDollarSign, FaInfo } from 'react-icons/fa';

export interface ICategoryCardItem {
    text: string;
    value: number;
    amount:number;
    frequency:number;
}


export interface ICategoryCardState {
  words: ICategoryCardItem[]
}

export interface ICategoryCardProps {
    words: ICategoryCardItem[]
}


export default class CategoryCard extends React.Component {

    constructor(props) {
      super(props);
    }
    

    componentDidUpdate(prevProps) {
    }

    public render(): React.ReactElement<ICategoryCardProps> {
        return (
            <div className="categoryCard" id="dp-slider">
                <div className="glassmorphism neumorphism accent pressed item" >
                    <div className="content">
                        <h2>343</h2>
                        <p> Highest Frequency</p>
                    </div>
                    <div className="chipsList radio-toolbar" style={{display:'flex',overflowX:'auto'}} >
                        <div className="chipContainer " >
                            <input type="radio" id={'chip_frequency'} name='categoryDetails' value={'frequency'}></input>
                            <label className="neumorphism concave" htmlFor={'chip_frequency'}><FaChartBar /></label>
                        </div>
                        <div className="chipContainer " >
                            <input type="radio" id={'chip_amount'} name='categoryDetails' value={'amount'}></input>
                            <label className="neumorphism concave"  htmlFor={'chip_amount'}><FaDollarSign /></label>
                        </div>
                        <div className="chipContainer " >
                            <input type="radio" id={'chip_average'} name='categoryDetails' value={'average'}></input>
                            <label className="neumorphism concave " htmlFor={'chip_average'}><FaInfo /></label>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}