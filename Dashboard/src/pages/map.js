import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '../components/dashboard-layout';
import { Box } from '@mui/material';
import Head from 'next/head';
let W3CWebSocket = require('websocket').w3cwebsocket;
import Map from "../components/map/Map";
import CircularProgress from '@mui/material/CircularProgress';

const MapPage = () => {
  const [eventData, setEventData] = useState()
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const client = new W3CWebSocket('wss://serene-reaches-92565.herokuapp.com/');
    client.onopen = () => {
      client.send(JSON.stringify({ action: 'requestAllEvents' }));
    };
    client.onmessage = (msg) => {
      let receivedMessage = JSON.parse(msg.data);
    
      // Check if the message type is 'allEvents'
      if (receivedMessage.type === 'allEvents') {
        setEventData(receivedMessage.data);
        setLoading(false);
      }
    };
    client.onerror = function () {
      console.log('Connection Error');
    };
  }, []);

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: '100%',
          padding: 3
        }}
      >
        <div>
          {loading ? (
            <CircularProgress />
          ) : (
            <Map events={eventData} />
          )}
        </div>
      </Box>
    </>
  );
};

MapPage.getLayout = (page) => (
  <>
    <Head>
      <title>Map | GET Protocol Community</title>
    </Head>
    <DashboardLayout>{page}</DashboardLayout>
  </>
);

export default MapPage;