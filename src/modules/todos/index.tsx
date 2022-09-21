import {
  RemoveTodo,
  OnToggleImportant,
  OnToggleLike,
  UpdateTodo,
  AddTodo,
  UpdateSearch,
  SearchTodo,
  UpdateFilter,
  FilterTodo,
  ITodo
} from '../../types';
import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { initialTodo } from './initialTodo';
import TodoList from '../../components/TodoList';
import TodoSearch from '../../components/TodoSearch';
import TodoHeader from '../../components/TodoHeader';
import TodoFilter from '../../components/TodoFilter';
import Context from '../../store/Context';

export default function TodoApp() {
  const [todos, setTodos] = useState(initialTodo);
  const [term, setTerm] = useState('');
  const [filt, setFilt] = useState('all');

  const addTodo: AddTodo = (newData) => {
    setTodos((prevState) => ({
      data: [...prevState.data, newData]
    }));
  };

  const removeTodo: RemoveTodo = (id) => {
    const newData = todos.data.filter((ele) => ele.id !== id);
    setTodos({ data: newData });
  };

  const updateTodo: UpdateTodo = (id, newValue) => {
    let updatedTodo = todos.data.map((item) => (item.id === id ? {...item, label: newValue} : item));
    setTodos({ data: updatedTodo });
  };

  const onToggleImportant: OnToggleImportant = (id) => {
    const newData = todos.data.map((ele) => {
      if (ele.id === id) {
        return { ...ele, important: !ele.important };
      }
      return ele;
    });
    setTodos({ data: newData });
  };

  const onToggleLike: OnToggleLike = (id) => {
    const newData = todos.data.map((ele) => {
      if (ele.id === id) {
        return { ...ele, like: !ele.like };
      }
      return ele;
    });
    setTodos({ data: newData });
  };

  const updateSearch: UpdateSearch = (text) => {
    setTerm(text);
  };

  const searchTodo: SearchTodo = (items, term) => {
    if (term === '') {
      return items;
    }
    return items.filter((item) => {
      return item.label.toLowerCase().includes(term.toLowerCase());
    });
  };

  const updateFilter: UpdateFilter = (filte) => {
    setFilt(filte);
  };

  const filterTodo: FilterTodo = (items, filt) => {
    if (filt === 'like') {
      return items.filter((item) => item.like);
    } else {
      return items;
    }
  };

  const visibleTodos: ITodo[] = filterTodo(searchTodo(todos.data, term), filt);
  const likedTodo = todos.data.filter((item) => item.like).length;
  const allTodos = todos.data.length;

  return (
      <React.Fragment>
        <CssBaseline />
        <Container>
          <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }}>
          <Context.Provider value={{ removeTodo, updateTodo, onToggleImportant, onToggleLike }}>
              <TodoHeader likedTodo={likedTodo} allTodos={allTodos}>
                  <TodoSearch updateSearch={updateSearch} />
                  <div style={{flex: 1}}/>
                  <TodoFilter filt={filt} updateFilter={updateFilter} />
              </TodoHeader>
            
              <TodoList todos={visibleTodos} addTodo={addTodo} updateTodo={updateTodo} />
            </Context.Provider>
          </Box>
        </Container>
      </React.Fragment>
  );
}
