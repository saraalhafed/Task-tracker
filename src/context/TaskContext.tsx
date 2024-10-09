'use client';

import config from '@/config/config';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { createContext, useContext, useState } from 'react';

interface IUser {
  id: string;
  email: string;
}

interface ITodo {
  id: string;
  title: string;
}

interface ITaskContext {
  user: IUser | null;
  todos: ITodo[] | null;
  currentTodo: ITodo | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  getTodos: () => Promise<void>;
  getTodo: (id: string) => Promise<void>;
  addTodo: (title: string) => Promise<void>;
  updateTodo: (id: string, title: string) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  token: string | null;
}

const TaskContext = createContext<ITaskContext | undefined>(undefined);//here we can defind the type inside the context so it will be not undefind

export const TaskProvider = ({ children }: ChildrenProps) => {
  const router = useRouter(); // in nextjs we use useRouter , in react usenavigate
  const { toast } = useToast(); //we need to installet from shadcn framwork ,it  will automaticly creat 2 fcommponent toast we can customiz our tost ther other toaster is just a container we use it in root layout
 //pnpm dlx shadcn@latest add toast
  const [todos, setTodos] = useState<ITodo[] | null>(null);
  const [currentTodo, setCurrentTodo] = useState<ITodo | null>(null);
  const [user, setUser] = useState<IUser | null>(() => { //initialvalue  will get from localstorage ,but her the commponent will render in server and clint (browser)we need to konw where we are , localstorage just in clint side so we need to check if we are in clint or not (throw window obj)
    // if window is undefined this means you are on the server
    // if window is no undefined this means you are on the client browser
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('user');
      if (user) {
        return JSON.parse(user);
      }
    }
    return null;
  });

  const [token, setToken] = useState<string | null>(() => {
    // if window is undefined this means you are on the server
    // if window is no undefined this means you are on the client browser
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        return token;
      }
    }
    return null;
  });

  const login = async (email: string, password: string) => {
    const url = `${config.BASE_URL}/account/login/`;
    try {
      const { data } = await axios.post(url, { email, password });
      setToken(data.key);
      setUser(data.user);
      if (typeof window !== 'undefined') { //check if we in server side 
        localStorage.setItem('token', data.key);
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      toast({
        title: 'Login Successful',
        description: 'You have successfully logged in',
        duration: 2000,
        variant: 'success',
      });

      router.push('/todos');
    } catch (error) {
      console.log(error);
      toast({
        title: 'Error',
        description: 'Login Failed',
        duration: 2000,
        variant: 'destructive',
      });
    }
  };

  const logout = async () => {
    const url = `${config.BASE_URL}/account/logout/`;
    try {
      await axios.post(
        url,
        {},
        { headers: { Authorization: `Token ${token}` } }
      );
      setToken(null);
      setUser(null);
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
      toast({
        title: 'Logout Successful',
        description: 'You have successfully logged out',
        duration: 2000,
        variant: 'success',
      });

      router.push('/');
    } catch (error) {
      console.log(error);
      toast({
        title: 'Error',
        description: 'Logout Failed',
        duration: 2000,
        variant: 'destructive',
      });
    }
  };

  const getTodos = async (): Promise<void> => {
    try {
      const response = await axios.get(`${config.BASE_URL}/todo/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      console.log(response.data);
      setTodos(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getTodo = async (todoId: string): Promise<void> => {
    try {
      const response = await axios.get(`${config.BASE_URL}/todo/${todoId}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      console.log(response.data);
      setCurrentTodo(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addTodo = async (title: string): Promise<void> => {
    if (!token) {
      toast({
        description: 'Please login to add todos',
        title: 'Error',
        duration: 2000,
        variant: 'destructive',
      });
      return;
    }

    try {
      const response = await axios.post(
        `${config.BASE_URL}/todo/`,
        { title },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      console.log(response.data);
      getTodos();
      toast({
        description: 'Todo added successfully',
        title: 'Success',
        duration: 2000,
        variant: 'default',
      });
      router.push('/todos');
    } catch (error) {
      console.log(error);
    }
  };const deleteTodo = async (todoId: string): Promise<void> => {
    if (!token) {
      toast({
        description: 'Please login to delete todos',
        title: 'Error',
        duration: 2000,
        variant: 'destructive',
      });
      return;
    }

    try {
      const response = await axios.delete(
        `${config.BASE_URL}/todo/${todoId}/`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      console.log(response.data);
      getTodos();
      toast({
        description: 'Todo deleted successfully',
        title: 'Success',
        duration: 2000,
        variant: 'default',
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateTodo = async (todoId: string, title: string): Promise<void> => {
    if (!token) {
      toast({
        description: 'Please login to update todos',
        title: 'Error',
        duration: 2000,
        variant: 'destructive',
      });
      return;
    }

    try {
      const response = await axios.patch(
        `${config.BASE_URL}/todo/${todoId}/`,
        { title },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      console.log(response.data);
      router.push('/todos');
      toast({
        description: 'Todo updated successfully',
        title: 'Success',
        duration: 2000,
        variant: 'default',
      });
    } catch (error) {
      console.log(error);
    }
  };

  const value = {
    login,
    user,
    todos,
    currentTodo,
    logout,
    token,
    getTodos,
    getTodo,
    addTodo,
    updateTodo,
    deleteTodo,
  };
 
  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTask = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};
/* we wrap the app with  provider  in rootlayout ,here no app page*/