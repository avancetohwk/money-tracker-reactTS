import * as React from 'react';
import CSVReader, { IFileInfo } from 'react-csv-reader';

export interface IFileInputItem {
    title: string;
    spSiteUrl: string;
}

export interface IFileInputState {
}

export interface IFileInputProps {
    onFileUploaded: (data: Array<any>, fileInfo: IFileInfo) => any;
}

export class FileInput extends React.Component<IFileInputProps, IFileInputState> {
    private _selection: Selection;

    constructor(props) {
        super(props);
    }

    papaparseOptions = {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        transform: val =>
        val
            .trim()
    }

    private _onUpload = (data: Array<any>, fileInfo: IFileInfo) =>{

        this.props.onFileUploaded(data,fileInfo);
    }

    

    public render(): React.ReactElement<IFileInputProps> {
        return (
            <CSVReader
                cssClass="csv-reader-input"
                label="Select CSV with secret Death Star statistics"
                onFileLoaded={this._onUpload}
                // onError={this.handleDarkSideForce}
                parserOptions={this.papaparseOptions}
                inputId="ObiWan"
                inputName="ObiWan"
                inputStyle={{color: 'red'}}
            />
        );
    }
}