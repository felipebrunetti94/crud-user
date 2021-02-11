const DATABASE_ERROR = {
  EMPTY_RESULT: "EMPTY_RESULT",
};

class EmptyDatabaseError extends Error {
  constructor() {
    super();
    this.code = "EMPTY_RESULT";
  }
}

module.exports = {
  EmptyDatabaseError,
  DATABASE_ERROR,
};
