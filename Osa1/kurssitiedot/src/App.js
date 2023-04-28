const Part =(part)=>{
  console.log(part)
  return(
      <p>{part.part.name} {part.part.exercises}</p>
  )
}

const Header =(head)=>{
  return(
      <h1>{head.course}</h1>
  )
}

const Content =(items)=>{
  return(
    <div>
      <Part part={items.items[0]}/>
      <Part part={items.items[1]}/>
      <Part part={items.items[2]}/>
    </div>
  )
}

const Total =(parts)=>{
  return(
        <p>
          Number of exercises {parts.parts[0].exercises + parts.parts[1].exercises +parts.parts[2].exercises}
        </p>
  )
}

const App =()=> {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10
      },
      {
        name: "Using props to pass data",
        exercises: 7
      },
      {
        name: "State of a component",
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name}/>
      <Content items={course.parts}/>
      <Total parts={course.parts} />
    </div>
  );
}

export default App
