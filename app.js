// const { askQuestion, saveData } = require("./review");
const { save, retrieve, update, remove, detailReview } = require("./controller/crud");
const chalk = require("chalk");
const yargs = require("yargs");

//create new data
yargs
  .command({
    command: "add",
    describe: "add new review",
    builder: {
      name: {
        describe: "user name",
        demandOption: true,
        type: "string",
      },
      email: {
        describe: "user email",
        demandOption: false,
        type: "string",
      },
      phoneNumber: {
        describe: "user phone number",
        demandOption: true,
        type: "string",
      },
      review: {
        describe: "user review",
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      const { name, email, phoneNumber, review } = argv;
      const reviewData = { name, email, phoneNumber, review };

      save(reviewData);
    },
  })
  .demandCommand();

//retrieve all data
yargs.command({
  command: "detail",
  describe: "Retrieve data review",
  builder: {
    name: {
      describe: "user name",
      demandOption: false,
      type: "string",
    },
    email: {
      describe: "user email",
      demandOption: false,
      type: "string",
    },
  },
  handler(argv) {
    const { name, email } = argv;
    const data = { name, email };
    detailReview(data);
  },
});

//retrieve data by name / email
yargs.command({
  command: "list",
  describe: "Retrieve data review by name or email",
  handler() {
    retrieve();
  },
});

yargs.command({
  command: "delete",
  describe: "Delete data by name",
  builder: {
    name: {
      describe: "user name",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    remove(argv.name);
  },
});

yargs.command({
  command: "update",
  describe: "Delete data by name",
  builder: {
    name: {
      describe: "user name",
      demandOption: true,
      type: "string",
    },
    email: {
      describe: "user email",
      demandOption: false,
      type: "string",
    },
    phoneNumber: {
      describe: "user phone number",
      demandOption: false,
      type: "string",
    },
    review: {
      describe: "user review",
      demandOption: false,
      type: "string",
    },
  },
  handler(argv) {
    const { name, email, phoneNumber, review } = argv;
    const reviewData = { name, email, phoneNumber, review };

    update(reviewData);
  },
});

yargs.parse();

// const main = async () => {
//   const name = await askQuestion(chalk`{bold What} is your name? `);
//   const phoneNumber = await askQuestion(chalk`{bold What} is your phone number? `);
//   const email = await askQuestion(chalk`{bold What} is your email? `);
//   const review = await askQuestion(chalk`{bold What} is your review for The Lord of The Rings? `);

//   saveData(name, phoneNumber, email, review);
// };

// main();
