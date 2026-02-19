import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement,reset } from '../slices/counterSlices';

const Counter = () => {
    const value = useSelector((state) => state.counter.value);
    const dispatch = useDispatch();
    
  return (
    <div>
      <span>{value}</span>
        <button onClick={() => dispatch(increment())}>+</button>
        <button onClick={() => dispatch(decrement())}>-</button>
        <button onClick={() => dispatch(reset())}>Reset</button>
    </div>
  )
}


export default Counter;