import { TodoCheckAndDeleteBtn } from "./Clients"
export const TodoItem = async ({ title, description, isCompleted, id }) => {
    return (
        <div className="container">
            <div className="todoDetails">
                <p> {title}</p>
                <p>{description}</p>
            </div>
            <div className="totoEvents">
                <TodoCheckAndDeleteBtn isCompleted={isCompleted} id={id} />
            </div>
        </div>
    )
}