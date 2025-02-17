import react, { useState } from 'react';
import './App.css';
import Card from "./components/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function App()
{
  const [a,setA] = useState([10,20,30,40,50,60,10,20,30,40,50,60]);
  const [fIndex , setFIndex] = useState(null);
  const [sIndex , setSIndex] = useState(null);
  const [win , setWin] = useState([]);
  const [count , setCount] = useState(0);

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
      else if(sIndex === null)
      {
        setSIndex(index);
        if (a[fIndex] === a[index]) {
            handleWin(index,fIndex);
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
    <div className="disp d-flex gap-4  text-center align-items-center justify-content-center">
      <button className='btn btn-dark m-2 p-3 text-white' onClick={()=>setArr()}>Genarate game</button>
      <h1 className='border border2 border-black p-1 rounded'>__win__: {count}</h1>
    </div>
    
      {/* <br/>
      {a+" "} */}
      
      
      <div className="container text-center w-50">
        <div className="row border g-0 align-items-stretch p-auto">
        {
          a.map((e,i)=>
          <div key={i} className="col col-sm-4 d-flex justify-content-center" onClick={()=>handleIndex(i)} style={{ cursor: "pointer" }}>
            <Card value ={e} disp = {(i === fIndex || i === sIndex || win.includes(i)) }/>
          </div>
          )
        }
        </div>
      </div>

        {/* {
          a.map((e,i)=>
            <Card value ={e}/>
          )
        } */}
      
    </>
  );
}
export default App;