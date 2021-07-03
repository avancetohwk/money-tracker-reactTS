import * as React from 'react';
import ReactWordcloud, { OptionsProp } from "react-wordcloud";
import { select } from "d3-selection";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
export interface IWordcloudItem {
    text: string;
    value: number;
    amount:number;
    frequency:number;
}



export interface IWordcloudState {
  words: IWordcloudItem[]
}

export interface IWordcloudProps {
    words: IWordcloudItem[]
    //onFileUploaded: (data: Array<any>, fileInfo: IFileInfo) => any;
}

export class Wordcloud extends React.Component<IWordcloudProps, IWordcloudState> {

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

    // getCallback(callback) {
    //   return function (word, event) {
    //     const isActive = callback !== "onWordMouseOut";
    //     const element = event.target;
    //     const text = select(element);
    //     text
    //       .transition()
    //       .attr("background", "white")
    //       // .attr("font-size", isActive ? "100%" : "100%")
    //       .attr("text-decoration", isActive ? "underline" : "none");
    //   };
    // }

    callbacks={
      //getWordTooltip: word=> `You've spent on "${word.text}" ${word.frequency} times. It costs a total of RM ${word.amount.toFixed(2)}`,
    }
    

    public render(): React.ReactElement<IWordcloudProps> {
        return (
            <div style={{ width: "100%", height: "100vh","opacity":"1" }}>
                <ReactWordcloud options={this.options} callbacks={this.callbacks} maxWords={1000} words={this.props.words} />
            </div>
        );
    }
}