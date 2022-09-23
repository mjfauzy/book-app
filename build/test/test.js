"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

require("chai/register-should");

var _index = _interopRequireDefault(require("../index"));

_chai["default"].use(_chaiHttp["default"]);

var expect = _chai["default"].expect;
describe('Testing the book endpoint: ', function () {
  it('It should create a book', function (done) {
    var book = {
      title: 'First awesome book',
      price: 'Rp. 250.000',
      description: 'This is the awesome book from testing'
    };

    _chai["default"].request(_index["default"]).post('/api/v1/books').set('Accept', 'application/json').send(book).end(function (err, res) {
      expect(res.status).to.equal(201);
      expect(res.body.data).to.include({
        id: 1,
        title: book.title,
        price: book.price,
        description: book.description
      });
      done();
    });
  });
  it('It should get all books', function (done) {
    _chai["default"].request(_index["default"]).get('/api/v1/books').set('Accept', 'application/json').end(function (err, res) {
      expect(res.status).to.equal(200);
      res.body.data[0].should.have.property('id');
      res.body.data[0].should.have.property('title');
      res.body.data[0].should.have.property('price');
      res.body.data[0].should.have.property('description');
      done();
    });
  });
  it('It should get a books', function (done) {
    var bookId = 1;

    _chai["default"].request(_index["default"]).get("/api/v1/books/".concat(bookId)).set('Accept', 'application/json').end(function (err, res) {
      expect(res.status).to.equal(200);
      res.body.data.should.have.property('id');
      res.body.data.should.have.property('title');
      res.body.data.should.have.property('price');
      res.body.data.should.have.property('description');
      done();
    });
  });
  it('It should not get a particular book with invalid id', function (done) {
    var bookId = 9999;

    _chai["default"].request(_index["default"]).get("/api/v1/books/".concat(bookId)).set('Accept', 'application/json').end(function (err, res) {
      expect(res.status).to.equal(404);
      res.body.should.have.property('message').eql("Cannot find book with the id: ".concat(bookId));
      done();
    });
  });
  it('It should not get a particular book with non-numeric id', function (done) {
    var bookId = 'aaaa';

    _chai["default"].request(_index["default"]).get("/api/v1/books/".concat(bookId)).set('Accept', 'application/json').end(function (err, res) {
      expect(res.status).to.equal(400);
      res.body.should.have.property('message').eql('Please input a valid numeric value.');
      done();
    });
  });
  it('It should update a book', function (done) {
    var bookId = 1;
    var updatedBook = {
      id: bookId,
      title: 'Updated book title',
      price: 'Rp. 500.000',
      description: 'This is updated book'
    };

    _chai["default"].request(_index["default"]).put("/api/v1/books/".concat(bookId)).set('Accept', 'application/json').send(updatedBook).end(function (err, res) {
      expect(res.status).to.equal(200);
      expect(res.body.data.id).equal(updatedBook.id);
      expect(res.body.data.title).equal(updatedBook.title);
      expect(res.body.data.price).equal(updatedBook.price);
      expect(res.body.data.description).equal(updatedBook.description);
      done();
    });
  });
  it('It should not update a book with invalid id', function (done) {
    var bookId = 9999;
    var updatedBook = {
      id: bookId,
      title: 'Updated book title',
      price: 'Rp. 500.000',
      description: 'This is updated book'
    };

    _chai["default"].request(_index["default"]).put("/api/v1/books/".concat(bookId)).set('Accept', 'application/json').send(updatedBook).end(function (err, res) {
      expect(res.status).to.equal(404);
      res.body.should.have.property('message').eql("Cannot find book with the id: ".concat(bookId));
      done();
    });
  });
  it('It should not update a book with non-numeric id', function (done) {
    var bookId = 'aaaa';
    var updatedBook = {
      id: bookId,
      title: 'Updated book title',
      price: 'Rp. 500.000',
      description: 'This is updated book'
    };

    _chai["default"].request(_index["default"]).put("/api/v1/books/".concat(bookId)).set('Accept', 'application/json').send(updatedBook).end(function (err, res) {
      expect(res.status).to.equal(400);
      res.body.should.have.property('message').eql('Please input a valid numeric value.');
      done();
    });
  });
  it('It should delete a book', function (done) {
    var bookId = 1;

    _chai["default"].request(_index["default"])["delete"]("/api/v1/books/".concat(bookId)).set('Accept', 'application/json').end(function (err, res) {
      expect(res.status).to.equal(200);
      expect(res.body.data).to.include({});
      done();
    });
  });
  it('It should not delete a book with invalid id', function (done) {
    var bookId = 9999;

    _chai["default"].request(_index["default"])["delete"]("/api/v1/books/".concat(bookId)).set('Accept', 'application/json').end(function (err, res) {
      expect(res.status).to.equal(404);
      res.body.should.have.property('message').eql("Book with the id ".concat(bookId, " cannot be found"));
      done();
    });
  });
  it('It should not delete a book with non-numeric id', function (done) {
    var bookId = 'aaaa';

    _chai["default"].request(_index["default"])["delete"]("/api/v1/books/".concat(bookId)).set('Accept', 'application/json').end(function (err, res) {
      expect(res.status).to.equal(400);
      res.body.should.have.property('message').eql('Please input a valid numeric value.');
      done();
    });
  });
});
//# sourceMappingURL=test.js.map