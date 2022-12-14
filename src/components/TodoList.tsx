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
import IconButton from '@mui/material/IconButton';
import AlarmIcon from '@mui/icons-material/Alarm';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ITodo, AddTodo, IEdit, UpdateTodo } from '../types';

interface TodoListProps {
  todos: ITodo[];
  addTodo?: AddTodo;
  updateTodo?: UpdateTodo;
}

interface TodoItemProps {
  todo: ITodo;
  addTodo?: AddTodo;
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
  const mobile = useMediaQuery('(max-width:600px)');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!state || /^\s*$/.test(state)) return;
    if (edit && edit.id && edit.id > 0) {
      if (updateTodo) {
        updateTodo(edit.id, state)
      };
    } else {
      if (addTodo) addTodo({
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

function TodoItem({ todo, addTodo, updateTodo }: TodoItemProps) {
  const { removeTodo, onToggleImportant, onToggleLike } = useContext(Context);
  const mobile = useMediaQuery('(max-width:600px)');

  const [edit, setEdit] = useState({
    id: 0,
    label: ''
  });

  const editTodo = (id: number, label: string) => {
    if (updateTodo) updateTodo(id, label);
    setEdit({
      id: 0,
      label: ''
    });
  };

  if (edit.id) {
    return <TodoForm edit={edit} updateTodo={editTodo} />;
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
      <CardContent sx={{ display: 'flex', flexDirection: mobile ? 'column' : 'row', justifyContent: 'space-between', width: '100%' }}>
        <Typography component="div" variant="h5" color={classNames} onClick={() => onToggleLike(todo.id)}>
          {todo.label}
        </Typography>
        <div style={{ flex: 1 }} />
        <Stack direction="row" spacing={1} sx={{ justifyContent: 'center' }}>
          {/* <Button variant="contained" color="info" size="small" onClick={() => onToggleLike(todo.id)}>
            Completed
          </Button>
          <Button variant="contained" color="success" size="small" onClick={() => onToggleImportant(todo.id)}>
            Important
          </Button> */}
          <Button variant="contained" color="warning" size="small" onClick={() => setEdit({ id: todo.id, label: todo.label })}>
            Edit
          </Button>
          <Button variant="outlined" color="error" size="small" onClick={() => removeTodo(todo.id)} startIcon={<DeleteIcon />}>
            Delete
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default function TodoList({ todos, addTodo, updateTodo }: TodoListProps) {
  const elements = todos.map((todo) => <TodoItem key={todo.id} todo={todo} updateTodo={updateTodo} addTodo={addTodo} />);
  return <>{todos.length > 0 ? (<>
    {elements}
    <TodoForm addTodo={addTodo} updateTodo={updateTodo} />
  </>) : <h4>No Tasks!</h4>}</>;
}
