const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require('../app');

chai.should();
chai.use(chaiHttp);

describe('sign in', () => {
    describe('Test SignIn POST', () => {
        it('should return user', (done) => {
            chai.request()
            const user = {
                email: 'reed@ibqsystems.com',
                password: 'Bushums24!'
            };
            chai.request(app)                
                .post("/signIn")
                .send(user)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('auth')
                    response.body.should.have.property('user')
                    done();
                });
        });

        it('should return error', (done) => {
            chai.request()
            const user = {
                email: 'reedhop@ibqsystems.com',
                password: 'Bushums24!'
            };
            chai.request(app)                
                .post("/signIn")
                .send(user)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('status').eq('error');
                    response.body.should.have.property('message').eq('User Not Found');
                    done();
                });
        });

        it('should return error', (done) => {
            chai.request()
            const user = {
                email: 'reed@ibqsystems.com',
                password: 'Bushumss24!'
            };
            chai.request(app)                
                .post("/signIn")
                .send(user)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('status').eq('error');
                    response.body.should.have.property('message').eq('Invalid Password');
                    done();
                });
        });
    });

    describe('Test Register POST', () => {
        it('should not return auth', (done) => {
            chai.request()
            const user = {
                email: 'brian.hopkins@ibqsystems.com',
                password: 'Bushums24!'
            };
            chai.request(app)                
                .post("/register")
                .send(user)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.auth === undefined;
                    response.body.should.have.property('user');
                    done();
                });
        });

        it('should return auth', (done) => {
            chai.request()
            const user = {
                email: 'reed@ibqsystems.com',
                password: 'Bushums24!'
            };
            chai.request(app)                
                .post("/register")
                .send(user)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('status').eq('error');
                    response.body.should.have.property('message').eq('Email Already Registered');
                    done();
                });
        });
    });


    describe('Test New Company POST', () => {
        it('should return the new Company', (done) => {
            chai.request()
            const reqBody = {
                companyName: 'test company'
            };
            chai.request(app)                
                .post("/newCompany")
                .send(reqBody)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('CompanyName').eq('test company');
                    done();
                });
        });
    });

    describe('All users GET', () => {
        it('should return all of the Users', (done) => {
            chai.request()
            chai.request(app)                
                .get("/getUsers?companyID=3a4736ff-9217-4f57-858c-3a562743f9e5")
                .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiMTEyMDQ0MjMwNTEyOTgwNTg5NTcxIiwiaWF0IjoxNjE1ODI2MjIwfQ.ILDPhHvyQ2kVYaiyVoL7IPIkqAKtol1Ykjst7ot8lv8')
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    response.body.should.not.be.empty;
                    done();
                });
        });

        it('should not return any users', (done) => {
            chai.request()
            chai.request(app)                
                .get("/getUsers?companyID=fakeCompanyID")
                .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiMTEyMDQ0MjMwNTEyOTgwNTg5NTcxIiwiaWF0IjoxNjE1ODI2MjIwfQ.ILDPhHvyQ2kVYaiyVoL7IPIkqAKtol1Ykjst7ot8lv8')
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('status').eq('error');
                    response.body.should.have.property('message').eq('Invalid CompanyID');
                    done();
                });
        });
    });


    describe('Company GET', () => {
        it('should return company and user object', (done) => {
            chai.request()
            chai.request(app)                
                .get("/getCompany?companyID=3a4736ff-9217-4f57-858c-3a562743f9e5&email=reed@ibqsystems.com")
                .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiMTEyMDQ0MjMwNTEyOTgwNTg5NTcxIiwiaWF0IjoxNjE1ODI2MjIwfQ.ILDPhHvyQ2kVYaiyVoL7IPIkqAKtol1Ykjst7ot8lv8')
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('user');
                    response.body.should.have.property('currCompany');
                    done();
                });
        });

        it('should error on invalid company', (done) => {
            chai.request()
            chai.request(app)                
                .get("/getCompany?companyID=fakeCompany&email=reed@ibqsystems.com")
                .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiMTEyMDQ0MjMwNTEyOTgwNTg5NTcxIiwiaWF0IjoxNjE1ODI2MjIwfQ.ILDPhHvyQ2kVYaiyVoL7IPIkqAKtol1Ykjst7ot8lv8')
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('status').eq('error');
                    response.body.should.have.property('message').eq('Invalid CompanyID');
                    done();
                });
        });

        it('should error on invalid email', (done) => {
            chai.request()
            chai.request(app)                
                .get("/getCompany?companyID=3a4736ff-9217-4f57-858c-3a562743f9e5&email=reese@ibqsystems.com")
                .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiMTEyMDQ0MjMwNTEyOTgwNTg5NTcxIiwiaWF0IjoxNjE1ODI2MjIwfQ.ILDPhHvyQ2kVYaiyVoL7IPIkqAKtol1Ykjst7ot8lv8')
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('status').eq('error');
                    response.body.should.have.property('message').eq('Invalid Email');
                    done();
                });
        });
    });

    describe('Delete User POST', () => {
        it('should succesfully delete user', (done) => {
            chai.request()
            const reqBody = {
                userID: 'ad25a828-086e-4878-aba4-13ef87eb61aa',
                email: "kaylee@live.com"
            };
            chai.request(app)                
                .post("/deleteUser")
                .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiMTEyMDQ0MjMwNTEyOTgwNTg5NTcxIiwiaWF0IjoxNjE1ODI2MjIwfQ.ILDPhHvyQ2kVYaiyVoL7IPIkqAKtol1Ykjst7ot8lv8')
                .send(reqBody)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('status').eq('success');
                    response.body.should.have.property('message').eq('Succesfully deleted kaylee@live.com');
                    done();
                });
        });

        it('should error on invalid email', (done) => {
            chai.request()
            const reqBody = {
                userID: '0ab53904-694e-4add-8622-8b54a531aeab',
                email: "reese@ibqsystems.com"
            };
            chai.request(app)                
                .post("/deleteUser")
                .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiMTEyMDQ0MjMwNTEyOTgwNTg5NTcxIiwiaWF0IjoxNjE1ODI2MjIwfQ.ILDPhHvyQ2kVYaiyVoL7IPIkqAKtol1Ykjst7ot8lv8')
                .send(reqBody)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('status').eq('error');
                    response.body.should.have.property('message').eq('User reese@ibqsystems.com not found');
                    done();
                });
        });
    });
});