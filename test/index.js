import { assert } from 'chai';
import { Validator } from '../src';

const mockTrueFn = () => true;
const mockFalseFn = () => false;

describe('Validator', () => {
  it('instace of class', () => {
    const _password = new Validator();
    assert.instanceOf(_password, Validator);
  });

  it('adds single rule', () => {
    const _password = new Validator();
    _password.rule({
      fn: mockTrueFn,
      message: 'Test message'
    });
    assert.lengthOf(_password.rules, 1);
  });

  it('chain multiple rules', () => {
    const _password = new Validator();
    _password
      .rule({
        fn: mockTrueFn,
        message: 'Test message 1'
      })
      .rule({
        fn: mockFalseFn,
        message: 'Test message 2'
      });
    assert.lengthOf(_password.rules, 2);
  });

  it('succeed validation chain', () => {
    const _password = new Validator();
    _password.rule({
      fn: mockTrueFn,
      message: 'Test message'
    });
    const password = _password.validate('hello');
    assert.isTrue(password.valid);
    assert.lengthOf(password.errors, 0);
  });

  it('fail validation chain', () => {
    const _password = new Validator();
    _password.rule({
      fn: mockFalseFn,
      message: 'Test message'
    });
    const password = _password.validate('hello')
    assert.isFalse(password.valid);
    assert.isArray(password.errors);
    assert.lengthOf(password.errors, 1);
    assert.include(password.errors, 'Test message');
  });
});
