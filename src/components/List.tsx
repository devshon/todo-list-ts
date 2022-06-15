import React, { useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import { fetcher } from "../apis/fetcher";
import { putTodo } from "../apis/todo";
import { initialTodo, Todo } from "../share/const";

import styled from "styled-components";
import Item from "./Item";

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

  function dragOver(e: React.DragEvent<HTMLDivElement>) {
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
    <Section>
      <div className={`progress-wrapper ${activeSection === 1 ? "active-section" : ""}`}>
        <h1>Progress</h1>
        {progressData.length > 0 ? (
          <Item
            data={progressData}
            activeId={activeId}
            dragStart={dragStart}
            dragOver={dragOver}
            dragEnter={dragEnter}
            dragEnd={dragEnd}
            drop={drop}
          />
        ) : (
          <div className="item-wrapper">
            <div
              className={`item`}
              onDragStart={() => dragStart(initialTodo)}
              onDragOver={(e) => dragOver(e)}
              onDragEnd={() => dragEnd()}
              onDrop={() => drop({ ...initialTodo, isCompleted: false })}
              onDragEnter={() => dragEnter({ ...initialTodo, isCompleted: false })}
              dangerouslySetInnerHTML={{ __html: "empty todo" }}
            />
          </div>
        )}
      </div>
      <div className={`completed-wrapper ${activeSection === 2 ? "active-section" : ""}`}>
        <h1>Completed</h1>
        {completedData.length > 0 ? (
          <Item
            data={completedData}
            activeId={activeId}
            dragStart={dragStart}
            dragOver={dragOver}
            dragEnter={dragEnter}
            dragEnd={dragEnd}
            drop={drop}
          />
        ) : (
          <div className="item-wrapper">
            <div
              className={`item`}
              onDragStart={() => dragStart(initialTodo)}
              onDragOver={(e) => dragOver(e)}
              onDragEnd={() => dragEnd()}
              onDrop={() => drop({ ...initialTodo, isCompleted: true })}
              onDragEnter={() => dragEnter({ ...initialTodo, isCompleted: true })}
              dangerouslySetInnerHTML={{ __html: "empty todo" }}
            />
          </div>
        )}
      </div>
    </Section>
  );
};

const Section = styled.section`
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
