import React from 'react';

const ModalWrapper = (props) => {
  const showHideClassName = props.show?"modal display-block":"modal display-none";
  let slideIndex = props.slideIndex;

  const makeSlides = () => {
    let slider = [];
    for (var i = 0; i < props.slides.length; i++) {
      slider.push(<div className="mySlides" key={i}>
      <img src={props.slides[i].image} />
      </div>)
    }
    return slider;
  }
  const makethumbNails = () => {
    let slider = [];
    for (var i = 0; i < props.slides.length; i++) {
      slider.push(<div className="column" key={i}>
      <img className = "demo" id={i+1} src={props.slides[i].thumbnail} onClick={(e) => currentSlide(e)}/>
      </div>);
    }
    return slider;
  }
  const plusSlides = (e, n) => {
    slideIndex = parseInt(slideIndex)+parseInt(n);
    console.log("inside plus", slideIndex);
    showSlides(slideIndex);
  }
  const currentSlide = (n) => {
    if(isNaN(n)){
      console.log("inside current", n);
      showSlides(slideIndex = n.target.id);
    }else {
      console.log("inside current", n);
      showSlides(slideIndex = n);
    }
  }
  const showSlides = (n) => {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("demo");
    console.log(slides,dots);

    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" activeSlide", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " activeSlide";
    // captionText.innerHTML = dots[slideIndex-1].alt;
  }
  if(props.show){
    currentSlide(slideIndex);
  }
  return (
    <div id="myModal" className={showHideClassName}>
      <span className="close cursor" onClick={props.handleClose}>&times;</span>
      <div className="modalContent">
        {makeSlides()}
        <a className="prevSlide" onClick={(e) => plusSlides(e, -1)}>&#10094;</a>
        <a className="nextSlide" onClick={(e) => plusSlides(e, 1)}>&#10095;</a>
        <div className="thumbnailContainer">
          {makethumbNails()}
        </div>
      </div>
    </div>
  )
}

export default ModalWrapper;
