import asyncHandler from "../utils/asyncHandler.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import { Resume } from "../models/resume.model.js";
import fs from "fs";
import pdf from "pdf-parse-new";
import { analyzeResume } from "../utils/gemini.js";

const uploadResume = asyncHandler(async (req, res) => {

    // 1. Validate File
    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: "Resume file is required."
        });
    }

    // 2. Get Data
    const { selfDescription, jobDescription,filename } = req.body;

    const localPath = req.file.path;

    // 3. Extract PDF Text
  const buffer = fs.readFileSync(localPath);

const data = await pdf(buffer);

const resumeText = data.text;

    // 4. Upload Resume to Cloudinary
    const uploadedResume = await uploadOnCloudinary(localPath);

 

    // 5. Call Gemini
    const analysis = await analyzeResume({
        resumeText,
        selfDescription,
        jobDescription
    });

    // analysis should return
    // {
    //   atsScore,
    //   technicalQuestions,
    //   behavioralQuestions,
    //   skillsGap,
    //   preparationPlan
    // }




     // 6. Save to MongoDB
    const resume = await Resume.create({

        user: req.user._id,

        filename:filename,

        resumeUrl: uploadedResume,

        selfDescription,

        jobDescription,

        atsScore: analysis.atsScore,

        technicalQuestions: analysis.technicalQuestions,

        behavioralQuestions: analysis.behavioralQuestions,

        skillsGap: analysis.skillsGap,

        preparationPlan: analysis.preparationPlan

    });

    // 7. Send Response
    return res.status(201).json({

        success: true,

        message: "Resume analyzed successfully.",

        data: resume
    


});

});

const getResume=asyncHandler(async(req,res)=>{
    
        const resumes = await Resume.find({
        user: req.user._id
       })
       .select("filename atsScore createdAt")
       .sort({ createdAt: -1 });

       res.status(200).json({
        success:true,
        resumes
    })

})



const getResumeById = asyncHandler(async (req, res) => {

    
    const id= req.params.id.trim();

    const resume = await Resume.findOne({
        _id: id,
        user: req.user._id
    });

    if (!resume) {
        return res.status(404).json({
            success: false,
            message: "Resume not found"
        });
    }

    return res.status(200).json({
        success: true,
        data: resume,
        message: "Resume fetched successfully"
    });

});


const deleteResume=asyncHandler(async(req,res)=>{
    const id= req.params.id.trim();

    const resume = await Resume.findOne({
        _id: id,
        user: req.user._id
    });

     if (!resume) {
        return res.status(404).json({
            success: false,
            message: "Resume not found"
        });
    }

   
     await Resume.deleteOne({
        _id:id,
        user:req.user._id
    })

    res.status(201).json({
          success:true,
          message:"resume delete successfully"
       })
    
    
})


export  { uploadResume,getResume,getResumeById ,deleteResume} ;