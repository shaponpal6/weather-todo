import React, { useState, useId } from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { AddTodo, IEdit, UpdateTodo } from '../types';

interface TodoFormProps {
  addTodo?: AddTodo;
  updateTodo?: UpdateTodo;
  edit?: IEdit;
}

export default function TodoForm({ addTodo, updateTodo, edit }: TodoFormProps) {
  const [state, setState] = useState(edit ? edit.label : '');
  const id = useId();

  console.log('edit', id, edit)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!state || /^\s*$/.test(state)) return;
    if(edit && edit.id && edit.id > 0){
      if(updateTodo) {
        console.log('##edit.id, state', edit.id, state)
        updateTodo(edit.id, state)
      };
    }else{
      if(addTodo) addTodo({
        id: Date.now(),
        label: state,
        important: false,
        like: false
      });
    }
    setState('');
  };

  return (
    <Stack
      component="form"
      sx={{
        width: '100%',
        justifyContent: 'center', 
        alignItems: 'center' 
      }}
      spacing={2}
      noValidate
      autoComplete="true"
    >
      <TextField
        hiddenLabel
        id="filled-hidden-label-normal"
        defaultValue="Update tasks"
        variant="filled"
        onChange={handleChange}
        value={state}
      />
      <Button onClick={(e) => handleSubmit(e)} variant="contained" endIcon={<SendIcon />}>
        {edit ? 'Update' : 'Add New Task'}
      </Button>
    </Stack>
  );
}
