import { useContext, useState } from "react";
import { MdDelete, MdEdit, MdSave } from "react-icons/md";
import { TodoItemsContext } from "../store/todo-items-store";

// eslint-disable-next-line react/prop-types
function TodoItem({ todoName, todoDate, todoId }) {


  const { deleteItem , updateItem } = useContext(TodoItemsContext);
  const [ isEditing , setIsEditing ] = useState(false);
  const [ newName, setNewName ] = useState(todoName || "");
  const [ newDate, setNewDate ] = useState(todoDate || "");

  const handleSave = () => {
    updateItem(todoId , newName, newDate);
    setIsEditing(false);
  }

  const handleDeleteButtonClicked = () => {
    deleteItem(todoId); // Call deleteItem with the todoId
  };
  return (
    <div className="container ">
      <div className="row kg-row">
        { isEditing ? (<>
        <div className="col-6">
          <input 
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          /> 
        </div>
        <div className="col-4">
          <input 
          type="date"
          value={new Date(newDate).toISOString().slice(0, 10)}
          onChange={(e) => setNewDate(e.target.value)}
          />
          </div>
          <div className="col-2">
            <button type="button" className="btn btn-success kg-button" onClick={handleSave}>
              <MdSave />
            </button>
          </div>
        </>
        ) : (<>
        
        <div className="col-6">
          {todoName || ""}
        </div>
        <div className="col-4"> {new Date(todoDate).toLocaleDateString()}</div>
        <div className="col-2">
          <button className="btn btn-warning kg-button" onClick={() => setIsEditing(true)}> <MdEdit /> </button>
          <button type="button" className="btn btn-danger kg-button" onClick={handleDeleteButtonClicked}><MdDelete /></button>
        </div>
        </>
          )}
      </div>
    </div>
  );
}

export default TodoItem;