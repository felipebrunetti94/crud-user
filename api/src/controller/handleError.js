const STATUS = require("./status");
const { DATABASE_ERROR } = require("../infra/errors");

const handleError = (error, res) => {
  console.error(error);
  switch (error.code) {
    case 11000:
      res
        .status(STATUS.BAD_REQUEST)
        .end("Documento de identificação já existe na base de dados.");
    case DATABASE_ERROR.EMPTY_RESULT:
      res.status(STATUS.NOT_FOUND).end();
      break;
    default:
      res.status(STATUS.UNKNOWN_ERROR).end();
  }
};

module.exports = handleError;
