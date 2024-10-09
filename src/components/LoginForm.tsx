'use client';
import React from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTask } from '@/context/TaskContext';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  email: z.string().email('Invalid email'),//we add what we need for input ,login we need 2 input email and password
  password: z.string().min(1, 'Password is required'),
});

export default function LoginForm() {
  const { login } = useTask();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { //values obj for initialvalues like state for our input in login form
        email: 'info@clarusway.com', //we dont creat register page ,her we have an acoont so we need just login dirct with this data
        password: 'qazzxc123', //cridantial
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    login(values.email, values.password);//thhen i call this func
  }
  return (
    <div className="felx items-center justify-center h-[50vh]">
      <Form {...form}> {/* //come from  */}
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (//we get the value what inside the field
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="enter email" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="enter password"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}

/* shadcn for form,react-hook,component-form-installition-pnpm and the same for input 
i follow the steps in document,i need to install this
pnpm dlx shadcn@latest add form
pnpm dlx shadcn@latest add input*/