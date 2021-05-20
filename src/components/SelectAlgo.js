import React, { Component } from 'react';
import  './SelectAlgo.css';
import Select from '@mitchellhamilton/react-select-1';
import { isMobile } from "react-device-detect";

const options = [
    { value: 'BFS', label: 'BFS' },
    { value: 'DFS', label: 'DFS' },
  ];

class SelectAlgo extends Component{
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: null,
            Running: props.Running
        }
    }

    handleChange = selectedOption => {
        this.setState({ selectedOption });
        this.props.getChoice(selectedOption)
      };


    render() {
        const { selectedOption } = this.state;
        return (
            <div className="algoList">
                <Select value={selectedOption}
                    onChange={this.handleChange}
                    options={options}
                    isDisabled  = {this.state.Running}
                    placeholder = {isMobile? 'Algo': 'Select Algorithm..'}
                    className={isMobile? 'selec': ''}
                />
            </div>
          );
    }
}
export default SelectAlgo;
