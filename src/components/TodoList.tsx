import React, { useState, useId, useContext } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Context from '../store/Context';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { ITodo, AddTodo, IEdit, UpdateTodo } from '../types';

interface TodoListProps {
  todos: ITodo[];
  updateTodo?: UpdateTodo;
}

interface TodoItemProps {
  todo: ITodo;
  updateTodo?: UpdateTodo;
}
interface TodoFormProps {
  addTodo?: AddTodo;
  updateTodo?: UpdateTodo;
  edit?: IEdit;
}

function TodoForm({ addTodo, updateTodo, edit }: TodoFormProps) {
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

function TodoItem({ todo, updateTodo }: TodoItemProps) {
  const { removeTodo, onToggleImportant, onToggleLike } = useContext(Context);

  const [edit, setEdit] = useState({
    id: 0,
    label: ''
  });

  const editTodo = (id: number, label: string) => {
    if(updateTodo) updateTodo(id, label);
    setEdit({
      id: 0,
      label: ''
    });
  };

  if (edit.id) {
    return <TodoForm edit={edit} updateTodo={editTodo}/>;
  }

  let classNames = 'black';
  if (todo.important) {
    classNames = 'green';
  }
  if (todo.like) {
    classNames = 'blue';
  }

  return (
    <Card sx={{ display: 'flex', margin: '10px' }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
          <Typography component="div" variant="h5" color={classNames} onClick={() => onToggleLike(todo.id)}>
            {todo.label}
          </Typography>
          <div style={{flex: 1}}/>
        <Stack direction="row" spacing={2}>
          <Button variant="contained" color="info" onClick={() => onToggleLike(todo.id)}>
            Completed
          </Button>
          <Button variant="contained" color="success" onClick={() => onToggleImportant(todo.id)}>
            Important
          </Button>
          <Button variant="contained" color="warning" onClick={() => setEdit({ id: todo.id, label: todo.label })}>
            Edit
          </Button>
          <Button variant="outlined" color="error" onClick={() => removeTodo(todo.id)} startIcon={<DeleteIcon />}>
            Delete
          </Button>
        </Stack>
        </CardContent>
    </Card>
  );
}

export default function TodoList({ todos, updateTodo }: TodoListProps) {
  const elements = todos.map((todo) => <TodoItem  key={todo.id} todo={todo} updateTodo={updateTodo} />);
  return <>{todos.length > 0 ? elements : <h4>No Tasks!</h4>}</>;
}
