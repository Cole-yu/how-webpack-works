// 重写了window["webpackJsonp"].push 的方法，为webpackJsonpCallback
// window["webpackJsonp"]原来的push方法保存在了 oldJsonpFunction，parentJsonpFunction中 
// webpackJsonpCallback方法参数是个数组， 参数：[[0], { moduleId: function(){}, moduleId: function(){} }]
webpackJsonpCallback([[0],{
// (window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./src/utils/array.js":
/*!****************************!*\
  !*** ./src/utils/array.js ***!
  \****************************/
/*! exports provided: each */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, "each", function() { return each; });

const each = (arr, fn) => {
  for(let i = 0; i < arr.length; i++) {
    fn(arr[i]);
  }
}

/***/ }),

/***/ "./src/utils/math.js":
/*!***************************!*\
  !*** ./src/utils/math.js ***!
  \***************************/
/*! exports provided: plus, minus, sum, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "plus", function() { return plus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "minus", function() { return minus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sum", function() { return sum; });
/* harmony import */ var _array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./array */ "./src/utils/array.js");


const plus = (a, b) => {
  return a + b;
};

const minus = (a, b) => {
  return a - b;
};

const sum = arr => {
  let sum = 0;

  Object(_array__WEBPACK_IMPORTED_MODULE_0__["each"])(arr, arrItem => {
    sum += arrItem;
  });

  return sum;
}

/* harmony default export */ __webpack_exports__["default"] = (minus);

/***/ })

}]);
//# sourceMappingURL=0.js.map