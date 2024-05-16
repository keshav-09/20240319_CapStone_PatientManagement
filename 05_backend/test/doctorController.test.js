// const chai = require('chai');
// const chaiHttp = require('chai-http');

// const should = chai.should();
// const Patient = require("../Models/patientSchema");
// const doctoController = require("../Controller/doctorController")
// const Doctor = require("../Models/doctorSchema");
// const Prescription = require("../Models/prescription");

// const { verifyJwt, getUserMiddleware, getPatientMiddleware } = require("../Dependencies/jwtHelpers");
// const jwt = require('jsonwebtoken')


// chai.use(chaiHttp);
// describe('doctorLogin', () => {
//     describe('POST /doctor/Doclogin', () => {
//         it("doctor email and the password should be right", async () => {
//             const body = {
//                 email: "harsha1@gmail.com",
//                 password: "harsha@"
//             };
//             try {
//                 const res = await chai.request("http://localhost:3000")
//                     .post("/doctor/Doclogin")
//                     .send(body);
//                 res.should.have.status(200);
//                 res.body.should.have.property('token'); 
//                 authToken = res.body.token;
//                 console.log(authToken) 
//             } catch (err) {
//                 throw err;
//             }
//         });
        
//         it("should return an error if doctor email or password is incorrect", async () => {
//             const body = {
//                 email: "incorrectemail@gmail.com",
//                 password: "incorrectpassword"
//             };
//             chai.request("http://localhost:3000")
//             .post("/doctor/Doclogin")
//             .send(body)
//             .end((err,res)=>{
//                 res.should.have.status(401);
//                 res.body.should.have.property('message').eql('Invalid email or password');
//             })

//         });
//     });
// });


// describe('Prescription API', () => {
//     describe('POST /doctor/prescriptions', () => {
//         it('should add a new prescription and send an email', function (done) {
//             this.timeout(10000);

//             const Token = authToken;
//             const prescriptionData = {
//                 email: 'keshav09khandelwal@gmail.com',
//                 disease: 'cold',
//                 medicines: [
//                     {
//                         MedicineName: 'Paracetamol',
//                         frequency: '3 times a day',
//                         Period: 3
//                     }
//                 ]
//             };

//             chai.request("http://localhost:3000")
//                 .post('/doctor/prescriptions')
//                 .set('Authorization', `Bearer ${Token}`)
//                 .send(prescriptionData)
//                 .end((err, res) => {
//                     res.should.have.status(201);
//                     res.body.should.be.an('object');
//                     res.body.should.have.property('message').eql('Prescription saved successfully and email sent.');
//                     res.body.should.have.property('savedPrescription');


//                     done();
//                 });
//         });

//         it('should return an error if required fields are missing', function (done) {
//             const Token = authToken;
//             const invalidPrescriptionData = {
//                 // Missing 'email' field intentionally to trigger validation error
//                 disease: 'cold',
//                 medicines: [
//                     {
//                         MedicineName: 'Paracetamol',
//                         frequency: '3 times a day',
//                         Period: 3
//                     }
//                 ]
//             };
//             chai.request("http://localhost:3000")
//                 .post('/doctor/prescriptions')
//                 .set('Authorization', `Bearer ${Token}`)
//                 .send(invalidPrescriptionData)
//                 .end((err, res) => {
//                     res.should.have.status(400);
//                     res.body.should.be.an('object');
//                     res.body.should.have.property('message').eql('Missing required fields');

//                     done();
//                 });
//         });
//         it('should return an error if Disease is missing ', function (done) {
//             const Token = authToken;
//             const invalidPrescriptionDataByDisease = {
                
//                 email: "khandelwal@gmail.com",
//                 medicines: [
//                     {
//                         MedicineName: 'Paracetamol',
//                         frequency: '3 times a day',
//                         Period: 3
//                     }
//                 ]
//             };
//             chai.request("http://localhost:3000")
//                 .post('/doctor/prescriptions')
//                 .set('Authorization', `Bearer ${Token}`)
//                 .send(invalidPrescriptionDataByDisease)
//                 .end((err, res) => {
//                     res.should.have.status(400); 
//                     res.body.should.be.an('object');
//                     res.body.should.have.property('message').eql('Missing required fields');

