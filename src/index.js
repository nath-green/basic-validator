class Validator {
  constructor() {
    this.rules = [];
    this.error = [];
  }

  rule({ fn, params = [], message }) {
    this.rules.push({
      fn,
      params,
      message
    });
    return this;
  }

  errors() {
    return this.error;
  }

  validate(toTest) {
    this.error = [];

    this.rules.forEach(rule => {
      const { fn, params, message } = rule;
      if (!fn(toTest, ...params)) this.error.push(message);
    });

    return this.error.length === 0;
  }
}

module.exports = {
  Validator
};
