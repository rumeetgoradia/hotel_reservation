import React, { Component } from "react";
import defaultBG from "../images/room-1.jpeg";
import Banner from "../components/Banner";
import { Link } from "react-router-dom";
import { RoomContext } from "../context";
import StyledHero from "../components/StyledHero";

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
    // console.log(images);
    // const imgs = images.map(item => {
    //   return { src: item, title: "", description: "" };
    // });
    // console.log(imgs);

    //Lightbox
    const openModal = () => {
      let modal = document.getElementById("modal");
      if (modal != null) {
        modal.style.display = "block";
      }
    };
    const closeModal = () => {
      let modal = document.getElementById("modal");
      if (modal != null) {
        modal.style.display = "none";
      }
    };

    let slideIndex = 1;

    const showSlides = n => {
      let i;
      let slides = document.getElementsByClassName("slides");
      console.log("slides " + slides);
      let dots = document.getElementsByClassName("demo");
      if (n > slides.length) {
        slideIndex = 1;
      }
      if (n < 1) {
        slideIndex = slides.length;
      }
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
      }
      console.log(slideIndex);
      if (slides[0] != null) {
        slides[slideIndex - 1].style.display = "flex";
      }
      if (dots[0] != null) {
        dots[slideIndex - 1].className += " active";
      }
    };

    // showSlides(slideIndex);

    const plusSlides = n => {
      showSlides((slideIndex += n));
    };

    const currentSlide = n => {
      // console.log(n);
      showSlides((slideIndex = n));
    };

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
          <div className="row">
            {images.map((item, index) => {
              let x = index + 1;
              // const cs = `openModal();currentSlide(${x})`;
              return (
                <div className="column" key={index} onClick={openModal}>
                  <img
                    key={index}
                    src={item}
                    alt={name}
                    onClick={e => currentSlide(x, e)}
                    className="hover-shadow"
                  />
                </div>
              );
            })}
          </div>
          <div className="modal" id="modal">
            <span className="close cursor" onClick={closeModal}>
              &times;
            </span>
            <a className="prev" onClick={e => plusSlides(-1, e)}>
              &#10094;
            </a>
            <a className="next" onClick={e => plusSlides(1, e)}>
              &#10095;
            </a>
            <div className="modal-content">
              {images.map((item, index) => {
                return (
                  <div className="slides" key={index}>
                    <img
                      key={index}
                      src={item}
                      alt={name}
                      style={{ width: "100%" }}
                    />
                  </div>
                );
              })}
              {showSlides(slideIndex)}
              {/* <a className="prev" onClick={e => plusSlides(-1, e)}>
                &#10094;
              </a>
              <a className="next" onClick={e => plusSlides(1, e)}>
                &#10095;
              </a> */}
              <div className="row2">
                {images.map((item, index) => {
                  // const cs = `currentSlide(${index + 1})`;
                  return (
                    <div className="column" key={index}>
                      <img
                        src={item}
                        alt={name}
                        className="demo"
                        onClick={e => currentSlide(index + 1, e)}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {/* <Lightbox
            images={imgs}
            thumbnailWidth="100%"
            thumbnailHeight="auto"
            showImageModifiers={false}
          /> */}
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
