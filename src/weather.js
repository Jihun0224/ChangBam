import React, { Component } from "react";

const API_KEY = 'bc8fcefdba6ca5610b2c0a1f9332fd6f';
class Weather extends Component{
    constructor(props) {
        super(props)
        this.state = {
       
          temperature: 0,
          name: '',
          icon: '',
        }
      }
    getWeather = () => {
        var long = 128.6402609;
        var lat = 35.2538433;
    
        fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=${API_KEY}`)
        .then(response => response.json())
        .then(json => {
          this.setState({
            temperature: Math.floor(json.main.temp - 273.15),
            name: json.weather[0].main,
            icon: json.weather[0].icon,
          });
        });
      }
      componentDidMount() {
        this.getWeather()
      }
    render(){
        const { temperature, name, icon } = this.state;
        const img_url = `http://openweathermap.org/img/w/${icon}.png`;
        return(
            <>
          <h1>의창구 날씨</h1>
          <img width="100px"alt="weather_icon" src={img_url}/>
          <h3>온도 : {temperature}°C</h3>
          <h3>날씨 : {name}</h3>
          
            </>
        )
    }
}
export default Weather;