import { User } from "../models/user.model.js";

const authCallBack = async (req, res, next) => {
  try {
    const { id, firstName, lastName, imageUrl } = req.body;

    if (!id || !firstName || !lastName) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required user info." });
    }

    let user = await User.findOne({ clerkId: id });
    console.log(user);

    if (!user) {
      user = await User.create({
        clerkId: id,
        fullName: `${firstName} ${lastName}`,
        imageUrl,
      });
    }
    console.log(user);


    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error(" eError in authCallback:", error.message);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

export default authCallBack;
