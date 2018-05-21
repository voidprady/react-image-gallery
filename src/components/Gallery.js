import React, { Component } from 'react';
import ModalWrapper from './ModalWrapper'


class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleModal : false,
      currentSlide : -1
    }
    this.makeGallery = this.makeGallery.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }
  makeGallery() {
    let cols = [];
    for (var i = 0; i < this.props.images.length; i++) {
      cols.push(<div className='column' key = {i}><img src={this.props.images[i].thumbnail} id={i+1} onClick={this.showModal} className='hover-shadow' /></div>);
    }
    return cols;
  }
  showModal(e) {
    this.setState({
      toggleModal : true,
      currentSlide : e.target.id
    });
  }
  hideModal() {
    this.setState({toggleModal : false});
  }
  render() {
    return (
      <div className="gallery-content">
      <div className="row">
        {this.makeGallery()}
      </div>
      <ModalWrapper show={this.state.toggleModal} handleClose={this.hideModal} slides={this.props.images} slideIndex={this.state.currentSlide}/>
      </div>
    )
  }
}

export default Gallery;
