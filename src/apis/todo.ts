import { SERVER_URL } from "../core/config";
import { Todo } from "../share/const";

export async function postTodo(description: string) {
  return fetch(`${SERVER_URL}/todo`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      description,
    }),
  }).then((res) => res.json());
}

export async function putTodo(todo: Todo) {
  return fetch(`${SERVER_URL}/todo`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      todo,
    }),
  });
}
