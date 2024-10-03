const { response } = require("express");
const { responseObject } = require("../utility");
const {
  emailValidation,
  fullNameValidation,
  passwordValidation,
  phoneValidation,
  phoneNumberValidation,
} = require("../utility/formValidation");
const {
  SignUp_public_model,
  SignUp_private_model,
  SignUp_private_model2,
  SignUp_public_model2,
  login_model,
  fetch_user_public_model,
  otp_model,
  verify_otp_model,
  name_update_model,
} = require("./auth-model");
const { use } = require("./auth-routes");

const LoginFunction = (req, res) => {
  let { email, password } = req.body;

  // validating Email
  emailValidation(email, res);

  //validating password
  passwordValidation(password, res);

  //feltching

  fetch_user_public_model(email)
    .then((response) => {
      if (response.error) {
        return res.send(responseObject(response.error.message, false));
      }
      if (response.data.length < 1) {
        return res.send("invalid email");
      }

      let userData = response.data[0];
      let actualEmail = userData.email;
    })
    .catch((error) => {
      return res.send(responseObject(error));
    });

  login_model({ email, password })
    .then((response) => {
      if (response.error) {
        return res.send(responseObject(response.error.message, false));
      }
      res.send(
        responseObject("successful", true, {
          ...response.data.user.user_metadata,
          accessToken: response.data.session.access_token,
          UUID: response.data.user.id,
          refreshToken: response.data.session.refresh_token,
        })
      );
    })
    .catch((error) => {
      return res.send(responseObject());
    });
};

const SignUpAuth = (req, res) => {
  let { name, email, password, data, phone } = req.body;

  // validating name
  fullNameValidation(name, res);

  //validating Email
  emailValidation(email, res);

  //validating password
  passwordValidation(password, res);

  phoneNumberValidation(phone, res);

  //private signup
  let payload = { email, password, data: { wallet: 0 } };
  SignUp_private_model(payload).then((signUpResponse) => {
    if (signUpResponse.error) {
      return res.send(
        responseObject(signUpResponse.error.message, false, null)
      );
    }
    //public signup
    SignUp_public_model({
      name,
      email,
      phone,
      password,
      data: { ...data, wallet: 0 },
      uuid: signUpResponse.data.user.id,
    })
      .then((response) => {
        if (response.error) {
          return res.send(responseObject(response.error.message, false));
        }
        res.send(
          responseObject("successful", true, {
            ...signUpResponse.data.user.user_metadata,
            accessToken: signUpResponse.data.session.access_token,
            UUID: signUpResponse.data.user.id,
            refreshToken: signUpResponse.data.session.refresh_token,
          })
        );
      })
      .catch((error) => {
        return res.send(responseObject());
      });
  });
};

const SignUpAuth2 = (req, res) => {
  let { name, phone, password, data } = req.body;

  // validating name
  fullNameValidation(name, res);

  // validating email
  // emailValidation(email, res);

  //validating phone Number
  phoneValidation(phone, res);

  //validating password
  passwordValidation(password, res);

  //private signup
  let payload = { phone, password, data };
  SignUp_private_model2(payload).then((signUp2Response) => {
    if (signUp2Response.error) {
      return res.send(
        responseObject(signUp2Response.error.message, false, null)
      );
    }
    //public signup
    SignUp_public_model2({ name, phone, password })
      .then((response) => {
        if (response.error) {
          return res.send(responseObject(response.error.message, false));
        }
        res.send(
          responseObject("successful", true, {
            ...signUp2Response.data.user.user_metadata,
            accessToken: signUp2Response.data.session.access_token,
            UUID: signUp2Response.data.user.id,
            refreshToken: signUp2Response.data.session.refresh_token,
          })
        );
      })
      .catch((error) => {
        return res.send(responseObject());
      });
  });
};

const RequestOtp = (req, res) => {
  let { email } = req.body;

  fetch_user_public_model(email)
    .then((response) => {
      if (response.error) {
        return res.send(responseObject(response.error.message, false, null));
      }
      if (response.data.length < 1) {
        return res.send("invalid email");
      }

      let userData = response.data[0];
      let actualEmail = userData.email;
    })
    .catch((error) => {
      return res.send(responseObject(error));
    });

  function otp() {
    return Math.floor(100000 + Math.random() * 900000);
  }

  var otpNumber = otp();
  var otpObj = { otpNumber, date: new Date().getTime() };

  otp_model(email, otpObj)
    .then((response) => {
      if (response.error) {
        return res.send(responseObject(response.error.message, false));
      }
      res.send(responseObject("successful", true, response.data));
    })
    .catch((error) => {
      return res.send(responseObject());
    });
};

const verifyOtp = (req, res) => {
  let { email, otp } = req.body;
  fetch_user_public_model(email)
    .then((response) => {
      if (response.error) {
        return res.send(responseObject(response.error.message, false, null));
      }
      if (response.data.length < 1) {
        return res.send("invalid email");
      }

      let userData = response.data[0];

      if (userData.otp.otpNumber != otp) {
        return res.send(responseObject("otp not correct", false, userData));
      }

      if (userData.otp.otpNumber == otp) {
        return res.send(responseObject("otp verified", true, userData));
      }
    })
    .catch((error) => {
      return res.send(responseObject(error));
    });
};

const nameUpdateFunction = (req, res) => {
  let { name, phone, email } = req.body;

  fetch_user_public_model(email)
    .then((response) => {
      if (response.error) {
        return res.send(responseObject(response.error.message, false, null));
      }
      if (response.data.length < 1) {
        return res.send("invalid email");
      }

      let userData = response.data[0];
      let actualEmail = userData.email;
    })
    .catch((error) => {
      return res.send(responseObject(error));
    });

  name_update_model(email, name, phone)
    .then((response) => {
      if (response.error) {
        return res.send(responseObject(response.error.message, false));
      }
      res.send(responseObject("successful", true, response.data));
    })
    .catch((error) => {
      return res.send(responseObject());
    });
};

module.exports = {
  LoginFunction,
  SignUpAuth,
  SignUpAuth2,
  RequestOtp,
  verifyOtp,
  nameUpdateFunction,
};
