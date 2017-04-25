class testClass_ {
  constructor (p1_, p2_, p3_) {
    console.log(p1_);
    console.log(p2_);
    console.log(p3_);
  }
  shine_ () {
    console.log("Double rainbow");
  }
  woah_ () {
    let x_ = 10;
  }
}
let aa_ = new testClass_(10, 11, 12);
let cc_ = aa_.shine_;
let tt_ = aa_[0];
class testClass2_ {
  constructor (beep_ = true) {
    alert(beep_);
  }
}
const yay_ = new testClass2_(false);
let asdasd_ = new testClass2_();
class testClass3_ {
  constructor () {
  }
}
let z_ = new testClass3_();
class testClass4_ {
  constructor (a_ = "noooo") {
  }
  YAY_ (b_) {
    console.log("We should probably make a this keyword");
  }
}
let b_ = new testClass4_();
const maybe_ = new testClass4_('d');
let c_ = maybe_.hi_;
let t_ = maybe_[0];
