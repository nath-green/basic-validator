import { assert } from 'chai';
import { Validator } from '../src';

const mockTrueFn = () => true;
const mockFalseFn = () => false;

describe('Validator', () => {
  it('instace of class', () => {
    const password = new Validator();
    assert.instanceOf(password, Validator);
  });

  it('adds single rule', () => {
    const password = new Validator();
    password.rule({
      fn: mockTrueFn,
      message: 'Test message'
    });
    assert.lengthOf(password.rules, 1);
  });

  it('chain multiple rules', () => {
    const password = new Validator();
    password
      .rule({
        fn: mockTrueFn,
        message: 'Test message 1'
      })
      .rule({
        fn: mockFalseFn,
        message: 'Test message 2'
      });
    assert.lengthOf(password.rules, 2);
  });

  it('succeed validation chain', () => {
    const password = new Validator();
    password.rule({
      fn: mockTrueFn,
      message: 'Test message'
    });
    assert.isTrue(password.validate());
    assert.lengthOf(password.errors(), 0);
  });

  it('fail validation chain', () => {
    const password = new Validator();
    password.rule({
      fn: mockFalseFn,
      message: 'Test message'
    });
    assert.isFalse(password.validate());
    assert.isArray(password.errors());
    assert.lengthOf(password.errors(), 1);
    assert.include(password.errors(), 'Test message');
  });
});
