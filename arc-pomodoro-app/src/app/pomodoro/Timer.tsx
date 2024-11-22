'use client';
import React, { useEffect, useState } from 'react';

const Timer = (
  props: React.JSX.IntrinsicAttributes &
    React.ClassAttributes<HTMLParagraphElement> &
    React.HTMLAttributes<HTMLParagraphElement>
) => {
  const [timeMS, setTimeMS] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeMS(timeMS - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeMS]);

  return <p {...props}>{timeMS}</p>;
};

export default Timer;
