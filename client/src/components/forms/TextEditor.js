import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';

import { draftToMarkdown, markdownToDraft } from 'markdown-draft-js';

import ReactMarkdown from 'react-markdown'

export default function TextEditor() {
  const [editorState, setEditorState] = useState(() => 
    EditorState.createEmpty(),
  );

  const [markdown, setMarkdown] = useState('');

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
      setEditorState(newState);
      return 'handled';
    } return 'not-handled';
  }

  const onUnderlineClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'));
  }

  const onBoldClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'))
  }

  const onItalicClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'ITALIC'))
  }

  const handleSave = () => {
    console.log(editorState);
    const raw = convertToRaw(editorState.getCurrentContent());
    console.log(raw);
    const markdownString = draftToMarkdown(raw);
    console.log(markdownString);
    setMarkdown(markdownString);

    const newRaw = markdownToDraft(markdownString);
    console.log(newRaw);
    
    // for editing vv
    // const newContent = convertFromRaw(newRaw);
    // console.log(newContent);
    // // setConverted(newContent);
  }

  return (
    <>
      <div className="textEditor">
        <button onClick={onUnderlineClick}>U</button>
        <button onClick={onBoldClick}><b>B</b></button>
        <button onClick={onItalicClick}><em>I</em></button>
        <Editor 
          editorState={editorState}
          onChange={setEditorState}
          handleKeyCommand={handleKeyCommand}
        />
        <button onClick={handleSave}>save</button>
    </div>
    <ReactMarkdown>{markdown}</ReactMarkdown>
  </>
  )
}

// ReactDOM.render(<MyEditor />, document.getElementById('container'));