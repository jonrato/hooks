import React from "react";
import api from './API';
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import './chart.css';

export default function ChartTest() {
    const [ dataChart, setDataChart ] = useState ( {} );
  useEffect(() => {
      const fetchData = async () => {
        let confirmedCases = [];
        let dateOfCases = [];
        await api.get('dayone/country/brazil/status/confirmed')
          .then ( response => {
            for ( let dataObj of response.data ) {
              confirmedCases.push(parseInt(dataObj.Cases));
              let tempDate = new Date (dataObj.Date);
              dateOfCases.push(tempDate.getUTCDate());
            }
        }); 
        setDataChart({ 
          labels: dateOfCases, 
          datasets: [{ 
            label: 'Confirmed cases', 
            data: confirmedCases 
          }]
        });
      fetchData();
    }
    }, []);
    return( 
      
        <Line data={ dataChart }/>
      
    )
  }
