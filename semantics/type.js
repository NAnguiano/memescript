const BOOLEAN_ID = 'bool';
const FLOAT_ID = 'float';
const STRING_ID = 'string';
const INT_ID = 'int';
const NULL_ID = 'null';
const OBJECT_ID = 'object';

class Type {

  constructor(type) {
    this.type = type;
  }

  toString() {
    return this.type;
  }

  isNumeric() {
    return this.type === 'float' || this.type === INT_ID;
  }

  isBoolean() {
    return this.type === BOOLEAN_ID;
  }

  isString() {
    return this.type === STRING_ID;
  }

  isEquivalentTypeTo(type) {
    if (this.type === INT_ID || this.type === FLOAT_ID) {
      return type.type === INT_ID || type.type === FLOAT_ID;
    }
    return this.type === type.type;
  }

  isAddableTo(type) {
    if (!this.isEquivalentTypeTo(type)) {
      return false;
    } else if (!this.isNumeric() && !this.isString()) {
      return false;
    }
    return true;
  }

}

const BOOL = new Type(BOOLEAN_ID);
const FLOAT = new Type(FLOAT_ID);
const INT = new Type(INT_ID);
const NULL = new Type(NULL_ID);
const STRING = new Type(STRING_ID);
const OBJECT = new Type(OBJECT_ID);

module.exports = {
  BOOL,
  FLOAT,
  INT,
  NULL,
  STRING,
  OBJECT,
  Type,
};
