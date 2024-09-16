const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');


const costSchema = mongoose.Schema(
  {
    CostBreakD: {
      type: String,
      required: true,
      trim: true,
    },
     PastAchievement: {
          type: String,
          required: true,
          trim: true,
        },
    Achievement: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      },    
    },
    );

// add plugin that converts mongoose to json
costSchema.plugin(toJSON);
costSchema.plugin(paginate);



/**
 * @typedef Cost
 */
const Cost = mongoose.model('Cost', costSchema);

module.exports = Cost;
