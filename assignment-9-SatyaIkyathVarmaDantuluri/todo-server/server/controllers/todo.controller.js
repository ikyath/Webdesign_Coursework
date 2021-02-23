import todoService from './../services/todo.service';

// to call a function either by get,push, push , delete request
const index =  (request, response) => {
    todoService.search({})
    .then((todos)=>{
        response.status(200);
        response.json(todos);    
    })
    .catch(handleError(response));

    
};

//get
const get = (request, response) => {
    const id = request.params.id;
    todoService.get(id)
    .then((todos)=>{
        response.status(200);
        response.json(todos);    
    })
    .catch(handleError(response));

};

//create
const create = (request, response) => {
    const newTodo = Object.assign({},request.body);
    todoService.create(newTodo)
    .then((todos)=>{
        response.status(200);
        response.json(todos);    
    })
    .catch(handleError(response));

};

//update call
const update = (request, response) => {
    const id = request.params.id;
    const updateTodo = Object.assign({},request.body);
    updateTodo.id = id;
    todoService.update(updateTodo)
    .then((todos)=>{
        response.status(200);
        response.json(todos);    
    })
    .catch(handleError(response));

};

//remove call
const remove = (request, response) => {
    const id = request.params.id;
    // const updateTodo = Object.assign({},request.body);
    todoService.remove(id)
    .then((todos)=>{
        response.status(200);
        response.json({
            message: 'Delete Successful'
        });    
    })
    .catch(handleError(response));

};


const handleError = (response)=>{
    return (error) => {
    response.status(500);
    response.json({
        message: error.message

    })
};
}

export default{
    index: index,
    get: get,
    create: create,
    update: update,
    remove: remove
}