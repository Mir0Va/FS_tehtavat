const Part =({part})=><p>{part.name} {part.exercises}</p>

const Header =(head)=><h2>{head.course}</h2>
  

const Content =({items})=>{
  const contentAsParts = items.map(item => <Part part={item} key={item.id}/>)
  return(
    <>
      {contentAsParts}
    </>
  )
}

const Total =({parts})=>{
  const exercises = parts.map(item => item.exercises)
  const total = exercises.reduce((s, p) => s+p, 0)
  return(
    <b>{"total of "} {total} {" exercises"}</b>
  )
}

const Course = ({course}) =>{
  return(
    <>
        <Header course={course.name}/>
        <Content items={course.parts}/>
        <Total parts={course.parts}/>
    </>
  )
}

const Courses = ({courses}) =>{
  const coursesSeperated = courses.map(course => <Course course={course} key={course.id}/>)
  return(
    <div>
        <h1>{"Web development curriculum"}</h1>
        {coursesSeperated}
    </div>
  )
}

export default Courses