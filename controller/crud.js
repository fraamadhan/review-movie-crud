const { saveData, retrieveData, updateData, removeData, retrieveDataByNameOrEmail } = require("../review");

const save = (data) => {
  if (data.email === undefined) {
    data.email = "";
  }
  saveData(data);
};

const retrieve = () => {
  retrieveData();
};

const detailReview = (data) => {
  retrieveDataByNameOrEmail(data);
};

const update = (data) => {
  updateData(data);
};

const remove = (name) => {
  removeData(name);
};

module.exports = { save, retrieve, update, remove, detailReview };
