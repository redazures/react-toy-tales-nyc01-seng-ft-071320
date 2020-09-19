import React, { Component } from 'react';

class ToyCard extends Component {

  render() {
    // console.log(this.props.el)
    return (
      <div className="card">
        <h2>{this.props.el.name}</h2>
        <p>{this.props.el.likes} Likes </p>
        <img src={this.props.el.image} alt={this.props.el.name} className="toy-avatar" />
        <button className="like-btn" onClick={()=>{this.props.addLikes(this.props.el.id)}} >Like {'<3'}</button>
        <button className="del-btn" onClick={()=>{this.props.delete(this.props.el.id)}}>Donate to GoodWill</button>
      </div>
    );
  }

}

export default ToyCard;

        
        
        
        
