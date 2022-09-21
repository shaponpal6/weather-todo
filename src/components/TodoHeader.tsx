import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';


interface TodoHeaderProps {
  likedTodo: number;
  allTodos: number;
  children: React.ReactNode;
}

export default function PrimarySearchAppBar({ likedTodo, allTodos, children }: TodoHeaderProps) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
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
