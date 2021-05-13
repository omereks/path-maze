import React, { Component } from 'react';
import './Maze.css';

class maze extends Component{
    constructor(props) {
        super(props);
        this.state = {
            x: props.x,
            y: props.y,
            maze: props.arr,
            countBox: 0
        }
    }

    componentWillReceiveProps(newProps){
        if (newProps.y > this.state.y)
            this.addRow(newProps.y - this.state.y);

        if (newProps.y < this.state.y)
            this.removeRow(this.state.y - newProps.y);


        if (newProps.x > this.state.x)
            this.addCul(newProps.x - this.state.x);

        if (newProps.x < this.state.x)
            this.removeCul(this.state.x - newProps.x);

        
        this.setState({ x: newProps.x, y:newProps.y, maze:newProps.arr })
    }
    
    componentDidMount() {
       
    }

    addRow(numRowToAdd){ 
        for (var i=0; i < numRowToAdd ; i++)
        {
            var arr = Array.from(this.state.maze[this.state.maze.length -1]); 
            this.state.maze.push(arr);
        }
    }
    
    removeRow(numRowToRemove){
        for (var i=0; i < numRowToRemove ; i++)
        {
            this.state.maze.pop();
        }
    }


    addCul(numCulToAdd){
        for (var i=0; i < numCulToAdd ; i++){
            this.state.maze.map(row => {
                row.push(1)
            })
        }
    }
    
    removeCul(numCulToRemove){
        for (var i=0; i < numCulToRemove ; i++){
            this.state.maze.map(row => {
                row.pop()
            })
        }
    }

    clickk() {
        console.log("sd")
    }

    setCountBox() {
        this.setState({ countBox: 5 })
    }

    handleChange = maze => {
        this.props.getChangedMaze(this.state.maze)
      };

    render() {
        return (
            <div className="maze">
                {this.state.maze.map((line, i) => (
                    <div className="row">
                        {
                            line.map((box, j) => (
                                    
                                    <div id={`box`+this.state.countBox} className={`box`+box} onClick={() => {
                                        var ar = [[]]
                                        ar = this.state.maze;
                                        if((ar[i][j] != 2 ) && (ar[i][j] != 9) && (ar[i][j] != 6) && (ar[i][j] != 5)){
                                            ar[i][j] = ar[i][j] == 1? 0 : 1;
                                            this.setState({ maze: ar })
                                            this.handleChange();
                                        }
                                    }} >
                                        {box}
                                        {this.setCountBox}
                                    </div>
                                    
                                    
                                ))
                        }
                         
                    </div>
                ))}
            </div>
          );
    }
}
export default maze;
