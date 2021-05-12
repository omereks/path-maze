
import './App.css';
import Maze from './components/Maze';
import React, { useEffect, useState } from 'react';
import SelectAlgo from './components/SelectAlgo';
import { waitFor } from '@testing-library/dom';



function App() {
  const [x, setX] = React.useState(10)  ;
  const [y, setY] = React.useState(10);
  const [arr, setArr] = React.useState([[]]);
  const [Algo, setAlgo] = React.useState("");
  const [Start, setStart] = React.useState();
  const [End, setEnd] = React.useState();
  
  const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

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
    setStart(start*x)
    setArr(arrR)

    //finsh line
    var finsh = Math.floor(Math.random() * y)
    arrR[finsh][arrC.length-1] = 9;
    setEnd(x-1 + finsh*x)
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

  function buildPath(parents, targetNode) {
    var result = [targetNode];
    while (parents[targetNode] !== null) {
      targetNode = parents[targetNode];
      result.push(targetNode);
    }
    return result.reverse();
  }

  function visite(number){
    var curArr = [[]]
    curArr = [...arr];
    var r = Math.floor(number/x);
    var c = number%x;
    if (curArr[r][c] == 1)
      curArr[r][c] = 5
    setArr(curArr);
  }

  async function printFinalPath(arrPath){
    for(var i=0; i<arrPath.length; i++){
      var number = arrPath[i];
      var curArr = [[]]
      curArr = [...arr];
      var r = Math.floor(number/x);
      var c = number%x;
      if (curArr[r][c] == 5)
        curArr[r][c] = 6
      await sleep(500)
      setArr(curArr);
    }    
  }

  async function BFS(graph) {
    var parents = [];
    var queue = [];
    var visited = [];
    var current;
    //setArr([0,0,0])
    queue.push(Start);
    parents[Start] = null;
    visited[Start] = true;
    while (queue.length) {
      current = queue.shift();
      
      //console.log(current);
      visite(current);
      await sleep(500)
      
      if (current === End) {
        var arrPath = buildPath(parents, End);
        printFinalPath(arrPath);
        return buildPath(parents, End);
      }

      for (var i = 0; i < graph.length; i += 1) {
        if (i !== current && graph[current][i] && !visited[i]) {
          parents[i] = current;
          visited[i] = true;
          queue.push(i);
        }
      }
    }
    return null;
  }
  
  function SolveMaze(){
    var Adj = createAdj();
    if(Algo == 'BFS'){
     BFS(Adj);
    }
    if(Algo == 'DFS'){
      BFS(Adj);
     }
  }

  return (
    <div className="App">
      <label>
        X:
        <input type="number" value={x} onChange={(e) => {
          genrateMaze();
          setX(e.target.valueAsNumber)
        }} />
      </label>
      <label>
        Y:
        <input type="number" value={y} onChange={(e) => {
          genrateMaze();
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
