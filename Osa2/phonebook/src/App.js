import { useState, useEffect } from 'react'
import numberService from "./services/numbers"

const Notification = ({ message }) => {
  if (message === "") {
    return null
  }
  if (message.startsWith("Info")){
    return(
      <div className='error'>
        {message}
      </div>
    )
  }
  return (
    <div className='success'>
      {message}
    </div>
  )
}

const Filter = ({filter, handleChange}) => <div> filter shown with <input value={filter} onChange={handleChange}/> </div>

const PersonForm = (props) => {
  return(
    <form onSubmit={props.onSubmit}>
    <div> name: <input value={props.nameValue} onChange={props.nameChange}/> </div>
    <div> number: <input value={props.numberValue} onChange={props.numberChange} /></div>
    <div><button type="submit">add</button></div>
    </form>
  )
}

const Persons = ({personsList,handleClick}) =>{
  return(
    personsList.map(person =>
    <p key={person.id}>{person.name} {person.number}
    <button key={person.id} onClick={()=>handleClick(person.id,person.name)}>{"delete"}</button>
    </p>
    )
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState('')

  useEffect(()=>{
    numberService
      .getAll()
      .then(initialPersons=>setPersons(initialPersons))
  },[])

  let personsToShow = filter.length===0
  ? persons
  : persons.filter(person => person.name.toLocaleLowerCase().includes(filter.toLowerCase())) 

  const addPerson = (event) => {
    event.preventDefault()
    const names = persons.map(person => person.name)
    const personObject = {
      name: newName,
      number:  newNumber
    }
    const nameIndex = names.indexOf(newName)
    if (nameIndex===-1){
      numberService
      .create(personObject)
      .then(returnedPerson=>{
        setPersons(persons.concat(returnedPerson))
        setNewName("")
        setNewNumber("")
        setMessage(`Added ${newName}`)
        setTimeout(()=>{
          setMessage("")
        },5000)
      })
    } else {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        numberService
        .update(nameIndex+1,personObject)
        .then(response =>{
          setPersons(persons.map(person=>person.id!==nameIndex+1 ? person:response))
          setNewName("")
          setNewNumber("")
          setMessage(`${newName} number changed`)
          setTimeout(()=>{
            setMessage("")
          },5000)
        })
        .catch(error =>{
          setPersons(persons.filter(person=>person.name!==newName))
          setMessage(`Information of ${newName} has already been deleted from the server`)
          setTimeout(()=>{
            setMessage("")
          },5000)
        })
     }
    }
  }
  
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)  
  const handleFilterChange = (event) => setFilter(event.target.value)
  const handleDelete = (id,name) =>{
    if(window.confirm(`Delete ${name}?`)){
      numberService
      .deleteNumber(id)
      setPersons(persons.filter(person=>person.id!==id))
    }
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <Filter filter={filter} handleChange={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm onSubmit={addPerson} nameValue={newName} nameChange={handleNameChange}
      numberValue={newNumber} numberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons personsList={personsToShow} handleClick={handleDelete}/>
    </div>
  )
}

export default App