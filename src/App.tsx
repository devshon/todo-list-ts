import { Reset } from "styled-reset";
import { SWRConfig } from "swr";

import Todo from "./components/Todo";

import GlobalStyle from "./styles/GlobalStyle";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Reset />
      <SWRConfig
        value={{
          suspense: true,
        }}
      >
        <Todo />
      </SWRConfig>
    </>
  );
};

export default App;
