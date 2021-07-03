import * as React from 'react';
import { select } from "d3-selection";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
import { OptionsProp } from 'react-wordcloud';
export interface ICardItem {
    text: string;
    value: number;
    amount:number;
    frequency:number;
}



export interface ICardState {
  words: ICardItem[]
}

export interface ICardProps {
    words: ICardItem[]
}

export class Card extends React.Component<ICardProps, ICardState> {

    constructor(props) {
      super(props);
      this.state={
        words:[]
      }

    }
    

    componentDidUpdate(prevProps) {
      if(prevProps.words.legnth != this.props.words.length){
        this.setState({ words:this.props.words });
      }
    }

    options:OptionsProp = {
      // colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b"],
      enableTooltip: false,
      deterministic: false,
      fontFamily: "impact",
      fontSizes:  [5, 100],
      fontStyle: "normal",
      fontWeight: "normal",
      padding: 1,
      rotations: 0,
      // rotationAngles: [0, 90],
      // scale: "sqrt",
      spiral: "archimedean",
      transitionDuration: 1000,
    }

    

    public render(): React.ReactElement<ICardProps> {
        return (
            <div style={{ width: "100%", height: "100vh","opacity":"1" }}>
            </div>
        );
    }
}