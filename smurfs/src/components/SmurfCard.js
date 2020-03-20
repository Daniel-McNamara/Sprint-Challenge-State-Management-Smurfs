import React, { useState, useContext } from "react";
import axios from "axios";
import styled from "styled-components";
import { SmurfContext } from './SmurfContext'

const SmurfDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin: 1% auto;
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid black;
  border-radius: 5px;
  width: 350px;
  height: 200px;
`;
const FormForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const Smurf = props => {
  const { change, setChange } = useContext(SmurfContext);
  const [selected, setSelected] = useState(false);
  const [smurf, setSmurf] = useState({
    id: props.smurf.id,
    name: props.smurf.name,
    age: props.smurf.age,
    height: props.smurf.height
  });
  const selectSmurf = e => {
    e.preventDefault();
    setSelected(!selected);
  };
  const handleChange = e => {
    setSmurf({ ...smurf, [e.target.id]: e.target.value });
  };
  const editSmurf = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:3333/smurfs/${props.smurf.id}`, smurf)
      .then(res => {
        console.log("Edit Response", res);
        setChange(!change);
      })
      .catch(err => {
        console.log("Edit Error", err);
      });
    setSelected(!selected);
  };
  const deleteSmurf = e => {
    e.preventDefault();
    axios
      .delete(`http://localhost:3333/smurfs/${props.smurf.id}`)
      .then(res => {
        console.log("Delete Response", res);
        setChange(!change);
      })
      .catch(err => {
        console.log("Delete Error", err);
      });
  };
  return (
    <SmurfDiv>
      {selected ? (
        <FormForm>
          <label>
            <input
              id="name"
              type="text"
              name="name"
              autoComplete="off"
              onChange={handleChange}
              value={smurf.name}
            />
          </label>
          <label>
            <input
              id="age"
              type="number"
              name="age"
              autoComplete="off"
              onChange={handleChange}
              value={smurf.age}
            />
          </label>
          <label>
            <input
              id="height"
              type="text"
              name="height"
              autoComplete="off"
              onChange={handleChange}
              value={smurf.height}
            />
          </label>
          <button type="submit" onClick={editSmurf}>
            Submit
          </button>
        </FormForm>
      ) : (
        <div>
          <h3>{props.smurf.name}</h3>
          <p>Age: {props.smurf.age}</p>
          <p>Height: {props.smurf.height}</p>
        </div>
      )}
      <button onClick={selectSmurf}>{selected ? "Cancel Edit" : "Edit"}</button>
      <button onClick={deleteSmurf}>Delete</button>
    </SmurfDiv>
  );
};
export default Smurf;