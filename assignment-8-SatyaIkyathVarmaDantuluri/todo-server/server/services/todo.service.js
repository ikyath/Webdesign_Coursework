import Todo from './../models/todo';

//function to filter the record by using id 
const search =  (filter) => {
    const promise =  Todo.find(filter).exec();
    return promise;
};

//function to find the records by using id
const get = (id) => {
    const promise = Todo.findById(id).exec();
    return promise;
}

//function to create a new to do item
const create = (newTodo) => {
    const todo = new Todo(newTodo);
    const promise = todo.save();
    return promise;
}

//function to update a record with modifying the updated time
const update = (updatedTodo) => {
     // get the current utc datetime
    let currentdate = new Date();
     // sets the modified date
    updatedTodo.lastModifiedDate = currentdate.toLocaleString();
    const promise = Todo.findByIdAndUpdate(
        {_id:updatedTodo.id},
        updatedTodo,
        {new:true}
    ).exec();
    return promise;
}

// function to delelte a record
const remove = (id) => {
    const promise = Todo.remove({_id:id}).exec();
    return promise;
}

export default {
    search:search,
    get: get,
    create: create,
    update: update,
    remove: remove
}