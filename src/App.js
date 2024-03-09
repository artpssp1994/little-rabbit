import backGround from './fuji.jpg';
import cuteRabbit from'./cute-rabbit.png';
import './App.css';

function App() {
  return (
    <div className="App" >
        <div style={
          {backgroundImage: `url(${backGround})`,
            'background-position': 'center',
            'background-size': 'cover'
            }
          }>
          <header className="App-header">
            <h6>Hi, N...</h6>
            <img src={cuteRabbit} className="App-logo" alt="logo" />
            <p>
              This is your play ground ... little rabbit.
            </p>
          </header>
        </div>
    </div>
  );
}

export default App;
