import './App.css';
import QuestionAnswer from './components/QuestionAnswer';

function App() {
  return (
    <div className="App">
      <h2 className="App-header">
        Question Answering
      </h2>
      <div className="App-header App-content"><p>AI-based question answering tool<br />
        Enter the context and ask the question related to this context. You will get the answer from AI.<br />
        (As now supported only English)</p>
      </div>
      <QuestionAnswer />
    </div>
  );
}

export default App;
