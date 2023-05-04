import { useState, useEffect } from "react";
import countriesService from "./services/countries";

const Filter = ({filter, handleChange}) => <div> find countries <input value={filter} onChange={handleChange}/> </div>

const Country = ({country}) => {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&appid=${process.env.REACT_APP_API_KEY}`
  const [weather, setWeather] = useState({main:{temp:0},weather:[{icon:"01d"}],wind:{speed:0}})
  useEffect(()=>{
    countriesService
      .getWeather(weatherUrl)
      .then(currentWeather => setWeather(currentWeather))
  },[])
    return(
      <div>
        <h1>{country.name.common}</h1>
        <p>{`capital ${country.capital[0]}`}</p>
        <p>{`area ${country.area}`}</p>
        <h2>languages:</h2>
        <ul>{Object.values(country.languages).map(language => <li key={language}>{language}</li>)}</ul>
        <img src={Object.values(country.flags)[0]}/>
        <h2>{`Weather in ${country.capital[0]}`}</h2>
        <Weather weather={weather}/>
      </div>
    )
}

const Weather = ({weather}) =>{
  if (weather!==[]){
    console.log(weather)
    return(
      <div>
        <p>{`temperature ${weather.main.temp-273.15} Celsius`}</p>
        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}/>
        <p>{`wind ${weather.wind.speed} m/s`}</p>
      </div>
    )
  }
  return(
    <p>{"something here"}</p>
  )
}

const Countries = ({countries,handleClick}) => {
  if (countries.length>10){
    return(<p>too many matches, specify another filter</p>)
  }
  if (countries.length>1){
    return(countries.map(country=>
    <p key={country.name.common}>{country.name.common}
    <button key={country.name} onClick={()=>handleClick(country.name.common)}>show</button>
    </p>))
  }
  if (countries.length===1){
    const country = countries.map(country=> country)[0]
    return(
      <Country country={country}/>
    )
  }
}

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  useEffect(()=>{
    countriesService
      .getAll()
      .then(initialCountries=>setCountries(initialCountries))
  },[])

  const countriesToShow = filter.length===0
  ? countries
  : countries.filter(country => country.name.common.toLocaleLowerCase().includes(filter.toLowerCase())) 

  const handleFilterChange = (event) => setFilter(event.target.value)

  const handleShow = (countryName) =>{
    setFilter(countryName)
  }

  return (
    <div>
      <Filter filter={filter} handleChange={handleFilterChange}/>
      <Countries countries={countriesToShow} handleClick={handleShow}/>
    </div>
  )
}

export default App;