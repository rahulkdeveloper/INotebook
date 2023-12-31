const User = require('../model/User');

exports.loadProfile = async (request, response) => {
    try {
        const userId = request.user._id;
        const user = await User.findOne({ _id: userId }).lean();
        delete user.password


        return response.status(200).json({
            success: true,
            message: "success",
            data: user
        })

    } catch (error) {
        console.log("Error", error);
        return response.status(error.status || 500).json({
            success: false,
            message: error.message || "Internal server error"
        })
    }
}