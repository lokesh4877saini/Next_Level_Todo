import AddToDoForm from "./register/AddToDo";
import { TodoItem } from './components/Servers';
import { cookies } from 'next/headers'
import './TodoPage.scss';
const fetchTodo = async () => {
  const cookieStore = cookies(); // gets server-side cookies
  const token = cookieStore.get("token")?.value;
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/mytask`, {
    headers: {
      Cookie: `token=${token}`,
    },
    cache: "no-store", // optional to prevent caching
  });

  const data = await res.json();
  if (!data.success) return [];
  return data;
};
const page = async () => {
  let tasksArray = [];
  const data = await fetchTodo();
  if(data.success){
    tasksArray = data.tasks;
  }
  return (
    <div>
      <div className="TodoFormContainer">
        <AddToDoForm />
      </div>
      <div className="TodoContainer">
        {tasksArray.map((item)=>(
          <TodoItem key={item._id} title={item.title} description={item.description} isCompleted={item.isCompleted} id={item._id}/>
        ))}
      </div>
    </div>
  )
}

export default page;