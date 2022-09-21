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
import TodoApp from '../modules/todos';
const reg = /^[a-zA-Z]+$/;

function MyTasksPage() {
 
  return (
    <AppLayout>
      <h1>My Tasks </h1>
      <TodoApp/>
    </AppLayout>
  )
}

export default MyTasksPage