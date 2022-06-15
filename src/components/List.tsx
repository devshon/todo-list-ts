import useSWR, { useSWRConfig } from "swr";
import { fetcher } from "../apis/fetcher";
import { putTodo } from "../apis/todo";
import { initialTodo, Todo } from "../share/const";

// import Progress from "./Progress";
// import Completed from "./Completed";

import styled from "styled-components";
import { useState } from "react";

const List = () => {
  const { data } = useSWR<{ todos: Todo[] }>("/todo", fetcher);
  const { mutate } = useSWRConfig();
  const [useItem, setUseItem] = useState(initialTodo);
  const [activeId, setActiveId] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const progressData: Todo[] = [];
  const completedData: Todo[] = [];

  data?.todos.forEach((item) => {
    if (item.isCompleted) {
      completedData.push(item);
    } else {
      progressData.push(item);
    }
  });

  function dragStart(item: Todo) {
    setUseItem(item);
  }

  function dragOver(e: any) {
    e.preventDefault();
  }

  function dragEnter(item: Todo) {
    if (useItem.isCompleted !== item.isCompleted) {
      setActiveId(0);
      if (useItem.isCompleted) {
        setActiveSection(1);
      } else {
        setActiveSection(2);
      }
    } else {
      setActiveSection(0);
      setActiveId(item.id);
    }
  }

  function dragEnd() {
    setActiveId(0);
    setActiveSection(0);
  }

  function drop(item: Todo) {
    setActiveId(0);
    setActiveSection(0);
    onUpdate(item);
  }

  function onUpdate(item: Todo): void {
    if (useItem.isCompleted !== item.isCompleted) {
      putTodo({ ...useItem, isCompleted: !useItem.isCompleted }).then(() => mutate("/todo"));
    } else {
      putTodo({ ...useItem, order: item.order }).then(() => {
        putTodo({ ...item, order: useItem.order }).then(() => mutate("/todo"));
      });
    }
  }

  return (
    <Main>
      <div className={`progress-wrapper ${activeSection === 1 ? "active-section" : ""}`}>
        <h1>Progress</h1>
        {progressData.map((item: Todo) => {
          return (
            <div key={item.id} className="item-wrapper">
              <div
                className={`item ${activeId === item.id ? "active" : ""}`}
                id={String(item.id)}
                onDragStart={() => dragStart(item)}
                onDragOver={(e) => dragOver(e)}
                onDragEnter={() => dragEnter(item)}
                onDragEnd={() => dragEnd()}
                onDrop={() => drop(item)}
                draggable="true"
                dangerouslySetInnerHTML={{
                  __html: item.description,
                }}
              />
            </div>
          );
        })}
      </div>
      <div className={`completed-wrapper ${activeSection === 2 ? "active-section" : ""}`}>
        <h1>Completed</h1>
        {completedData.map((item: Todo) => {
          return (
            <div key={item.id} className="item-wrapper">
              <div
                className={`item ${activeId === item.id ? "active" : ""}`}
                id={String(item.id)}
                onDragStart={() => dragStart(item)}
                onDragOver={(e) => dragOver(e)}
                onDragEnter={() => dragEnter(item)}
                onDragEnd={() => dragEnd()}
                onDrop={() => drop(item)}
                draggable="true"
                dangerouslySetInnerHTML={{
                  __html: item.description,
                }}
              />
            </div>
          );
        })}
      </div>
    </Main>
  );
};

const Main = styled.section`
  display: flex;
  flex-direction: row;
  .progress-wrapper,
  .completed-wrapper {
    flex: 1;
    border: 1px solid black;
    .item-wrapper {
      height: 100px;
      display: flex;
      flex-direction: column;
      :not(:last-child) {
        margin-bottom: 10px;
      }
      .item {
        flex: 1;
        background-color: #dddd;
        cursor: pointer;
      }
      .active {
        background-color: red;
      }
    }
  }
  .active-section {
    background-color: red;
  }
`;

export default List;
