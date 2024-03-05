const { User } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.userOtpSend = async (req, res) => {
  const { email } = req.body;

  if (!email) {
      res.status(400).json({ error: "Please Enter Your  Registered Email" })
  }


  try {
      const presuer = await User.findOne({ email: email });

      if (presuer) {
          const OTP = Math.floor(100000 + Math.random() * 900000);

          const existEmail = await userotp.findOne({ email: email });


          if (existEmail) {
              const updateData = await userotp.findByIdAndUpdate({ _id: existEmail._id }, {
                  otp: OTP
              }, { new: true }
              );
              await updateData.save();

              const mailOptions = {
                  from: process.env.EMAIL,
                  to: email,
                  subject: "Sending Email For Otp Validation",
                  text: `OTP:- ${OTP}`
              }


              tarnsporter.sendMail(mailOptions, (error, info) => {
                  if (error) {
                      console.log("error", error);
                      res.status(400).json({ error: "email not send" })
                  } else {
                      console.log("Email sent", info.response);
                      res.status(200).json({ message: "Email sent Successfully" })
                  }
              })

          } else {

              const saveOtpData = new userotp({
                  email, otp: OTP
              });

              await saveOtpData.save();
              const mailOptions = {
                  from: process.env.EMAIL,
                  to: email,
                  subject: "Sending Email For Otp Validation",
                  text: `OTP:- ${OTP}`
              }

              tarnsporter.sendMail(mailOptions, (error, info) => {
                  if (error) {
                      console.log("error", error);
                      res.status(400).json({ error: "email not send" })
                  } else {
                      console.log("Email sent", info.response);
                      res.status(200).json({ message: "Email sent Successfully" })
                  }
              })
          }
      } else {
          res.status(400).json({ error: "This User Not Exist In our Database" })
      }
  } catch (error) {
      res.status(400).json({ error: "Invalid Details", error })
  }
};


exports.userLogin = async (req, res) => {
  const { email, otp } = req.body;

  if (!otp || !email) {
      res.status(400).json({ error: "Please Enter Your OTP and email" })
  }

  try {
      const otpverification = await userotp.findOne({ email: email });

      if (otpverification.otp === otp) {
          const preuser = await User.findOne({ email: email });
          let x = await User.findOne({ email: email });
          console.log(x);

          // token generate
          const token = await preuser.generateAuthtoken();
          res.status(200).json({ message: "User Login Succesfully done", usertoken: token, myuser: x });

      } else {
          res.status(400).json({ error: "Invalid Otp" })
      }
  } catch (error) {
      res.status(400).json({ error: "Invalid Details", error })
  }
}
module.exports.create = (req, res) => {
  User.create(req.body)
    .then((user) => {
      const userToken = jwt.sign(
        {
          id: user._id,
        },
        process.env.SECRET_KEY
      );
      res
        .cookie("usertoken", userToken, {
          httpOnly: true,
        })
        .json({ message: "Success!", user: user });
    })
    .catch((err) => res.status(400).json(err));
};

module.exports.findAll = (req, res) => {
  User.find({})
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
};

module.exports.findById = (req, res) => {
  User.findOne({ _id: req.params.id })
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
};

module.exports.delete = (req, res) => {
  User.deleteOne({ _id: req.params.id })
    .then((r) => res.json(r))
    .catch((err) => res.json(err));
};

module.exports.update = (req, res) => {
  User.updateOne({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  })
    .then((r) => res.json(r))
    .catch((err) => res.status(400).json(err));
};

module.exports.login = async (req, res) => {
  const errorMessage = "Email or password is incorrect";

  try {
    const user = await User.findOne({ email: req.body.email });
    if (user === null) {
      throw new Error(errorMessage);
    }
    const correctPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!correctPassword) {
      console.log("Password incorrect for: " + req.body.email);
      throw new Error(errorMessage);
    }
    const userToken = jwt.sign(
      {
        id: user._id,
      },
      process.env.SECRET_KEY
    );
    res
      .cookie("usertoken", userToken, {
        httpOnly: true,
      })
      .json({ message: "Success!", user: user });
  } catch {
    res.status(401).json({ message: errorMessage });
  }
};

module.exports.logout = (req, res) => {
  res.clearCookie("usertoken");
  res.json({ message: "Logged out successfully" });
};