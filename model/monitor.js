const mongoose = require('mongoose');
const Joi = require('joi');
const JoiExtended = require('../startup/validation');

const monitorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 55,
        trim: true,
    },
    surname: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 55,
        trim: true,
    },
    username: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 55,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 255,
    },
    address: {
        type: String,
        maxLength: 255,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 13,
        trim: true,
    },
    postalCode: {
        type: String,
        minLength: 4,
        maxLength: 10,
    },
    certification: {
        type: String, // TODO: add enum att to certification
        minLength: 1,
        maxLength: 6,
        trim: true,
        required: true,
    },
    certificationDate: {
        type: Date,
    },
    state: {
        type: String, //TODO add enum for monitor state
        trim: true,
        default: null,
    },
    agency: mongoose.Types.ObjectId,
});

const Monitor = mongoose.model('Monitor', monitorSchema);

function validateSchema(monitor) {
    const schema = {
        username: Joi.string().min(4).max(55).required(),
        name: Joi.string().min(4).max(55).required(),
        surname: Joi.string().min(4).max(55).required(),
        email: JoiExtended.string().min(5).max(255).email()
            .required(),
        password: Joi.string().min(8).max(255).required(),
        address: Joi.string().max(255).min(5),
        phone: JoiExtended.string().phone().required(),
        postalCode: Joi.string().min(4).max(10),
        certification: Joi.string().min(1).max(6).required(), // TODO: add joi validation for monitor certification  type with enum
        certificationDate: Joi.date(),
        state: Joi.string(), // TODO: add joi validation for state enum
        agency: JoiExtended.string().objectId().required(),

};
    return Joi.validate(monitor, schema);
}

exports.monitorSchema = monitorSchema;
exports.Monitor = Monitor;
exports.validate = validateSchema;
