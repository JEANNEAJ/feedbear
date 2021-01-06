import React from 'react'

/** ListItems for use in List component */
export default function ListItem(props) {

  return (
    <li className="flex justify-between bg-white rounded-lg shadow-sm mt-3 px-3 py-2 hover:bg-gray-100">
      {props.children}
    </li>
  )
}
