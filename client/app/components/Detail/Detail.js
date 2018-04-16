import React, { Component } from 'react';
import 'whatwg-fetch';
import { Link } from 'react-router-dom';



class Detail extends Component {

  constructor(props) {
    super(props);
    this.state = {
        item: {}
    };
  }

  componentDidMount() {
    fetch('/api/counters/'+this.props.match.params.id)
    .then(res => res.json())
    .then(json => {
        console.log(json);
        this.setState({       
            item: json
        });
      })
     .catch(err => {
        console.log('err', err)
     })
  }

  delete(id){
    console.log(id);
    fetch('/api/counters/'+id, {method: "DELETE"})
    .then(res => res.json())
    .then(json => {
        this.props.history.push("/")
      });
  }

  render() {
    return (
      <div className="container">
      <img src="http://localhost:8080/assets/img/logo.png" width="40" alt="twitter" />
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              {this.state.item.title}
            </h3>
          </div>
          <div className="panel-body">
            <dl>
              <dt>title:</dt>
              <dd>{this.state.item.title}</dd>
              <dt>Count:</dt>
              <dd>{this.state.item.count}</dd>
              <dt>Quantity:</dt>
              <dd>{this.state.item.quantity}</dd>
              <dt>Price:</dt>
              <dd>{this.state.item.price}</dd>
              <dt>URL:</dt>
              <dd>{this.state.item.url}</dd>

             
            </dl>
            <Link to={`/edit/${this.state.item._id}`} className="btn btn-success">Edit</Link>&nbsp;
            <button onClick={this.delete.bind(this, this.state.item._id)} className="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Detail;