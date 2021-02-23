import toDoRouter from './todo.route';

export default(app) => {
  app.use('/',toDoRouter);
}
