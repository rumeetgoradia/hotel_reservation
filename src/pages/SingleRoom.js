import React, { Component } from "react";
import defaultBG from "../images/room-1.jpeg";
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import { Link } from "react-router-dom";
import { RoomContext } from "../context";
import StyledHero from "../components/StyledHero";
import Lightbox from "react-lightbox-component";

export default class SingleRoom extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      slug: this.props.match.params.roomType,
      defaultBG
    };
  }
  static contextType = RoomContext;
  // componentDidMount() {}
  render() {
    const { getRoom } = this.context;
    const room = getRoom(this.state.slug);
    if (!room) {
      return (
        <div className="error">
          <h3>No Such Room Exists...</h3>
          <Link to="/rooms" className="btn-primary">
            back to rooms
          </Link>
        </div>
      );
    }
    const {
      name,
      description,
      capacity,
      size,
      price,
      extras,
      breakfast,
      pets,
      images
    } = room;
    const [mainImg, ...defaultImg] = images;
    // const imgs = images.map(item => "src: " + item);
    console.log(images);
    const imgs = images.map(item => {
      return { src: item, title: "", description: "" };
    });
    console.log(imgs);
    return (
      <>
        <StyledHero img={mainImg || this.state.defaultBG}>
          <Banner title={`${name} room`}>
            <Link to="/rooms" className="btn-primary">
              back to rooms
            </Link>
          </Banner>
        </StyledHero>
        <section className="single-room">
          <Lightbox
            images={imgs}
            thumbnailWidth="100%"
            thumbnailHeight="auto"
            showImageModifiers={false}
          />
          {/* <Carousel views={imgs} /> */}
          {/* <ImageDisplay images={images} /> */}
          {/* <div className="single-room-images">
            {images.map((item, index) => {
              return <img key={index} src={item} alt={name} />;
            })}
          </div> */}
          {/* <Lightbox
            images={imgs}
            isOpen={this.state.lightboxIsOpen}
            onClickPrev={this.gotoPrevious}
            onClickNext={this.gotoNext}
            onClose={this.closeLightbox}
          /> */}
          <div className="single-room-info">
            <article className="desc">
              <h3>details</h3>
              <p>{description}</p>
            </article>
            <article className="info">
              <h3>info</h3>
              <h6>price : ${price}</h6>
              <h6>size : {size} SQFT</h6>
              <h6>
                max capacity : {capacity} {capacity === 1 ? "person" : "people"}
              </h6>
              <h6>{pets ? "pets allowed" : "no pets allowed"}</h6>
              <h6>{breakfast && "free breakfast included"}</h6>
            </article>
          </div>
        </section>
        <section className="room-extras">
          <h6>extras</h6>
          <ul className="extras">
            {extras.map((item, index) => {
              return <li key={index}>{item}</li>;
            })}
          </ul>
        </section>
      </>
    );
  }
}
