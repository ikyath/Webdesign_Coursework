import React from 'react';


class Todoitem extends React.Component {

    
    constructor(props){
        super(props);
    }

    render(){
        return (
        <li>{this.props.todo}</li>
        );
    }

}

export default Todoitem;