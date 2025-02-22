import { useEffect, useState } from 'react'
import noteService from './services/notes'

const Filter = ({ value, onChange }) => (<div>Filter: <input value={value} onChange={onChange} /></div>)
const EachInput = ({ name, value, onChange }) => (
  <div>
    {name} <input value={value} onChange={onChange} />
  </div>
)


const PersonForm = ({ onSubmit, newName, newNumber, onChangeName, onChangeNumber }) => (
  <form onSubmit={onSubmit}>
    <EachInput name="name" value={newName} onChange={onChangeName} />
    <EachInput name="number" value={newNumber} onChange={onChangeNumber} />
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

const Message = ({ message }) => {
  const Style = {
    color: 'green',
    fontSize: 16
  }

  return <div style={Style} className='message'><p>{message}</p></div>
}
const Persons = ({ filteredPerson, deleteID }) => (
  <ul>
    {filteredPerson.map((person, i) => <li key={i}>{person.name} {person.number} <button onClick={() => deleteID(person.id, person.name)}>Delete</button></li>)}
  </ul>
)

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState('')
  useEffect(() => {
    noteService.getAll().then(allPersons => {
      console.log("Data fetched:", allPersons);
      setPersons([...allPersons]); // Cập nhật một bản sao mới của mảng
    });
  }, []);

  const deleteNote = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      noteService.deletePerson(id)
        .then(() => setPersons(persons.filter(person => person.id != id)))
      setMessage(`Deleted ${name} successfully`)
      setTimeout(() => { setMessage('') }, 3000)
    }



  }

  const addNote = (event) => {
    event.preventDefault();
    const existingPerson = persons.find(person => person.name === newName);
    const noteObject = { name: newName, number: newNumber };

    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`)) {
        noteService.update(existingPerson.id, noteObject)
          .then(updatedPerson => {
            setPersons(persons.map(person =>
              person.id === existingPerson.id ? updatedPerson : person
            ));
            setNewName('');
            setNewNumber('');
            setMessage(`Updated ${newName}'s number successfully`)
            setTimeout(() => { setMessage('') }, 3000)
          })
          .catch(error => {
            setMessage(`Info of ${newName} has been removed from the server`)
            setTimeout(() => { setMessage('') }, 10000)
          }
          );
      }
      return;
    }

    noteService.create(noteObject)
      .then(newPerson => {
        setPersons([...persons, newPerson]); // ✅ Chỉ thêm mới nếu không tồn tại
        setNewName('');
        setNewNumber('');
        setMessage(`Added ${newName} successfully`)
        setTimeout(() => { setMessage('') }, 3000)
      })
      .catch(error => console.error("Error adding person:", error));
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value)

  }
  const filteredperson = persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Message message={message} />
      <Filter onChange={handleSearchChange} value={search} />
      <h3>Add a new</h3>
      <PersonForm onSubmit={addNote} newName={newName} newNumber={newNumber} onChangeName={handleNameChange} onChangeNumber={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons filteredPerson={filteredperson} deleteID={deleteNote} />
    </div>
  )
}

export default App