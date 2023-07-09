import { useState, useEffect, Component } from 'react'
import React from 'react'
import axios from 'axios'

function Home() {

  
    
    const [StartDate, setStartDate]  = useState('2023-07-09');
    const [EndDate, SetEndDate] = useState('2023-07-12');
    const [Budget, SetBudget] = useState('10000');
    const [Location, SetLocation] = useState('Any');
    const daysBetween = 4;
    console.log(daysBetween)
    // console.log(EndDate - StartDate);
    // console.log(Location)
    // console.log(Budget)
    const [TripID, setTripID] = useState(0);

    
    


    // Parameters for Trips
    



    const handleClick = (name) => {
        console.log("You added a " + name)

    }

    const handleChangeSetDate = (Event) => {
        setStartDate(Event.target.value)
        daysBetween = new Date(EndDate).getDate() - new Date(StartDate).getDate()
    }

    const handleChangeLocation = (Event) => {
        SetLocation(Event.target.value);
        // console.log(Location);
    }

    const handleChangeEndDate = (Event) => {
        SetEndDate(Event.target.value)
        daysBetween = new Date(EndDate).getDate() - new Date(StartDate).getDate()
    }

    const handleChangeBudget = (Event) => {
        SetBudget(Event.target.value)
        // console.log(Budget);
    }

    const[Countries, setCountries] = useState('')
    

    // implemented DB API
    const [Trips, setTrips] = useState([]);
    const [Currency, setCurrency] = useState('');

    
        useEffect ( () =>{
            axios.get('http://localhost:8080/api/v1.1/countries/countrylist/budget?budget=' + Budget + '&location=' + Location)
            .then(res=>{
                setTrips(res.data)
                // console.log(Trips);
        
            })
            .catch(err => console.log(err))
        
          }, [TripID])
    
    
          // WeatherAPI
        const [Weather, setWeather] = useState();
    

        // useEffect ( () =>{
        //     axios.get(`http://api.weatherapi.com/v1/forecast.json?Key=d851801329f8455a8aa161446232305&q=${Location}&Days=3&tides=no&aqi=no&alerts=no`)
        //     .then(res=>{
        //         setWeather(res.data)
        //         // console.log(Weather);
        
        //     })
        //     .catch(err => console.log(err))
        
        //   }, [TripID])


        // Weather API Calls. Since the "bulk" call feature is not a free service, multiple calls one by one are made instead.
          const [EgyptWeather, setEgyptWeather] = useState();
          useEffect ( () =>{
            axios.get(`http://api.weatherapi.com/v1/forecast.json?Key=d851801329f8455a8aa161446232305&q=Egypt&Days=${daysBetween}&tides=no&aqi=no&alerts=no`)
            .then(res=>{
                setEgyptWeather(res.data)
        
            })
            .catch(err => console.log(err))
        
          }, [])    

          const [AmericaWeather, setAmericaWeather] = useState();
          useEffect ( () =>{
            axios.get(`http://api.weatherapi.com/v1/forecast.json?Key=d851801329f8455a8aa161446232305&q=America&Days=${daysBetween+1}&tides=no&aqi=no&alerts=no`)
            .then(res=>{
                setAmericaWeather(res.data)
        
            })
            .catch(err => console.log(err))
        
          }, [])

          const [RussiaWeather, setRussiaWeather] = useState();
          useEffect ( () =>{
            axios.get(`http://api.weatherapi.com/v1/forecast.json?Key=d851801329f8455a8aa161446232305&q=Russia&Days=${daysBetween}&tides=no&aqi=no&alerts=no`)
            .then(res=>{
                setRussiaWeather(res.data)
        
            })
            .catch(err => console.log(err))
        
          }, [])

          const [ItalyWeather, setItalyWeather] = useState();
          useEffect ( () =>{
            axios.get(`http://api.weatherapi.com/v1/forecast.json?Key=d851801329f8455a8aa161446232305&q=Italy&Days=${daysBetween}&tides=no&aqi=no&alerts=no`)
            .then(res=>{
                setItalyWeather(res.data)
        
            })
            .catch(err => console.log(err))
        
          }, [])

          const [JapanWeather, setJapanWeather] = useState();
          useEffect ( () =>{
            axios.get(`http://api.weatherapi.com/v1/forecast.json?Key=d851801329f8455a8aa161446232305&q=Japan&Days=${daysBetween}&tides=no&aqi=no&alerts=no`)
            .then(res=>{
                setJapanWeather(res.data)
        
            })
            .catch(err => console.log(err))
        
          }, [])

          const [FranceWeather, setFranceWeather] = useState();
          useEffect ( () =>{
            axios.get(`http://api.weatherapi.com/v1/forecast.json?Key=d851801329f8455a8aa161446232305&q=France&Days=${daysBetween}&tides=no&aqi=no&alerts=no`)
            .then(res=>{
                setFranceWeather(res.data)
        
            })
            .catch(err => console.log(err))
        
          }, [])

          const [GermanyWeather, setGermanyWeather] = useState();
          useEffect ( () =>{
            axios.get(`http://api.weatherapi.com/v1/forecast.json?Key=d851801329f8455a8aa161446232305&q=Germany&Days=${daysBetween}&tides=no&aqi=no&alerts=no`)
            .then(res=>{
                setGermanyWeather(res.data)
        
            })
            .catch(err => console.log(err))
        
          }, [])

    useEffect(() => {
        const fetchCurrency = async() => {
            try {
                const currresponse = await axios.get('https://api.exchangerate.host/latest?base=USD&amount=1');
                console.log(currresponse.data)
                if(currresponse && currresponse.data) setCurrency(currresponse.data)
                // console.log(Currency)
            } catch (error) {
                if(error.response) {
                    console.log(error.response.data)
                    console.log(error.response.status)
                }
                else {
                    console.log(error.message)
                }
                
            }
        }

        fetchCurrency();
    }, [])





  return (
    <div>
        <h1>You can only plan for a maximum of 3 days ahead of the current day due to API limitations.</h1>
        <p>Enter Start Date:</p>
        <input type='date' placeholder='Enter Start Date..'  onChange={handleChangeSetDate}/>
        {/* <button onClick={() => handleClick('Start Date')}> Set </button> */}
        <p>Enter End Date:</p>
        <input type='date' placeholder='Enter End Date..' onChange={handleChangeEndDate}/>
        {/* <button onClick={() => handleClick('End Date')}> Set </button> */}
        <p>Enter Budget Amount:</p>
        <input placeholder="Input Budget amount.." onChange={handleChangeBudget}/>
        {/* <button onClick={() => handleClickBudget()}> Set Budget</button> */}
        <p>Enter Preferred Country:</p>
        <select value={Location} onChange={handleChangeLocation}>
        <option value="Any">Any</option>

            <option value="America">America</option>

            <option value="Russia">Russia</option>

            <option value="Italy">Italy</option>

            <option value="France">France</option>

            <option value="Germany">Germany</option>

            <option value="Egypt">Egypt</option>

            <option value="Japan">Japan</option>
        </select>
        <p>After values have been filled out, Click the button.</p>
        <button onClick={() => setTripID(TripID+1)}>Plan Trip!</button>

        {
            Trips.map((trip) =>  (
                <div className='card' key={trip.num}>

                    <h3> {trip.countryname} </h3>
                    <p> Rate: {trip.currency} </p>
                    <p> Food: {trip.famousfood} </p>
                    {/* <p> Average Weather: {Weather.current.temp_c}°C </p> */}
                    <p> Average Price: {trip.averageprice} </p>
                    {/* <p> Flight costs in EGP: {Currency.rates.EGP * trip.averageprice} </p> */}
                    <p> Start Date: {StartDate}</p>
                    <p> End Date: {EndDate}</p>


                    {/* Using the various API calls for each City chosen. */}
                    {trip.countryname == "America" &&
                        <React.Fragment>
                         <p> America Weather: {AmericaWeather.current.temp_c}°C </p>
                         <img 
                            src={AmericaWeather.current.condition.icon}
                            alt="new"
                        />

                        <p> {AmericaWeather.forecast.forecastday[0].date}: {AmericaWeather.forecast.forecastday[0].day.avgtemp_c}°C </p>
                        <h4> {AmericaWeather.forecast.forecastday[0].day.condition.text}</h4>
                         <img 
                            src={AmericaWeather.forecast.forecastday[0].day.condition.icon}
                            alt="new"
                        />

                        <p> {AmericaWeather.forecast.forecastday[1].date}: {AmericaWeather.forecast.forecastday[1].day.avgtemp_c}°C </p>
                        <h4> {AmericaWeather.forecast.forecastday[1].day.condition.text}</h4>
                         <img 
                            src={AmericaWeather.forecast.forecastday[1].day.condition.icon}
                            alt="new"
                        />

                        {daysBetween >= 2 &&
                        <React.Fragment>
                        <p> {AmericaWeather.forecast.forecastday[2].date}: {AmericaWeather.forecast.forecastday[2].day.avgtemp_c}°C </p>
                        <h4> {AmericaWeather.forecast.forecastday[2].day.condition.text}</h4>
                         <img 
                            src={AmericaWeather.forecast.forecastday[2].day.condition.icon}
                            alt="new"
                        />
                        </React.Fragment>
                        }

                        {/* {daysBetween >= 3 &&
                        <React.Fragment>
                        <p> {AmericaWeather.forecast.forecastday[3].date}: {AmericaWeather.forecast.forecastday[3].day.avgtemp_c}°C </p>
                        <h4> {AmericaWeather.forecast.forecastday[3].day.condition.text}</h4>
                         <img 
                            src={AmericaWeather.forecast.forecastday[3].day.condition.icon}
                            alt="new"
                        />
                        </React.Fragment>
                        } */}

                        {/* {daysBetween >= 4 &&
                        <React.Fragment>
                        <p> {AmericaWeather.forecast.forecastday[4].date}: {AmericaWeather.forecast.forecastday[4].day.avgtemp_c}°C </p>
                        <h4> {AmericaWeather.forecast.forecastday[4].day.condition.text}</h4>
                         <img 
                            src={AmericaWeather.forecast.forecastday[4].day.condition.icon}
                            alt="new"
                        />
                        </React.Fragment>
                        }

                        {daysBetween >= 5 &&
                        <React.Fragment>
                        <p> {AmericaWeather.forecast.forecastday[5].date}: {AmericaWeather.forecast.forecastday[5].day.avgtemp_c}°C </p>
                        <h4> {AmericaWeather.forecast.forecastday[5].day.condition.text}</h4>
                         <img 
                            src={AmericaWeather.forecast.forecastday[5].day.condition.icon}
                            alt="new"
                        />
                        </React.Fragment>
                        } */}

                        </React.Fragment>
                        
                    }

                    {/* {trip.countryname == "Russia" &&
                        <React.Fragment>
                         <p> Russia Weather: {RussiaWeather.current.temp_c}°C </p>
                         <img 
                            src={RussiaWeather.current.condition.icon}
                            alt="new"
                        />

                        <p> {RussiaWeather.forecast.forecastday[1].date}: {RussiaWeather.forecast.forecastday[1].day.avgtemp_c}°C </p>
                        <h4> {RussiaWeather.forecast.forecastday[1].day.condition.text}</h4>
                         <img 
                            src={RussiaWeather.forecast.forecastday[1].day.condition.icon}
                            alt="new"
                        />

                        {daysBetween >= 2 &&
                        <React.Fragment>
                        <p> {RussiaWeather.forecast.forecastday[2].date}: {RussiaWeather.forecast.forecastday[2].day.avgtemp_c}°C </p>
                        <h4> {RussiaWeather.forecast.forecastday[2].day.condition.text}</h4>
                         <img 
                            src={RussiaWeather.forecast.forecastday[2].day.condition.icon}
                            alt="new"
                        />
                        </React.Fragment>
                        }

                        {daysBetween >= 3 &&
                        <React.Fragment>
                        <p> {RussiaWeather.forecast.forecastday[3].date}: {RussiaWeather.forecast.forecastday[3].day.avgtemp_c}°C </p>
                        <h4> {RussiaWeather.forecast.forecastday[3].day.condition.text}</h4>
                         <img 
                            src={RussiaWeather.forecast.forecastday[3].day.condition.icon}
                            alt="new"
                        />
                        </React.Fragment>
                        }

                        {daysBetween >= 4 &&
                        <React.Fragment>
                        <p> {RussiaWeather.forecast.forecastday[4].date}: {RussiaWeather.forecast.forecastday[4].day.avgtemp_c}°C </p>
                        <h4> {RussiaWeather.forecast.forecastday[4].day.condition.text}</h4>
                         <img 
                            src={RussiaWeather.forecast.forecastday[4].day.condition.icon}
                            alt="new"
                        />
                        </React.Fragment>
                        }

                        {daysBetween >= 5 &&
                        <React.Fragment>
                        <p> {RussiaWeather.forecast.forecastday[5].date}: {RussiaWeather.forecast.forecastday[5].day.avgtemp_c}°C </p>
                        <h4> {RussiaWeather.forecast.forecastday[5].day.condition.text}</h4>
                         <img 
                            src={RussiaWeather.forecast.forecastday[5].day.condition.icon}
                            alt="new"
                        />
                        </React.Fragment>
                        }

                        </React.Fragment>
                        
                    }

                    {trip.countryname == "Italy" &&
                        <React.Fragment>
                         <p> Italy Weather: {ItalyWeather.current.temp_c}°C </p>
                         <img 
                            src={ItalyWeather.current.condition.icon}
                            alt="new"
                        />

                        <p> {ItalyWeather.forecast.forecastday[0].date}: {ItalyWeather.forecast.forecastday[0].day.avgtemp_c}°C </p>
                        <h4> {ItalyWeather.forecast.forecastday[0].day.condition.text}</h4>
                         <img 
                            src={ItalyWeather.forecast.forecastday[0].day.condition.icon}
                            alt="new"
                        />
                        
                        <p> {ItalyWeather.forecast.forecastday[1].date}: {ItalyWeather.forecast.forecastday[1].day.avgtemp_c}°C </p>
                        <h4> {ItalyWeather.forecast.forecastday[1].day.condition.text}</h4>
                         <img 
                            src={ItalyWeather.forecast.forecastday[1].day.condition.icon}
                            alt="new"
                        />

                        {daysBetween >= 2 &&
                        <React.Fragment>
                        <p> {ItalyWeather.forecast.forecastday[2].date}: {ItalyWeather.forecast.forecastday[2].day.avgtemp_c}°C </p>
                        <h4> {ItalyWeather.forecast.forecastday[2].day.condition.text}</h4>
                         <img 
                            src={ItalyWeather.forecast.forecastday[2].day.condition.icon}
                            alt="new"
                        />

                        </React.Fragment>
                        }

                        {daysBetween >= 3 &&
                        <React.Fragment>
                        <p> {ItalyWeather.forecast.forecastday[3].date}: {ItalyWeather.forecast.forecastday[3].day.avgtemp_c}°C </p>
                        <h4> {ItalyWeather.forecast.forecastday[3].day.condition.text}</h4>
                         <img 
                            src={ItalyWeather.forecast.forecastday[3].day.condition.icon}
                            alt="new"
                        />

                        </React.Fragment>
                        }

                        {daysBetween >= 4 &&
                        <React.Fragment>
                        <p> {ItalyWeather.forecast.forecastday[4].date}: {ItalyWeather.forecast.forecastday[4].day.avgtemp_c}°C </p>
                        <h4> {ItalyWeather.forecast.forecastday[4].day.condition.text}</h4>
                         <img 
                            src={ItalyWeather.forecast.forecastday[4].day.condition.icon}
                            alt="new"
                        />

                        </React.Fragment>
                        }

                        {daysBetween >= 5 &&
                        <React.Fragment>
                        <p> {ItalyWeather.forecast.forecastday[5].date}: {ItalyWeather.forecast.forecastday[5].day.avgtemp_c}°C </p>
                        <h4> {ItalyWeather.forecast.forecastday[5].day.condition.text}</h4>
                         <img 
                            src={ItalyWeather.forecast.forecastday[5].day.condition.icon}
                            alt="new"
                        />

                        </React.Fragment>
                        }

                        </React.Fragment>
                        
                    }

                    {trip.countryname == "France" &&
                        <React.Fragment>
                         <p> France Weather: {FranceWeather.current.temp_c}°C </p>
                         <img 
                            src={FranceWeather.current.condition.icon}
                            alt="new"
                        />

                        <p> {FranceWeather.forecast.forecastday[0].date}: {FranceWeather.forecast.forecastday[0].day.avgtemp_c}°C </p>
                        <h4> {FranceWeather.forecast.forecastday[0].day.condition.text}</h4>
                         <img 
                            src={FranceWeather.forecast.forecastday[0].day.condition.icon}
                            alt="new"
                        />
                        
                        <p> {FranceWeather.forecast.forecastday[1].date}: {FranceWeather.forecast.forecastday[1].day.avgtemp_c}°C </p>
                        <h4> {FranceWeather.forecast.forecastday[1].day.condition.text}</h4>
                         <img 
                            src={FranceWeather.forecast.forecastday[1].day.condition.icon}
                            alt="new"
                        />

                        {daysBetween >= 2 &&
                        <React.Fragment>
                        <p> {FranceWeather.forecast.forecastday[2].date}: {FranceWeather.forecast.forecastday[2].day.avgtemp_c}°C </p>
                        <h4> {FranceWeather.forecast.forecastday[2].day.condition.text}</h4>
                         <img 
                            src={FranceWeather.forecast.forecastday[2].day.condition.icon}
                            alt="new"
                        />

                        </React.Fragment>
                        }

                        {daysBetween >= 3 &&
                        <React.Fragment>
                        <p> {FranceWeather.forecast.forecastday[3].date}: {FranceWeather.forecast.forecastday[3].day.avgtemp_c}°C </p>
                        <h4> {FranceWeather.forecast.forecastday[3].day.condition.text}</h4>
                         <img 
                            src={FranceWeather.forecast.forecastday[3].day.condition.icon}
                            alt="new"
                        />

                        </React.Fragment>
                        }

                        {daysBetween >= 4 &&
                        <React.Fragment>
                        <p> {FranceWeather.forecast.forecastday[4].date}: {FranceWeather.forecast.forecastday[4].day.avgtemp_c}°C </p>
                        <h4> {FranceWeather.forecast.forecastday[4].day.condition.text}</h4>
                         <img 
                            src={FranceWeather.forecast.forecastday[4].day.condition.icon}
                            alt="new"
                        />

                        </React.Fragment>
                        }

                        {daysBetween >= 5 &&
                        <React.Fragment>
                        <p> {FranceWeather.forecast.forecastday[5].date}: {FranceWeather.forecast.forecastday[5].day.avgtemp_c}°C </p>
                        <h4> {FranceWeather.forecast.forecastday[5].day.condition.text}</h4>
                         <img 
                            src={FranceWeather.forecast.forecastday[5].day.condition.icon}
                            alt="new"
                        />

                        </React.Fragment>
                        }

                        </React.Fragment>
                        
                    }

                    {trip.countryname == "Germany" &&
                        <React.Fragment>
                         <p> Germany Weather: {GermanyWeather.current.temp_c}°C </p>
                         <img 
                            src={GermanyWeather.current.condition.icon}
                            alt="new"
                        />

                        <p> {GermanyWeather.forecast.forecastday[0].date}: {GermanyWeather.forecast.forecastday[0].day.avgtemp_c}°C </p>
                        <h4> {GermanyWeather.forecast.forecastday[0].day.condition.text}</h4>
                         <img 
                            src={GermanyWeather.forecast.forecastday[0].day.condition.icon}
                            alt="new"
                        />
                        
                        <p> {GermanyWeather.forecast.forecastday[1].date}: {GermanyWeather.forecast.forecastday[1].day.avgtemp_c}°C </p>
                        <h4> {GermanyWeather.forecast.forecastday[1].day.condition.text}</h4>
                         <img 
                            src={GermanyWeather.forecast.forecastday[1].day.condition.icon}
                            alt="new"
                        />

                        {daysBetween >= 2 &&
                        <React.Fragment>
                        <p> {GermanyWeather.forecast.forecastday[2].date}: {GermanyWeather.forecast.forecastday[2].day.avgtemp_c}°C </p>
                        <h4> {GermanyWeather.forecast.forecastday[2].day.condition.text}</h4>
                         <img 
                            src={GermanyWeather.forecast.forecastday[2].day.condition.icon}
                            alt="new"
                        />

                        </React.Fragment>
                        }

                        {daysBetween >= 3 &&
                        <React.Fragment>
                        <p> {GermanyWeather.forecast.forecastday[3].date}: {GermanyWeather.forecast.forecastday[3].day.avgtemp_c}°C </p>
                        <h4> {GermanyWeather.forecast.forecastday[3].day.condition.text}</h4>
                         <img 
                            src={GermanyWeather.forecast.forecastday[3].day.condition.icon}
                            alt="new"
                        />

                        </React.Fragment>
                        }

                        {daysBetween >= 4 &&
                        <React.Fragment>
                        <p> {GermanyWeather.forecast.forecastday[4].date}: {GermanyWeather.forecast.forecastday[4].day.avgtemp_c}°C </p>
                        <h4> {GermanyWeather.forecast.forecastday[4].day.condition.text}</h4>
                         <img 
                            src={GermanyWeather.forecast.forecastday[4].day.condition.icon}
                            alt="new"
                        />

                        </React.Fragment>
                        }

                        {daysBetween >= 5 &&
                        <React.Fragment>
                        <p> {GermanyWeather.forecast.forecastday[5].date}: {GermanyWeather.forecast.forecastday[5].day.avgtemp_c}°C </p>
                        <h4> {GermanyWeather.forecast.forecastday[5].day.condition.text}</h4>
                         <img 
                            src={GermanyWeather.forecast.forecastday[5].day.condition.icon}
                            alt="new"
                        />

                        </React.Fragment>
                        }

                        </React.Fragment>
                        
                    }

                    {trip.countryname == "Egypt" &&
                        <React.Fragment>
                         <p> Egypt Weather: {EgyptWeather.current.temp_c}°C </p>
                         <img 
                            src={EgyptWeather.current.condition.icon}
                            alt="new"
                        />

                        <p> {EgyptWeather.forecast.forecastday[0].date}: {EgyptWeather.forecast.forecastday[0].day.avgtemp_c}°C </p>
                        <h4> {EgyptWeather.forecast.forecastday[0].day.condition.text}</h4>
                         <img 
                            src={EgyptWeather.forecast.forecastday[0].day.condition.icon}
                            alt="new"
                        />
                        
                        <p> {EgyptWeather.forecast.forecastday[1].date}: {EgyptWeather.forecast.forecastday[1].day.avgtemp_c}°C </p>
                        <h4> {EgyptWeather.forecast.forecastday[1].day.condition.text}</h4>
                         <img 
                            src={EgyptWeather.forecast.forecastday[1].day.condition.icon}
                            alt="new"
                        />

                        {daysBetween >= 2 &&
                        <React.Fragment>
                            <p> {EgyptWeather.forecast.forecastday[2].date}: {EgyptWeather.forecast.forecastday[2].day.avgtemp_c}°C </p>
                        <h4> {EgyptWeather.forecast.forecastday[2].day.condition.text}</h4>
                         <img 
                            src={EgyptWeather.forecast.forecastday[2].day.condition.icon}
                            alt="new"
                        />
                        </React.Fragment>
                        }

                        {daysBetween >= 3 &&
                        <React.Fragment>
                            <p> {EgyptWeather.forecast.forecastday[3].date}: {EgyptWeather.forecast.forecastday[3].day.avgtemp_c}°C </p>
                        <h4> {EgyptWeather.forecast.forecastday[3].day.condition.text}</h4>
                         <img 
                            src={EgyptWeather.forecast.forecastday[3].day.condition.icon}
                            alt="new"
                        />
                        </React.Fragment>
                        }

                        {daysBetween >= 4 &&
                        <React.Fragment>
                            <p> {EgyptWeather.forecast.forecastday[4].date}: {EgyptWeather.forecast.forecastday[4].day.avgtemp_c}°C </p>
                        <h4> {EgyptWeather.forecast.forecastday[4].day.condition.text}</h4>
                         <img 
                            src={EgyptWeather.forecast.forecastday[4].day.condition.icon}
                            alt="new"
                        />
                        </React.Fragment>
                        }

                        {daysBetween >= 5 &&
                        <React.Fragment>
                            <p> {EgyptWeather.forecast.forecastday[5].date}: {EgyptWeather.forecast.forecastday[5].day.avgtemp_c}°C </p>
                        <h4> {EgyptWeather.forecast.forecastday[5].day.condition.text}</h4>
                         <img 
                            src={EgyptWeather.forecast.forecastday[5].day.condition.icon}
                            alt="new"
                        />
                        </React.Fragment>
                        }

                        </React.Fragment>
                        
                    }

                    {trip.countryname == "Japan" &&
                        <React.Fragment>
                         <p> Japan Weather: {JapanWeather.current.temp_c}°C </p>
                         <img 
                            src={JapanWeather.current.condition.icon}
                            alt="new"
                        />

                        <p> {JapanWeather.forecast.forecastday[0].date}: {JapanWeather.forecast.forecastday[0].day.avgtemp_c}°C </p>
                        <h4> {JapanWeather.forecast.forecastday[0].day.condition.text}</h4>
                         <img 
                            src={JapanWeather.forecast.forecastday[0].day.condition.icon}
                            alt="new"
                        />

                        <p> {JapanWeather.forecast.forecastday[1].date}: {JapanWeather.forecast.forecastday[1].day.avgtemp_c}°C </p>
                        <h4> {JapanWeather.forecast.forecastday[1].day.condition.text}</h4>
                         <img 
                            src={JapanWeather.forecast.forecastday[1].day.condition.icon}
                            alt="new"
                        />
            
                        {daysBetween >= 2 &&
                        <React.Fragment>
                        <p> {JapanWeather.forecast.forecastday[2].date}: {JapanWeather.forecast.forecastday[2].day.avgtemp_c}°C </p>
                        <h4> {JapanWeather.forecast.forecastday[2].day.condition.text}</h4>
                         <img 
                            src={JapanWeather.forecast.forecastday[2].day.condition.icon}
                            alt="new"
                        />
                        </React.Fragment>
                        }

                        {daysBetween >= 3 &&
                        <React.Fragment>
                        <p> {JapanWeather.forecast.forecastday[3].date}: {JapanWeather.forecast.forecastday[3].day.avgtemp_c}°C </p>
                        <h4> {JapanWeather.forecast.forecastday[3].day.condition.text}</h4>
                         <img 
                            src={JapanWeather.forecast.forecastday[3].day.condition.icon}
                            alt="new"
                        />
                        </React.Fragment>
                        }

                        {daysBetween >= 4 &&
                        <React.Fragment>
                        <p> {JapanWeather.forecast.forecastday[4].date}: {JapanWeather.forecast.forecastday[4].day.avgtemp_c}°C </p>
                        <h4> {JapanWeather.forecast.forecastday[4].day.condition.text}</h4>
                         <img 
                            src={JapanWeather.forecast.forecastday[4].day.condition.icon}
                            alt="new"
                        />
                        </React.Fragment>
                        }

                        {daysBetween >= 5 &&
                        <React.Fragment>
                        <p> {JapanWeather.forecast.forecastday[5].date}: {JapanWeather.forecast.forecastday[5].day.avgtemp_c}°C </p>
                        <h4> {JapanWeather.forecast.forecastday[5].day.condition.text}</h4>
                         <img 
                            src={JapanWeather.forecast.forecastday[5].day.condition.icon}
                            alt="new"
                        />
                        </React.Fragment>
                        }

                        </React.Fragment>
                        
                    } */}

                </div>
            ))
        } 


    </div>
  )
}


export default Home
