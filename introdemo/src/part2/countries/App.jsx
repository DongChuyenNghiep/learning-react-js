import { useEffect, useState } from 'react'
import noteService from './services/notes'
import axios from 'axios'
const Countryinfo = ({ info }) => {
  return (
    <>
      <h1>{info.name.common}</h1>
      <p>Capital {info.capital}</p>
      <h1>Languages</h1>
      <p>{Object.values(info.languages).map((language, i) => <li key={i}>{language}</li>)}</p>
      <img src={info.flags.png} />
    </>
  )
}

const App = () => {
  const [searchcountry, setSearchcountry] = useState('')
  const [allcountries, setAllCountries] = useState([])
  const [countrydetail, setCountry] = useState('')
  const [lastFetchedCountry, setLastFetchedCountry] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const handleSearchChange = (event) => setSearchcountry(event.target.value)
  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => setAllCountries(response.data))
      .catch(error => console.log("Server is not responding. Error" + error))
  }, [])
  const filteredCountries = allcountries.filter(country => country.name.common.toLowerCase().includes(searchcountry.toLowerCase()))

  useEffect(() => {
    if (filteredCountries.length === 1) {
      const countryName = filteredCountries[0].name.common;
      if (countryName !== lastFetchedCountry) { 
        axios
          .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${countryName}`)
          .then((response) => {
            setCountry(response.data);
            setLastFetchedCountry(countryName); 
          })
          .catch((error) => console.error("Error fetching country details:", error));
      }
    } else {
      setLastFetchedCountry(""); 
    }
  }, [filteredCountries]); 
  const showinfo = (countryName) => {
    console.log("Fetching country info for:", countryName); 
    if (countryName !== selectedCountry) {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${countryName}`)
        .then((response) => {
          setCountry(response.data);
          setSelectedCountry(countryName);
        })
        .catch((error) => console.error("Error fetching country details:", error));
    }
  };

  const resultlargerthan10 = () => {
    if (filteredCountries.length >= 10 && searchcountry != 0) {
      return <p>Too many country. Try more</p>
    } else if (filteredCountries.length == 1 && countrydetail) {
      return <Countryinfo info={countrydetail} />

    } else {
      return (
        <>
          <ul>
            {filteredCountries.map((country, id) => (
              <li key={id}>
                {country.name.common}{" "}
                <button onClick={() => showinfo(country.name.common)}>Show</button>
              </li>
            ))}
          </ul>
          {countrydetail && (
            <Countryinfo info={countrydetail} />
          )}
        </>
      );
    }
  }


  return (
    <div>
      find countries <input value={searchcountry} onChange={handleSearchChange} />
      <div>
        {resultlargerthan10()}
      </div>
    </div>

  )
}

export default App