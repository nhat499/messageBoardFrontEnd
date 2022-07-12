
import './App.css';

const IndiviualTopic = () => {
  return (
    <div className='IndiviualTopic'>
    <h3>Topic name</h3>
    <p> text description text description text description </p>
    </div>
  )
}

const TopicContainer = () => {
  return (
    <div className='TopicContainer'>
    <h2>List of Topics</h2>
    <p>this contains topics</p>
    <IndiviualTopic />
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <h1>hello world</h1>
      <TopicContainer />
    </div>
  );
}

export default App;
