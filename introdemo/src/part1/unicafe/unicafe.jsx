import { useState } from 'react'

const GiveFeedBack = ({ onClick, text }) => (
  <button onClick={onClick}>{text}</button>
);

const CalculateAverage = ({ good, bad, neutral }) => {
  const total = good + bad + neutral;
  if (total === 0) {
    return <p>No feedback given</p>;
  }

  return (
    <tbody>
      <StatisticLine text="all" value={total} />
      <StatisticLine text="average" value={((good - bad) / total).toFixed(2)} />
      <StatisticLine text="positive" value={`${((good / total) * 100).toFixed(2)} %`} />
    </tbody>
  );
};

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  
  if (total === 0) {
    return <p>No feedback given</p>;
  }

  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
      </tbody>
      <CalculateAverage good={good} neutral={neutral} bad={bad} />
    </table>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give Feedback</h1>
      <GiveFeedBack onClick={() => setGood(good + 1)} text="good" />
      <GiveFeedBack onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <GiveFeedBack onClick={() => setBad(bad + 1)} text="bad" />
      
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
