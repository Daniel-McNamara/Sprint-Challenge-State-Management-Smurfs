import React, { useContext, useState } from 'react'
import { SmurfContext } from './SmurfContext'
import styled from "styled-components";
import axios from "axios";

const FormForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin: 1% auto;
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid black;
  border-radius: 5px;
  width: 400px;
  height: 250px;
`;

const SmurfForm = () => {
  const { change, setChange } = useContext(SmurfContext);
  const [smurf, setSmurf] = useState({
    name: "",
    age: "",
    height: ""
  });
  const handleChange = e => {
    setSmurf({ ...smurf, [e.target.id]: e.target.value });
  };
  const submitForm = e => {
    e.preventDefault();
    axios
      .post("http://localhost:3333/smurfs", smurf)
      .then(res => {
        console.log("Submit Response", res);
        setChange(!change);
      })
      .catch(err => {
        console.log("Submit Error", err);
      });
    setSmurf({
      name: "",
      age: "",
      height: ""
    });
  };

  return (
    <FormForm>
      <h2>Add a Smurf to your village!</h2>
      <label>
        <input
          required
          id="name"
          type="text"
          name="name"
          autoComplete="off"
          onChange={handleChange}
          value={smurf.name}
          placeholder="Smurf Name"
        />
      </label>
      <label>
        <input
          required
          id="age"
          type="number"
          name="age"
          autoComplete="off"
          onChange={handleChange}
          value={smurf.age}
          placeholder="Smurf Age"
        />
      </label>
      <label>
        <input
          required
          id="height"
          type="text"
          name="height"
          autoComplete="off"
          onChange={handleChange}
          value={smurf.height}
          placeholder="Smurf Height(cm)"
        />
      </label>
      <button type="submit" onClick={submitForm}>
        Submit Smurf
      </button>
    </FormForm>
  );
};
export default SmurfForm;