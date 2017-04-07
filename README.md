# MEMESCRIPT

<img src="memescript.jpg/">

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
you: add(x, y)                                               function add(x, y) {
me, an intellectual: {                                           return x + y;
  i can haz x + y;                                           }
}

you: add(x = 10, y = 10)                                     function add(x = 10, y = 10) {
me, an intellectual: {                                           console.error(x + y);
  RIP(x + y);                                                }
}

you: add(x, y...)                                            function add(x, y...) {                         
me, an intellectual: {                                           alert(y);
  here come dat boi (y);                                         console.log("For Harambe");
  dicks.out("For Harambe");                                  }
}
```

### If Statement
```
I don't always (homework.isFinished()) but when I do {       if (homework.isFinished()) {
    me.goToSleep();                                              me.goToSleep();
}                                                            }

```

### If-ElseIf-Else Statement
```
I don't always (homework.isFinished()) but when I do {       if (homework.isFinished() {
    me.goToSleep();                                              me.goToSleep();
} but sometimes I (homework.procrastinating()) {             } else if (homework.procrastinating()) {
    me.procrastinate();                                          me.procrastinate();
} otherwise I do {                                           } else {
    me.readBook();                                               me.readBook();
}                                                            }
```

### Switch Statement
```
this is bill (x) {                                           switch (x) {
  bill has a "banana" {                                          case "banana":
    me.eat(x);                                                       me.eat(x);
    be like bill;                                                    break;
  } bill is a "cheeseburger" {                                   case "cheeseburger":
    me.eat(x);                                                       me.eat(x);
    be like bill;                                                    break;
  } bill is smart {                                              default:
    me.buyFood();                                                    me.buyFood();
    be like bill;                                                    break;
  }                                                          }
}
```

### While Loop
```
yo, I'mma let you finish (weather.isRaining()) but {         while (weather.isRaining()) {
    me.stayInside();                                             me.stayInside();
}                                                            }
```

### Variable Declaration
```
ermahgerd book = 0;                                          let book = 0;
overlyattachedgirlfriend.jpg book = 0;                       const book = 0;
```

### Try, Catch, and Finally
```
Chuck Norris doesn't {                                       try {
  dicks.out("testing testing");                                   console.log("testing testing");
} or (err) {                                                 } catch (err) {
  RIP(err);                                                       console.error(err);
} he {                                                       } finally {
  dicks.out("testing testing");                                  console.log("testing testing");
}                                                            }

Chuck Norris doesn't {                                       try {
  ermahgerd me;                                                  let me = null;
  me = null;                                                     me.wakeUp();  
  me.wakeUp();                                               } catch (err) {
} he (err) {                                                     console.error(err);
  console.error(err);                                        }
}
```

### For Loop
```
one does not simply {                                        for (let i = 0; i < 10; i++) {
  me.doHomework();                                               me.doHomework();
  me.manageTimeProperly();                                       me.manageTimeProperly();
  me.goToSleep();                                                me.goToSleep();
} without (ermahgerd i = 10; i < 10; i = i + 1)              }
```

### Objects
```
wow Stack {                                                  class Stack {                  
  such (length = 0) {                                            constructor (length = 0) {
    much.length = length;                                            this.length = length;
  }                                                              }
  so getLength() {                                               getLength {
    i can haz much.length;                                           return this.length;
  }                                                              }
}                                                            }

ermahgerd newStack = very Stack();                           let newStack = new Stack();
```

### Static Semantic Rules
* Values cannot be assigned to variables that are not declared (ex. a = 10;, if a is not yet declared).
* Constants cannot be reassigned.
* Variables cannot be reinitialized (ex. ermahgerd a = 10; ermahgerd a = "hi";).
* Variables cannot be redeclared.
* Variables must be declared before they are used.
* The '%', '/', '\*', and '-' operators can only be used on numeric operands.
* The '>', '<', '>=', and '<=' operators can only be used on numeric operands.
* The '+' operator can only be used on two strings or two numbers.
* The '||' and '&&' operators require boolean operands.
* The '!' operator requires a boolean operand.
* The '-' operator (as in -2, not 5 - 2) requires a numeric operand.
* The conditional of if and else-if statements must be of boolean type.
* The conditional of for and while loops must be of boolean type.
* Functions must be declared before they are called.
* Variables cannot be called as functions unless they are a function.
* Function variable names cannot be overloaded, as functions are declared as constants.
* Functions must be called with at least the number of required parameters allowed.
* Functions cannot be called with more parameters than they have in the declaration, including optional parameters and splat parameters.
* Optional parameters given a value must be given a value of the same type as the original value's type.
* Optional parameters must be declared after all required (not optional) parameters.
* Splat parameters must come at the end of the parameter list.
* Return statements must be used in functions.
* All return statements in a function must return the same type.
* Object Methods must be declared with different names, as they are declared as constants.
