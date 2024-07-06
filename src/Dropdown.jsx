import { useEffect, useState } from "react";
import axios from "axios";

const Dropdown = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://crio-location-selector.onrender.com/countries');
        setCountries(response.data);
      } catch (error) {
        console.error('Error in fetching countries', error);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`);
        // console.log(response.data)
        setStates(response.data);
      } catch (error) {
        console.error('Error in fetching states', error);
      }
    };

    fetchStates();
  }, [selectedCountry]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`);
        setCities(response.data);
      } catch (error) {
        console.error('Error in fetching cities', error);
      }
    };

    fetchCities();
  }, [selectedCountry, selectedState]);

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value)
    setStates([]);
    setSelectedState("");
    setCities([]);
    setSelectedCity("");
  }

  const handleStateChange = (e) => {
    setSelectedState(e.target.value)
    setCities([]);
    setSelectedCity("");
  }

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value)
  }  

  return (
    <div style={{display:"flex", justifyContent: 'center', alignItems: "center", flexDirection: "column"}}>
      <h2>Select Location</h2>
      <div style={{display:"flex", justifyContent: "center", alignItems: "center"}}>
        <select id="country" value={selectedCountry} onChange={handleCountryChange} style={{marginRight: "10px", padding: "10px"}}>
          <option value="" disabled>Select Country</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>

        <select id="state" value={selectedState} onChange={handleStateChange} disabled={!selectedCountry} style={{marginRight: "10px", padding: "10px"}}>
          <option value="" disabled>Select State</option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>

        <select id="city" value={selectedCity} onChange={handleCityChange} disabled={!selectedState} style={{padding: "10px"}}>
          <option value="" disabled>Select City</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
      {selectedCountry && selectedState && selectedCity && (
        <p>
          You selected {selectedCity}, {selectedState}, {selectedCountry}.
        </p>
      )}
    </div>
  );
};

export default Dropdown;
