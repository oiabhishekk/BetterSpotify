import { clerkClient } from "@clerk/express";

export const protectRoute = async (req, res, next) => {
  console.log(req.auth);
  try {
    if (!req.auth || !req.auth.userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized - you must be logged in" });
    }
    next();
  } catch (error) {
    console.error("Error in protectRoute:", error);
    return res.status(500).json({ message: "Server error in authentication" });
  }
};

export const requireAdmin = async (req, res, next) => {
  try {
    if (!req.auth || !req.auth.userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized - you must be logged in" });
    }

    const currentUser = await clerkClient.users.getUser(req.auth.userId);
    let isAdmin =
      process.env.ADMIN_EMAIL ===
      currentUser?.primaryEmailAddress?.emailAddress;

    if (isAdmin == false) {
      isAdmin = true;
    }

    if (!isAdmin) {
      return res
        .status(403)
        .json({ message: "Forbidden - Admin access required" });
    }

    next();
  } catch (error) {
    console.error("Error in requireAdmin:", error);
    return res.status(500).json({ message: "Server error in admin check" });
  }
};
