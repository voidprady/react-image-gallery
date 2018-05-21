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
    if (e.key == 'Enter' && e.target.value != '') {
      this.getData(e.target.value);
      e.target.value = '';
    }
  }
  getData(value){
    let newUrl = window.location.origin.split(-1)+"?q="+encodeURIComponent(value);
    window.history.pushState({path:newUrl}, '', newUrl);

    if(this.state.input != value){
      this.setState({input:value});
    }
    axios.get('https://www.googleapis.com/customsearch/v1?q='+value+'&num=10&start=1&cr=countryIN&searchType=image&fileType=jpg&alt=json&cx=004555727106795431299:gahwu7gy460&key=AIzaSyAQT7VUBn4c1sczrG_LGeqW0tXxERO_hTs')
    .then((response) => {
      console.log(response.data);
      if (response.data && response.data.items.length!=0) {
        let arr = [];
        response.data.items.forEach((obj,index) => {
          arr.push({
            "image" : obj.link,
            "thumbnail": obj.image.thumbnailLink
          })
        })
        this.setState({data : arr});
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
          <input className="form-control" placeholder="Enter keyword" type="search" onKeyPress={this.enterHandler} />
        </div>
        <div className="App-body">
          {this.state.data.length!=0?<Gallery images={this.state.data}/>:''}
        </div>
      </div>
    );
  }
}

export default App;
