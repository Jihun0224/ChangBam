import React, { Component } from "react";
import axios from 'axios';
import './covid_19.css';

class Covid_19 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ConfirmedCase:0,
      IncreaseCase:0,
      Today:'',
    };
  }
  componentWillMount(){
    const fetchEvents = async () => {
      const res = await axios.get('https://api.covid19api.com/total/dayone/country/south-korea/status/confirmed')
      const currentDate = new Date(res.data[res.data.length-1].Date)
      const year = currentDate.getFullYear()
      const month = 1+currentDate.getMonth()
      const date = currentDate.getDate()
      this.setState({
        ConfirmedCase:res.data[res.data.length-1].Cases,
        IncreaseCase:res.data[res.data.length-1].Cases-res.data[res.data.length-2].Cases,
        Today:year+'-'+month+'-'+date
      });
    }
    fetchEvents();
  }
  render() {
    const {ConfirmedCase,IncreaseCase,Today} = this.state;
    return (
      <div className="ConfirmedCase">
        <h3 className="ConfirmedCase_title">확진환자</h3>
        <h2 className="ConfirmedCase_confirmedcase">{ConfirmedCase}</h2>
        <h6 className="ConfirmedCase_increase">{IncreaseCase}증가</h6>
        <h6 className="ConfirmedCase_today">({Today} 집계 기준)</h6>
      </div>
    )
  }
}
export default Covid_19;