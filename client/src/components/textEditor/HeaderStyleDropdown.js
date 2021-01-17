import React from 'react'

export default function HeaderStyleDropdown(props) {
  const { active, headerOptions } = props;
  
  const onToggle = (event) => {
    const value = event.target.value;
    props.onToggle(value);
  }

  return (
    <li>
      <label htmlFor="headerSelect" className="sr-only">Heading Type</label>
      <select name="headerSelect" value={active} onChange={onToggle}>
        <option value="">Normal</option>
        {headerOptions.map(heading => {
          return (
            <option key={heading.label} value={heading.style}>
              {heading.label}
            </option>
          )
        })}
      </select>
    </li>
  )
}
