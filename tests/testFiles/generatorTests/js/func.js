let e_ = 10;
function fun_ (a_, b_, c_ = 10, ...d_) {
  console.error(true);
  console.log(d_);
  return a_;
}
fun_(10, 11);
function getB_ (b_, c_, a_, o_) {
  return "bagel";
}
getB_(10, 11, 12, 13);
getB_("a", 'b', "c", "d");
getB_(4 > 5, 13212, 12, 2);
e_ = getB_(1, 2, 3, 4);
let b_ = getB_(0, 1, 2, 3);
const c_ = getB_(5, 6, 7, 8);
