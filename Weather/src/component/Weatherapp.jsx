import React,{useState,useEffect} from "react";
import  './weatherapp.css'


const months=new Array();
{    
    months[0]="January";
    months[1]="February";
    months[2]="March";
    months[3]="April";
    months[4]="May";
    months[5]="June";
    months[6]="July";
    months[7]="August";
    months[8]="September";
    months[9]="October";
    months[10]="November";
    months[11]="December";

}

const weekdays=new Array();
{
    weekdays[0]="Sunday";
    weekdays[1]="Monday";
    weekdays[2]="Tuesday";
    weekdays[3]="Wednesday";
    weekdays[4]="Thursday";
    weekdays[5]="Friday";
    weekdays[6]="Saturday";
}
const time=new Date();
const getcurrenttime=()=>{
    var hours=time.getHours();
    var mins=time.getMinutes();
    var dur="AM";
    if(hours>12)
    {hours=hours-12;
    dur="PM";}
    
     
    
    console.log(hours+ ":" +mins +" " +dur);
    return `${hours}:${mins}  ${dur}`;
}


const day=new Date();
const getcurrentday=()=>{
    var currentday= weekdays[day.getDay()];
    console.log( currentday);
    return `${currentday}`;
}
const exactdate=new Date();
const getcurrentdate=()=>{
   var date=exactdate.getDate();
    var month= months[exactdate.getMonth()];
    var year=exactdate.getFullYear();
    console.log(date+ " " +month+ " " +year);
    return `${date}   ${month}  ${year}`;
     
}
const Weatherapp=()=>
{  const[city,setCity]=useState("null");

    const[search,setSearch]=useState('Jabalpur');

    useEffect( ()=>
    {    const fetchApi=async ()=>{
        const url=`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metrics&appid=ce6a0e3aa65f58f2abc73e89a226a02a`
         const response = await fetch(url);
         const res= await response.json();
        console.log(res);
        setCity(res.main);
    }
        fetchApi();
    },[search])


    return(<>
   <div className='container' >
  <h1  className="heading" align='center'>Weather Report</h1>
  <div className="inputData">
  <input type="search" className="search-bar" placeholder="Enter City name" align='center'onChange={(event)=>{setSearch(event.target.value)}} >
    </input>
    
</div>
{!city?
 (<h1 align='center' font="bold">INVALID CITY NAME</h1>):
 <div> 
<div id="location" >{search},India</div>
<div id="time" >{getcurrenttime()}</div>
<div id="day" >{getcurrentday()}</div>
<div id="date" >{getcurrentdate()}</div>

<div id="temp" >{(city.temp-273).toFixed(2)}&deg;C</div>
<h2>Weather details</h2>
<div className="detail">
<div id="humidity" > Humidity :        {city.humidity}%</div>
<div id="pressure" > Pressure :      {city.pressure}</div>
<div id="min-temp" > Min-Temperature :{(city.temp_min-273).toFixed(2)}&deg;C</div>
<div id="max-temp" > Max-Temperature :{(city.temp_max-273).toFixed(2)}&deg;C</div>
</div>


</div>}
</div>
  
  </>
  )
}
export default Weatherapp;