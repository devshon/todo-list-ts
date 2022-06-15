import { useState } from "react";
import { useSWRConfig } from "swr";
import { postTodo } from "../apis/todo";

import ReactQuill from "react-quill";

import styled from "styled-components";
import "react-quill/dist/quill.snow.css";

const Editor = () => {
  const { mutate } = useSWRConfig();

  const [useHtml, setUseHtml] = useState("");
  function onChange(html: string, length: number) {
    if (length < 100) {
      setUseHtml(html);
    }
  }

  function onKeyDown(isShift: boolean, keyCode: number) {
    if (!isShift && keyCode === 13) {
      setUseHtml("");
      onCreate();
    }
  }

  function onCreate() {
    postTodo(useHtml).then(() => mutate("/todo"));
  }

  return (
    <Main>
      <div className="editor-wrapper">
        <ReactQuill
          className="editor"
          style={{ height: "100px", width: "300px" }}
          theme="snow"
          value={useHtml}
          modules={{ toolbar: false }}
          onKeyDown={(e) => onKeyDown(e.shiftKey, e.keyCode)}
          onChange={(content, delta, source, editor) =>
            onChange(editor.getHTML(), editor.getLength())
          }
        />
        <div className="btn-wrapper">
          <button>등록</button>
        </div>
      </div>
    </Main>
  );
};

const Main = styled.section`
  .editor-wrapper {
    display: flex;
    .btn-wrapper {
      flex: 1;
      button {
        width: 100%;
        height: 100%;
        border: 0;
        cursor: pointer;
      }
    }
  }
`;
export default Editor;
