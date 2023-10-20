import Link from "next/link";
import { prisma } from "./db";
import TodoItem from "@/components/TodoItem";

export default async function Home(){

   function getTodo (){
    return prisma.todo.findMany();
  }

  async function updateTodo(id: string, complete: boolean){
    "use server"
    
    await prisma.todo.update({ where: { id }, data: { complete } })
  }

  const todos = await getTodo();
  return(
    <>
    <header className="flex justify-between items-center mb-4">
      <h1 className="text-2xl">Todos</h1>
      <Link href="/new" className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none">New</Link>
    </header>
    <ul>
    {
      todos.map(data=>(
        <TodoItem key={data.id} {...data} toggleTodo={updateTodo}/>
      ))
    }
    </ul>
    </>
  )
}