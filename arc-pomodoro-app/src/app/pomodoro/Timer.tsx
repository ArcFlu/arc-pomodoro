'use client';
import React, { useEffect, useState } from 'react';

  
const Timer = (
  props: React.JSX.IntrinsicAttributes &
    React.ClassAttributes<HTMLParagraphElement> &
    React.HTMLAttributes<HTMLParagraphElement>
) => {
  const [timeMS, setTimeMS] = useState(100);
  const [disable, setDisable] = useState(true);
  const [toggleTime, setTimeName] = useState("Start Timer");

  const handleOnClickStop = () =>{
    setDisable(prevValue => !prevValue);
    console.log(disable);
    if(!disable){
      setTimeName("Start Timer");
    }
    else{
      setTimeName("Stop Timer");
    }
    return disable;
  }

  const handleOnClickReset = () => {
    setTimeMS(100);
    setDisable(true);
    setTimeName("Start Timer");
  }

  useEffect(() => { 
    if(disable === false){
        const interval = setInterval(() => {
          setTimeMS(timeMS - 1);
        }, 1000);
        return () => clearInterval(interval);
    }
  }, [timeMS, disable]);

  return <>
  <p {...props}>{timeMS}</p>
  <button onClick = {handleOnClickReset}>Reset</button>
  <br></br>
  <button onClick = {handleOnClickStop}>{toggleTime}</button>
  </>;
};

export default Timer;
