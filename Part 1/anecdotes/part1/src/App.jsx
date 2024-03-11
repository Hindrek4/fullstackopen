import {useState} from 'react';
const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>{text}</button>
);
const Vote = ({points}) => {
    return <p> has {points} votes</p>;
};
const MostPoints = ({points}) => {
    return <p>has {Math.max(...points)} votes</p>;
};
const BestAnecdote = ({anecdotes}) => {
    return <p>{anecdotes}</p>;
};

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
        'The only way to go fast, is to go well.',
    ];

    const [selected, setSelected] = useState(0);
    const [points, setPoints] = useState(new Array(anecdotes.length).fill(0));

    const handleAnecdoteClick = () => {
        setSelected(Math.floor(Math.random() * anecdotes.length));
    };
    const maxPointsIndex = points.indexOf(Math.max(...points));
    const anecdotePoints = () => {
        const copy = [...points];
        copy[selected] += 1;
        setPoints(copy);
    };
    return (
        <div>
            <h1>Anecdote of the day</h1>
            <div>{anecdotes[selected]} </div>
            <Vote points={points[selected]} />
            <Button handleClick={handleAnecdoteClick} text='next anecdote' />
            <Button handleClick={anecdotePoints} text='vote' />
            <h1>Anecdote with most votes</h1>
            <BestAnecdote anecdotes={anecdotes[maxPointsIndex]} />
            <MostPoints points={points} />
        </div>
    );
};
export default App;
