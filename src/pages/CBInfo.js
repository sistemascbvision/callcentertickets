import React, { useState, useEffect, useRef } from 'react';
import { Box, Grid, Paper, Typography, useTheme } from '@mui/material';
import Chart from 'chart.js/auto';
import { getTickets } from '../services/TicketService';

function CBInfo() {
  const [tickets, setTickets] = useState([]);
  const theme = useTheme();

  // Referencias a los elementos canvas
  const chartZonaRef = useRef(null);
  const chartVariacionRef = useRef(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const token = localStorage.getItem('token');
        const data = await getTickets(token);
        setTickets(data);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };

    fetchTickets();
  }, []);

  // Función para crear o actualizar el gráfico de zona (tickets por zona)
  const drawZonaChart = () => {
    const ctxZona = chartZonaRef.current.getContext('2d');

    // Destruir el gráfico existente si ya hay uno
    if (chartZonaRef.current.chartInstance) {
      chartZonaRef.current.chartInstance.destroy();
    }

    // Configurar datos y opciones del gráfico
    const ticketsPorZonaData = ticketsPorZona();
    chartZonaRef.current.chartInstance = new Chart(ctxZona, {
      type: 'bar',
      data: {
        labels: ticketsPorZonaData.labels,
        datasets: [
          {
            label: 'Tickets por Zona',
            data: ticketsPorZonaData.data,
            backgroundColor: theme.palette.primary.main,
            borderColor: theme.palette.primary.dark,
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Cantidad de Tickets',
            },
          },
        },
      },
    });
  };

  // Función para crear o actualizar el gráfico de variación de tickets por día
  const drawVariacionChart = () => {
    const ctxVariacion = chartVariacionRef.current.getContext('2d');

    // Destruir el gráfico existente si ya hay uno
    if (chartVariacionRef.current.chartInstance) {
      chartVariacionRef.current.chartInstance.destroy();
    }

    // Configurar datos y opciones del gráfico (ejemplo)
    chartVariacionRef.current.chartInstance = new Chart(ctxVariacion, {
      type: 'bar',
      data: {
        labels: ['Día 1', 'Día 2', 'Día 3', 'Día 4', 'Día 5'],
        datasets: [
          {
            label: 'Variación de Tickets',
            data: [12, 19, 3, 5, 2],
            backgroundColor: theme.palette.secondary.main,
            borderColor: theme.palette.secondary.dark,
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Cantidad de Tickets',
            },
          },
          x: {
            title: {
              display: true,
              text: 'Días',
            },
          },
        },
      },
    });
  };

  // Calcular datos para el gráfico de zona (tickets por zona)
  const ticketsPorZona = () => {
    const ticketsPorZonaData = {};
    tickets.forEach(ticket => {
      if (ticketsPorZonaData[ticket.agency_name]) {
        ticketsPorZonaData[ticket.agency_name]++;
      } else {
        ticketsPorZonaData[ticket.agency_name] = 1;
      }
    });

    const labels = Object.keys(ticketsPorZonaData);
    const data = Object.values(ticketsPorZonaData);

    return { labels, data };
  };

  // Renderizar gráficos al cargar los datos de tickets
  useEffect(() => {
    if (tickets.length > 0) {
      drawZonaChart();
      drawVariacionChart();
    }
  }, [tickets]);

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={3}>
        {/* Columna superior para información de tickets */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <Paper elevation={3} sx={{ p: 2, backgroundColor: theme.palette.info.light }}>
                  <Typography variant="subtitle1">Total de Tickets</Typography>
                  <Typography variant="h4">{tickets.length}</Typography>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper elevation={3} sx={{ p: 2, backgroundColor: theme.palette.warning.light }}>
                  <Typography variant="subtitle1">Abiertos</Typography>
                  <Typography variant="h4">{tickets.filter(t => t.status === 'open').length}</Typography>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper elevation={3} sx={{ p: 2, backgroundColor: theme.palette.success.light }}>
                  <Typography variant="subtitle1">Resueltos</Typography>
                  <Typography variant="h4">{tickets.filter(t => t.status === 'resolved').length}</Typography>
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Fila central con gráfico de variación de tickets y tickets por zona */}
        <Grid item xs={12} container spacing={3}>
          <Grid item xs={6}>
            <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
              <Typography variant="h6" gutterBottom>Variación de Tickets por Día</Typography>
              <canvas ref={chartVariacionRef} />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
              <Typography variant="h6" gutterBottom>Tickets por Zona</Typography>
              <canvas ref={chartZonaRef} />
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CBInfo;
