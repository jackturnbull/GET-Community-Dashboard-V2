import React from 'react';
import { useState, useEffect } from "react"
import CircularProgress from '@mui/material/CircularProgress';
import { Chart as ChartJS } from 'chart.js/auto'
import { Pie } from 'react-chartjs-2';
import {
  Box,
  Container,
  CardHeader
} from '@mui/material';
import { protocolDayToDate } from '../../utils/helpers'

const FuelChart = (props) => {
  let { data, title } = props

  const [chartData, setChartData] = useState({
      labels: [
        'Reserved',
        'Spent',
        'Available'
      ],
      datasets: [{
        label: 'Fuel',
        data: [data.reservedFuel, data.spentFuel, data.availableFuel],
        backgroundColor: [
          '#543BD1',
          '#15083F',
          '#77B094'
        ],
        hoverOffset: 3
      }]
  })

  const displayGraph = () => {
    return (
      <>
        <CardHeader
          title={title}
        />
        <Container>
        <Pie
          data={chartData} />
          </Container>
      </>
    )
  }

  return <div>
          { chartData ? displayGraph() :
            <Box sx={{ display: 'flex' }}>
              <CircularProgress color="inherit" />
            </Box>
          }
        </div>
}

export default FuelChart