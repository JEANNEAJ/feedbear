import React from 'react'

export default function HeaderStyleDropdown(props) {
  const { active, headerOptions } = props;
  
  const onToggle = (event) => {
    const value = event.target.value;
    props.onToggle(value);
  }

  return (
    <select value={active} onChange={onToggle}>
      <option value="">Header Levels</option>
      {headerOptions.map(heading => {
        return (
          <option value={heading.style}>
            {heading.label}
          </option>
        )
      })}
    </select>
  )
}
