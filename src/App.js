import React,{useEffect,useState} from 'react';
const App=()=>{
  const [countries,setCountries]=useState([]);
  const [states,setStates]=useState([]);
  const [cities,setCities]=useState([]);
  const [selCountry,setSelCountry]=useState("");
  const [selState,setSelState]=useState("");
  const [selCity,setSelCity]=useState("");
  const [error,setError]=useState("");
  useEffect(()=>{
    fetch("https://crio-location-selector.onrender.com/countries")
    .then(res=> {
      if(!res.ok) throw new Error("Failed to fetch countries");
       return res.json();
  })
    .then((data)=>setCountries(data))
    .catch((err)=>setError(err.message || "Something went wrong"));
  },[]);
  useEffect(()=>{
    if(!selCountry)
      return;
     setError("");
    fetch(`https://crio-location-selector.onrender.com/country=${selCountry}/states`)
    .then(res=>{
      if(!res.ok) throw new Error("Failed to fetch countries");
       return res.json();
  })
    .then((data)=>setStates(data))
    .catch((err)=>setError(err.message || "Something went wrong"));
  },[selCountry]);
  useEffect(()=>{
    if(!selCountry)
      return;
     setError("")
    fetch(` https://crio-location-selector.onrender.com/country=${selCountry}/state=${selState}/cities`)
    .then(res=>{
      if(!res.ok) throw new Error("Failed to fetch countries");
       return res.json();
  })
    .then((data)=>setCities(data))
    .catch((err)=>setError(err.message || "Something went wrong"));
  },[selCountry,selState]);
  console.log(selCountry,selState)
  return (
    <div>
      <div
      style={{
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        padding:"20px",
      }}
      >
        <h1 style={{fontSize:"32px",fontWeight:"bold",marginBottom:"20px"}}>
          Select Location
        </h1>

      
    <div>
      <select name="country" id="country" value={selCountry} onChange={(e)=>{setSelCountry(e.target.value);setSelState("");setSelCity("");setStates([]);setCities([]);}}>
      <option>Select Country</option>
        {countries.map((country)=>(<option value={country} key={country}>{country}</option>))}
      </select>
      <select name="country" id="country" value={selState} onChange={(e)=>{setSelState(e.target.value);setSelCity("");setCities([]);}} disabled={!selCountry}>
        <option>Select State</option>
        {states.map((state)=>(<option value={state} key={state}>{state}</option>))}
      </select>
      <select name="country" id="country" value={selCity} onChange={(e)=>setSelCity(e.target.value)} disabled={!selState}>
        <option>Select City</option>
        {cities.map((city)=>(<option value={city} key={city}>{city}</option>))}
      </select>
    </div>
     <div style={{marginTop:"20px",fontWeight:"bold"}}>
    {selCity && selState && selCountry ? (
      <p>
        You selected {selCity}, {selState}, {selCountry}
      </p>
    ):(
      <p>please select a location</p>
    )}
    </div>
   </div>
   </div>
  );
};
export default App;