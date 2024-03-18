import { useParams } from 'react-router-dom'
import {useState} from "react"

const CardDetails = () => {
    const { id } = useParams()
    const [count,setCount] = useState(0);
    const handleClick=()=>{
        setCount(count+1)
    }
    console.log(count);
  return (
    <div>
      card details <h1>{id}</h1>
      <h2>{count}</h2>
      <button onClick={handleClick}>increment</button>
    </div>
  )
}

export default CardDetails
