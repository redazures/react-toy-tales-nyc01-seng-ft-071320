import React from 'react';
import ToyCard from './ToyCard'
import ToyForm from './ToyForm'

class ToyContainer extends React.Component {

state={
  data:[],
  display: false
}

handleClick = () => {
  let newBoolean = !this.state.display
  this.setState({display: newBoolean})
}

create=(obj)=>{
  console.log("this is my app project", obj)
  fetch(`http://localhost:3000/toys/`,{
    method: "POST",
    headers: {
    "Content-type": "application/json",
    "accept": "application/json"
    },
    body: JSON.stringify(obj)
    })
  .then(res=>res.json())
  .then(string=>{
    let newArray=[...this.state.data,string]
    this.setState({data:newArray})
  })
}

getToys=()=>{
  // console.log("what",this.state.data)
  fetch('http://localhost:3000/toys')
  .then(res=>res.json())
  .then(string=>{this.setState({data:string})})
}

rendToys=()=>{
  // console.log("this is my rend toys",this.state.data)
  return this.state.data.map(el=><ToyCard key={el.id} el={el} addLikes={this.addLikes} delete={this.delete}/>)
}

addLikes=(id)=>{//  console.log("this is my add likes",id,this.state.data)
  let find = this.state.data.find(el=>el.id===id) // console.log(find)
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
  .then(string=>{//console.log(typeof id, id,string)
    this.setState({
      data: this.state.data.map(el => (el.id === id ? string : el))
    });//console.log("new data", this.state.data)
  })
}

delete=(id)=>{
  console.log("this is my delete", id)
  fetch(`http://localhost:3000/toys/${id}`, {method: "DELETE"})
  .then(resp => resp.url).then(string=>{
    console.log(string)
    let newArray=this.state.data.filter(el=>el.id!==id)
    this.setState({data:newArray})
  })
}

render(){//console.log("this is my render", this.rendToys())
  return(
    <>
        { this.state.display
            ?
          <ToyForm create={this.create} />
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
    <div id="toy-collection">
      {this.rendToys()}
    </div>
    </>
  );
  }

  componentDidMount=()=>{ // console.log("This is my did mount and grab toys")
    this.getToys()
  }

}


export default ToyContainer;
