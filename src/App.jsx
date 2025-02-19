/*
import react, { useState } from 'react';
import './App.css';
import Card from "./components/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function App()
{
  const [a,setA] = useState([10,20,30,40,50,60,10,20,30,40,50,60,70,70,80,80]);
  const [fIndex , setFIndex] = useState(null);
  const [sIndex , setSIndex] = useState(null);
  const [win , setWin] = useState([]);
  const [count , setCount] = useState(0);
  const [loseCount, setLoseCount] = useState(0);
 // var a = [10,20,30,40,50,60];
  function setArr()
  {
    let i=0;
    //shuffle array;
    
    let shuffle = [...a];
    for(i=0;i<a.length;i++)
    {
      var j = Math.floor(Math.random() * (a.length-1 - 0 + 1)) + 0;

      var temp = shuffle[i];
      shuffle[i] = shuffle[j];
      shuffle[j] = temp;
    }
    setA(shuffle);
    setWin([]);
    setCount(0);
    //setWin(0);
    setLoseCount(0);
    setFIndex(null);
    setSIndex(null);
  }
  function handleWin(sIndex,fIndex)
  {
    if(!win.includes(fIndex) && !win.includes(sIndex))
    {
      setWin((p)=>[...p,fIndex,sIndex]);
      setCount(count+1);
    }
  }
  function handleIndex(index)
    {
      if(fIndex === null)
      {
        setFIndex(index);
      }
      else if(sIndex === null && fIndex != index)
      {
        setSIndex(index);
        if (a[fIndex] === a[index]) {
            handleWin(index,fIndex);
        }
        else
        {
          setLoseCount(loseCount + 1);
        }
      }
      else
      {
        setFIndex(index);
        setSIndex(null);
      }
    }
  return(
    <>
    <div className="disp d-flex gap-4 p-2 text-center align-items-center justify-content-center border border-2 border-black rounded" style={{background:"#2D2926"}}>
      <button className='fw-bolder fs-5 btn btn-dark m-0 p-3 text-white border border-2 border-black ' style={{background:"#0063B2" }} onClick={()=>setArr()}>Genarate game</button>
      <h1 className='fw-bolder border border-2 fs-5 text-bg-light border-black p-3 rounded m-0' style={{background:"#D6ED17"}}>__Win__: {count}</h1>
      <h1 className='fw-bolder border border-2 fs-5 text-white border-black p-3 rounded m-0' style={{background:"#0063B2"}}>__Lose__: {loseCount}</h1>
    </div>
      <div className="container text-center w-50">
        <div className="row  g-0 align-items-stretch p-auto">
        {
          a.map((e,i)=>
          <div key={i} className="col col-sm-3 d-flex justify-content-center" onClick={()=>handleIndex(i)} style={{ cursor: "pointer" }}>
            <Card value ={e} disp = {(i === fIndex || i === sIndex || win.includes(i)) }/>
          </div>
          )
        }
        </div>
      </div>      
    </>
  );
}
export default App;
*/

import React, { useState, useEffect } from 'react';
import { createClient } from "@supabase/supabase-js";
import './App.css';
import Card from "./components/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const SUPABASE_URL = "https://vticpysfvablhzzcyffm.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ0aWNweXNmdmFibGh6emN5ZmZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk5NjkwOTEsImV4cCI6MjA1NTU0NTA5MX0.MCI8olYGVLXDVyE4SUcF3tNpc2CISHVoY7DTgzfp4nc";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const GAME_ID = 1;

function App() {
  const [gameState, setGameState] = useState({
    a: [10, 20, 30, 40, 50, 60, 10, 20, 30, 40, 50, 60, 70, 70, 80, 80],
    fIndex: null,
    sIndex: null,
    win: [],
    playerScores: { 1: 0, 2: 0 },
    loseCount: 0,
    currentPlayer: 1,
  });

  useEffect(() => {
    async function fetchGameState() {
      let { data } = await supabase.from("games").select("state").eq("id", GAME_ID).single();
      if (data) setGameState(data.state);
    }
    fetchGameState();

    const subscription = supabase
      .channel("game_updates")
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "games" }, (payload) => {
        setGameState(payload.new.state);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  async function updateGameState(newState) {
    setGameState(newState);
    await supabase.from("games").update({ state: newState }).eq("id", GAME_ID);
  }

  function setArr() {
    let shuffled = [...gameState.a].sort(() => Math.random() - 0.5);
    let newState = { ...gameState, a: shuffled, win: [], playerScores: { 1: 0, 2: 0 }, loseCount: 0, fIndex: null, sIndex: null };
    updateGameState(newState);
  }

  function handleWin(sIndex, fIndex) {
    if (!gameState.win.includes(fIndex) && !gameState.win.includes(sIndex)) {
      let newScores = { ...gameState.playerScores };
      newScores[gameState.currentPlayer] += 1;
      let newState = { ...gameState, win: [...gameState.win, fIndex, sIndex], playerScores: newScores };
      updateGameState(newState);
    }
  }

  function handleIndex(index) {
    let newState = { ...gameState };
  
    if (gameState.fIndex === null) {
      // First card selection
      newState.fIndex = index;
    } else if (gameState.sIndex === null && gameState.fIndex !== index) {
      // Second card selection
      newState.sIndex = index;
  
      if (gameState.a[gameState.fIndex] === gameState.a[index]) {
        // ✅ If it's a match, update win state
        newState.win = [...gameState.win, gameState.fIndex, index];
        newState.playerScores[gameState.currentPlayer] += 1;
        newState.fIndex = null; // Reset selection
        newState.sIndex = null;
      } else {
        // ❌ If it's NOT a match, show both cards briefly, then hide them
        newState.loseCount += 1;
        newState.currentPlayer = gameState.currentPlayer === 1 ? 2 : 1;
  
        updateGameState(newState); // Show second card first
  
        setTimeout(() => {
          updateGameState({ ...newState, fIndex: null, sIndex: null });
        }, 1000);
        
        return;
      }
    }
  
    // ✅ Check if all cards are matched
    if (newState.win.length === newState.a.length) {
      setTimeout(() => {
        determineWinner(newState);
      }, 500);
    }
  
    updateGameState(newState);
  }
  
  
  
  

  return (
    <>
      <div className="d-flex justify-content-between p-3" style={{ background: "#2D2926" }}>
        {/* Player 1 UI (Left) */}
        <div className="text-center text-white">
          <h2>Player 1</h2>
          <h3>Win: {gameState.playerScores[1]}</h3>
        </div>
        
        <button className='fw-bolder fs-5 btn btn-dark p-3 text-white border border-2 border-black' style={{ background: "#0063B2" }} onClick={() => setArr()}>Generate game</button>

        {/* Player 2 UI (Right) */}
        <div className="text-center text-white">
          <h2>Player 2</h2>
          <h3>Win: {gameState.playerScores[2]}</h3>
        </div>
      </div>
      
      <h2 className='text-center text-white'>Current Player: {gameState.currentPlayer}</h2>
      
      <div className="container text-center w-50">
        <div className="row g-0 align-items-stretch p-auto">
          {gameState.a.map((e, i) => (
            <div key={i} className="col col-sm-3 d-flex justify-content-center" onClick={() => handleIndex(i)} style={{ cursor: "pointer" }}>
              <Card value={e} disp={i === gameState.fIndex || i === gameState.sIndex || gameState.win.includes(i)} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
