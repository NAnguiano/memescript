# MEMESCRIPT

<img src="memescript.jpg">

## Introduction
---
MemeScript is a language composed entirely of Internet memes. It compiles to JavaScript. Coding in this language will increase your intelligence level by 5 points. Your ability to express yourself will reach hitherto unknown heights, the meaning and subtext of all words will become mashed into the implications of large images with text pasted on top. This language destroys all sorrows.

## Features
---
MemeScript is an object-oriented language that features many memes.

### Functions
Function definitions specify the exact number of parameters that the function call will require. Parameters are passed by value or reference, and can be modified. Parameter evaluation is arbitrary. Functions can return a single value, or no value. Functions can be first-class or recursive, but cannot be anonymous. Optional and splat parameters are allowed, but must be put at the end of the parameter list. Functions must be called with at least the number of required (non-optional or splat) parameters that are specified in the function declaration.

### Types
Type checking is done at compile time, and variables are strongly typed. There are only two number types: int and float. There is no character type, as characters are considered strings of length one. Expressions are given a type based on the type of expression. Functions are typeless by default, though functions with return statements are given the type of their return statement. Types are not objects, though there is an object type. There will be supertypes and subtypes, but multiple inheritance is not allowed. Classes are considered to be the same as types, and new types and classes can be added. There are no pointer, parameterized, or dependent types.

### Expressions
Expressions are evaluated eagerly, and only infix notation is allowed. Operators cannot be overloaded, and the precedence of operators is fixed and cannot be changed. Variables can be marked as mutable or immutable, and can be reassigned after initial assignment if they are mutable. Destructuring and pattern matching is currently not allowed. Scoping is considered to be the same as in JavaScript.

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
I don't always (homework.isFinished()) but when I do {
  me.goToSleep();
}

if (homework.isFinished()) {
  me.goToSleep();
}
```

### While Loop
```
yo, I'mma let you finish (weather.isRaining()) but {
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

### Static Semantic Errors
* Assigning a value to an undeclared variable
* Reassigning a constant
* Reinitializing a variable 
* Redeclaring a variable 
* Using a variable before its declaration/initialization
* Using the '%', '/', '\*', or '-' operators on non-numeric operands
* Using the '>', '<', '>=', and '<=' operators on non-numeric operands.
* Using the '+' operator on operands that are not two strings or two numbers
* Using the '||' and '&&' operators on non-boolean operands
* Using the '!' operator on a non-boolean operand
* Using the '-' operator (as in -2) on a non-numeric operand
* Having a conditional on an if or if-else statment that is not of type boolean
* Having a conditional on a for or while loop that is not of type boolean
* Using a function before its declaration 
* Calling a non-function variable as a function
* Reassigning a function variable 
* Calling a function with too few required (non-optional, non-splat) parameters 
* Calling a function with too many parameters (including optional/splat) 
* Giving an optional parameter a value of a different type in a function call
* Declaring an optional parameter before a required parameter 
* Declaring a splat parameter before the end of the parameter list 
* Using a return statement outside of a function
* Returning multiple different types from a function 
* Declaring two object methods with the same name 
* Instantiating an object before its been declared 
* Instantiating as an object a variable that is not an object
* Instantiating an object with too few required (non-optional, non-splat) arguments 
* Instantiating an object with too many arguments (including optional/splat) 
* Using dot or bracket notation on a variable that is not of type object

Full set of Railroad Diagrams for our syntax, [here.](https://rawgit.com/NAnguiano/memescript/gh-pages/docs/diagram.xhtml)  
For more examples and to read the grammar, please check out [our repo.](https://github.com/NAnguiano/memescript/)
