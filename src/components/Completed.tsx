import { useState } from "react";
import styled from "styled-components";
import { initialTodo, Todo } from "../share/const";

const Completed = ({ data, onUpdate }: { data: Todo[]; onUpdate: any }) => {
  const [useItem, setUseItem] = useState(initialTodo);
  const [activeId, setActiveId] = useState(0);

  function dragStart(item: Todo) {
    setUseItem(item);
  }

  function dragOver(e: any) {
    e.preventDefault(useItem);
  }

  function dragEnter(item: Todo) {
    setActiveId(item.id);
  }

  function dragEnd() {
    setActiveId(0);
  }

  function drop(dropItem: Todo) {
    setActiveId(0);
    onUpdate(useItem, dropItem);
  }

  return (
    <Main>
      completed
      {data.map((item: Todo) => {
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
    </Main>
  );
};

const Main = styled.section`
  border: 1px solid black;
`;

export default Completed;
