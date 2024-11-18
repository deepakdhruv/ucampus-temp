import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar'
function Sign() {
  const [Credentials, SetCredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
  });
  let navigate=useNavigate()

  const HandleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: Credentials.name, email: Credentials.email, password: Credentials.password, location: Credentials.geolocation })

    });
    const json = await response.json()
    console.log(json);
    if (!json.success) {
        alert("Please enter valid Credentials");
    }
    if (json.success) {
      navigate("/")
  }
   
  }






  const onChange = (e) => {
    SetCredentials({ ...Credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Navbar/>   
      <form onSubmit={HandleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" name="name" value={Credentials.name} onChange={onChange} aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" name="email" value={Credentials.email} onChange={onChange} aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" name="password" value={Credentials.password} onChange={onChange} />
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
        </div>
        <div className="mb-3">
          <label htmlFor="geolocation" className="form-label">Location</label>
          <input type="text" className="form-control" name="geolocation" value={Credentials.geolocation} onChange={onChange} aria-describedby="emailHelp" />
        </div>
        <button type="submit" className="m-3 btn btn-success">Submit</button>
        <Link to="/login" className="m-3 btn btn-danger">Already a User</Link>
      </form>
    </>
  );
}

export default Sign;
