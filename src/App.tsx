import { SWRConfig } from "swr";

import Main from "./components/Main";

import { Reset } from "styled-reset";
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
        <Main />
      </SWRConfig>
    </>
  );
};

export default App;
