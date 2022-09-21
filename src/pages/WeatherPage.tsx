import { useEffect, useState } from 'react'
import useFetch from '../hooks/useFetch';
import AppLayout from '../layouts/AppLayout';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Weather from '../components/Weather';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
const reg = /^[a-zA-Z]+$/;

function WeatherPage() {
  const apiKey = "1fe964584977428d6c6d40d53031b207"; // API key from https://home.openweathermap.org/api_keys
  const [search, setSearch] = useState<string>('dhaka');
  const forcastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${search}&units=metric&appid=${apiKey}`;
  const { data, loading, error, fetchNow } = useFetch(forcastUrl);

  useEffect(() => {
    fetchNow(forcastUrl)
  }, [])

  /**
   * on submit Forecast handler
   * 
   * @returns void
   */
  const onForecastHandler = () => fetchNow(forcastUrl);

  /**
   * Validate user input for XSS attack or other
   * 
   * @param value string
   * @returns string
   */
  const validateInput = (value: string) => reg.test(value) ? value : value.replace(/[^A-Za-z0-9 ]/g, ' '); // Todo: validate for XSS attack or other

  return (
    <AppLayout>
      <h1>Weather Forecast </h1>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid xs={2}>
          </Grid>
          <Grid xs={8}>
            <Stack spacing={2} direction="row">
              <TextField fullWidth label="Enter Your City" value={search} onChange={(e) => setSearch(validateInput(e.target.value.toString() || ""))} />
              <Button variant="contained" onClick={onForecastHandler}>Forecast</Button>
            </Stack>
          </Grid>
          <Grid xs={2}>
          </Grid>
        </Grid>
        {(!loading && data && data.message !== 0) && <p>{data.message || ""}</p>}
        <br />
        <br />
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {(data && data.cod == 200 && data.list.length) ?
              data.list.map((item: any, i: number) => (
                <Weather key={i} item={item} />
              ))
              : (
                <Paper elevation={3}>No Record found</Paper>
              )}
          </Box>
        )}
      </Box>
    </AppLayout>
  )
}

export default WeatherPage