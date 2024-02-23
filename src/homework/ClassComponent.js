import {Component} from 'react';

class ClassComponent extends Component{
    state ={
        todos:[],
        input: '',
    }

    componentDidMount(){
        const lsTodos = localStorage.getItem('todos');
        if(lsTodos){
            this.setState({todos: JSON.parse(lsTodos)})
        }
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.todos !== this.state.input){
        localStorage.setItem('todos', JSON.stringify(this.state.todos))
    }
    };

    AddTask = () =>{
        this.setState({todos: [...this.state.todos, this.state.input]});
        this.setState({input: ''})
    };

    onChangeHandler = (e) => {
        const value = e.target.value;
        this.setState({input: value});
    };

    ClearToDo = () => {
        localStorage.removeItem('todos');
        this.setState({ todos: [] });
    };

    render(){
        return(
            <>
            <input value = {this.state.input} onChange={this.onChangeHandler}/>
            <button onClick= {this.AddTask}>Add ToDo </button>
           {this.state.todos.map ((todo, index) =>(
           <p key={index}>{todo}</p>
           ))}
           <button onClick= {this.ClearToDo}>Clear ToDo</button>
            </>
        );
}
}

export default ClassComponent