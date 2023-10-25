const { Product, User, Categori } = require("../models");
const { comparePassword } = require("../helper/bcrypt");
const { sign, verifyToken } = require("../helper/jwt");
const { sendEmail } = require("../helper/nodemailer");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcryptjs = require("bcryptjs");
const cloudinary = require("cloudinary").v2;
const midtransClient = require("midtrans-client");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECREET,
});

async function handleUpload(file) {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  return res;
}

class Controller {
  static async transaction(req, res) {
    try {
      const { no_order, total, name } = req.body;
      // console.log(no_order, total, name, "Ini Hasilnya");

      let snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: process.env.SERVER_KEY,
        clientKey: process.env.CLIENT_KEY,
      });

      let parameter = {
        transaction_details: {
          order_id: no_order,
          gross_amount: total,
        },
        customer_details: {
          first_name: name,
        },
      };

      snap.createTransaction(parameter).then((transaction) => {
        // transaction token
        console.log(transaction, "<><><>");

        const dataPayment = {
          response: JSON.stringify(transaction),
        };
        const token = transaction.token;
        res
          .status(200)
          .json({ message: "berhasil", dataPayment, token: token });
      });
    } catch (error) {
      console.log(error, "<<< Error");
    }
  }

  static async readCategory(req, res) {
    try {
      const data = await Categori.findAll();
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  }

  static async productDetail(req, res) {
    let { id } = req.params;
    try {
      const data = await Product.findOne({ where: { id } });
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  }

  static async coba(req, res) {
    try {
      const data = await Product.findAll();
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
    }
  }

  static async upload(req, res, next) {
    try {
      console.log(req);
      // const result = await cloudinary.uploader.upload(req.file.path);
      const result = await handleUpload(req.file.path);
      res.status(201).json(result);
    } catch (error) {
      console.log(error);
    }
  }

  static async createProduct(req, res, next) {
    try {
      const { name, description, price, categoryId } = req.body;
      const result = await cloudinary.uploader.upload(req.file.path);
      if (!name) {
        throw { name: "Name is required" };
      }
      if (!description) {
        throw { name: "Description is required" };
      }
      if (!price) {
        throw { name: "Price is required" };
      }
      if (!result) {
        throw { name: "MainImg is required" };
      }
      const User = req.data.id;
      // console.log(User, "<<");
      const data = await Product.create({
        name,
        description,
        price,
        mainImg: result.secure_url,
        categoryId,
        authorId: User,
      });
      res.status(201).json({ data });
    } catch (error) {
      console.log(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) {
        throw { name: "Email is required" };
      }
      if (!password) {
        throw { name: "Password is required" };
      }
      const data = await User.findOne({ where: { email: email } });
      if (!data) {
        throw { name: "Invalid Email or Password" };
      }
      const isValid = comparePassword(password, data.password);
      if (!isValid) {
        throw { name: "Invalid Email or Password" };
      }
      const payload = { id: data.id, email: data.email, role: data.role };
      const access_token = sign(payload);
      res.status(200).json({
        id: data.id,
        access_token: access_token,
        email: data.email,
        role: data.role,
      });
    } catch (error) {
      next(error);
    }
  }
  static async allProduct(req, res, next) {
    try {
      const data = await Product.findAll();
      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async updateProduct(req, res, next) {
    try {
      const { id } = req.params;
      const { name, description, price, categoryId } = req.body;
      await Product.update(
        { name, description, price, categoryId },
        { where: { id } }
      );
      res.status(201).json("Success Update Product");
    } catch (error) {
      console.log(error);
    }
  }
  static async register(req, res, next) {
    try {
      const { email, name, password } = req.body;
      if (!email) {
        throw { name: "Email is required" };
      }
      if (!name) {
        throw { name: "Name is required" };
      }
      if (!password) {
        throw { name: "Password is required" };
      }
      const data = await User.create({
        email,
        name,
        password,
        role: "customer",
      });
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async forgotPassword(req, res, next) {
    try {
      const { email } = req.body;
      const user = await User.findOne({ where: { email: email } });
      if (!user) {
        throw { name: "Email not found" };
      }

      const token = jwt.sign({ user: user.id }, process.env.SECRET_CODING);

      // let tokenId = await Token.findOne({ userId: user._id });

      await user.update(
        { resetPasswordlink: token },
        { where: { id: user.id } }
      );

      const templateEmail = {
        from: "MAJOL",
        to: email,
        subject: "Link Reset Password",
        html: `<p> Klik link di bawah untuk reset password anda </p> <p> ${process.env.CLIENT_URL}/resetpassword/${token}/</p>`,
      };

      sendEmail(templateEmail);

      res.status(200).json("Link Reset berhasil Terkirim");
    } catch (error) {
      console.log(error);
    }
  }

  static async resetPassword(req, res, next) {
    try {
      const { token, password } = req.body;

      const user = await User.findOne({ where: { resetPasswordlink: token } });
      if (user) {
        const hashPassword = await bcryptjs.hashSync(password, 8);
        await user.update({ password: hashPassword });
        res.status(201).json("Success Edit Password");
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async detailUser(req, res) {
    const { id } = req.params;
    try {
      const data = await User.findOne({ where: { id } });
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  }

  static async user(req, res, next) {
    try {
      const data = await User.findAll();
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async updateUser(req, res, next) {
    const { name } = req.body;
    let { id } = req.params;
    try {
      if (!name) {
        throw { name: "name not found" };
      }
      if (!(await User.findByPk(id))) {
        throw { name: "User not valid" };
      }
      const data = await User.update({ name }, { where: { id } });
      const result = await User.findOne({ where: { id } });
      res.status(201).json(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async destroyUser(req, res, next) {
    try {
      const { id } = req.params;
      const result = await User.findOne({ where: { id } });
      const data = await User.destroy({ where: { id } });
      res.status(200).json(result);
    } catch (error) {}
  }

  static async destroyProduct(req, res, next) {
    try {
      const { id } = req.params;
      const data = await Product.destroy({ where: { id } });
      res.status(200).json("Success delete Product");
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Controller;
