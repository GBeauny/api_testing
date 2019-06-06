const mongoose = require('mongoose');
const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');

const server = require('../index');
const todoItem = require('../api/model/TodoItem');
const TodoItem = mongoose.model('TodoItem', todoItem);

chai.use(chaiHttp);

describe('TodoList', () => {
  beforeEach((done) => {
    TodoItem.remove({}, () => {
      // To complete
      done();
    });
  });

  describe('/GET todoitems', () => {
    it('should get all todo items when no items are in database', (done) => {
      chai.request(server).get('/todoitems').end((err, res) => {
        // To complete
        done();
      });
    });

    it('should get all todo items when there are two items in the database', (done) => {
      const firstTodoItem = new TodoItem({
        name: 'firstTask',
        status: 'inProgress'
      });
      const secondTodoItem = new TodoItem({
        name: 'secondTask',
        status: 'done'
      });
      firstTodoItem.save(() => {
        secondTodoItem.save(() => {
          chai.request(server).get('/todoitems').end((err, res) => {
            // To complete
            done();
          });
        });
      });
    });
  });

  describe('/POST todoitems', () => {
    it('should not post a todo item when the task name is undefined', (done) => {
      const param = {
        status: 'inProgress'
      };
      chai.request(server).post('/todoitems').send(param).end((err, res) => {
        // To complete
        done();
      });
    });

    it('should post a todo item and the status default value should be todo', (done) => {
      const param = {
        name: 'test task name'
      };
      chai.request(server).post('/todoitems').send(param).end((err, res) => {
        // To complete
        done();
      });
    });

    it('should post a todo item with a status value and save it', (done) => {
      const param = {
        name: 'test task name',
        status: 'done'
      };
      chai.request(server).post('/todoitems').send(param).end(() => {
        TodoItem.find({}, (err, todoItems) => {
          // To complete
          done();
        });
      });
    });
  });

  describe('/GET/:id todoitems', () => {
    it('should not get a todo item because it does not exist', (done) => {
      chai.request(server).get('/todoitems/' + mongoose.Types.ObjectId()).end((err, res) => {
        // To complete
        done();
      });
    });

    it('should get a todo item', (done) => {
      const aTodoItem = new TodoItem({
        name: 'firstTask',
        status: 'inProgress'
      });
      aTodoItem.save((err, savedTodoItem) => {
        chai.request(server).get('/todoitems/' + savedTodoItem._id).end((err, res) => {
          // To complete
          done();
        });
      });
    });
  });

  describe('/PUT todoitems', () => {
    it('should not put a todo item because it does not exist', (done) => {
      const param = {
        name: 'new name'
      };
      chai.request(server).put('/todoitems/' + mongoose.Types.ObjectId()).send(param).end((err, res) => {
        // To complete
        done();
      });
    });

    it('should put a todo item and update the name value', (done) => {
      const item = new TodoItem({
        name: 'task name',
        status: 'inProgress'
      });
      const param = {
        name: 'new task name'
      };
      item.save(() => {
        chai.request(server).put('/todoitems/' + item._id).send(param).end((err, res) => {

          TodoItem.find({}, (err, items) => {
            // To complete
            done();
          });
        });
      });
    });

    it('should put a todo item and update the status value', (done) => {
      const item = new TodoItem({
        name: 'task name',
        status: 'inProgress'
      });
      const param = {
        status: 'done'
      };
      item.save(() => {
        chai.request(server).put('/todoitems/' + item._id).send(param).end((err, res) => {

          TodoItem.find({}, (err, items) => {
            // To complete
            done();
          });
        });
      });
    });
  });

  describe('/DELETE/:id todoitems', () => {
    it('should not delete a todo item because it does not exist', (done) => {
      chai.request(server).delete('/todoitems/' + mongoose.Types.ObjectId()).end((err, res) => {
        // To complete
        done();
      });
    });

    it('should delete a todo item', (done) => {
      const aTodoItem = new TodoItem({
        name: 'firstTask',
        status: 'inProgress'
      });
      aTodoItem.save((err, savedTodoItem) => {
        chai.request(server).delete('/todoitems/' + savedTodoItem._id).end((err, res) => {

          TodoItem.find({}, (err, res) => {
            // To complete
          });
          done();
        });
      });
    });
  });
});
