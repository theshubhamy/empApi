import bcrypt from "bcryptjs";
//models
import User from "../../models/user.js";

//helpers
import { validationErrorHandler } from "../../helpers/validation-error-handler.js";

export const UserSignup = async (req, res, next) => {
  validationErrorHandler(req, next);
  const { name, email, phone, password } = req.body;
  try {
    console.log(req.files?.document);
    if (!req.files.document) {
      const error = new Error("No documents provided");
      error.statusCode = 422;
      return next(error);
    }

    const document = req.files.document[0].path;
    const user = await User.findOne({ where: { email } });
    if (user) {
      await User.update(
        { otp },
        {
          where: { phone },
        }
      );
      res.status(201).json({
        msg: `User already exists.`,
      });
    } else {
      const encryptedPassword = await bcrypt.hash(password, 12);
      await User.create({
        name,
        email,
        phone,
        password: encryptedPassword,
        document,
        isVerified: true,
      });

      res.status(201).json({
        msg: `User registered successfully!`,
      });
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
