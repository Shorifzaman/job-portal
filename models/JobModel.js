const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const jobSchema = mongoose.Schema({
    manager: {
        name: {
          type: String,
          trim: true,
        },
        email: {
          type: String,
          trim: true,
        },
        id: {
          type: ObjectId,
          ref:"User"
        }
      },
  title: {
    type: String,
    trim: true,
    required: [true, "Please provide a job title"],
    maxLength: 100,
    unique: true,
    lowercase: true,
  },
  description: String,
  location: String,
  company: {
    type: String,
    require: true,
},
  jobType:{
    type: String,
        require: true,
        enum: {
            values: ["Remote", "On-Site", "Hybrid"],
            message: "{VALUE} is not valid name"
        }
  },
  salary: {
    type: Number,
    required: true,
    min: [0, "Salary can't be negative"]
  },
  totalApplied: {
    type: Number,
    // required: true,
    min: [0, "Number of applied must be integer"]
  },
  vacancy: {
    type: String,
    require: true,
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
  jobPostingDate: {
    type: Date,
    default: Date.now
},
  deadline:{
    type:Date,
    required:true
  },
  candidates: [{    
      type: ObjectId,
      ref: "Candidate"
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;