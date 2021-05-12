import React, { Component } from 'react';
import  './SelectAlgo.css';
import Select from '@mitchellhamilton/react-select-1';

const options = [
    { value: 'BFS', label: 'BFS' },
    { value: 'DFS', label: 'DFS' },
    { value: 'Djkstar', label: 'Djkstar' },
  ];

class SelectAlgo extends Component{
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: null,
            maze: props.maze
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
                />
            </div>
          );
    }
}
export default SelectAlgo;
