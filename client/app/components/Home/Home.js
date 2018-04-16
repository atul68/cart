import React, { Component } from 'react';
import 'whatwg-fetch';
import { Link } from 'react-router-dom';
import logo from '../image/logo.png'

class Show extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  componentDidMount() {
    fetch('/api/counters/')
       .then(res => res.json())
      .then(json => {
        console.log(json);
        this.setState({       
          items: json
        });
      }).catch(err => {
        console.log("parsing failed", err)
      });
  }

  render() {
    return (
      <div>
        <p>ITEM CATALOG:</p>
        <table className="table table-stripe">
            <thead>
              <tr>
                <th>Title</th>
                <th>Count</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>URL</th>
                
              </tr>
            </thead>
            <tbody>
              { this.state.items.map((item, i) => (
                <tr>
                     <td><Link to={`/detail/${item._id}`}>{item.title}</Link></td>
                    <td>{item.count} </td>
                    <td>{item.quantity} </td>
                    <td>{item.price} </td>
                    <td>{item.url} </td>
                    <img src='' width="40" alt="twitter" />
                </tr>
              ))} 
            </tbody>
        </table>  
      </div>
    );
  }
}



export default Show;