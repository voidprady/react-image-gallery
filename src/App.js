import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Gallery from './components/Gallery';
import axios from 'axios';
import $ from 'jquery';
// window.jQuery = window.$ = $;



class App extends Component {
  constructor(props){
    super(props);

    let query = this.getParameterByName('q');
    this.state = {
      input : query,
      data : []
    }

    this.enterHandler = this.enterHandler.bind(this);
    this.getData = this.getData.bind(this);
    this.loadMore = this.loadMore.bind(this);

    if(this.state.input){
      this.getData(this.state.input)
    }
  }
  getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }
  enterHandler(e) {
    if (e.target.id == 'search-input' && e.key == 'Enter' && e.target.value != '') {
      let value = e.target.value;
      e.target.value = '';
      document.getElementById('loader').style.display = 'none';
      this.setState({data:[]}, () => {
        this.getData(value);
      })
    }
  }
  loadMore() {
    let value = this.state.input;
    console.log(value);
    if(value != '' && this.state.data.length != 0){
      this.getData(value);
    }
  }
  getData(value){
    let newUrl = window.location.origin.split(-1)+"?q="+encodeURIComponent(value);
    let startIndex = 1;
    window.history.pushState({path:newUrl}, '', newUrl);

    if(this.state.input != value){
      this.setState({input:value});
    }
    if(this.state.data && this.state.input == value){
      startIndex += this.state.data.length;
    }
    console.log(startIndex);
    if(value)
    axios.get('https://www.googleapis.com/customsearch/v1?q='+value+'&num=10&start='+startIndex+'&cr=countryIN&searchType=image&fileType=jpg&alt=json&cx=017081785250981186715:gmopwuw4u-o&key=AIzaSyATwOq-sGG6e0xsEytpvojf0c0ZVBsY75s')
    .then((response) => {
      if (response.data && response.data.items.length!=0) {
        let arr = [];
        response.data.items.forEach((obj,index) => {
          arr.push({
            "image" : obj.link,
            "thumbnail": obj.image.thumbnailLink
          })
        })
        if(this.state.data.length == 0){
          this.setState({data : arr});
        }else {
          let data = [...this.state.data, ...arr];
          console.log(data);
          this.setState({data : data});
        }
        document.getElementById('loader').style.display = 'block';
      }
    });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Image Search</h1>
        </header>
        <div className="form-group search-box">
          <input id="search-input" className="form-control" placeholder="Enter keyword" type="search" onKeyPress={this.enterHandler} />
        </div>
        <div className="App-body">
          {this.state.data.length!=0?<Gallery images={this.state.data}/>:''}
          <button className="btn btn-default" onClick={this.loadMore} id="loader">Load More</button>
        </div>
      </div>
    );
  }
}

export default App;
