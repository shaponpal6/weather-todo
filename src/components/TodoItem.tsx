import { useContext, useState } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Context from '../store/Context';
import { ITodo, UpdateTodo } from '../types';
import TodoForm from './TodoForm';

interface TodoItemProps {
  todo: ITodo;
  updateTodo?: UpdateTodo;
}

export default function TodoItem({ todo, updateTodo }: TodoItemProps) {
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
