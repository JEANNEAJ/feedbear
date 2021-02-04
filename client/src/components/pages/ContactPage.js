import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ContactForm from "./../forms/ContactForm";
import Axios from "axios";

export default function ContactPage() {
  const [dustySticks, setDustySticks] = useState([]);

  useEffect(() => {
    Axios({
      url: "https://api.github.com/repos/jeanneaj/feedbear/contributors",
      method: "GET",
      dataResponse: "json",
    }).then((res) => {
      setDustySticks(res.data.filter((user) => user.type !== "Bot"));
    });
  }, []);

  return (
    <section>
      <h2 className="text-3xl font-bold">Contact Us</h2>
      <p className="my-5">
        Have some comments about our app? Mention it on our very own{" "}
        <Link to={"/project/5ff63422551e1e10ac0a44a1"}>project page!</Link>
      </p>

      <ContactForm />
      <div>
        <h3 className="text-center mt-5">Contributors:</h3>
        <ol className="flex space-x-3 justify-center">
          {dustySticks.map((contributor) => {
            return (
              <li key={contributor.id}>
                <a
                  href={contributor.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {contributor.login}
                </a>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
