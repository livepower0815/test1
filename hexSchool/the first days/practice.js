String.prototype.palindrome = function () {

    for (var i = 0 ; i < this.length ; i++) {
        if (this.charAt(i) !== this.charAt(this.length - i - 1)) {
            return "false";
        }
        return "true";
    }
};


var AA = "abcdcba";
var BB = "argffdaffd";
var CC = "abcddcba";
var DD = "aabbcccbbaa";
console.log(AA.palindrome());
console.log(BB.palindrome());
console.log(CC.palindrome());
console.log(DD.palindrome());
console.log(DD.length);
