const supertest = require('supertest');
const request = supertest('http://localhost:3030');
const user_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyYW5rIjoib2ZmaWNlciIsImlhdCI6MTY1NjU3MTU2MCwiZXhwIjoxNjU3MTc2MzYwfQ.DTlSed2KTHEPnKL7Q41LvRw8GvWCwW8zLkr3ylPtm_M';
const visitor_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QxMjMiLCJpYXQiOjE2NTY1NzE1MzYsImV4cCI6MTY1NzE3NjMzNn0.yt3ivhSIJL9YzPffESOqCiOqEHMPDXGr3Wph-0-77eM';

describe('Express Route Test', function () {

	
	it('user login successfully', async () => {
		return request
			.post('/login/user')
			.send({username: "test123", password: "password" })
			.expect('Content-Type', /json/)
			.expect(200).then(response => {
				expect(response.body).toEqual(
					expect.objectContaining({
						username: expect.any(String),
						name: expect.any(String),
						rank: expect.any(String),
						phone: expect.any(String),
						token: expect.any(String),
					})
				);
			});
	});

	it('visitor login successfully', async () => {
		return request
			.post('/login/visitor')
			.send({username: "test123", password: "password" })
			.expect('Content-Type', /json/)
			.expect(200).then(response => {
				expect(response.body).toEqual(  
					expect.objectContaining({
						username: expect.any(String),
						name: expect.any(String),
						age: expect.any(Number),
						gender: expect.any(String),
						// Address: expect.objectContaining({
						// 	Road: expect.any(String),
						// 	Zipcode: expect.any(Number),
						// 	State: expect.any(String)
						// }),
						relation: expect.any(String),
					})
				);
			});
	});


	it('register user', async () => {
		return request
			.post('/register/user')
			.send({
				username: "testing",
				password: "password",
				name: "azrin",
				officerno: 756,
				rank: "user",
				phone: "0178456789" })
			.expect('Content-Type', /json/)
			.expect(200).then(response => {
				expect(response.body.reg.status).toEqual("Succesfully register user")
			});
	});

	it('register visitor', async () => {
		return request
			.post('/register/visitor')
			.send({
				username: "testing",
				password: "password",
				name: "aishah",
				age: 23,
				gender: "female",
				road: "no 2 jalan tuah",
				zipcode: 76100,
				state: "melaka",
				relation: "husband" })
			.expect('Content-Type', /json/)
			.expect(200).then(response => {
				expect(response.body.reg.status).toEqual("Succesfully register Visitor")
			});
	});

	it('register inmate', async () => {
		return request
			.post('/register/inmate')
			.set('authorization', 'Bearer '+ user_token) //set token to header
			.send({
				inmateno: 13,
				firstname: "test",
				lastname: "uji",
				age: 33,
			  gender: "male", })
			.expect('Content-Type', /json/)
			.expect(200).then(response => {
				expect(response.body.status).toEqual("Succesfully register inmate")
			});
	});

	it('register visitorlog', async () => {
		return request
			.post('/register/visitorlog')
			.set('authorization', 'Bearer '+ user_token) //set token to header
			.send({
				logno: 12,
        username: "azfan",
				inmateno: 23,
				dateofvisit: "12 jun 2022",
				timein: "9:00",
				timeout: "12:00",			
        purpose: "miss",
        officerno: 1234,
        insertby: "nizam" })
			.expect('Content-Type', /json/)
			.expect(200).then(response => {
				expect(response.body.status).toEqual("Succesfully register visitorlog")
			});
	});

	it('user update', async () => {
		return request
			.patch('/user/update')
			.set('authorization', 'Bearer '+ user_token) //set token to header
			.send({
				username: "azfan",
			  name: "test1", 
				phone: "0123476788"})
			.expect('Content-Type', /json/)
			.expect(200).then(response => {
				expect(response.body.status).toEqual("Information updated");
			});
	});

	it('visitor update', async () => {
		return request
			.patch('/visitor/update')
			.set('authorization', 'Bearer '+ visitor_token) //set token to header
			.send({
				username: "test123",
			  name: "aishah01",
				age: 25,
				gender: "female",
				road: "no 2 jalan tuah jaya",
				zipcode: 76100,
				state: "melaka",
				relation: "husband" })
			.expect('Content-Type', /json/)
			.expect(200).then(response => {
				expect(response.body.status).toEqual("Information updated");
			});
	});

	// it('inmate update', async () => {
	// 	return request
	// 		.patch('/inmate/update')
	// 		.set('authorization', 'Bearer '+ user_token) //set token to header
	// 		.send({
	// 			username: "azfan",
	// 		  name: "test1", 
	// 			phone: "0123476788"})
	// 		.expect('Content-Type', /json/)
	// 		.expect(200).then(response => {
	// 			expect(response.body.status).toEqual("Information updated");
	// 		});
	// });

	it('delete user', async () => {
		return request
			.delete('/delete/user')
			.set('authorization', 'Bearer '+ user_token) //set token to header
			.send({
				username: "testing" })
			.expect('Content-Type', /json/)
			.expect(200).then(response => {
				expect(response.body.status).toEqual("User deleted!");
			});
	});

	it('delete visitor', async () => {
		return request
			.delete('/delete/visitor')
			.set('authorization', 'Bearer '+ user_token) //set token to header
			.send({
				username: "testing" })
			.expect('Content-Type', /json/)
			.expect(200).then(response => {
				expect(response.body.status).toEqual("Visitor deleted!");
			});
	});

	it('delete inmate', async () => {
		return request
			.delete('/delete/inmate')
			.set('authorization', 'Bearer '+ user_token) //set token to header
			.send({
				Inmateno: 13})
			.expect('Content-Type', /json/)
			.expect(200).then(response => {
				expect(response.body.status).toEqual("Inmate deleted!");
			});
	});

	it('delete visitorlog', async () => {
		return request
			.delete('/delete/visitorlog')
			.set('authorization', 'Bearer '+ user_token) //set token to header
			.send({
				Logno: 12})
			.expect('Content-Type', /json/)
			.expect(200).then(response => {
				expect(response.body.status).toEqual("VisitorLog deleted!");
			});
	});

});
