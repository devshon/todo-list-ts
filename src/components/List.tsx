import React, { FC, useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import { fetcher } from "../apis/fetcher";
import { putTodoByDrop } from "../apis/todo";
import { initialTodo, Todo } from "../share/const";

import styled from "styled-components";

const List: FC = () => {
  const { data, error } = useSWR("/todo", fetcher);
  const { mutate } = useSWRConfig();
  const [useItem, setUseItem] = useState(initialTodo);

  function dragStart(item: Todo) {
    setUseItem(item);
  }

  function dragOver(e: any) {
    e.preventDefault(useItem);
  }

  function dragEnter(e: any) {
    if (e.target.className === "drop") {
      e.target.className = "drop active";
    }
    if (e.target.className === "drop-bottom") {
      e.target.className = "drop-bottom active";
    }
  }

  function dragLeave(e: any) {
    if (e.target.className === "drop active") {
      e.target.className = "drop";
    }
    if (e.target.className === "drop-bottom active") {
      e.target.className = "drop-bottom";
    }
  }

  function drop(e: any, dropItem: Todo) {
    if (e.target.className === "drop active") {
      e.target.className = "drop";
      onUpdate(e.target.className, dropItem);
    }
    if (e.target.className === "drop-bottom active") {
      e.target.className = "drop-bottom";
      onUpdate(e.target.className, dropItem);
    }
  }

  function onUpdate(type: string, dropItem: Todo) {
    const item = useItem;

    if (item.order === dropItem.order || item.order === dropItem.order + 1) {
      return;
    }
    if (item.order < dropItem.order) {
      item.order = dropItem.order;
      dropItem.order = item.order;
    }
    if (item.order > dropItem.order) {
      if (type === "drop-bottom") {
        item.order = dropItem.order;
        dropItem.order = item.order;
      } else {
        item.order = dropItem.order + 1;
        dropItem.order = item.order - 1;
      }
    }
    putTodoByDrop(item);
    putTodoByDrop(dropItem).then(() => mutate("/todo"));
  }

  return (
    <Main>
      {data.todos.map((item: Todo, index: string) => {
        console.log(item);
        return (
          <div
            key={item.id}
            id={String(item.id)}
            className="item-wrapper"
            onDragStart={() => dragStart(item)}
            onDragOver={dragOver}
            onDragEnter={dragEnter}
            onDragLeave={dragLeave}
            onDrop={(e) => drop(e, item)}
            draggable="true"
          >
            <div className="drop" />
            <div className="item" dangerouslySetInnerHTML={{ __html: item.description }} />
            {index + 1 === data.todos.length && <div className="drop-bottom" />}
          </div>
        );
      })}
    </Main>
  );
};

const Main = styled.div`
  display: flex;
  flex-direction: column;
  .item-wrapper {
    height: 100px;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    .drop,
    .drop-bottom {
      width: 100%;
      height: 10px;
    }
    .item {
      flex: 1;
      background-color: #dddd;
    }
    .active {
      background-color: red;
    }
  }
`;

export default List;
