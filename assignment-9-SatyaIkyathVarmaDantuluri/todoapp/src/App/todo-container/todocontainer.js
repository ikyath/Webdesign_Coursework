import React from 'react';
import Todoitem from './todo-item/todoitem';

class Todocontainer extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        const todosList = this.props.todos.map(c => <Todoitem todo={c}></Todoitem>);
        return (
        <ul>
            {todosList}
        </ul>
        );
    }

}

export default Todocontainer;