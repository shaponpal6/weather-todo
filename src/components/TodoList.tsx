import { ITodo, UpdateTodo } from '../types';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: ITodo[];
  updateTodo?: UpdateTodo;
}

export default function TodoList({ todos, updateTodo }: TodoListProps) {
  const elements = todos.map((todo) => <TodoItem  key={todo.id} todo={todo} updateTodo={updateTodo} />);
  return <>{todos.length > 0 ? elements : <h4>No Tasks!</h4>}</>;
}
