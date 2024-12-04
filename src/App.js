import React,{useEffect,useState} from 'react';
const App=()=>{
  const [countries,setCountries]=useState([]);
  const [states,setStates]=useState([]);
  const [cities,setCities]=useState([]);
  const [selCountry,setSelCountry]=useState("");
  const [selState,setSelState]=useState("");
  const [selCity,setSelCity]=useState("");
  useEffect(()=>{
    fetch("https://crio-location-selector.onrender.com/countries")
    .then(res=>res.json())
    .then(data=>setCountries(data));
  },[]);
  useEffect(()=>{
    if(!selCountry)
      return
    fetch(`https://crio-location-selector.onrender.com/country=${selCountry}/states`)
    .then(res=>res.json())
    .then(data=>setStates(data));
  },[selCountry]);
  useEffect(()=>{
    if(!selCountry)
      return
    fetch(` https://crio-location-selector.onrender.com/country=${selCountry}/state=${selState}/cities`)
    .then(res=>res.json())
    .then(data=>setCities(data));
  },[selCountry,selState]);
  console.log(selCountry,selState)
  return (
    <div>
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
        You selected {selCity},{selState},{selCountry}
      </p>
    ):(
      <p>please select a location</p>
    )}
    </div>
   </div>
  );
};
export default App;