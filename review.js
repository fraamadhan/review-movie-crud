// const readline = require("node:readline");
// const { stdin: input, stdout: output } = require("node:process");
const fs = require("fs");
const { checkDuplicate, checkIsEmail, checkIsPhoneNumber, isDataExist } = require("./utils/utils");
const chalk = require("chalk");

const dirPath = "./data";
const dataPath = dirPath + "/reviews.json";

//If data directory is not exist
if (!fs.existsSync(dirPath)) {
  try {
    fs.mkdir("data/", (err) => {
      if (err) throw err;
    });
    console.log("Directory created successfully");
  } catch (err) {
    console.log("Error message: ", err);
  }
}

//if reviews.json is not exists
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync("data/reviews.json", "[]");
  console.log("File JSON created successfully");
}

//if you want to take input from terminal, you can use this function and call it in app.js
// const askQuestion = (question) => {
//   const rl = readline.createInterface({ input, output });
//   return new Promise((resolve, reject) => {
//     rl.question(question, (input) => resolve(input));
//   });
// };

const writeFile = (reviews = null, message) => {
  //write file
  fs.writeFile("data/reviews.json", JSON.stringify(reviews), (err) => {
    if (err) console.log("Error");

    console.log(chalk`{green.bold.inverse Your review ${message} successfully, thank you!}`);
  });
};

const saveData = (reviewData) => {
  // reviews.push(data);
  //read first the file if you do not want the file overrided by new review
  fs.readFile("data/reviews.json", "utf-8", (err, data) => {
    if (err) console.log("Error occured while read file.");
    const reviews = JSON.parse(data);
    const isDuplicate = checkDuplicate(reviews, reviewData.name, reviewData.email);
    const validEmail = checkIsEmail(reviewData.email);
    const validIndonesiaPhoneNumber = checkIsPhoneNumber(reviewData.phoneNumber);

    if (!validIndonesiaPhoneNumber) {
      console.log(chalk`{red.bold.inverse Your pphone number must a valid Indonesia phone number, create new one!}`);
      return;
    }

    if (!validEmail) {
      console.log(chalk`{red.bold.inverse Your email must a valid email, create new one!}`);
      return;
    }
    if (!isDuplicate) {
      reviews.push(reviewData);
      writeFile(reviews, "stored");
      console.log("File successfully read");
    } else {
      console.log(chalk`{red.bold.inverse Name or email has already taken, create new one!}`);
      return;
    }
  });
};

const retrieveData = () => {
  //fs.readfile is boilerplate lines shieee :V
  fs.readFile("data/reviews.json", "utf-8", (err, data) => {
    if (err) console.log(chalk`{red.inverse.bold Error occured while retrieve data}`);
    const reviews = JSON.parse(data);
    console.log(chalk`{cyan.inverse Data user and their review about {yellow.bold The Lord of The Rings :}}`);
    reviews.forEach((review, i) => {
      console.log(`${i + 1}. ${review.name} - ${review.phoneNumber} - ${review.review}`);
    });
  });
};

const retrieveDataByNameOrEmail = (dataReview) => {
  fs.readFile("data/reviews.json", "utf8", (err, data) => {
    if (err) console.log(chalk`{red.inverse.bold Error occured while retrieve data}`);
    const reviews = JSON.parse(data);
    const result = isDataExist(reviews, dataReview.name, dataReview.email);

    if (result.status === 404) {
      console.log(chalk`{red.inverse.bold ${result.message}}`);
      return;
    }

    console.log(chalk`{cyan.inverse Data ${result.data.name}}`);
    console.log(`Name : ${result.data.name}\nEmail : ${result.data.email}\nPhone Number : ${result.data.phoneNumber}\nReview : ${result.data.review}`);
  });
};

const updateData = (dataReview) => {
  fs.readFile("data/reviews.json", "utf-8", (err, data) => {
    if (err) console.log("Error occured while read file.");
    const reviews = JSON.parse(data);

    if (dataReview.email) {
      const validEmail = checkIsEmail(dataReview.email);

      if (!validEmail) {
        console.log(chalk`{red.bold.inverse Your email must a valid email, create new one!}`);
        return;
      }
    }

    if (dataReview.phoneNumber) {
      const validIndonesiaPhoneNumber = checkIsPhoneNumber(dataReview.phoneNumber);

      if (!validIndonesiaPhoneNumber) {
        console.log(chalk`{red.bold.inverse Your pphone number must a valid Indonesia phone number, create new one!}`);
        return;
      }
    }

    const newReviews = reviews.map((review) => {
      if (review.name.toLowerCase() === dataReview.name.toLowerCase()) {
        if (dataReview.email) {
          review.email = dataReview.email;
        }
        if (dataReview.phoneNumber) {
          review.phoneNumber = dataReview.phoneNumber;
        }
        if (dataReview.review) {
          review.review = dataReview.review;
        }
      } else {
      }
      return review;
    });

    if (newReviews) {
      writeFile(newReviews, "updated");
    }
  });
};

const removeData = (name) => {
  fs.readFile("data/reviews.json", "utf8", (err, data) => {
    if (err) console.log(chalk`{red.inverse.bold Error occured while retrieve data}`);
    const reviews = JSON.parse(data);
    const newReviews = reviews.filter((review) => review.name.toLowerCase() !== name.toLowerCase());

    if (reviews.length === newReviews.length) {
      console.log(chalk`{red.inverse.bold Data with name ${name} is not found!}`);
      return;
    }

    writeFile(newReviews, "deleted");
  });
};

module.exports = { saveData, retrieveData, updateData, removeData, retrieveDataByNameOrEmail };
