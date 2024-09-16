const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');


const sponsorSchema = mongoose.Schema(
  {
    FullName: {
      type: String,
      required: true,
      trim: true,
    },
     CompanyName: {
          type: String,
          required: true,
          trim: true,
        },
    CompanyEmail: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    
    AreaOfSponsorship: {
      type: String,
      default: 'sponsor',
    },
    PaymentFrequency: {
        type: String,
        required: true,
        enum: ["One-off","Monthly","Quarterly","Yearly"],
        default: "One-off",
      },
    },
    );

// add plugin that converts mongoose to json
sponsorSchema.plugin(toJSON);
sponsorSchema.plugin(paginate);



/**
 * @typedef Sponsor
 */
const Sponsor = mongoose.model('Sponsor', sponsorSchema);

module.exports = Sponsor;
