

'use client';//1-Zod schema. 
//second
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';//1-Zod schema. 

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
//third
import { Input } from '@/components/ui/input';
import { useEffect } from 'react';
import { useTask } from '@/context/TaskContext';

//1-firs Zod schema. out side the component
const formSchema = z.object({
  title: z.string().min(3, 'Too short!'),
});

interface ITodo {
  id: string;
}

export default function EditTodoForm({ id }: ITodo) { //we add id to get the value of this task
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { //values obj :values.title
      title: '', // intialy we have nothing we waite until the data com
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);

    updateTodo(id, values.title);
  }
//we add this own code:
  const { updateTodo, getTodo, currentTodo } =  useTask();

  useEffect(() => {
    getTodo(id); /* get value from server than store it in currenttodo to update this task */
  }, [id]);

  /* When edit icon is clicked, this means that you want to update it. Before we do the update we need to get latest data from the server. Once we receive the data we need to store it. We store in the currentTodo state */
  useEffect(() => {//if just to check if we click the edit icon ,than store this task inside current todo 
                  //currentTodo  It is for storing the todo that we want to update
    if (currentTodo) { // ,check correct one and idite ,if 2 users update sametaske would be seen the latest update
           // this will update the form input with the current todo title
      form.reset({ title: currentTodo.title }); // Reset the form values to the current todo. update the value in the form 
    }
  }, [currentTodo]);//each chang for the clicked iediticon for this task  will send link this task from tasklist  (throw link)
//third
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title" /* we add this value   */
            render={({ field }) => ( //here we check what inside the field and we get from this field the value what erver ther
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Title" {...field} />{/*get the title:content of field whaterver ,i get filled input */}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Update Task</Button>
        </form>
      </Form>
    </div>
  );
}
