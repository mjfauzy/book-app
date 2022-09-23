import chai from 'chai';
import chatHttp from 'chai-http';
import 'chai/register-should';
import app from '../index';

chai.use(chatHttp);
const { expect } = chai;

describe('Testing the book endpoint: ', () => {
	it('It should create a book', (done) => {
		const book = {
			title: 'First awesome book',
			price: 'Rp. 250.000',
			description: 'This is the awesome book from testing'
		};

		chai.request(app)
			.post('/api/v1/books')
			.set('Accept', 'application/json')
			.send(book)
			.end((err, res) => {
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

	it('It should get all books', (done) => {
		chai.request(app)
			.get('/api/v1/books')
			.set('Accept', 'application/json')
			.end((err, res) => {
				expect(res.status).to.equal(200);
				res.body.data[0].should.have.property('id');
				res.body.data[0].should.have.property('title');
				res.body.data[0].should.have.property('price');
				res.body.data[0].should.have.property('description');
				done();
			});
	});

	it('It should get a books', (done) => {
		const bookId = 1;
		chai.request(app)
			.get(`/api/v1/books/${bookId}`)
			.set('Accept', 'application/json')
			.end((err, res) => {
				expect(res.status).to.equal(200);
				res.body.data.should.have.property('id');
				res.body.data.should.have.property('title');
				res.body.data.should.have.property('price');
				res.body.data.should.have.property('description');
				done();
			});
	});

	it('It should not get a particular book with invalid id', (done) => {
		const bookId = 9999;
		chai.request(app)
			.get(`/api/v1/books/${bookId}`)
			.set('Accept', 'application/json')
			.end((err, res) => {
				expect(res.status).to.equal(404);
				res.body.should.have.property('message').eql(`Cannot find book with the id: ${bookId}`);
				done();
			});
	});

	it('It should not get a particular book with non-numeric id', (done) => {
		const bookId = 'aaaa';
		chai.request(app)
			.get(`/api/v1/books/${bookId}`)
			.set('Accept', 'application/json')
			.end((err, res) => {
				expect(res.status).to.equal(400);
				res.body.should.have.property('message').eql('Please input a valid numeric value.');
				done();
			});
	});

	it('It should update a book', (done) => {
		const bookId = 1;
		const updatedBook = {
			id: bookId,
			title: 'Updated book title',
			price: 'Rp. 500.000',
			description: 'This is updated book'
		};
		chai.request(app)
			.put(`/api/v1/books/${bookId}`)
			.set('Accept', 'application/json')
			.send(updatedBook)
			.end((err, res) => {
				expect(res.status).to.equal(200);
				expect(res.body.data.id).equal(updatedBook.id);
				expect(res.body.data.title).equal(updatedBook.title);
				expect(res.body.data.price).equal(updatedBook.price);
				expect(res.body.data.description).equal(updatedBook.description);
				done();
			});
	});

	it('It should not update a book with invalid id', (done) => {
		const bookId = 9999;
		const updatedBook = {
			id: bookId,
			title: 'Updated book title',
			price: 'Rp. 500.000',
			description: 'This is updated book'
		};
		chai.request(app)
			.put(`/api/v1/books/${bookId}`)
			.set('Accept', 'application/json')
			.send(updatedBook)
			.end((err, res) => {
				expect(res.status).to.equal(404);
				res.body.should.have.property('message').eql(`Cannot find book with the id: ${bookId}`);
				done();
			});
	});

	it('It should not update a book with non-numeric id', (done) => {
		const bookId = 'aaaa';
		const updatedBook = {
			id: bookId,
			title: 'Updated book title',
			price: 'Rp. 500.000',
			description: 'This is updated book'
		};
		chai.request(app)
			.put(`/api/v1/books/${bookId}`)
			.set('Accept', 'application/json')
			.send(updatedBook)
			.end((err, res) => {
				expect(res.status).to.equal(400);
				res.body.should.have.property('message').eql('Please input a valid numeric value.');
				done();
			});
	});

	it('It should delete a book', (done) => {
		const bookId = 1;
		chai.request(app)
			.delete(`/api/v1/books/${bookId}`)
			.set('Accept', 'application/json')
			.end((err, res) => {
				expect(res.status).to.equal(200);
				expect(res.body.data).to.include({});
				done();
			});
	});

	it('It should not delete a book with invalid id', (done) => {
		const bookId = 9999;
		chai.request(app)
			.delete(`/api/v1/books/${bookId}`)
			.set('Accept', 'application/json')
			.end((err, res) => {
				expect(res.status).to.equal(404);
				res.body.should.have.property('message').eql(`Book with the id ${bookId} cannot be found`);
				done();
			});
	});

	it('It should not delete a book with non-numeric id', (done) => {
		const bookId = 'aaaa';
		chai.request(app)
			.delete(`/api/v1/books/${bookId}`)
			.set('Accept', 'application/json')
			.end((err, res) => {
				expect(res.status).to.equal(400);
				res.body.should.have.property('message').eql('Please input a valid numeric value.');
				done();
			});
	});
});