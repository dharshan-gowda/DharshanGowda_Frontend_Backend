import React, { useEffect } from 'react'
import {Line} from 'react-chartjs-2';
import axios from 'axios'
import './graphStyle.css'
import {useState} from 'react'

function GraphChart(){

  const [bounces, setBounces] = useState()
  const [val, setVal] = useState({
    restitution:0,
    dropHeight:0
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/api/graph", val)
    .then(response => {
      setPlotData(response.data.data)
      setBounces(response.data.num_of_bounces)
    })
    .catch(err => {
      console.log(err.message);
    })
  }

  const [plotData, setPlotData] = useState([])
  console.log(plotData);
  

  var label = plotData.map((element,i) => i%2 === 0 ? '': (element.x).toFixed(3))

const state = {
    labels: label,
    datasets: [
      {
        label:'',
        fill: false,
        lineTension: 0.3,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: plotData,
      }
    ]
  }

    return(<div className="container">
        <div className="slidecontainer">
        <form onSubmit={e => handleSubmit(e)}>
        <label>Enter the initial ball drop height in meters:  </label><input onChange={e => setVal({...val,dropHeight:e.target.value})}></input>
        <p>Co-efficient of restitution:  {val.restitution}</p>
           <input type="range" min="0" max="1" step="0.01" className="slider" id="myRange" onChange={e => setVal({...val,restitution:e.target.value})}/>
           <input type="submit" value="Plot"/>
        </form>
        </div>
          <p>Number of bounces: {bounces}</p>
        <div className="chart">
        <Line 
          data={state}
          options={{
            title:{
              display:false,
            },
            legend:{
              display:false
            },
            scales: {
              yAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'Height in meters',
                  fontSize:20
                }
              }],
              xAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'Time in seconds',
                  fontSize:20
                }
              }]
            }
          }}
        />
      </div><br></br>
    </div>)
}

export default GraphChart