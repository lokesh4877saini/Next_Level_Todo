"use client"
import { createContext, useState, useContext, useEffect } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast, Toaster } from 'react-hot-toast';
export default function ToasterClient() {
    return <Toaster />
}
export const context = createContext();
export const Provider = ({ children }) => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        fetch("/api/me")
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setUser(data.user);
                    setIsLogin(true);
                } else {
                    if (!data.success && typeof window !== 'undefined') {
                        setIsLogin(false);
                        router.push('/login');
                    }
                }
            });
    }, []);

    return (
        <context.Provider value={{ user, setUser, isLogin, setIsLogin }}>
            {children}
        </context.Provider>
    );
};


export const LogoutBnt = () => {
    const {isLogin, setIsLogin } = useContext(context)
    const handleLoggedOut = async () => {
        setIsLogin(false);
        try {
            const response = await fetch('/api/auth/logout', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include'
            })
            const { success, message } = await response.json();
            if (success) {
                toast.success(message);
            } else {
                toast.error(error.message || "Something went wrong");
            }
        } catch (error) {
            toast.error(error.message || "Something went wrong");
        }
    }
    return (
        isLogin ?
            (<button className="button" onClick={handleLoggedOut}>
                Logout
            </button>)
            : (
                <Link href={"/login"}>login</Link>
            )
    )
}

export const TodoCheckAndDeleteBtn = ({ isCompleted, id }) => {
    const router = useRouter();
    const handleDelete = async (id) => {
        const res = await fetch(`/api/task/${id}`, {
            method: "DELETE",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await res.json();
        if (data.success) {
            toast.success(data.message);
            router.refresh();
        } else {
            toast.error(data.message || "Something went wrong");
            router.push('/login')
        }
    }
    const [completed, setCompleted] = useState(isCompleted);
    const handleUpdate = async (id) => {
        setCompleted(!completed); // local UI update
        const res = await fetch(`/api/task/${id}`, {
            method: "PUT",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await res.json();
        if (!data.success) {
            setCompleted(isCompleted);
            toast.error(data.message);
            router.push('/login');
        } else {
            toast.success(data.message);
        }
    }
    return (
        <div>
            <input
                type="checkbox"
                defaultChecked={isCompleted}
                onClick={() => handleUpdate(id)}
            />
            <button type="button" onClick={() => handleDelete(id)}>Delete</button>
        </div>
    )
}
