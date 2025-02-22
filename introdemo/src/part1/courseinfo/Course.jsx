const Header = ({ courses }) => {
    return <h1>{courses.name}</h1>
}
const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  )
}
const Content = ({ courses }) => {
  return courses.parts.map(part => <Part key={part.id} part={part.name} exercises={part.exercises} />)

  
}
const Total = ({ courses }) => {
  const total = courses.parts.reduce((num, part) => num + part.exercises, 0)
  return (
    <>
      <p>Number of exercises {total}</p>
    </>
  )
}
const Course = ({ course }) => {
  return (
    <div >
      <Header courses={course} />
      <Content courses={course} />
      <Total courses={course} />
    </div>
  )
}

export default Course;

