import { useState } from "react";

interface TodoItem {
  id: number;
  todo: string;
  completed: boolean;
}


const ToDo = () => {

// Help managing state, useState for input, and UseState for list

// useState to help with our input state

  const [input, setInput] = useState("");

  // useState to help track our list

  const [list, setList] = useState<TodoItem[]>([]);

  const [editId, setEditId] = useState<number | null>(null);

  const [editToDo, setEditToDo] = useState("");

// create a function help us add to our todo list

  const addToDo = (newItem: string) => {
 
    const newTodo: TodoItem = {
      id: Math.random(), 
      todo: newItem,
      completed: false,
    };

    setList([...list, newTodo]);
    setInput("");
 
  };

  const handleUpdate = (itemId: number, updateText: string) => {
    setList((List) => List.map((item) => item.id === itemId ? { ...item, todo: updateText } : item));
  };

  const handleComplete = (itemId: number) => {
    setList((List) =>List.map((item) => item.id === itemId ? { ...item, completed: !item.completed } : item));
  };

  const handleDelete = (itemId: number) => {
    setList((List) => List.filter((item) => item.id !== itemId));
  };

  const beginEdit = (itemId: number, Text: string) => {
    setEditId(itemId); 
    setEditToDo(Text); 
  };

  const stopEdit = () => {
    setEditId(null);
    setEditToDo("");
  };

    // create a function help us add to our todo list

  return (
    <>
      <div className="myContainer">
          <h1>To Do List</h1>
          {editId === null ? (
            <>
              <input type="text"value={input} onChange={(e) => setInput(e.target.value)}/>
              <button className="Button" onClick={() => addToDo(input)}>Add</button>
            </>) : 
            (<>
              <input type="text" value={editToDo}onChange={(e) => setEditToDo(e.target.value)}/>
              <button className="Button" onClick={() => handleUpdate(editId, editToDo)}>Update</button>
              <button className="Button" onClick={stopEdit}>Cancel</button>
            </>
          )}
       
            {list.map((item) => (
              <div key={item.id} className={item.completed ? " not completed" : ""}>
                <div onClick={() => handleComplete(item.id)}>
                  <p className={item.completed ? "completed" : ""}>
                    {item.todo}
                  </p>
                </div>
                {item.completed ? "completed" : " not completed"}
                <>
                  <button onClick={() => beginEdit(item.id, item.todo)}>Edit</button>
                </>
                <div>
                  <button onClick={() => handleDelete(item.id)}>x</button>
                </div>
              </div>
            ))}


        {/* render our list, ul, li map list update our useState */}

      </div>

      {/* Title, input field, button, somewhere to display our todo list */}

    </>
  );
};

export default ToDo;