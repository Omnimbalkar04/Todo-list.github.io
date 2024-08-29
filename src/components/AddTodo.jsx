import { useContext } from "react";
import { useRef } from "react";
import { MdAddComment } from "react-icons/md";
import { TodoItemsContext } from "../store/todo-items-store";

// eslint-disable-next-line react/prop-types
function AddTodo() {
  const {addNewItem} = useContext(TodoItemsContext);
  const todoNameElement = useRef();
  const dueDateElement = useRef();


  const handleAddButtonClicked = async (event) => {
    event.preventDefault();
    const todoName = todoNameElement.current.value;
    const dueDate = dueDateElement.current.value;
   
    
    try{

      await addNewItem(todoName, dueDate);

      todoNameElement.current.value = '';
      dueDateElement.current.value = '';
    } catch (error) {
      console.error("Failed to add todo item:", error);
    }
   
  }

  return (

    <div className="container text-center">

      <form className="row kg-row" onSubmit={handleAddButtonClicked}>
        <div className="col-6">
          <input type="text" className="kg-todo-text" ref={todoNameElement} placeholder="Enter Todo Here" />
        </div>
        <div className="col-4"> <input type="date" className="kg-todo-date"  ref={dueDateElement} /></div>
        <div className="col-2"><button type="submit" className="btn btn-success kg-button"
        
        ><MdAddComment /> </button></div>
      </form>
    </div>
  );
}

export default AddTodo;