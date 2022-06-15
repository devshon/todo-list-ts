import { Suspense } from "react";

import Editor from "./Editor";
import List from "./List";

import styled from "styled-components";

const Main = () => {
  return (
    <Suspense fallback={<h1>loading...</h1>}>
      <_Main>
        <Editor />
        <List />
      </_Main>
    </Suspense>
  );
};

const _Main = styled.main`
  display: flex;
  flex-direction: column;
  section {
    flex: 1;
  }
`;

export default Main;
