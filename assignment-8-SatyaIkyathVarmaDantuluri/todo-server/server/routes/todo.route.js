import express from 'express';
import todoController from './../controllers/todo.controller';


const router = express.Router();

// * Search - GET /todos
// * Create - Post /todos

router.route('/todos')
    .get(todoController.index)
    .post(todoController.create);


/**
 * Retrieve - GET /todos/${id}
 * Update - GET /todos/${id}
 * Delete - DELETE /todos/${id}
 */

router.route('/todos/:id')
    .get(todoController.get)
    .put(todoController.update)
    .delete(todoController.remove);

    
export default router;

