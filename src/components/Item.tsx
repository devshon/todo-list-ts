import { Todo } from "../share/const";

const Item = ({
  data,
  activeId,
  dragStart,
  dragOver,
  dragEnter,
  dragEnd,
  drop,
}: {
  data: Todo[];
  activeId: number;
  dragStart: (item: Todo) => void;
  dragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  dragEnter: (item: Todo) => void;
  dragEnd: () => void;
  drop: (item: Todo) => void;
}) => {
  return (
    <>
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
    </>
  );
};

export default Item;
