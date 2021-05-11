import React, { Component } from 'react';
import './Maze.css';

class maze extends Component{
    constructor(props) {
        super(props);
        this.state = {
            x: props.x,
            y: props.y,
            maze: props.arr
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



    render() {
        return (
            <div className="maze">
                {this.state.maze.map((line) => (
                    <div className="row">
                        {
                            line.map(box => (
                                    <div className={`box`+box}>
                                        {box}
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
