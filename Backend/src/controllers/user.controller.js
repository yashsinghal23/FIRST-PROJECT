import {User} from "../models/user.model.js"
import asyncHandler from "../utils/asyncHandler.js"
import jwt from "jsonwebtoken"


const userRegister = asyncHandler(async (req, res) => {

    const { username, email, password, fullname } = req.body;

    // 1. Validate request body
    if ([username, email, password, fullname].some((field) => field?.trim() === "")) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }

    // 2. Check if user already exists
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    });

    if (existedUser) {
        return res.status(409).json({
            success: false,
            message: "User with this username or email already exists"
        });
    }

    // 3. Create and save the user
    const user = await User.create({
        username: username.toLowerCase(), 
        email: email.toLowerCase(),
        fullname,
        password 
    });

    // 4.  data before sending the response
    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    if (!createdUser) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while registering the user"
        });
    }

    // 5. Send success response
    return res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: createdUser
    });
});

const LoginUser= asyncHandler(async(req,res) =>{
    const options={
         httpOnly: true,
         secure: false,
         sameSite: "lax"
    };

    const {email,password}= req.body;

    //step1 check user register or not
    const user=await User.findOne({email})

    if(!user){
        return res.status(401).json({
            success:false,
            message:"User Not registered"
        })
    }

    //step 2 check user password is right
    const isPasswordCorrect=await user.comparePassword(password);

    if(!isPasswordCorrect){
         return res.status(401).json({
            success:false,
            message:"User Invalid Credential"
        })
    }

    //step 3 generate refresh token and access token
    try {

        const accessToken= await user.generateAccessToken();
        const refreshToken= await user.generateRefreshToken();

        user.refreshToken=refreshToken;

        const createdUser = await User.findById(user._id).select("-password -refreshToken");

        await user.save({ validateBeforeSave: false});

        return res
        .status(201)
        .cookie("accessToken",accessToken,options)

        .cookie("refreshToken",refreshToken,options)
        .json({
            success:true,
            message:"User login successfully",
            user:createdUser
        })
        
    } catch (error) {
        console.log(error)
    }
    
})



const LogoutUser=asyncHandler(async(req,res)=>{

    const options={
         httpOnly: true,
         secure: false,
         sameSite: "lax"
    };
   try {
    
    const user=req.user
    await User.findByIdAndUpdate(req.user._id,{
       $set:{
        refreshToken:undefined
       },

    } ,{new:true})

    return res.status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json({
        success:true,
        message:"User logged Out",
        user
    })


    
   } catch (error) {
      console.log(error);
   } 




})

const refreshAccessToken = async (req, res) => {

    const incomingRefreshToken =
        req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
        return res.status(401).json({
            message: "Refresh Token Missing"
        });
    }

    try {

        const decoded = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );

        const user = await User.findById(decoded._id);

        if (!user) {
            return res.status(401).json({
                message: "User not found"
            });
        }

        // Check if refresh token matches DB

        if (incomingRefreshToken !== user.refreshToken) {

            return res.status(401).json({
                message: "Refresh Token Invalid"
            });

        }

        // Generate new tokens

        const newAccessToken = user.generateAccessToken();

        const newRefreshToken = user.generateRefreshToken();

        // Save new refresh token

        user.refreshToken = newRefreshToken;

        await user.save({
            validateBeforeSave: false
        });

        return res
            .cookie("accessToken", newAccessToken, {
                httpOnly: true,
                secure: true
            })
            .cookie("refreshToken", newRefreshToken, {
                httpOnly: true,
                secure: true
            })
            .json({
                accessToken: newAccessToken,
                refreshToken: newRefreshToken
            });

    } catch (error) {

        return res.status(401).json({
            message: "Refresh Token Expired"
        });

    }
};

const getCurrentUser = asyncHandler(async (req, res) => {

    return res.status(200).json({
        success: true,
        data: req.user,
        message: "Current user fetched successfully"
    });

});


const updateProfile=asyncHandler(async(req,res)=>{
    const user=req.user

    const {username,email,fullname}=req.body

    const updateFields = {};

    if (fullname) updateFields.fullname = fullname;
    if (username) updateFields.username = username;
    if (email) updateFields.email = email;

    const updateduser=await User.findByIdAndUpdate({
        _id:user._id
    },{
        $set:
            updateFields
    },{new:true}).select("-password -refreshToken");


     res.status(201).json({
        success:true,
        user:updateduser

     })
    
})

const changePassword = asyncHandler(async (req, res) => {

    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
        return res.status(400).json({
            success: false,
            message: "Old password and new password are required"
        });
    }

    const user = await User.findById(req.user._id);

    const isPasswordCorrect = await user.comparePassword(oldPassword);

    if (!isPasswordCorrect) {
        return res.status(400).json({
            success: false,
            message: "Old password is incorrect"
        });
    }

    user.password = newPassword;

    // Your pre("save") middleware will hash it automatically
    await user.save({ validateBeforeSave: false });

    return res.status(200).json({
        success: true,
        message: "Password changed successfully"
    });

});


export {
    userRegister,
    LoginUser,LogoutUser,
    refreshAccessToken,
    getCurrentUser,updateProfile,changePassword
}


