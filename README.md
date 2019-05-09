## basic-validator

### Installation

**`yarn add basic-validator`** or `npm install basic-validator`

### Usage

#### Import

Import or require **`Validator`** to be consumed:

```js
import { Validator } from 'basic-validator';
```

#### Create Validator

Once imported, instantiate with:

```js
const password = new Validator();
```

#### Validator methods

| method                                                    | argument              | description                                                                                           |
| --------------------------------------------------------- | --------------------- | ----------------------------------------------------------------------------------------------------- |
| [`rule()`](#user-content-adding-rules-with-ruleobj)       | Object `{}`           | Add a validation rule                                                                                 |
| [`validate()`](#user-content-validating-with-validateval) | Value to be validated | Loop over all validation rules, returning an object containing `valid` (boolean) and `errors` (array) |

#### Adding rules with `.rule({...obj})`

To add a rule to a validator, call `rule({})` on the Validator instance, passing the following object `{}`:

| param     | required | type     | description                                      |
| --------- | -------- | -------- | ------------------------------------------------ |
| `fn`      | yes      | Function | Function to be called when validating            |
| `message` | yes      | String   | Message to be added to errors array upon failure |
| `params`  | no       | Array    | Parameters (in order) to be passed to function   |

##### ⭐ Rule expectations

- The function (`fn`) passed to the rule must return `true` or `false`. These can be custom validation functions or imported from many of the validation libraries.
- The function (`fn`) must accept the testing value as its first parameter.
- If parameters (`params`) are passed to the rule, they must be in order as per the functions documentation.

Example usage:

```js
password.rule({
  fn: containsSpecialChar,
  message: 'Must contain special character'
});
```

```js
password.rule({
  fn: charsBetween,
  message: 'Characters must be between 10 and 15',
  params: [10, 15]
});
```

Rules can also be chained:

```js
password
  .rule({
    fn: charsBetween,
    params: [10, 15],
    message: 'Chars need to be between 10 and 15'
  })
  .rule({
    fn: containsUnderscore,
    message: 'Must contain an underscore'
  })
  .rule({
    fn: containsDash,
    message: 'Must contain a dash'
  });
```

#### Validating with `.validate(val)`

Once the `Validator` has been created and rules added, running validation can be called with `.validate(val)` - passing the value to be validated. The validate function will return an object containing two keys; `valid` and `errors`.

The key `valid` will be a boolean, `errors` will be an array of messages defined from the rules.

For example:

```js
password.validate('hello');
// {
//   valid: false,
//   errors: ['Must contain an underscore', 'Must contain a dash']
// }
password.validate('pass-word_here');
// {
//   valid: true,
//   errors: []
// }
```
