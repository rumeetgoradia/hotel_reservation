import React from "react";
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Hero hero="defaultHero">
      <Banner
        title="Rumeet's Rich Rooms"
        subtitle="Deluxe rooms starting at $299 per night"
      >
        <Link to="/rooms" className="btn-primary">
          Our Rooms
        </Link>
      </Banner>
    </Hero>
  );
};

export default Home;
