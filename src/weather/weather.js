import React, { Component } from "react";
import './weather.css'
import ReactAnimatedWeather from 'react-animated-weather';
const API_KEY = 'bc8fcefdba6ca5610b2c0a1f9332fd6f';
class Weather extends Component{
    constructor(props) {
        super(props)
        this.state = {
       
          temperature: 0,
          icon: '',
          weather_icon:'',
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
            icon: json.weather[0].icon,
          });
          if(this.state.icon == "01d"){
            this.setState({weather_icon:'CLEAR_DAY'});
          }
          else if(this.state.icon == "01n"){
            this.setState({weather_icon:'CLEAR_NIGHT'});
          }
          else if(this.state.icon == "02d"){
            this.setState({weather_icon:'PARTLY_CLOUDY_DAY'});
          }
          else if(this.state.icon == "02n"){
            this.setState({weather_icon:'PARTLY_CLOUDY_NIGHT'});
          }
          else if(this.state.icon == "03d" || this.state.icon == "03n"|| this.state.icon == "04d" || this.state.icon == "04n"){
            this.setState({weather_icon:'CLOUDY'});
          }
          else if(this.state.icon == "50d" || this.state.icon == "50n"){
            this.setState({weather_icon:'FOG'});
          }
          else if(this.state.icon == "13d" || this.state.icon == "13n"){
            this.setState({weather_icon:'SNOW'});
          }
          else {
            this.setState({weather_icon:'RAIN'});
          }
        });
      }
      componentDidMount() {
        this.getWeather()
      }
    render(){
        const { temperature, weather_icon } = this.state;
        return(
            <div className="Weatherdiv">
          <h3 className="WeatherTitle">의창구 날씨</h3>
          <ReactAnimatedWeather className="WeatherIcon" icon = {weather_icon} />
          <h3 className="temperature">{temperature}°C</h3>
         
          
            </div>
        )
    }
}
export default Weather;