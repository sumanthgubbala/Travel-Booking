const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  //console.log("verifyToken",req.cookies?.accessToken);
  try {
    const token = req.cookies.accessToken;
    //nsole.log(`Access token: ${token}`);
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access denied. No token provided.",
    });
  }
  //if token
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: "Token is invalid",
      });
    }
    req.user = user;
    next();
  });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.role === "user") {
      next();
    } else {
      return res.status(403).json({
        success: false,
        message: "You are not authorized ",
      });
    }
  });
};

exports.verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === "admin") {
      next();
    } else {
      return res.status(401).json({
        success: false,
        message: "You are not authorized ",
      });
    }
  });
};
