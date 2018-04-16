import React, { Component } from 'react';
import 'whatwg-fetch';

class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
       title:'',
       price: 0,
       url: '',
       quantity:0,
       id: 0

    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleUrlChange = this.handleUrlChange.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch('/api/counters/'+this.props.match.params.id)
    .then(res => res.json())
    .then(json => {
        console.log(json);
        this.setState({  
            title:json.title,
       price: json.price,
       url: json.url,
       quantity:json.quantity,
       id: json._id     
        });
      })
      .catch(function(error) {
        console.log('request failed', error)
      });
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
  }




  handleSubmit(event) {
    event.preventDefault();
  
    const formPayload = {
        title: this.state.title,
        price: this.state.price,
        url: this.state.url,
        quantity: this.state.quantity        
      };

      const id = this.state.id;

      console.log('Send this in a POST request:', formPayload)
      fetch(`/api/counters/${id}`, { method: 'PUT', headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({formPayload})
    })
      .then(res => res.json())
      .then(json => {
        console.log(json);
        
        this.setState({       
            item: json
        });

        this.props.history.push("/")
      });
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
        <label for="title">Title:</label> <input type="text"  name="title"  value={this.state.title} onChange={(event) => this.handleTitleChange(event)}/>
        <label for="price">Price:</label> <input type="text"  name="price"  value={this.state.price} onChange={(event) => this.handlePriceChange(event)}/>
        <label for="url">URL:</label>   <input type="text"  name="url"  value={this.state.url} onChange={(event) => this.handleUrlChange(event)}/>
        <label for="quantity">Quantity:</label>   <input type="text"  name="quantity"  value={this.state.quantity} onChange={(event) => this.handleQuantityChange(event)}/>
        <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default Edit;