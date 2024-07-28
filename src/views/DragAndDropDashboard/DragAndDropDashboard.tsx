import React from 'react';
import { useState } from "react";
import "./App.css";
import GridContainer from "../../components/Grid/GridContainer";
import { Button } from "@mui/material";
import Dropdown from "../../components/Dropdown/Dropdown";

const DragAndDropDashboard = () => {
    type TicketItems = {
        id: number;
        description: string;
        status: string;
        createdAt: Date;
      };
      const [todoItems, setTodoItems] = useState<TicketItems[]>([
        { id: 1, description: "Task 1", status: "TODO", createdAt: new Date() },
        { id: 2, description: "Task 2", status: "TODO", createdAt: new Date() },
        { id: 3, description: "Task 3", status: "TODO", createdAt: new Date() },
        { id: 4, description: "Task 4", status: "TODO", createdAt: new Date() },
      ]);
      const [inProgressItems, setInProgressItems] = useState<TicketItems[]>([
        {
          id: 5,
          description: "Task 5",
          status: "INPROGRESS",
          createdAt: new Date(),
        },
        {
          id: 6,
          description: "Task 6",
          status: "INPROGRESS",
          createdAt: new Date(),
        },
        {
          id: 7,
          description: "Task 7",
          status: "INPROGRESS",
          createdAt: new Date(),
        },
        {
          id: 8,
          description: "Task 8",
          status: "INPROGRESS",
          createdAt: new Date(),
        },
      ]);
      const [draggedItem, setDraggedItem] = useState<TicketItems>({
        id: Math.ceil(Math.random() * 10),
        description: "",
        status: "",
        createdAt: new Date(),
      });
    
      const startDragging = (eachTodo: TicketItems) => {
        console.log(eachTodo, "eachTodo");
        setDraggedItem(eachTodo);
      };
    
      const dropDraggedItem = (event: any) => {
        switch (draggedItem.status) {
          case "TODO":
            if (
              event.target.className.split("_")[0].toLowerCase() === "inprogress"
            ) {
              let filteredTodoItems = todoItems.filter(
                (item: TicketItems) => item.id !== draggedItem.id
              );
              let clonedInProgressData = JSON.parse(
                JSON.stringify(inProgressItems)
              );
              let clonedDraggedData = JSON.parse(JSON.stringify(draggedItem));
              clonedDraggedData.status = "INPROGRESS";
              clonedInProgressData.push(clonedDraggedData);
              setInProgressItems(clonedInProgressData);
              setTodoItems(filteredTodoItems);
            }
            break;
          case "INPROGRESS":
            if (event.target.className.split("_")[0].toLowerCase() === "todo") {
              let filteredInProgressItems = inProgressItems.filter(
                (item: TicketItems) => item.id !== draggedItem.id
              );
              let clonedTodoItems = JSON.parse(JSON.stringify(todoItems));
              let clonedDraggedData = JSON.parse(JSON.stringify(draggedItem));
              clonedDraggedData.status = "TODO";
              clonedTodoItems.push(clonedDraggedData);
              setTodoItems(clonedTodoItems);
              setInProgressItems(filteredInProgressItems);
            }
        }
      };
    
      const handleDragOver = (ev: any) => {
        ev.stopPropagation();
        ev.preventDefault();
      };
    
      const addTodoItem = () => {};
    
      return (
        <>
          <GridContainer classNames={"App_Grid_Wrapper"}>
            <div
              onDragOver={(ev) => handleDragOver(ev)}
              onDrop={(ev) => dropDraggedItem(ev)}
              className="Todo_container_wrapper"
            >
              <h1>TODO</h1>
              {todoItems.map((eachTodo: TicketItems) => {
                return (
                  <div
                    className="Todo_container"
                    draggable
                    onDragStart={() => startDragging(eachTodo)}
                    onDrop={(ev) => dropDraggedItem(ev)}
                    key={eachTodo.id}
                  >
                    <span className="Todo_list" key={eachTodo.id}>
                      {eachTodo.description}
                    </span>
                    <Dropdown 
                    dropdownList={[{id:"1", name : "list1", checked : true},{id:"2", name : "list2", checked: false},{id:"3", name : "list3", checked : false},{id:"4", name : "list4", checked : true}]}
                    multiselect={false}
                    />
                  </div>
                );
              })}
              <div>
                <Button onClick={addTodoItem} color="secondary">
                  Add Column
                </Button>
              </div>
            </div>
            <div
              onDragOver={(ev) => handleDragOver(ev)}
              onDrop={(ev) => dropDraggedItem(ev)}
              className="InProgress_container_wrapper"
            >
              <h1>IN PROGRESS</h1>
              {inProgressItems.map((eachTodo: TicketItems) => {
                return (
                  <div
                    className="InProgress_container"
                    draggable
                    onDragStart={() => startDragging(eachTodo)}
                    onDrop={(ev) => dropDraggedItem(ev)}
                    key={eachTodo.id}
                  >
                    <span className="InProgress_container" key={eachTodo.id}>
                      {eachTodo.description}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="Grid_elements">
              <h1>DONE</h1>
            </div>
          </GridContainer>
        </>
      );
}

export default DragAndDropDashboard