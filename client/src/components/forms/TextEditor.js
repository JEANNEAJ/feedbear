import React, { useState, useEffect } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';

/** Text editor component allowing rich text formatting (using markup) */
export default function TextEditor({ onChange }) {
  const [editorState, setEditorState] = useState(() => 
    EditorState.createEmpty(),
  );

  // update parent state when editor state is changed
  useEffect(() => {
    onChange(editorState.getCurrentContent());
  }, [editorState]);

  /** Allows hotkeys (eg. ctrl+b for bold) */
  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
      setEditorState(newState);
      return 'handled';
    } return 'not-handled';
  }

  const onBoldClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'))
  }

  const onItalicClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'ITALIC'))
  }

  return (
    <>
      <div className="textEditor">
        <button type="button" onClick={onBoldClick}><b>B</b></button>
        <button type="button" onClick={onItalicClick}><em>I</em></button>
        <Editor 
          editorState={editorState}
          onChange={setEditorState}
          handleKeyCommand={handleKeyCommand}
          placeholder="Message"
          ariaLabel="Message"
          tabIndex="0"
        />
    </div>
  </>
  )
}