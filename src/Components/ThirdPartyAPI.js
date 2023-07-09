import { useState, useEffect } from 'react'
import React from 'react'
import axios from 'axios'

function ThirdPartyAPI() {
  const [countries, setCountries] = useState([])

  useEffect ( () =>{
    axios.get('https://restcountries.com/v3.1/all')
    .then(res=>{
        console.log(res.data)
        setCountries(res.data)





    })
    .catch(err => console.log(err))

  }, [])
  
  
    return (
    <div>
      {
        countries.map(country =>{

          const {name, flags, capital, region} = country;
          return (

            <div class='card'>
            <img src={flags.png} alt={name.common} />

              <h4>Name: {name.common}</h4>
              <h4>Capital: {capital}</h4>
              <h4>Reigon: {region}</h4>

            </div>
          )
        })
      }
</div>
)
    }
export default ThirdPartyAPI
