import React, { useState } from "react";
import { useSWRConfig } from "swr";
import { putTodo } from "../apis/todo";
import { initialTodo, Todo } from "../share/const";

import Item from "./Item";

import styled from "styled-components";

const List = () => {
  const { mutate } = useSWRConfig();
  const [useItem, setUseItem] = useState(initialTodo);
  const [activeId, setActiveId] = useState(0);
  const [activeSection, setActiveSection] = useState(0);

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
      putTodo({ ...useItem, isCompleted: !useItem.isCompleted }).then(() => {
        mutate("/todo/progress");
        mutate("/todo/completed");
      });
    } else {
      putTodo({ ...useItem, order: item.order }).then(() => {
        putTodo({ ...item, order: useItem.order }).then(() => {
          mutate("/todo/progress");
          mutate("/todo/completed");
        });
      });
    }
  }

  return (
    <Section>
      <div className={`progress-wrapper ${activeSection === 1 ? "active-section" : ""}`}>
        <h1>Progress</h1>
        <Item
          type="progress"
          activeId={activeId}
          dragStart={dragStart}
          dragOver={dragOver}
          dragEnter={dragEnter}
          dragEnd={dragEnd}
          drop={drop}
        />
      </div>
      <div className={`completed-wrapper ${activeSection === 2 ? "active-section" : ""}`}>
        <h1>Completed</h1>
        <Item
          type="completed"
          activeId={activeId}
          dragStart={dragStart}
          dragOver={dragOver}
          dragEnter={dragEnter}
          dragEnd={dragEnd}
          drop={drop}
        />
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
