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
});
