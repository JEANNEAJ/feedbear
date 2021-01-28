import React from 'react'

export default function LoadingSpinner() {
  return (
    <div className="flex mt-3">
      <div className="h-8 w-8">
        <div
          style={{ borderTopColor: "black" }}
          className="animate-spin loader ease-linear rounded-full border-2 border-t-2 border-gray-200 h-6 w-6"
        ></div>
      </div>
      <p>Loading...</p>
    </div>
  )
}
