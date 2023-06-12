//models
import User from "../../models/user.js";
//helpers
import { validationErrorHandler } from "../../helpers/validation-error-handler.js";

export const getAllUsers = async (req, res, next) => {
  validationErrorHandler(req, next);
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
