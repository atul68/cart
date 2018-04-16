import React, { Component } from 'react';
import 'whatwg-fetch';
import { Link } from 'react-router-dom';

 

class Add extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedfile: null,
       title:'',
       price: 0,
       url: '',
       quantity:0,
       id: 0,
       file: null
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleUrlChange = this.handleUrlChange.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTitleChange(event) {
    this.setState({title: event.target.value});
  }

  handlePriceChange(event) {
    this.setState({price: event.target.value});
  }

  handleUrlChange(event) {
    this.setState({url: event.target.value});
  }


  handleQuantityChange(event) {
    this.setState({quantity: event.target.value});
    console.log(this.state)
  }

  handleFileNameChange(event) {
    this.setState({selectedfile:  event.target.files[0]});
    console.log(this.state)
    var form = document.getElementById("myForm");
    var data = new FormData(form);
    data.append('profileImage', event.target.files[0]);
    console.log('data---',data)
    fetch(`/api/upload`, 
    { method: 'POST',
      body: data
    })
    .then(res => res.json())
    .then(json => {
      console.log('hi...')
    })
    .catch(error => {
      console.log('error $$$',error)
    })
   

  }




  handleSubmit(event) {
    event.preventDefault();
   
    var data = new FormData();
    data.append('title', this.state.title);
    data.append('price', this.state.price);

    const formPayload = {
        title: this.state.title,
        price: this.state.price,
        url: this.state.url,
        quantity: this.state.quantity,
        fileName: this.state.fileName
      };
      console.log('formPayload',formPayload.fileName)
      console.log('Send this in a POST request:', formPayload)
      fetch(`/api/counters/`, { method: 'POST', headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({formPayload})
      //body: data
    })
      .then(res => res.json())
      .then(json => {
       this.props.history.push("/")
      });
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} name="myForm" encType="multipart/form-data">
        <label htmlFor="title">Title:</label> <input type="text"  name="title"  value={this.state.title} onChange={(event) => this.handleTitleChange(event)}/> <br />
        <label htmlFor="price">Price:</label> <input type="text"  name="price"  value={this.state.price} onChange={(event) => this.handlePriceChange(event)}/> <br />
        <label htmlFor="url">URL:</label>   <input type="text"  name="url"  value={this.state.url} onChange={(event) => this.handleUrlChange(event)}/><br />
        <label htmlFor="quantity">Quantity:</label>   <input type="text"  name="quantity"  value={this.state.quantity} onChange={(event) => this.handleQuantityChange(event)}/><br />
        <label htmlFor="fileName">Product Image:</label>  <input type="file" name="fileName" onChange={(event) => this.handleFileNameChange(event)}></input><br />
        <button >Submit</button>
        </form>
      </div>
    );
  }
}

export default Add;