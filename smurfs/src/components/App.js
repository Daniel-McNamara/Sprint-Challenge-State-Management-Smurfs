import React, { useState, useEffect } from "react";
import { SmurfContext } from './SmurfContext'
import axios from 'axios'
import SmurfList from './SmurfList'
import SmurfForm from './SmurfForm'
import styled from 'styled-components'

const AppDiv = styled.div`
display: flex;
flex-direction: column;
justify-content: space-around;
align-items: center;
margin: 0 auto;
`;
const TitleH1 = styled.h1`
font-size: 4rem;
`;

const App = () => {
const [change, setChange] = useState(true);
const [smurfs, setSmurfs] = useState([]);

useEffect(() => {
  axios
    .get("http://localhost:3333/smurfs")
    .then(res => {
      console.log("Server Smurf Data", res.data);
      setSmurfs(res.data);
    })
    .catch(err => {
      console.log(err);
    });
}, [change]);

return (
  <div className="App">
    <SmurfContext.Provider value={{ smurfs, change, setChange }}>
      <AppDiv>
        <TitleH1>Smurf Village</TitleH1>
        <SmurfForm />
        <SmurfList />
      </AppDiv>
    </SmurfContext.Provider>
  </div>
);
};
export default App;
