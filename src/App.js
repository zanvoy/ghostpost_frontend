import React from 'react';
import logo from './logo.svg';
import './App.css';


class App extends React.Component {
  constructor(props){
    super(props)
    this.state ={
      broast: [],
    }
    this.handleClick = this.handleClick.bind(this);
    this.vote = this.vote.bind(this);
    // this.submitForm = this.submitForm.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleClick = (url) => {
    fetch(url)
      .then(res => res.json())
      .then((data) => {this.setState({broast: data})})
      }
  vote = (type, id) =>{
    fetch('http://localhost:8000/api/broast/'+id+'/'+type+'/', {method:'POST'})
    fetch('http://localhost:8000/api/broast/')
    .then(res => res.json())
    .then((data) => {this.setState({broast: data})})
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    fetch('http://localhost:8000/api/broast/', {
      method: 'POST',
      body: data,
    })
    .then(()=>window.location.reload())
  }
  // handleSubmit(event){
  //   event.preventDefault()
  //   let formData = new FormData(event.target)
  //   console.log(formData)
  //   fetch('http://localhost:8000/api/broast/',{method:'POST',
  //   body: formData})
  // }

  componentDidMount(){
    fetch('http://localhost:8000/api/broast/')
    .then(res => res.json())
    .then((data) => {this.setState({broast: data})
  })
  }
  
  render(){

    return (
      <div>
        <button onClick={() => this.handleClick('http://localhost:8000/api/broast/')}>Newest</button>
        <button onClick={() => this.handleClick('http://localhost:8000/api/broast/order_best/')}>Top</button>
        <button onClick={() => this.handleClick('http://localhost:8000/api/broast/order_boast/')}>Boasts</button>
        <button onClick={() => this.handleClick('http://localhost:8000/api/broast/order_roast/')}>Roasts</button>
        <br></br>
          <form onSubmit={(event)=>this.handleSubmit(event)} method="POST">
          Make post: 
          <label htmlFor='is_roast'>
          Roast?:
          <input id='is_roast' type="checkbox" name="is_roast" />
          </label>
          <label htmlFor='content'>
          Content:
          <input id='content' type="text" name="content" />
          </label>
          <input type="submit" value="Submit" />
          {/* <button>Submit</button> */}
          </form>
        <ul>
        {this.state.broast.map((s) => {
          return(
            <li>
              {s.is_roast?<li>Roast</li>:<li>Boast</li>}
            <ul>
              <li>{s.date}</li>
              <li>Score:{s.score} || 
              <button onClick={() => this.vote('upvote',s.id)}>👍{s.up}</button> ||
              <button onClick={() => this.vote('downvote',s.id)}>👎{s.down}</button>
              </li>
              <li>{s.content}</li>
            </ul>
            </li>)
        })}
        </ul>
      </div>
    );
  }
}

export default App;
