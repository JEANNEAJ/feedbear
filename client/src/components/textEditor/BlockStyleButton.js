import React from 'react'

export default function BlockStyleButton(props) {
  const { style, active, label } = props;

  const onToggle = (e) => {
    e.preventDefault()
    props.onToggle(style)
  }

  let className = "RichEditor-styleButton";
  if (active) {
    className += " RichEditor-activeButton";
  }

  return (
    <span className={className} onClick={onToggle}>
      {label}
    </span>
  )
}
