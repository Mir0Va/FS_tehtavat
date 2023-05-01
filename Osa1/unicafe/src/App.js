import { useState } from "react";

const Button = ({handleClick,text}) => {
  return(
    <button onClick={handleClick}>{text}</button>
  )
}

const StatisticLine = ({text,value}) => <tr><td>{text + " "}</td><td>{value}</td></tr>

const Statistics = ({clicks}) =>{
  const total = clicks.good + clicks.neutral + clicks.bad
  const sum = clicks.good - clicks.bad

  if (total===0) {
    return(
      <>
        <h1>{"statistics"}</h1>
        <p>No feedback given</p>
      </>
    )
  }

  return(
    <div>
      <h1>{"statistics"}</h1>
      <table>
        <tbody>
            <StatisticLine text={"good"} value={clicks.good}/>
            <StatisticLine text={"neutral"} value={clicks.neutral}/>
            <StatisticLine text={"bad"} value={clicks.bad}/>
            <StatisticLine text={"all"} value={total}/>
            <StatisticLine text={"average"} value={sum/total}/>
            <StatisticLine text={"positive"} value={clicks.good/total*100+" %"}/>
        </tbody>
      </table>
    </div>
  )
}

function App() {
  const [clicks, setClicks] = useState({
    good:0, neutral:0, bad:0
  })

  const handleGoodClick = () =>
    setClicks({...clicks, good:clicks.good + 1})

  const handleNeutralClick = () =>
    setClicks({...clicks, neutral:clicks.neutral + 1})

  const handleBadClick = () =>
    setClicks({...clicks, bad:clicks.bad + 1})

  return (
    <div>
      <h1>{"give feedback"}</h1>
      <Button handleClick={handleGoodClick} text={"good"}/>
      <Button handleClick={handleNeutralClick} text={"neutral"}/>
      <Button handleClick={handleBadClick} text={"bad"}/>
      <Statistics clicks={clicks}/>
    </div>
  )
}

export default App;
