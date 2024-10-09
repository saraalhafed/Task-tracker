'use client';
import { useTask } from '@/context/TaskContext';
import { HiOutlineTrash } from 'react-icons/hi';

export default function DeleteBtn({ id }) {//for delete task i need id
  const { deleteTodo } = useTask(); //get the func from the context

  return (
    <button className="text-red-400" onClick={() => deleteTodo(id)}>{/* call this func inside the btn */}
      <HiOutlineTrash size={24} />
    </button>
  );
}