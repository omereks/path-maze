
import './App.css';
import Maze from './components/Maze';
import React, { useEffect, useState } from 'react';
import SelectAlgo from './components/SelectAlgo';
import { waitFor } from '@testing-library/dom';
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import InputNumber from 'rc-input-number';
import "rc-input-number/assets/index.css";
import SocialButtonsContainer from 'react-social-media-buttons';
import { isMobile } from "react-device-detect";



const WAITTIME = 100;

function App() {
  const [x, setX] = React.useState(isMobile? 10 :40)  ;
  const [y, setY] = React.useState(isMobile? 15 : 20);
  const [arr, setArr] = React.useState([[]]);
  const [AdjM, setAdjM] = React.useState([[]]);
  const [Algo, setAlgo] = React.useState("");
  const [Start, setStart] = React.useState();
  const [End, setEnd] = React.useState();
  const [Running, setRunning] = React.useState(false);
  const [Mazeble, setMazeble] = React.useState(true);

  const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

  useEffect(() => {
    var arrTemp = genrateMaze();
    checkPath(arrTemp);
    //console.log(checkPath())
    //while(Mazeble){
      //setMazeble(checkPath());
    //}
  }, []);

  function checkPath(arrTemp){
    console.log("s")
  }

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
    return(arrR);
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
    setAdjM(Adj);
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

  function clearBoard(fullMode){
    var curArr = [[]]
    curArr = [...arr];
    
    for(var i=0; i<y; i++){
      for(var j=0; j<x; j++){
        if(curArr[i][j]==5){
          curArr[i][j]=1
        }
        if((fullMode) && (curArr[i][j]==6)){
          curArr[i][j]=1
        }
      } 
    } 
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
      await sleep(WAITTIME)
      setArr(curArr);
    }
    clearBoard(false)      
    setRunning(false);
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
      await sleep(WAITTIME)
      
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
    clearBoard(false);
    setRunning(false);
    return null;
  }

  async function DFS(graph) {
    var parents = [];
    var queue = [];
    var visited = [];
    var current;
    //setArr([0,0,0])
    queue.push(Start);
    parents[Start] = null;
    visited[Start] = true;
    while (queue.length) {
      current = queue.pop();
      
      //console.log(current);
      visite(current);
      await sleep(WAITTIME)
      
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
    clearBoard(false)
    setRunning(false);
    return null;
  }
  
  function SolveMaze(){
    var Adj = createAdj();
    if(Algo == 'BFS'){
     BFS(Adj);
    }
    if(Algo == 'DFS'){
      DFS(Adj);
    }
  }

  return (
    <div className="App">
      <div className="title">Maze Solver</div>
      <div className="inputXY">
        <span>
          <span className="inputText">X:</span>
          <span className="sep">
            <InputNumber disabled={Running} min={3} max={99} defaultValue={x} style={{ width:isMobile? 50 : 100 }} onChange={
              (val) => {
                setX(val)
                //genrateMaze();
              }
           
            }/>
          </span>
        </span>
        <span className="sep">
        <span className="inputText">Y:</span>
        <span className="sep">
            <InputNumber disabled={Running} min={3} max={99} defaultValue={y} style={{ width:isMobile? 50 : 100 }} onChange={
              (val) => {
                setY(val)
                //genrateMaze();
              }            
            }/>
          </span>
        </span>
        <span className="sep">
          <AwesomeButton type="primary" disabled={Running} onPress = {genrateMaze} >Genrate Maze</AwesomeButton>      
        </span>      
      </div>
      <div>
        <span>
          <SelectAlgo getChoice={(algo)=>setAlgo(algo.value)} className="sele" Running={Running}></SelectAlgo>
        </span>
        <span className="sep">
        <AwesomeButton type="primary" disabled={(Algo=="")||(Running)}  
          onPress = {()=>{
            clearBoard(true);
            setRunning(true);
            SolveMaze();
            }} >Solve Maze</AwesomeButton>      
        </span>

        <span className="sep">
        <AwesomeButton type="primary"  disabled={Running}
          onPress = {()=>{
            clearBoard(true);
            }} >Clear Board</AwesomeButton>;      
        </span>
      </div>
      <div className="maze">
        <Maze x={x} y={y} arr={arr}  getChangedMaze={(maze)=>setArr(maze)}></Maze>
      </div>
      <div className="buttom">
        <span>Made by Omer Eckstein v1.3</span>
        <span className="sep">
        <div className="socialBT">
        <SocialButtonsContainer
          links={['https://github.com/omereks/path-maze','https://www.linkedin.com/in/omer-eckstein-2813511aa/']}
          buttonStyle={{width: '25px', height: '25px', margin: '0px 5px', backgroundColor: '#f0f8ff', borderRadius: '39%', border: '0px ridge #000000'}}
          iconStyle={{color: '#282c34'}}
          openNewTab={true}
        />
         </div>       
        </span>
      </div>
    </div>
  );
}

export default App;
