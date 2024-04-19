import React, {useState, useEffect} from 'react';
import axios from 'axios';
import noteService from './services/notes';

const deleteName = (id) => {
    console.log('Deleting person with id:', id);
    const areYouSure = window.confirm(
        'Are you sure you want to delete this person?',
    );
    if (areYouSure) {
        axios
            .delete(`http://localhost:3001/persons/${id}`)
            .then((response) => {
                console.log('Delete successfull', response.data);
            })
            .catch((error) => {
                console.error('Error', error);
            });
    }
};

const Filter = ({}) => {
    return (
        <div>
            <input></input>
        </div>
    );
};
const PersonForm = ({
    addName,
    addNumber,
    newName,
    handleNameChange,
    newNumber,
    handleNumberChange,
}) => {
    return (
        <div>
            <form
                onSubmit={(event) => {
                    addName(event);
                    addNumber(event);
                }}
            >
                <p>
                    {' '}
                    name:
                    <input value={newName} onChange={handleNameChange} />{' '}
                </p>
                <p>
                    {' '}
                    number:
                    <input value={newNumber} onChange={handleNumberChange} />
                </p>
                <button type='submit'>Add</button>
            </form>
        </div>
    );
};

const Persons = ({persons, setPersons}) => {
    const handleDelete = (id) => {
        deleteName(id);
        setPersons(persons.filter((person) => person.id !== id));
    };

    return (
        <div>
            {persons.map((person) => (
                <ul key={person.id}>
                    <span>
                        {person.content} {person.number}{' '}
                    </span>
                    <button onClick={() => handleDelete(person.id)}>
                        Delete
                    </button>
                </ul>
            ))}
        </div>
    );
};
const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [numbers, setNumbers] = useState([]);
    const [newNumber, setNewNumber] = useState('');
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        noteService.getAll().then((initialNotes) => {
            setPersons(initialNotes);
        });
    }, []);

    const Notification = ({message}) => {
        if (!message) {
            return null;
        }
        return <div className='error'>{message}</div>;
    };
    const addName = (event) => {
        event.preventDefault();
        if (areTheseNamesEqual(newName, persons)) {
            alert(newName + ' already exists');
        } else {
            const nameObject = {
                content: newName,
                number: newNumber,
                id: persons.length + 1,
                important: false,
            };
            noteService.create(nameObject).then((returnedNote) => {
                setPersons(persons.concat(returnedNote));
                setNewMessage(`${newName} is added`);
                setTimeout(() => {
                    setNewMessage(null);
                }, 5000);
                setNewName('');
            });
        }
    };

    const addNumber = (event) => {
        event.preventDefault();
        if (areTheseNumbersEqual(newNumber, numbers)) {
            alert(newNumber + ' already exists');
        } else {
            const numberObject = {
                content: newName,
                number: newNumber,
                id: numbers.length + 666,
            };
            noteService.create(numberObject).then((returnedNote) => {
                setNumbers(numbers.concat(returnedNote));
                setNewNumber('');
            });
        }
    };
    const handleNumberChange = (event) => {
        setNewNumber(event.target.value);
    };

    const handleNameChange = (event) => {
        setNewName(event.target.value);
    };

    const areTheseNamesEqual = (newName, persons) => {
        const controlNames = persons.map((person) => person.content);
        return controlNames.includes(newName);
    };

    const areTheseNumbersEqual = (newNumber, numbers) => {
        const controlNumbers = numbers.map((number) => number.content);
        return controlNumbers.includes(newNumber);
    };

    return (
        <div>
            <h2>Filter</h2>
            <Filter />
            <h2>Add a new</h2>
            <Notification message={newMessage} />
            <PersonForm
                newName={newName}
                handleNameChange={handleNameChange}
                newNumber={newNumber}
                handleNumberChange={handleNumberChange}
                addName={addName}
                addNumber={addNumber}
            />
            <h2>Phonebook</h2>
            <Persons persons={persons} setPersons={setPersons} />
        </div>
    );
};

export default App;
