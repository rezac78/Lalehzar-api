const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }
  
  if (!token) {
    return res.status(401).json({ success: false, message: "شما دست رسی ندارید" });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ success: false, message: "The user belonging to this token no longer exists." });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ success: false, message: "توکن معتبر نیست" });
  }
};
