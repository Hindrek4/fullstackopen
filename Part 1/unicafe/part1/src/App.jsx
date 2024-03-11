import {useState} from 'react';
<link href='App.css' rel='stylesheet' type='text/css'></link>;

const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>{text}</button>
);

const StatisticLine = ({text, value}) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    );
};
const Statistics = ({good, bad, neutral, allClicks}) => {
    const calcAverage = ((good + bad * -1) / allClicks).toFixed(1);
    const calcPositive = ((good / allClicks) * 100).toFixed(1) + '%';
    if (allClicks === 0) {
        return (
            <div>
                <p>No feedback given</p>
            </div>
        );
    }
    return (
        <div>
            <table>
                <tbody>
                    <StatisticLine text='Good: ' value={good} />

                    <StatisticLine text='Neutral:' value={neutral} />

                    <StatisticLine text='Bad: ' value={bad} />

                    <StatisticLine text='all: ' value={allClicks} />

                    <StatisticLine text='Average: ' value={calcAverage} />

                    <StatisticLine text='Positive: ' value={calcPositive} />
                </tbody>
            </table>
        </div>
    );
};
const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);
    const [allClicks, setAll] = useState(0);

    const handleGoodClick = () => {
        setGood(good + 1);
        setAll(allClicks + 1);
    };
    const handleBadClick = () => {
        setBad(bad + 1);
        setAll(allClicks + 1);
    };
    const handleNeutralClick = () => {
        setNeutral(neutral + 1);
        setAll(allClicks + 1);
    };
    return (
        <div>
            <h1>give feedback</h1>
            <Button handleClick={handleGoodClick} text='good' />
            <Button handleClick={handleNeutralClick} text='neutral' />
            <Button handleClick={handleBadClick} text='bad' />
            <h1>statistics</h1>
            <Statistics
                good={good}
                bad={bad}
                neutral={neutral}
                allClicks={allClicks}
            />
        </div>
    );
};
export default App;
