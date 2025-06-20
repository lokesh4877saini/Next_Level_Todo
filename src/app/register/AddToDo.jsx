"use client"
import React, { useState, useEffect, useContext } from 'react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation'
import { context } from '../components/Clients';
import './AddTodo.scss';

const AddTodo = () => {
  const router = useRouter();
  const { isLogin } = useContext(context);

  const [hasMounted, setHasMounted] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (hasMounted && !isLogin) {
      router.push("/login");
    }
  }, [hasMounted, isLogin, router]);

  if (!hasMounted || !isLogin) return null;
  // ✅ All hooks are called before this line
  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description } = formData;
    try {
      const response = await fetch('/api/newtask', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ title, description })
      })
      const { success, message } = await response.json();

      if (success) {
        toast.success(message);
        router.refresh(); 
      } else {
        toast.error(message || "Something went wrong");
      }
    } catch (error) {
      toast.error(message || "Something went wrong");
    }
    setFormData({
      title: "",
      description: ""
    })
  }
  return (
    <div className="add-todo-container">
      <h2>Add To Do</h2>
      <form className="todo-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Todo Title</label>
          <input type="text" id="title" name='title' value={formData.title} onChange={handleFormData} placeholder="Enter todo title" />
        </div>

        <div className="form-group">
          <label htmlFor="description">Todo Description</label>
          <textarea id="description" name='description' value={formData.description} placeholder="Enter description" rows="4" onChange={handleFormData} />
        </div>

        <button type="submit" className="submit-btn">Create Todo</button>
      </form>
    </div>
  );
};

export default AddTodo;
