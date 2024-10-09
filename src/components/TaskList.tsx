'use client';
import { useTask } from '@/context/TaskContext';
import React, { useEffect } from 'react';
import { HiPencilAlt } from 'react-icons/hi';
import Link from 'next/link';
import DeleteBtn from './DeleteBtn';
export default function TaskList() {
  const { todos, getTodos } = useTask();

  useEffect(() => {
    getTodos();
  }, []);
  return (
    <>
    {todos && todos.length > 0 ? (
        todos?.map((item) => (
          <div
            className="flex p-4 border border-slate-300 justify-between gap-5 items-center my-1"
            key={item.id}
          >
            <div>
              <h2 className="font-bold text-2xl">{item.title}</h2>
            </div>
            <div className="flex gap-2">
            <DeleteBtn id={item.id} />
              <Link href={`/editTask/${item.id}`}>{/* here i send the task to be edit n the editform */}
                <HiPencilAlt size={24} />
              </Link>
            </div>
          </div>
        ))
      ) : (
        <p>No tasks</p>
      )}
    </>
  );
}
