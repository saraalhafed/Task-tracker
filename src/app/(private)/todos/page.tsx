import TaskList from '@/components/TaskList';
import React from 'react';

export default function page() {
  return (
    <div>
      <div className="m-6 text-3xl font-bold text-center">Todo List</div>
      <TaskList />
    </div>
  );
}
