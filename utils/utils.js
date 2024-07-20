const validator = require("validator");

const checkDuplicate = (reviews, name, email) => {
  const duplicate = reviews.find((review) => {
    return review.name === name || (review.email === email && review.email !== "");
  });

  if (duplicate) {
    return true;
  }
  return false;
};

const checkIsEmail = (email) => {
  if (email !== "") {
    return validator.isEmail(email) && email;
  }

  return true;
};

const checkIsPhoneNumber = (phoneNumber) => {
  return validator.isMobilePhone(phoneNumber, "id-ID");
};

const isDataExist = (reviews, name = null, email = null) => {
  const review = reviews.find((review) => review.name.toLowerCase() === name.toLowerCase() || (review.email === email && review.email !== ""));

  if (!review) {
    return { status: 404, message: `Data with name ${name} is not found`, data: null };
  }
  return { status: 200, message: "Data found", data: review };
};

module.exports = { checkDuplicate, checkIsEmail, checkIsPhoneNumber, isDataExist };
