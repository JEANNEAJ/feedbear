import React, { useState, useEffect } from 'react';
import { Editor, EditorState, RichUtils, convertFromRaw } from 'draft-js';
import { markdownToDraft } from 'markdown-draft-js';

import BlockStyleToolbar, { getBlockStyle } from './BlockStyleToolbar';

import 'draft-js/dist/Draft.css';

/** Custom styles (only bold, italics, underline, and code are included by default) */
const styleMap = {
  'STRIKETHROUGH': {
    textDecoration: 'line-through',
  },
};


/** Text editor component allowing rich text formatting (using markup) */
export default function TextEditor({ onChange, defaultValue }) {
  /** The defaultValue markdown string converted to draft raw object */
  const defaultRawObject = markdownToDraft(defaultValue);
  /** The default content state to fill editor with if defaultValue is provided */
  const defaultContentState = convertFromRaw(defaultRawObject);
  
  /** the state of the editor - if defaultValue is specified, set intial content to that value */
  const [editorState, setEditorState] = useState(() => 
    !defaultValue ? 
      EditorState.createEmpty() : 
      EditorState.createWithContent(defaultContentState)
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
  };

  const toggleBlockType = (blockType) => {
    console.log(blockType);
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  }

  const onBoldClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
  };

  const onItalicClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'ITALIC'));
  };

  const onCodeClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'CODE'));
  };

  const onStrikethroughClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'STRIKETHROUGH'));
  };

  return (
    <>
      <div className="textEditor p-1">
        <div className="p-2">
          <Editor
            customStyleMap={styleMap}
            blockStyleFn={getBlockStyle}
            editorState={editorState}
            onChange={setEditorState}
            handleKeyCommand={handleKeyCommand}
            placeholder="Message"
            ariaLabel="Message"
            tabIndex="0"
          />
        </div>
        <BlockStyleToolbar
          editorState={editorState}
          onToggle={toggleBlockType}
        />
        <div className="border-t border-gray-200 pt-1">
          <button type="button" onClick={onBoldClick} title="Bold" aria-label="Bold"><b>B</b></button>
          <button type="button" onClick={onItalicClick} title="Italic" aria-label="Italic"><em>I</em></button>
          <button className="line-through" type="button" onClick={onStrikethroughClick} title="Strikethrough" aria-label="Strikethrough">abc</button>
          <button type="button" onClick={onCodeClick} title="Code" aria-label="Code">{'<>'}</button>
        </div>
    </div>
  </>
  )
}