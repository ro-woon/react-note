import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import { Container } from './TextEditor.styles'
import 'react-quill/dist/quill.snow.css';
interface TextEditorProps {
  value: string,
  setValue: React.Dispatch<React.SetStateAction<string>>,
  color: string
}
// 노트를 만들 때 들어가는 요소들을 정의하는 부분, 크게 어려운 곳은 없음

const formats = [
  "bold",
  "italic",
  "underline",
  "strike",
  "list",

  "color",
  "background",

  "image",
  "blockquote",
  "code-block",
];

const modules = {
  toolbar: [
    [{ list: "ordered" }, { list: "bullet" }],
    [],
    ["italic", "underline", "strike"],
    [],
    [{ color: [] }, { background: [] }],
    [],
    ["image", "blockquote", "code-block"],
  ],
};

const TextEditor = ({ color, value, setValue }: TextEditorProps) => {

  console.log(value);

  return (
    <Container noteColor={color}>
      <ReactQuill
        formats={formats}
        modules={modules}
        theme="snow"
        value={value}
        onChange={setValue} />
    </Container>
  )
}

export default TextEditor