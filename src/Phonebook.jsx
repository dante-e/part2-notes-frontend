import { useEffect, useState } from "react";
import Person from "./components/Person";
import "./App.css";

const App = (props) => {
  const [persons, setPersons] = useState(props.persons);
  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("");
  const [search, setSearch] = useState("");
  const [filteredPersons, setFilteredPersons] = useState([]);

  useEffect(() => {
    const filtered = persons.filter((person) =>
      person.name.toLowerCase().includes(search.toLowerCase()),
    );
    setFilteredPersons(filtered);
  }, [search, persons]);

  const addPerson = (event) => {
    event.preventDefault();
    const result = persons.find((x) => x.name == newName);

    if (result == null) {
      const personObject = {
        name: newName,
        id: persons.length + 1,
        number: newNum,
      };
      setPersons(persons.concat(personObject));
      setNewName("");
      setNewNum("");
    } else {
      alert(`${newName} is already added to phonebook`);
      setNewName("");
      setNewNum("");
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumChange = (event) => {
    setNewNum(event.target.value);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  return (
    <body>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNum} onChange={handleNumChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        filter: <input type="text" value={search} onChange={handleSearch} />
      </div>
      <div>
        <ul>
          {filteredPersons.map((person) => (
            <Person key={person.id} person={person} />
          ))}
        </ul>
      </div>
    </body>
  );
};

export default App;
