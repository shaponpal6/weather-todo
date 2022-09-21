import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AlarmIcon from '@mui/icons-material/Alarm';
import useMediaQuery from '@mui/material/useMediaQuery';


interface TodoHeaderProps {
  likedTodo: number;
  allTodos: number;
  children: React.ReactNode;
}

export default function PrimarySearchAppBar({ likedTodo, allTodos, children }: TodoHeaderProps) {
  const mobile = useMediaQuery('(max-width:600px)');
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{flexDirection: mobile ? 'column':'row'}}>
        <IconButton color="secondary" aria-label="add an alarm">
          <AlarmIcon />
        </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: {sm: 'block' } }}
          >
            My Tasks
          </Typography>
          <div style={{flex: 1}}/>
          {children || null}
          <div style={{flex: 1}}/>
          {allTodos} tasks, from them completed {likedTodo}{' '}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
