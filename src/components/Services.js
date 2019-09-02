import React, { Component } from "react";
import Title from "./Title";
import { FaCocktail, FaHiking, FaShuttleVan, FaBeer } from "react-icons/fa";

export default class Services extends Component {
  state = {
    services: [
      {
        icon: <FaCocktail></FaCocktail>,
        title: "Free Cocktails",
        info:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem ipsa vero numquam amet, nisi quam."
      },
      {
        icon: <FaHiking></FaHiking>,
        title: "Endless Hiking",
        info:
          "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae voluptatem velit quos numquam ab soluta."
      },
      {
        icon: <FaShuttleVan />,
        title: "Free shuttle",
        info:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem necessitatibus temporibus aspernatur, ducimus velit veritatis."
      },
      {
        icon: <FaBeer />,
        title: "Strongest Beer",
        info:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque a pariatur excepturi, nihil nesciunt velit."
      }
    ]
  };
  render() {
    return (
      <section className="services">
        <Title title="services" />
        <div className="services-center">
          {this.state.services.map((item, index) => {
            return (
              <article key={index} className="service">
                <span>{item.icon}</span>
                <h6>{item.title}</h6>
                <p>{item.info}</p>
              </article>
            );
          })}
        </div>
      </section>
    );
  }
}
