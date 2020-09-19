import React from 'react';
import { Component } from 'react';
import ToyCard from './ToyCard'

class ToyContainer extends React.Component {

state={
  data:[]
}
getToys=()=>{
  // console.log("what",this.state.data)
  fetch('http://localhost:3000/toys')
  .then(res=>res.json())
  .then(string=>{this.setState({data:string})})
}

rendToys=()=>{
  // console.log("this is my rend toys",this.state.data)
  return this.state.data.map(el=><ToyCard key={el.id} el={el} addLikes={this.addLikes}/>)
}

addLikes=(id)=>{//  
  console.log("this is my add likes",id,this.state.data)
  let find = this.state.data.find(el=>el.id===id)
  console.log(find)
  let number = find.likes + 1
  fetch(`http://localhost:3000/toys/${id}`,{
    method: "PATCH",
    headers: {
    "Content-type": "application/json",
    "accept": "application/json"
    },
    body: JSON.stringify({
    likes:number
    })
    })
  .then(res=>res.json())
  .then(string=>{
    console.log(typeof id, id,string)
    this.setState({
      data: this.state.data.map(el => (el.id === id ? string : el))
    });
    console.log("new data", this.state.data)
  })
}

render(){
  // console.log("this is my render", this.rendToys())
  return(
    <div id="toy-collection">
      {this.rendToys()}
    </div>
  );
  }

  componentDidMount=()=>{
    // console.log("This is my did mount and grab toys")
    this.getToys()
  }

}





export default ToyContainer;
