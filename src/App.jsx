import axios from 'axios'
import { useEffect, useState } from 'react'
import CardLoadingPage from '../components/CardLoadingPage'
import './App.css'
import calendar from '/src/calendar.png'
import world from '/src/world.png'

function App() {

  const [obj, setObj] = useState()
  const [weather, setWeather] = useState()
  const [changeBackGround, setchangeBackGround] = useState(true)
  const [loadingPage, setLoadingPage] = useState(true)
  const [centigrades, setCentigrades] = useState(true)
  const [farenheit, setFarenheit] = useState(false)
  const [kelvin, setKelvin] = useState(false)

  var date = new Date()
  var hours = date.getHours()


  useEffect(() => {
    const success = (pos) => {
      const lon = pos.coords.longitude
      const lat = pos.coords.latitude
      setObj({ lat, lon })
    }
    navigator.geolocation.getCurrentPosition(success)
  }, [])

  console.log(obj)

  useEffect(() => {
    if (obj !== undefined) {
      const api_key = '357a17b062a4d426ffda9f1c704ff186'
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${obj?.lat}&lon=${obj?.lon}&appid=${api_key}`

      axios.get(url)
        .then(res => setWeather(res.data))
      setLoadingPage(false)
    }
  }, [obj])


  useEffect(() => {
    if ((hours >= 6) && (hours <= 18)) {
      setchangeBackGround(false)
      console.log(hours)
    } else {
      if ((hours > 18) && (hours <= 23)) {
        setchangeBackGround(true)
      } else {
        if ((hours >= 0) && (hours < 6)) {
          setchangeBackGround(true)
        }
      }
    }
  }, [])

  ///////////////////change of the units of temperature///////////down here
  const showTemperatura1 = () => {
    setCentigrades(true)
    setFarenheit(false)
    setKelvin(false)
  }
  const showTemperatura2 = () => {
    setCentigrades(false)
    setFarenheit(true)
    setKelvin(false)
  }
  const showTemperatura3 = () => {
    setCentigrades(false)
    setFarenheit(false)
    setKelvin(true)
  }
  let centigradesTemperature = Math.round(((weather?.main.feels_like) - 273.15))
  let farenheitTemperature = Math.round(((weather?.main.feels_like) - 273.15) * (9 / 5) + 32)
  let kelvinTemperature = Math.round(((weather?.main.feels_like)))
  ///////////////////change of the units of temperature///////////above here

  return (
    <div className='whole'>
      {loadingPage ?
        <CardLoadingPage />
        :
        ''
      }

      {loadingPage ?
        ''
        :
        <div className={changeBackGround ? 'App-dark-mode' : 'App-light-mode'}>
          <h2 className='title-app'>
            <img className='img-world' src={world} alt="" />
            The weather app
          </h2>
          <div className='main-content'>
            <div className='photo-weather'>
              <img src={weather && `http://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`} alt="" />
            </div>
            <ul>
              <li> <strong>Country: </strong>{`${weather?.sys.country}`} </li>
              <li> <strong>City:</strong> {weather?.name} </li>
              <li><strong>Weather: </strong> {weather?.weather[0].main}</li>
            </ul>
          </div>
          <div className='temperature-add'>
            <img src={calendar} alt="" />
            <div className='temperatura-and-more'>
              <strong>Temperature: </strong>
              {centigrades ?
                <div className='temperature-div'>
                  {`${centigradesTemperature} °C`}
                </div>
                :
                ''
              }
              {farenheit ?
                <div className='temperature-div'>
                  {`${farenheitTemperature} °F`}
                </div>
                :
                ''
              }
              {kelvin ?
                <div className='temperature-div'>
                  {`${kelvinTemperature} K`}
                </div>
                :
                ''
              }
              <div className='div-btn-temp'>
                <button onClick={showTemperatura1}>°C</button>
                <button onClick={showTemperatura2}>°F</button>
                <button onClick={showTemperatura3}>K</button>
              </div>

            </div>
          </div>
        </div>
      }

    </div>

  )
}

export default App
