import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/apiResponse.js";


const registerUser = asyncHandler(async (req, res) => {

    //get user Details from frontend
    //Validation - not empty 
    //Check if user already exists : username , email
    //check for images , check for avatars 
    //upload them to cloudinary, avatar
    //create a user object , entry in db
    //remove password and refresh token field from response 
    //check for user creation 
    //return response

    const { fullname, email, username, password } = req.body

    // console.log(`email ${email}`);
    // console.log(`password ${password}`);
    // console.log(`username ${username}`);
    // console.log(`fullname ${fullname}`);

    if ([fullname, email, username, password].some(
        el => el.trim() === ""
    )) {
        throw new ApiError(400, "Please fill all the fields")
    }

    const existedUser = await User.findOne({
        $or: [{ email }, { username }]
    })

    if (existedUser) {
        throw new ApiError(409, "User With same email or Username already exists ")
    }

    const avatarLocalPath = req.files?.avatar[0].path;

    const coverImageLocalPath = req.files?.coverImage[0].path;

    console.log(avatarLocalPath)

    if (!avatarLocalPath) {
        throw new ApiError(400, "Please upload an avatar")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    if (coverImageLocalPath) {
        const coverImage = await uploadOnCloudinary(coverImageLocalPath);
    }

    if (!avatar) {
        throw new ApiError(400, "Please upload an avatar")
    }

    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        username: username.toLowerCase(),
        password,
    })

    const createdUser = user.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering user")
    }

    res.status(201).json(
        new ApiResponse(201, createdUser, "User Created Successfully")
    )
})




export { registerUser }