//                     done();
//                 });
//         });
//         it('should return an error if patient email is not found', function (done) {
//             const Token = authToken;

//             const prescriptionData = {
//                 email: 'nonexistent@example.com',
//                 disease: 'cold',
//                 medicines: [
//                     {
//                         MedicineName: 'Paracetamol',
//                         frequency: '3 times a day',
//                         Period: 3
//                     }
//                 ]
//             };

//             chai.request("http://localhost:3000")
//                 .post('/doctor/prescriptions')
//                 .set('Authorization', `Bearer ${Token}`)
//                 .send(prescriptionData)
//                 .end((err, res) => {
//                     res.should.have.status(404);
//                     res.body.should.be.an('object');
//                     res.body.should.have.property('message').eql('Patient not found');

//                     done();
//                 });


//         });
//         it('should return an error is the medicine information in not field', function (done) {
//             this.timeout(10000);
//             const Token = authToken;
//             const prescriptionDataWithoutMedicine = {
//                 email: 'keshav09khandelwal@gmail.com',
//                 disease: 'cold',
//                 medicines: [
//                     {
//                         MedicineName: 'Paracetamol',
//                         frequency: ''
//                     }
//                 ]
//             };
//             chai.request("http://localhost:3000")
//                 .post("/doctor/prescriptions")
//                 .set('Authorization', `Bearer ${Token}`)
//                 .send(prescriptionDataWithoutMedicine)
//                 .end((err, res) => {
//                     res.should.have.status(500);
//                     res.should.be.an('object');
//                     res.body.should.have.property('message').eql('Error saving prescription');
//                     done();
//                 })
//         })
//     });
// })

// describe('searchByEmail', () => {
//     describe('POST /doctor/search', () => { 
//         it("should search the email id and display", async () => { 
//             const email = {
//                 email: "khandelwalkh@rknec.edu"
//             };
//             chai.request("http://localhost:3000")
//                 .post("/doctor/search")
//                 .send(email)
//                 .end((err, res) => {
//                     res.should.have.status(200);

                   
//                 });
//         });
        
//         it("should give the error if the email is not present", async() => {
//           const email={
//             email:"jjjaa@gmail.com"

//           } 
//           chai.request("http://localhost:3000")
//           .post("/doctor/search")
//           .send(email)
//           .end((err,res) =>{
//              res.should.have.status(404)
//             //  res.body.should.have.property('message').eql('No prescriptions found for the patient with the provided email.');
//            })   
        
//         })
//     });
// });




// const sinon = require('sinon');
// const { expect } = require('chai');
// const Doctor = require("../Models/doctorSchema");

// const doctorStub = sinon.stub(Doctor, 'findOne');

// describe('Doctor Login API', () => {
//     describe('POST /doctor/Doclogin', () => {
//         beforeEach(() => {
//             doctorStub.reset();
//         });

//         afterEach(() => {
//             sinon.restore();
//         });

//         it("should authenticate doctor with correct email and password", async () => {
//             doctorStub.withArgs({ email: "harsha1@gmail.com", password: "harsha@" }).resolves({});

//             const body = {
//                 email: "harsha1@gmail.com",
//                 password: "harsha@"
//             };

//             try {
//                 const doctor = await Doctor.findOne({ email: body.email, password: body.password });
//                 expect(doctor).to.exist;
//             } catch (err) {
//                 throw err;
//             }
//         });

//         it("should return an error if doctor email or password is incorrect", function()  {
//             // Increase the timeout for this test
//             this.timeout(10000);

//             doctorStub.withArgs({ email: "incorrectemail@gmail.com", password: "incorrectpassword" }).rejects(new Error('Invalid credentials'));

//             const body = {
//                 email: "incorrectemail@gmail.com",
//                 password: "incorrectpassword"
//             };

//             try {
//                 Doctor.findOne({ email: body.email, password: body.password });
//                 throw new Error("Invalid credentials");
//             } catch (err) {
//                 expect(err).to.exist;
//                 expect(err.message).to.equal('Invalid credentials');
//             }
//         });
//     });
// });




