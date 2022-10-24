const mongoose = require("mongoose");
const validator = require('validator');
const { ObjectId } = mongoose.Schema.Types

const jobsSchema = mongoose.Schema({
    jobTitle: {
        type: String,
        trim: true,
        require: true,
    },
    jobType: {
        type: String,
        require: true,
        enum: {
            values: ["Remote", "On-Site", "Hybrid"],
            message: "{VALUE} is not valid name"
        }
    },
    jobDescription: String,
    jobLocation: {
        type: String,
        require: true,
    },
    company: {
        type: String,
        require: true,
    },
    skillsets: {
        type: String,
        require: true,
    },
    salary: {
        type: Number
    },
    jobPostingDate: {
        type: Date,
        default: Date.now
    },
    lastApplicationDate: {
        type: Date,
        require: true,
    },
    category: {
        type: String,
        required: true,
        // enum: {
        //     values: [" Engineer/Architects", "Development", "Design/Creative", " IT & Telecommunication"],
        //     message: "unit value can't be {VALUE}, must be_ IT & Telecommunication"
        //   }
      },
    vacancy: {
        type: String,
        require: true,
    },
    totalApplied: {
        type: Number,
        required: true,
        min: [0, "Number of applied must be integer"]
      },
      appliedInfo: [{
        candidateId:  {
          type: ObjectId,
          ref: "Candidate"
        },
        id: {
          type: ObjectId,
          ref: "AppliedInfo"
        }
      }],
      
    acceptedCandidates: {
        type: Number,
        default: 0,
        validate: [
          {
            validator: Number.isInteger,
            msg: "acceptedCandidates should be an integer",
          },
          {
            validator: function (value) {
              return value >= 0;
            },
            msg: "acceptedCandidates should greater than equal to 0",
          },
        ],
      },
    hiringManager: {
        name: String,
        id: {
            type: ObjectId,
            ref: "HiringManager",
            require: true,
        }
    },

})

const Jobs = mongoose.model('Jobs', jobsSchema);

module.exports = Jobs;