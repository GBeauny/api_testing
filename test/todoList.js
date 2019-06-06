const mongoose = require('mongoose');
const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const expect = chai.expect;

const server = require('../index');
const todoItem = require('../api/model/TodoItem');
const TodoItem = mongoose.model('TodoItem', todoItem);

chai.use(chaiHttp);

describe('TodoList', () => {
  beforeEach((done) => {
    TodoItem.remove({}, () => {
      done();
    });
  });
  describe('/GET todoitems', () => {
    it('should get all todo items when no items are in database', (done) => {
      chai.request(server).get('/todoitems').end((err, res) => {
        expect(res).to.have.status(200);
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.should.be.json;
        res.body.length.should.be.eql(0);
        done();
      });
    });
  });
  describe('/GET todoitem', () => {
    it('should get an error 404', (done) => {
      chai.request(server).get('/todoitem').end((err, res) => {
        expect(res).to.have.status(404);
        expect(res).to.have.header('content-length', 39)
        res.should.be.json;
        done();
      });
    });
  });
  describe('/POST todoitems', () => {
    it('should get an error 500', (done) => {
      const param = {
        status: 'test'
      };
      chai.request(server).post('/todoitems').send(param).end((err, res) => {
        expect(res).to.have.status(500);
        res.body.should.be.a('object');
        res.should.be.json;
        done();
      });
    });
  });
  describe('/DELETE todoitems', () => {
    it('should delete a todo item', (done) => {
      const aTodoItem = new TodoItem({
        name: 'firstTask',
        status: 'inProgress'
      });
      aTodoItem.save((err, savedTodoItem) => {
        chai.request(server).delete('/todoitems/' + savedTodoItem._id).end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          TodoItem.find({}, (err, res) => {
            res.length.should.eql(0);
          });
          done();
        });
      });
    });
  });
  describe('/PUT todoitems', () => {
  });
});
