import React, { useState } from 'react';

function Counter() {
  const [number, setNumber] = useState(0);

  const onIncrease = () => {
    // setNumber(number + 1);
    setNumber(prevNumber => prevNumber + 1);
  };

  const onDecrease = () => {
    // setNumber(number - 1);
    setNumber(prevNumber => prevNumber - 1);
  };

  const onIncreaseThreeTiems = () => {
    setNumber(number => number + 3);   
  };

  const onDncreaseThreeTiems = () => {
    setNumber(number => number - 3);
    // 순차적으로 3번 실행 시켜도 인자로 콜백함수를 넘겨줘야
    // 계획한 대로 실행된다.
    // 아래는 실행해도 실제로 상태값인 number는 (-1)만 적용됨
    // setNumber(number - 1);
    // setNumber(number - 1);
    // setNumber(number - 1);
  };

  return (
    <div>
      <h1>{number}</h1>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
      <br />
      <button onClick={onIncreaseThreeTiems}>+3</button>
      <button onClick={onDncreaseThreeTiems}>-3</button>
    </div>
  )
}

export default Counter;