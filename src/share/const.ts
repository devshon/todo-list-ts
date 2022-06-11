export interface Todo {
  id: number;
  order: number;
  description: string;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  startTime?: Date;
  endTime?: Date;
}

export const initialTodo: Todo = {
  id: 0,
  order: 0,
  description: "",
  isCompleted: false,
  updatedAt: new Date(),
  createdAt: new Date(),
  startTime: new Date(),
  endTime: new Date(),
};
