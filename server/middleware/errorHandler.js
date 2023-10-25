module.exports = (error, req, res, next) => {
  let message = "Internal Server Error";
  let status = 500;

  switch (error.name) {
    case "SequelizeUniqueConstraintError":
      (status = 400), (message = error.errors.map((e) => e.message));
      break;
    case "Email is required":
      (status = 401), (message = "Email is required");
      break;
    case "Password is required":
      (status = 401), (message = "Password is required");
      break;
    case "Name is required":
      (status = 401), (message = "Name is required");
      break;
    case "Role is required":
      (status = 401), (message = "Role is required");
      break;
    case "Invalid Email or Password":
      (status = 403), (message = "Invalid Email or Password");
      break;
    case "JsonWebTokenError":
      (status = 401), (message = "Invalid Token");
      break;
    case "penyusup":
      (status = 401), (message = "you must admin");
      break;
    case "You are not Authorized":
      (status = 401), (message = "Please Login");
      break;
    case "User not valid":
      (status = 403), (message = "User not valid");
      break;
    default:
      (status = 500), (message = "Internal Server Error");
  }
  res.status(status).json({ message: message });
};
