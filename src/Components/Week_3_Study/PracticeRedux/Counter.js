import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment } from './action';

const Counter = () => {
    const dispatch = useDispatch();
    const count = useSelector((state) => state);
    return (
        <div>
            <h1>Count: {count}</h1>
            <button onClick={() => dispatch(increment())}>INCREMENT</button>
            <button onClick={() => dispatch(decrement())}>DECREMENT</button>
        </div>
    )
}

export default Counter;