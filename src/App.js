
import './App.css';
import Maze from './components/Maze';
import React, { useEffect, useState } from 'react';
import SelectAlgo from './components/SelectAlgo';



function App() {
  const [x, setX] = React.useState(10)  ;
  const [y, setY] = React.useState(10);
  const [arr, setArr] = React.useState([[]]);
  const [Algo, setAlgo] = React.useState("");
  

  useEffect(() => {
    genrateMaze();
  }, []);

  function genrateMaze() {
    var arrR = [];
    
    for (var i=0 ; i<y ; i++){
      var arrC = Array.from({length: x}, () => Math.floor(Math.random() * 2));
      arrR.push(arrC);
    }
    //set start
    var start = Math.floor(Math.random() * y)
    arrR[start][0] = 2;
    setArr(arrR)

    //finsh line
    var finsh = Math.floor(Math.random() * y)
    arrR[finsh][arrC.length-1] = 9;
    setArr(arrR)
  }

  function createAdj(){
    var Adj = []
    var arrC = []
    //initilize to 0s
    for (var i=0 ; i<x*y ; i++){
      var arrC = []
      for (var j=0 ; j<x*y ; j++){
        arrC.push(0);
      }
      Adj.push(arrC);
    }

    var count = 0;
    for (var i=0 ; i<y ; i++){
      for (var j=0 ; j<x ; j++){
        if(arr[i][j] != 0)
          Adj[count][count] = 1;
        count++;
      }
    }

    for(var i=0 ; i<x*y ; i++){
      if(Adj[i][i] == 1){
        var r = Math.floor(i/x);
        var c = i%x;
        
        //console.log(arr[r][c])

        //right
        if((i+1)%x != 0)
          if(arr[r][c+1] != 0)
            Adj[i][i+1] = 1
        
        //left
        if(i%x != 0)
          if(arr[r][c-1] != 0)
            Adj[i][i-1] = 1

        //up
        if(i >= x)
          if(arr[r-1][c] != 0)
            Adj[i][i-x] = 1

        //down
        if(r<y -1)
          if(arr[r+1][c] != 0)
            Adj[i][i+x] = 1
      }
    }
    return (Adj);
  }

  function SolveMaze(){
    var Adj = createAdj();
    console.log()
  }

  return (
    <div className="App">
      <label>
        X:
        <input type="number" value={x} onChange={(e) => setX(e.target.valueAsNumber)} />
      </label>
      <label>
        Y:
        <input type="number" value={y} onChange={(e) => {
          setY(e.target.valueAsNumber)
        }} />
      </label>
      <button onClick = {genrateMaze}>Genrate Maze</button>
      <div className="algo">
        <SelectAlgo getChoice={(algo)=>setAlgo(algo.value)} className="sele" maze={arr}></SelectAlgo>
        <button onClick = {SolveMaze}>Solve Maze</button>
      </div>
      <div className="maze">
        <Maze x={x} y={y} arr={arr}></Maze>
      </div>
    </div>
  );
}

export default App;
