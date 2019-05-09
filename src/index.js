class Validator {
  constructor() {
    this.rules = [];
  }

  rule({ fn, params = [], message }) {
    this.rules.push({
      fn,
      params,
      message
    });
    return this;
  }

  validate(toTest) {
    const errors = [];

    this.rules.forEach(rule => {
      const { fn, params, message } = rule;
      if (!fn(toTest, ...params)) errors.push(message);
    });

    return {
      valid: errors.length === 0,
      errors
    };
  }
}

module.exports = {
  Validator
};
