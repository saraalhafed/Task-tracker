'use client';

import { useTask } from '@/context/TaskContext';
import Link from 'next/link';

export default function Navbar() {
  const { user, logout } = useTask();
  return (
    <nav className="flex justify-between items-center px-8 py-3 bg-slate-800">
      <Link href="/todos" className="text-white font-bold">
        Task Manager App
      </Link>
      <div suppressHydrationWarning> {/* this at */}
        {/* if we in the clint side rendering we render this btn addtask(if there is user:just in localstorage) */}
        {typeof window !== 'undefined' && user && ( //we check if we in the server(no localstorage to check the user) side or clint side rendering
          <div className="flex gap-4 items-center">
            <span className="text-white font-bold">{user.email}</span>
            <Link href="/addTask" className="bg-white p-2">
              Add Task
            </Link>
            <button
              onClick={() => {
                logout();
              }}
              className="bg-white p-2"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
/*this component clint and render in the server and in the clintside , we have proplem her  btn to check if ther is user or not thats happend just in the browser (user stord in localstorage),not rendering the same thing server and clint ,so we have hydration problem */