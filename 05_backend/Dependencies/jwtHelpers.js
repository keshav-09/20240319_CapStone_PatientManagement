const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;
const doctorSchema = require("../Models/doctorSchema")
const Patient = require("../Models/patientSchema")

const mongoose = require("mongoose");
// const Doctor = require("../Models/doctorSchema");

/** Middleware helper function to verify JWT token
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @param {Function} next - next function to call
 */
// async function verifyJwt(req, res, next) {
//     // Token is of the format Bearer `token` in the headers
//     const token = req.headers.authorization?.split(" ")[1];

//     // If there is no token
//     if (!token) {
//         return res.status(401).json({ message: "Unauthorized, no JWT found." });
//     }

//     // Verify token
//     try {
//         const decoded = await jwt.verify(token, secret);
//         // Sets user (ID) in the request object
//         req.user = decoded;
//         next();
//     } catch (err) {
//         return res.status(401).json({ message: "Unauthorized JWT" });
//     }
// }
async function verifyJwt(req, res, next) {
    // Token is of the format Bearer `token` in the headers
    const token = req.headers.authorization?.split(" ")[1];

    // If there is no token
    if (!token) {
        return res.status(401).json({ message: "Unauthorized, no JWT found." });
    }

    try {
        // Verify JWT token
        const decoded = jwt.verify(token, secret);

        // If verification succeeds, set user ID in the request object
        req.user = decoded;

        // Proceed to next middleware
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            // JWT token has expired, check for refresh token
            const refreshToken = req.headers.refresh_token;

            if (!refreshToken) {
                return res.status(401).json({ message: "Unauthorized, no refresh token found." });
            }

            try {
                // Verify refresh token
                const decodedRefreshToken = jwt.verify(refreshToken, secret);

                // If verification succeeds, generate new JWT token and proceed
                const newToken = jwt.sign({ userId: decodedRefreshToken.userId }, secret, { expiresIn: '1h' });

                // Set new JWT token in response headers
                res.setHeader('Authorization', `Bearer ${newToken}`);

                // Proceed to next middleware
                next();
            } catch (error) {
                return res.status(401).json({ message: "Unauthorized, invalid refresh token." });
            }
        } else {
            // Other JWT verification errors
            return res.status(401).json({ message: "Unauthorized JWT" });
        }
    }
}

/** Helper function to get the user object from it's ID
 */
async function getUserFromId(userId) {
    const user = await User.findOne({ _id: userId });

    if (!user) {
        return false;
    }
    return user
}

/** Middleware helper function to get and set the user object in request object
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @param {Function} next - next function to call
 */
async function getUserMiddleware(req, res, next) {
    const patient = await getUserFromId(req.Patient.userId);
    if (!patient) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = user;
    next();
}
/**Helper function to get the Patinet ID 
 * 
*/
async function getPatientMiddleware(req, res, next) {
    try {
        // find if  the id is present or not
        const patientId = req.user.userId;
        const patient = await Patient.findOne({ _id: patientId });

        if (!patient) {
            return res.status(401).json({ message: "Patient not found" });
        }

        req.patient = patient;
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
/**Helper function to get the doctor ID 
 * 
*/
async function getDoctorMiddleware(req, res, next) {
    try {
        const doctorId = req.user.userId;
        const doctor = await doctorSchema.findOne({ _id: doctorId });

        if (!doctor) {
            return res.status(401).json({ message: "Doctor not found" });
        }

        req.doctor = doctor;
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { verifyJwt, getUserFromId, getUserMiddleware, getPatientMiddleware,getDoctorMiddleware };
