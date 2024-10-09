"use client"

import axios from 'axios';
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
    login: (email: string, password: string) => Promise<void>;//ts async return nothing
    logout: () => Promise<void>;
    getTodos: () => Promise<void>;
    getTodo: (id: string) => Promise<void>;
    addTodo: (title: string) => Promise<void>;
    updateTodo: (id: string, title: string) => Promise<void>;
    deleteTodo: (id: string) => Promise<void>;
    token: string | null;
}
const TaskContext = createContext<ITaskContext | undefined>(undefined);
export const TaskProvider = ({ children }: ChildrenProps) => {
    const router = useRouter();
    const { toast } = useToast();
const [todos, setTodos] = useState<ITodo[] | null>(null);
const [currentTodo, setCurrentTodo] = useState<ITodo | null>(null);
const [user, setUser] = useState<IUser | null>(() => {
    
   // const user = localStorage.getItem('user'); //here just in browser not in server ,solve that with checkeing if ther is window obj
    // if window is undefined this means you are on the server
    // if window is no undefined this means you are on the client browser
    if (typeof window !== 'undefined') {
        const user = localStorage.getItem('user');
        if (user) {
          return JSON.parse(user);
        }
      }
      return null;
});//check the local if ther is user ,it will be render in both i wanmt to check if i am in local or in server 
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
        if (typeof window !== 'undefined') {
          localStorage.setItem('token', data.key);
          localStorage.setItem('user', JSON.stringify(data.user));
        }
        //in react we used navigate but her userouter
        router.push('/todos');
    } catch (error) {
      console.log(error);
    }
  };

const value = {};
export const TaskProvider = ({ children }: ChildrenProps) => {
  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTask = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};
