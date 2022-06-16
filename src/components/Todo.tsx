import { Suspense } from "react";

import Editor from "./Editor";
import List from "./List";

import styled from "styled-components";

const Todo = () => {
  return (
    <Suspense fallback={<h1>loading...</h1>}>
      <Main>
        <Editor />
        <List />
      </Main>
    </Suspense>
  );
};

const Main = styled.main`
  display: flex;
  flex-direction: column;
  section {
    flex: 1;
  }
`;

export default Todo;
