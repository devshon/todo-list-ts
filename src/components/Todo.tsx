import { FC, Suspense } from "react";
import styled from "styled-components";
import Editor from "./Editor";
import List from "./List";

const Todo: FC = () => {
  return (
    <Suspense fallback={<h1>loading...</h1>}>
      <Main>
        <section>
          <Editor />
        </section>
        <section>
          <List />
        </section>
      </Main>
    </Suspense>
  );
};

const Main = styled.main`
  display: flex;
  section {
    flex: 1;
  }
`;

export default Todo;
