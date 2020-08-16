function showDate() {
  var d = new Date(), repr,
      fmt = document.getElementById("date-format").value;
  if ( fmt === "value" ) {
    repr = d*1;
  } else if ( fmt === "locale-string" ) {
    repr = d.toLocaleString();
  } else if ( fmt === "iso-string" ) {
    repr = d.toISOString();
  } else if ( fmt === "utc-string" ) {
    repr = d.toUTCString();
  } else if ( fmt === "date-string" ) {
    repr = d.toDateString();
  } else if ( fmt === "time-string" ) {
    repr = d.toTimeString();
  } else {
    repr = d.toString();
  }
  document.getElementById("date").innerHTML = repr;
}

function copyDate() {
  var s = document.getElementById("date").innerHTML;
  copyTextToClipboard(s, "copy-date");
  animateShow("date", [1.0, 300, 0.5, 200, 0.5, 300, 1.0]);
}

var mathconst = [
"E", "PI"];

var mathfn = [
"cos", "sin", "tan",
"acos", "asin", "atan", "atan2",
"cosh", "sinh", "tanh",
"acosh", "asinh", "atanh",
"sqrt", "cbrt", "hypot",
"abs", "min", "max", "sign",
"floor", "ceil", "trunc", "round", "fround",
"pow", "exp", "expm1", "log", "log10", "log1p", "log2",
"random" ];

function calculate() {
  var s = document.getElementById("expr").value, i, re;
  // replace mathematical functions
  for ( i = 0; i < mathfn.length; i++ ) {
    var fn = mathfn[i];
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Cheatsheet
    // preceeding character should not be letter or "."
    // re = RegExp("(?<![a-zA-Z.])" + fn + "[(]", "g");
    // but this is not supported by Firefox <= 78
    re = RegExp("\\b" + fn + "[(]", "g");
    s = s.replace(re, "Math."+fn+"(");
  }
  for ( i = 0; i < mathconst.length; i++ ) {
    var c = mathconst[i];
    re = RegExp("\\b" + c + "\\b", "ig");
    s = s.replace(re, "Math."+c);
  }
  var r = eval(s);
  document.getElementById("result").innerHTML = r;
}

function copyResult() {
  var s = document.getElementById("result").innerHTML;
  copyTextToClipboard(s, "copy-result");
  animateShow("result", [1.0, 300, 0.5, 200, 0.5, 300, 1.0]);
}

window.onload = function() {
  showDate();
  document.getElementById("mathfn").innerHTML = mathfn.join(", ");
  document.getElementById("mathconst").innerHTML = mathconst.join(", ");
};

