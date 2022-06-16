import useSWR from "swr";
import { fetcher } from "../apis/fetcher";
import { initialTodo, Todo } from "../share/const";

const Item = ({
  type,
  activeId,
  dragStart,
  dragOver,
  dragEnter,
  dragEnd,
  drop,
}: {
  type: string;
  activeId: number;
  dragStart: (item: Todo) => void;
  dragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  dragEnter: (item: Todo) => void;
  dragEnd: () => void;
  drop: (item: Todo) => void;
}) => {
  const { data } = useSWR(`/todo/${type}`, fetcher);

  return (
    <>
      {data.todos.length > 0 ? (
        data.todos.map((item: Todo) => {
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
        })
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
    </>
  );
};

export default Item;
