import express from 'express';
import app from './../app'
import todoController from './../controllers/todo.controller';


const router = express.Router();

// * Search - GET /todos
// * Create - Post /todos

// app.use('/todos',router);


router.route('/todos')
    .get(todoController.index);
    // .post(todoController.create);


/**
 * Retrieve - GET /todos/${id}
 * Update - GET /todos/${id}
 * Delete - DELETE /todos/${id}
 */

router.route('/todos/:id')
    .get(todoController.get);
    // .put(todoController.update)
    // .delete(todoController.remove);

router.route('/todos/add')
    .post(todoController.create);

router.route('/todos/view/:id')
    .get(todoController.get);

router.route('/todos/update/:id')
    .post(todoController.update);

    
export default router;

