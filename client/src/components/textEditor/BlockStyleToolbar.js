import React from 'react';

import HeaderStyleDropdown from './HeaderStyleDropdown';
import BlockStyleButton from './BlockStyleButton';

const BLOCK_TYPES = [
  { label: " “ ” ", style: "blockquote" },
  { label: "UL", style: "unordered-list-item" },
  { label: "OL", style: "ordered-list-item" },
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
    <div>
      <span className="RichEditor-controls">
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
      </span>
    </div>
  )
}
