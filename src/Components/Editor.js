import React, { useState, useRef } from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";

const Editor = () => {
  const [cmds, setCmds] = useState([]);
  const [data, setData] = useState("");
  const [type, setType] = useState("bold");
  const insertBold = (text, id) => {
    return <b key={id}>{text}</b>;
  };
  const insertItalic = (text, id) => {
    return <i key={id}>{text}</i>;
  };
  const insertMath = (text, id) => {
    return <MathJax key={id} inline>{`$${text}$`}</MathJax>;
  };

  const typeFunctionMapping = {
    bold: insertBold,
    italic: insertItalic,
    math: insertMath,
  };

  const handleClick = () => {
    console.log(cmds);
    setCmds((prev) => [
      ...prev,
      {
        id: cmds.length + 1,
        cmd: insertBold(data, cmds.length + 1),
        func: typeFunctionMapping[type],
        text: data,
      },
    ]);
    setData("");
  };

  const handleTextChange = (updatedText, cmd) => {
    setCmds((prev) =>
      prev.map((item) => {
        if (item.id === cmd.id) {
          item["text"] = updatedText;
        }
        return item;
      })
    );
  };

  return (
    <div>
      <input
        value={data}
        onChange={(e) => {
          setData(e.target.value);
        }}
      ></input>
      <input
        type="radio"
        name="type"
        value="bold"
        onChange={(e) => {
          setType(e.target.value);
          console.log(e.target.value);
        }}
        id="bold"
      ></input>
      <label htmlFor="bold">BOLD</label>
      <input
        type="radio"
        name="type"
        value="italic"
        onChange={(e) => {
          setType(e.target.value);
        }}
        id="italic"
      ></input>
      <label htmlFor="italic">ITALIC</label>{" "}
      <input
        type="radio"
        name="type"
        value="math"
        onChange={(e) => {
          setType(e.target.value);
        }}
        id="math"
      ></input>
      <label htmlFor="math">MATH</label>
      <button onClick={handleClick}>Insert</button>
      <div style={{ display: "flex", direction: "row" }}>
        <div
          style={{
            border: "solid",
            textAlign: "left",
            width: "33%",
            height: "600px",
            marginTop: "5rem",
          }}
        >
          {cmds.map((e) => {
            return e.func(e.text, e.id);
          })}
        </div>
        <div
          style={{
            border: "solid",
            width: "33%",
            height: "600px",
            marginTop: "5rem",
            marginLeft: "1rem",
            justifyContent: "flex-start",
          }}
        >
          {cmds.map((e) => {
            if (e.id) {
              return (
                <span
                  style={{
                    border: "solid",
                    borderWidth: "1px",
                    textAlign: "left",
                    marginTop: "0.5rem",
                    marginRight: "0.5rem",
                    height: "30px",
                  }}
                  key={e.id}
                >
                  <textarea
                    value={e.text}
                    onChange={(eve) => handleTextChange(eve.target.value, e)}
                  ></textarea>
                  <button>{e.id}</button>
                </span>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default Editor;
