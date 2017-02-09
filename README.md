# MEMESCRIPT

<img src="memescript.jpg/">

## Introduction
---
MemeScript is a language composed entirely of Internet memes. It compiles to JavaScript. Coding in this language will increase your intelligence level by 5 points. Your knowledge of memes will be over 9000. Your ability to express yourself will reach hitherto unknown heights, the meaning and subtext of all words will become mashed into the implications of large images with text pasted on top. This language destroys all sorrows and is also what is wrong with the world.

## Features
---
Memescript is an object-oriented language that features many memes.

### Functions
Function definitions specify the exact number of parameters that the function call will require. Parameters are passed by value of reference, and can be modified. Parameter evaluation is arbitrary. Functions can return a single value, or no value. Functions can be first-class or recursive, but cannot by anonymous.

### Types
Type checking is done dynamically, and variables are weakly typed. There are only two number types: int and double. There is no character type, as characters are considered strings of length one. Expressions and functions are typeless by default. Types are not objects. There will be supertypes and subtypes, but multiple inheritance is not allowed. Classes are considered to be the same as types, and new types and classes can be added. There are no pointer, parameterized, or dependent types.

### Expressions
Expressions are evaluated eagerly, and only infix notation is allowed. Operators cannot be overloaded, and the precedence of operators is fixed and cannot be changed. Variables can be marked as mutable or immutable, and can be reassigned after initial assignment if they are mutable. Destructuring and pattern matching will be allowed. Scoping is considered to be the same as javascript.

## Examples
---

### Function Declarations
```
you: add(x, y):                                  function add(x, y) {
    me, an intellectual: x + y;                         return x + y;
                                                    }
```

### If Statement
```
I don't always (homework.isFinished()):             if (homework.isFinished()) {
    but when I do: me.goToSleep();                      me.goToSleep();
                                                    }
```

### Switch Statement
```
this is bill(x):                                    switch (x) {
    bill has a "banana":                                case "banana":
        me.eat(x);                                          me.eat(x);
        be like bill;                                       break;
    bill is a "cheeseburger":                           case "cheeseburger":
        me.eat(x);                                          me.eat(x);
        be like bill;                                       break;
    bill is smart:                                      default:
        me.buyFood();                                       me.buyFood();
        be like bill;                                       break;
                                                    }
```

### While Loop
```
yo, I'mma let you finish (weather.isRaining()):     while (weather.isRaining()) {
    but: me.stayInside();                               me.stayInside();
                                                    }
```

### Array Declaration
```
much students;                                      var students = new Array();
```

### Variable Declaration
```
This is type book;                                          var type book;
```

### Try, Catch, and Finally
```
Chuck Norris doesn't:                               try {
    console.doge("testing testing");                    console.doge("testing testing");
or (err):                                           } catch (err) {
    console.error(err);                                 console.error(err);
he:                                                 } finally {
    console.log("testing testing");                     console.log("testing testing");
                                                    }

Chuck Norris doesn't:                               try {
    such me;                                            var me = null;
    me = null;                                          me.wakeUp();  
    me.wakeUp();                                    } catch (err) {
he (err):                                               console.error(err);
    console.error(err);                             }
```

### For Loop
```
yo, I'mma let you finish for (10):                  for (var i = 0; i < 10; i++) {
   but: console.log(Beyoncé);                           console.log(i);
                                                    }
```
## Grammer
```
MemeScript {

  Program           =  FunctionBody
  FunctionBody      =  (Statement"kappa")+
  Statement         = FunctionDeclare
  						      |TypeDeclare
                    |Loop
                    |Print
                    |Return
  FunctionDeclare   = "you: an " VarName "(" (VarName ("," VarName)*)* ")" "kappa"
  FunctionCall      =  VarName "(" (VarName ("," VarName)*)* ")" "kappa"
  TypeDeclare       = "This is" type VarName "kappa"
  Return 			      =	"me, an intellectual: " VarName "kappa"
  						      |		"me, an intellectual: " FunctionCall "kappa"
  Loop              = "yo, I'mma let you finish ("  boolean  "): \n but:" FunctionBody "kappa"
                    | "yo, I'mma let you finish ("  numb  "): \n but:" FunctionBody "kappa"

  Exp               =  Exp "I don't always " "("Exp "):" "but when I do:" FunctionBody "kappa"
  Exp2              =  Exp2 addop Exp3                 -- binary
                    |  Exp3
  Exp3              =  Exp3 mulop Exp4                 -- binary
                    |  Exp4
  Exp4              =  prefixop Exp5                   -- unary
                    |  Exp5
  Exp5              =  postfixop Exp6                  -- unary
                    |  Exp6
  Exp6              =  numb
                    |  string
                    |  VarName
                    |  FunctionCall
                    |  "(" Exp ")"                     -- parens
  VarName            =  id

  keyword           =  (boolean|type|"kappa" | "This is" | "me, an intellectual: " | "you: an " |) ~varusable
  type              =  ("boolean", "numblit", "string", "unicode")
  id                =  ~keyword varstart varusable*
  varstart          =  letter
  varusable         =  letter | digit

  string            =  doublequote strusable* doublequote
  numb              =  digit+
  boolean           = ("true"|"false")

  strusable         =  any | escapesingquote | escapedoubquote | escaper | escapen | escapeescape | escapeunicode | doublequote
  unicode           =  hex hex hex hex
  hex               =  digit | "a" | "b" | "c" | "d" | "e" | "f"

  backslash         =  "\\"
  doublequote       =  "\""
  singlequote       =  "\'"

  escapesingquote   = backslash singlequote
  escapedoubquote   = backslash doublequote
  escaper           = backslash "r"
  escapen           = backslash "n"
  escapeescape      = backslash backslash

  addop             =  "+" | "-"
  mulop             =  "*" | "/"
  prefixop          =  "-"
  postfixop         =  "!"

  comment           =  "--" (~"\n" any)* "\n"
}
```
