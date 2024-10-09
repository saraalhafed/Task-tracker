import TodoForm from '@/components/TodoForm';

export default function page() {
  return (
    <div className="p-6">
      <div className="mb-6 text-3xl font-bold text-center">
        <h1>Add Task</h1>
      </div>
      <TodoForm />
    </div>
  );
}
/* add a task shoud be privat rot */