import logo from './logo.svg';
import './App.css';

import Welcome from './Views/Welcome';
import Main from './Views/Main';

import React ,{useEffect,useState} from 'react'


function App() {
  const [activeView,setActiveView] = useState(<Welcome
    open = {()=>{
      setActiveView(<Main/>)
    }}
  />)
  return (
    <div className="App">
      {activeView}
    </div>
  );
}

export default App;
