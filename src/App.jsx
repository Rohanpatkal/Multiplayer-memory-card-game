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