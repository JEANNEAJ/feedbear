import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListUl, faListOl, faQuoteRight } from '@fortawesome/free-solid-svg-icons';

import HeaderStyleDropdown from './HeaderStyleDropdown';
import BlockStyleButton from './BlockStyleButton';

const BLOCK_TYPES = [
  { label: <FontAwesomeIcon icon={faQuoteRight} />, style: "blockquote" },
  { label: <FontAwesomeIcon icon={faListUl} />, style: "unordered-list-item" },
  { label: <FontAwesomeIcon icon={faListOl} />, style: "ordered-list-item" },
  { label: "{ }", style: 'code-block' }
];

const BLOCK_TYPE_HEADINGS = [
  { label: "H1", style: "header-one" },
  { label: "H2", style: "header-two" },
  { label: "H3", style: "header-three" },
  { label: "H4", style: "header-four" },
  { label: "H5", style: "header-five" },
  { label: "H6", style: "header-six" }
]

export function getBlockStyle(block) {
  switch (block.getType()) {
    case "blockquote":
      return "RichEditor-blockquote";
    default:
      return null;
  }
}

export default function BlockStyleToolbar({ editorState, onToggle }) {
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();
  return (
    <>
      <HeaderStyleDropdown
        headerOptions={BLOCK_TYPE_HEADINGS}
        active={blockType}
        onToggle={onToggle}
      />

      {BLOCK_TYPES.map(type => {
        return (
          <BlockStyleButton
            active={type.style === blockType}
            label={type.label}
            onToggle={onToggle}
            style={type.style}
            key={type.label}
            type={type}
          />
        );
      })}
    </>
  )
}
