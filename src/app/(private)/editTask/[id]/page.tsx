import EditTodoForm from '@/components/EditForm';


export default function page({params}) {
  const id = params.id
  return (
    <div className="p-6">
      <div className="mb-6 text-3xl font-bold text-center">
        <h1>Edit Task</h1>
      </div>
      <EditTodoForm id={id} />
    </div>
  );
}
