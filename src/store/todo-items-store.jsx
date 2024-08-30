
/* eslint-disable react/prop-types */
import { createContext, useEffect } from "react";
import { useReducer } from "react";

export const TodoItemsContext = createContext({
  todoItems: [],
  addNewItem: () => {},
  deleteItem: () => {},
  updateItem: () => {}, 
  fetchItems: () => {},
});

const todoItemsReducer = (currTodoItems, action) => {
  switch(action.type) {
    case "SET_ITEMS":
      return action.payload.items;
    case "NEW_ITEM":
      return [...currTodoItems, action.payload.item];  
    case "DELETE_ITEM": 
      return currTodoItems.filter(item => item._id !== action.payload.id );
    case "UPDATE_ITEM":
      return currTodoItems.map((item) => 
        item._id === action.payload.itemId 
        ? { ...item, name: action.payload.itemName, dueDate: action.payload.itemDueDate}
        : item
      );
      default:
        return currTodoItems;
  }
};


const TodoItemsContextProvider = ({children}) => {
  const [todoItems, dispatchTodoItems] = useReducer(todoItemsReducer, []);



  useEffect(() => {
    fetchItems();
  },[]);

  
  const fetchItems = () => {
    fetch("https://todo-list-backend-5sx9.onrender.com/api/todos")
    .then(response => response.json())
    .then(data => dispatchTodoItems({ type: "SET_ITEMS" , payload: { items: data}}))
    .catch(error => console.error("Error fetching todos:", error));
  };




  const addNewItem = async (itemName, itemDueDate) => {
    try {
   const response = await fetch("https://todo-list-backend-5sx9.onrender.com/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: itemName, dueDate: itemDueDate }),
     });

     if (!response.ok) {
      throw new Error(`Failed to add item: ${response.statusText}`);
    }
    
     const newItem = await response.json();
       dispatchTodoItems({ type: "NEW_ITEM", payload: { item: newItem }, }); } catch (error) {
        console.error("Error adding new todo:", error);
      }


  };

  const deleteItem = async (todoItemId) => {
   
   await fetch(`https://todo-list-backend-5sx9.onrender.com/api/todos/${todoItemId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

      dispatchTodoItems({ type: "DELETE_ITEM", payload: { id: todoItemId} });
  
  };

   // Update an item on the server and update the context
   const updateItem = async (todoItemId, itemName, itemDueDate) => {
    try{
      const response = await fetch(`https://todo-list-backend-5sx9.onrender.com/api/todos/${todoItemId}`, {
      
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: itemName, dueDate: itemDueDate }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update item: ${response.statusText}`);
    }

    dispatchTodoItems({
      type: "UPDATE_ITEM",
      payload: {
        itemId: todoItemId,
        itemName,
        itemDueDate,
      },
    });
  } catch (error) {
    console.error("Error updating todo:", error);
  }
  };

  return ( 
  <TodoItemsContext.Provider value={{
    todoItems,
    addNewItem,
    deleteItem,
    updateItem,
    fetchItems,
  }}> {children} </TodoItemsContext.Provider>
  )
}


export default TodoItemsContextProvider;