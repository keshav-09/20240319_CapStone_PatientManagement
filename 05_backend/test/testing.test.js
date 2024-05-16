const chai = require('chai');
const sinon = require('sinon');
const nodemailer = require('nodemailer');
const Patient = require('../Models/patientSchema');
const Prescription = require('../Models/prescription');
const { addPrescriptions } = require('../Controller/doctorController');

const { expect } = chai;

describe('addPrescriptions', () => {
  let req, res, transporter;

  beforeEach(() => {
    req = {
      body: {
        email: 'test@example.com',
        disease: 'Diabetes',
        medicines: [
          {
            MedicineName: 'Metformin',
            frequency: 'twice a day',
            Period: 30
          },
          {
            MedicineName: 'Insulin',
            frequency: 'once a day',
            Period: 30
          }
        ]
      },
      user: {
        userId: '123456789'
      }
    };

    res = {
      status: sinon.stub().returns({
        json: sinon.stub()
      })
    };

    transporter = {
      sendMail: sinon.stub().resolves()
    };

    sinon.stub(nodemailer, 'createTransport').returns(transporter);
    sinon.stub(Patient, 'findOne').resolves({
      _id: '987654321',
      email: 'test@example.com'
    });
    sinon.stub(Prescription.prototype, 'save').resolves({
      _id: '123456789',
      doctor: '123456789',
      patient: '987654321',
      email: 'test@example.com',
      disease: 'Diabetes',
      medicines: req.body.medicines
    });
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should create a new prescription and send an email', async () => {
    await addPrescriptions(req, res);
    expect(res.status.calledWith(201)).to.be.true;
    expect(res.status().json.calledWith({
      message: 'Prescription saved successfully and email sent.',
      savedPrescription: {
        _id: '123456789',
        doctor: '123456789',
        patient: '987654321',
        email: 'test@example.com',
        disease: 'Diabetes',
        medicines: req.body.medicines
      }
    })).to.be.true;
    expect(transporter.sendMail.called).to.be.true;
  });

  it('should return a 400 error if required fields are missing', async () => {
    req.body = {};
    await addPrescriptions(req, res);
    expect(res.status.calledWith(400)).to.be.true;
    expect(res.status().json.calledWith({ message: 'Missing required fields' })).to.be.true;
  });

  it('should return a 400 error if the email is invalid', async () => {
    req.body.email = 'invalid-email';
    await addPrescriptions(req, res);
    expect(res.status.calledWith(400)).to.be.true;
    expect(res.status().json.calledWith({ message: 'Invalid email' })).to.be.true;
  });

  it('should return a 422 error if the Period field is not a number', async () => {
    req.body.medicines[0].Period = 'thirty';
    await addPrescriptions(req, res);
    expect(res.status.calledWith(422)).to.be.true;
    expect(res.status().json.calledWith({ message: 'Enter the Period in Number' })).to.be.true;
  });

  it('should return a 404 error if the patient is not found', async () => {
    Patient.findOne.resolves(null);
    await addPrescriptions(req, res);
    expect(res.status.calledWith(404)).to.be.true;
    expect(res.status().json.calledWith({ message: 'Patient not found' })).to.be.true;
  });

});