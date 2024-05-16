const chai = require("chai");
const { mockReq, mockRes } = require("sinon-express-mock");
const { expect } = chai;
const sinon = require("sinon");
const { addPrescriptions } = require("../Controller/doctorController");
const Patient = require("../Models/patientSchema");
const Prescription = require("../Models/prescription");
const nodemailer = require("nodemailer");

describe("Doctor Controller", () => {
  describe("addPrescriptions()", () => {
    let req;
    let res;

    beforeEach(() => {
      req = mockReq();
      res = mockRes();
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    });

    afterEach(() => {
      sinon.restore();
    });

    it("should return 400 if required fields are missing", async () => {
      // Case 1: Missing email
      req.body = { disease: "Flu", medicines: [] };
      await addPrescriptions(req, res);
      sinon.assert.calledWith(res.status, 400);
      sinon.assert.calledWith(res.json, sinon.match({ message: "Missing required fields" }));

      // Case 2: Missing disease
      req.body = { email: "test@example.com", medicines: [] };
      await addPrescriptions(req, res);
      sinon.assert.calledWith(res.status, 400);
      sinon.assert.calledWith(res.json, sinon.match({ message: "Missing required fields" }));

      // Case 3: Missing medicines
      req.body = { email: "test@example.com", disease: "Flu" };
      await addPrescriptions(req, res);
      sinon.assert.calledWith(res.status, 400);
      sinon.assert.calledWith(res.json, sinon.match({ message: "Missing required fields" }));

      // Case 4: Medicines not an array
      req.body = { email: "test@example.com", disease: "Flu", medicines: "not an array" };
      await addPrescriptions(req, res);
      sinon.assert.calledWith(res.status, 400);
      sinon.assert.calledWith(res.json, sinon.match({ message: "Missing required fields" }));

      // Case 5: Empty array of medicines
      req.body = { email: "test@example.com", disease: "Flu", medicines: [] };
      await addPrescriptions(req, res);
      sinon.assert.calledWith(res.status, 400);
      sinon.assert.calledWith(res.json, sinon.match({ message: "Missing required fields" }));
    });

    it("should return 404 if patient is not found", async () => {
      req.body = { email: "test@example.com", disease: "Flu", medicines: [] };
      sinon.stub(Patient, 'findOne').resolves(null);
      await addPrescriptions(req, res);
      expect(res.status.calledWith(404))
      expect(res.json.calledWith({ message: 'Patient not found' }));
    });
    
    it("should throw an error if data is not an object", async () => {
      req.body = "not an object"; 
      await addPrescriptions(req, res);
      sinon.assert.calledWith(res.status, 404); 
      sinon.assert.calledWith(res.json, sinon.match({ message: "Data must be an object" })); 
    });

    it("should return 400 if email id is wrong", async () => {
      req.body = { email: "testxample.com", disease: "Flu", medicines: [] };
      await addPrescriptions(req, res);
      expect(res.status.calledWith(400)).to.be.true;
      sinon.assert.calledWith(res.json, sinon.match({ message: "Missing required fields" }));
    });

    it("should save the prescription and send an email", async () => {
      const patient = { _id: "patientId", email: "test@example.com" };
      const medicines = [{ MedicineName: "Paracetamol", frequency: "3 times a day", Period: 3 }];
      const prescriptionData = {
        doctor: "doctorId",
        patient: patient._id,
        email: patient.email,
        disease: "Flu",
        medicines,
      };

      req.body = { email: patient.email, disease: "Flu", medicines };
      req.user = { userId: "doctorId" };

      sinon.stub(Patient, "findOne").resolves(patient);
      sinon.stub(Prescription.prototype, "save").resolves(prescriptionData);

      const expectedResponse = {
        message: "Prescription saved successfully and email sent.",
        savedPrescription: prescriptionData
      };

      const transporter = {
        sendMail: sinon.stub().resolves()
      };
      sinon.stub(nodemailer, "createTransport").returns(transporter);

      await addPrescriptions(req, res);

      sinon.assert.calledWith(res.status, 201);
      sinon.assert.calledWith(res.json, sinon.match(expectedResponse));
      sinon.assert.calledOnce(transporter.sendMail);
    });
  });
});
