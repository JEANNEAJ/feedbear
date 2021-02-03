import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="text-black text-center">
      <div className="container mx-auto p-5">
        <p>
          Created by the <Link to={'/contact'}>Graduates</Link> of Juno College
        </p>
        <p>© 2020</p>
      </div>
    </footer>
  );
}
