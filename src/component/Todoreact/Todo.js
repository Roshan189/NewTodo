import React, { useState, useEffect } from "react";
import "../style.css";

//get localstorage data back
const getLocalData = () => {
  const lists = localStorage.getItem("mytodolist");

  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};

const Todo = () => {
  const [inputdata, SetInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [isEditItem, setIsEditItem] = useState("");
  const [toggleButton, setaToggleButton] = useState(false);

  //adding the items
  const addItem = () => {
    if (!inputdata) {
      alert("please fill the data");
    } else if (inputdata && toggleButton) {
      setItems(
        items.map((currElem) => {
          if (currElem.id === isEditItem) {
            return { ...currElem, name: inputdata };
          }
          return currElem;
        })
      );
      SetInputData("");
      setIsEditItem("");
      setaToggleButton(false);
    } else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputdata,
      };
      setItems([...items, myNewInputData]);
      SetInputData("");
    }
  };

  // edit the items
  const editItem = (index) => {
    const item_todo_edited = items.find((currElem) => {
      return currElem.id === index;
    });
    SetInputData(item_todo_edited.name);
    setIsEditItem(index);
    setaToggleButton(true);
  };

  // how to delete section
  const deleteItem = (index) => {
    const updatedItem = items.filter((currElem) => {
      return currElem.id !== index;
    });
    setItems(updatedItem);
  };

  //remove all elements
  const removeAll = () => {
    setItems([]);
  };

  // adding localstorage
  useEffect(() => {
    localStorage.setItem("mytodolist", JSON.stringify(items));
  }, [items]);
  return (
    <div>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./Images/images.png" alt="Todolist" />
            <figcaption>Add Your List Here</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="✍Add Item"
              className="form-control"
              value={inputdata}
              onChange={(event) => {
                SetInputData(event.target.value);
              }}
            />
            {toggleButton ? (
              <i className="far fa-edit add-btn" onClick={addItem}></i>
            ) : (
              <i className="far fa-check-circle add-btn" onClick={addItem}></i>
            )}
          </div>

          {/* shows the items */}

          <div className="showItems">
            {items.map((currElem) => {
              return (
                <div className="eachItem" key={currElem.id}>
                  <h3>{currElem.name}</h3>
                  <div className="todo-btn">
                    <i
                      className="far fa-edit add-btn"
                      onClick={() => editItem(currElem.id)}
                    ></i>
                    <i
                      className="far fa-trash-alt add-btn"
                      onClick={() => deleteItem(currElem.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>

          {/* remove all button */}

          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeAll}
            >
              <span> Check List</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
