import React from 'react'
import { useSearchParams } from 'react-router-dom'


// Example of useSearchParam() 
export default function Filter() {

    const [searchParams, setSearchParams] = useSearchParams();

    const age = searchParams.get('age');
    const city = searchParams.get('city')

    return (
        <div>
            <h3>Age is: {age} </h3>
            <h3>City is: {city} </h3>

            <input placeholder='Set City' style={{ padding: 5, borderWidth: 2 }}
                onChange={(e) => setSearchParams({ age: 40, city: e.target.value })} /><br /><br />
            <button onClick={() => setSearchParams({ age: 26 })}>Set value into params</button>

        </div>
    )
}