# MEMESCRIPT

<img src="memescript.jpg">

## Introduction
---
MemeScript is a language composed entirely of Internet memes. It compiles to JavaScript. Coding in this language will increase your intelligence level by 5 points. Your ability to express yourself will reach hitherto unknown heights, the meaning and subtext of all words will become mashed into the implications of large images with text pasted on top. This language destroys all sorrows.

## Features
---
MemeScript is an object-oriented language that features many memes.

### Functions
Function definitions specify the exact number of parameters that the function call will require. Parameters are passed by value of reference, and can be modified. Parameter evaluation is arbitrary. Functions can return a single value, or no value. Functions can be first-class or recursive, but cannot by anonymous.

### Types
Type checking is done dynamically, and variables are weakly typed. There are only two number types: int and double. There is no character type, as characters are considered strings of length one. Expressions and functions are typeless by default. Types are not objects. There will be supertypes and subtypes, but multiple inheritance is not allowed. Classes are considered to be the same as types, and new types and classes can be added. There are no pointer, parameterized, or dependent types.

### Expressions
Expressions are evaluated eagerly, and only infix notation is allowed. Operators cannot be overloaded, and the precedence of operators is fixed and cannot be changed. Variables can be marked as mutable or immutable, and can be reassigned after initial assignment if they are mutable. Destructuring and pattern matching will be allowed. Scoping is considered to be the same as in JavaScript.

## Examples
---

### Function Declarations
```
/* Supporting optional parameters. */
you: add(x = 10, y = 10)
me, an intellectual: { 
  i can haz x + y;
}

function add(x = 10, y = 10) {
  return x + y;
}

/* Supporting splat parameters */
you: giveInfo(x, y...)                
me, an intellectual: {
  here come dat boi (y);
  dicks.out("For Harambe");
}

function giveInfo(x, ...y) {
  alert(y);
  console.log("For Harambe");
}
```

### Variable Declaration
```
ermahgerd book = 0;
let book = 0;

overlyattachedgirlfriend.jpg book = 0;
const book = 0;
```

### If Statement
```
I don't always (homework.isFinished())
but when I do {
  me.goToSleep();
}

if (homework.isFinished()) {
  me.goToSleep();
}
```

### While Loop
```
yo, I'mma let you finish (weather.isRaining())
but {
  me.stayInside();
}

while (weather.isRaining()) {
  me.stayInside();
}
```

### Objects
```
wow Stack {    
  such (length = 0) {
    much.length = length;
  }
  so getLength() {
    i can haz much.length;
  }
}

ermahgerd newStack = very Stack();  

class Stack {
  constructor (length = 0) {
    this. length = length;
  }
  getLength() {
    return this.length;
  }
}
                
let newStack = new Stack();
```

### Errors
```
CONGRATULATIONS! You played yourself.
Hold the door.
RIP.
FUUUUUUUUUUU-
WHY YOU NO WORK
```

For more examples and to read the grammar, please check out [our repo.](https://github.com/NAnguiano/memescript/)
