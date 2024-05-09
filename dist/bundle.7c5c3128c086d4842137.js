/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[1].use[2]!./node_modules/sass-loader/dist/cjs.js!./src/style.scss":
/*!************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[1].use[2]!./node_modules/sass-loader/dist/cjs.js!./src/style.scss ***!
  \************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, `body {\n  margin: 0;\n  width: 100%;\n  min-height: 100vh;\n}`, \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://ecommerce-app/./src/style.scss?./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js??ruleSet%5B1%5D.rules%5B0%5D.oneOf%5B1%5D.use%5B2%5D!./node_modules/sass-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\nmodule.exports = function (cssWithMappingToString) {\n  var list = [];\n\n  // return the list of modules as css string\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = \"\";\n      var needLayer = typeof item[5] !== \"undefined\";\n      if (item[4]) {\n        content += \"@supports (\".concat(item[4], \") {\");\n      }\n      if (item[2]) {\n        content += \"@media \".concat(item[2], \" {\");\n      }\n      if (needLayer) {\n        content += \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\");\n      }\n      content += cssWithMappingToString(item);\n      if (needLayer) {\n        content += \"}\";\n      }\n      if (item[2]) {\n        content += \"}\";\n      }\n      if (item[4]) {\n        content += \"}\";\n      }\n      return content;\n    }).join(\"\");\n  };\n\n  // import a list of modules into the list\n  list.i = function i(modules, media, dedupe, supports, layer) {\n    if (typeof modules === \"string\") {\n      modules = [[null, modules, undefined]];\n    }\n    var alreadyImportedModules = {};\n    if (dedupe) {\n      for (var k = 0; k < this.length; k++) {\n        var id = this[k][0];\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n    for (var _k = 0; _k < modules.length; _k++) {\n      var item = [].concat(modules[_k]);\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        continue;\n      }\n      if (typeof layer !== \"undefined\") {\n        if (typeof item[5] === \"undefined\") {\n          item[5] = layer;\n        } else {\n          item[1] = \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\").concat(item[1], \"}\");\n          item[5] = layer;\n        }\n      }\n      if (media) {\n        if (!item[2]) {\n          item[2] = media;\n        } else {\n          item[1] = \"@media \".concat(item[2], \" {\").concat(item[1], \"}\");\n          item[2] = media;\n        }\n      }\n      if (supports) {\n        if (!item[4]) {\n          item[4] = \"\".concat(supports);\n        } else {\n          item[1] = \"@supports (\".concat(item[4], \") {\").concat(item[1], \"}\");\n          item[4] = supports;\n        }\n      }\n      list.push(item);\n    }\n  };\n  return list;\n};\n\n//# sourceURL=webpack://ecommerce-app/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \**************************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = function (i) {\n  return i[1];\n};\n\n//# sourceURL=webpack://ecommerce-app/./node_modules/css-loader/dist/runtime/noSourceMaps.js?");

/***/ }),

/***/ "./src/modules/loginPage/ui/style.module.scss":
/*!****************************************************!*\
  !*** ./src/modules/loginPage/ui/style.module.scss ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"login-page\": () => (/* binding */ _1)\n/* harmony export */ });\n// extracted by mini-css-extract-plugin\nvar _1 = \"style-module__login-page___GIvz9\";\n\n\n\n//# sourceURL=webpack://ecommerce-app/./src/modules/loginPage/ui/style.module.scss?");

/***/ }),

/***/ "./src/shared/components/button/style.module.scss":
/*!********************************************************!*\
  !*** ./src/shared/components/button/style.module.scss ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"simple-button\": () => (/* binding */ _1)\n/* harmony export */ });\n// extracted by mini-css-extract-plugin\nvar _1 = \"style-module__simple-button___P9bGQ\";\n\n\n\n//# sourceURL=webpack://ecommerce-app/./src/shared/components/button/style.module.scss?");

/***/ }),

/***/ "./src/shared/components/input/style.module.scss":
/*!*******************************************************!*\
  !*** ./src/shared/components/input/style.module.scss ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   input: () => (/* binding */ _1),\n/* harmony export */   input__hint: () => (/* binding */ _2),\n/* harmony export */   wronginput: () => (/* binding */ _3)\n/* harmony export */ });\n// extracted by mini-css-extract-plugin\nvar _1 = \"style-module__input___E_e9t\";\nvar _2 = \"style-module__input__hint___RguEm\";\nvar _3 = \"style-module__wronginput___gg2OM\";\n\n\n\n//# sourceURL=webpack://ecommerce-app/./src/shared/components/input/style.module.scss?");

/***/ }),

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_0_oneOf_1_use_2_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[1].use[2]!../node_modules/sass-loader/dist/cjs.js!./style.scss */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[1].use[2]!./node_modules/sass-loader/dist/cjs.js!./src/style.scss\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\noptions.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_0_oneOf_1_use_2_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_0_oneOf_1_use_2_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_0_oneOf_1_use_2_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_0_oneOf_1_use_2_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://ecommerce-app/./src/style.scss?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

eval("\n\nvar stylesInDOM = [];\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n  for (var i = 0; i < stylesInDOM.length; i++) {\n    if (stylesInDOM[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n  return result;\n}\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var indexByIdentifier = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3],\n      supports: item[4],\n      layer: item[5]\n    };\n    if (indexByIdentifier !== -1) {\n      stylesInDOM[indexByIdentifier].references++;\n      stylesInDOM[indexByIdentifier].updater(obj);\n    } else {\n      var updater = addElementStyle(obj, options);\n      options.byIndex = i;\n      stylesInDOM.splice(i, 0, {\n        identifier: identifier,\n        updater: updater,\n        references: 1\n      });\n    }\n    identifiers.push(identifier);\n  }\n  return identifiers;\n}\nfunction addElementStyle(obj, options) {\n  var api = options.domAPI(options);\n  api.update(obj);\n  var updater = function updater(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {\n        return;\n      }\n      api.update(obj = newObj);\n    } else {\n      api.remove();\n    }\n  };\n  return updater;\n}\nmodule.exports = function (list, options) {\n  options = options || {};\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDOM[index].references--;\n    }\n    var newLastIdentifiers = modulesToDom(newList, options);\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n      var _index = getIndexByIdentifier(_identifier);\n      if (stylesInDOM[_index].references === 0) {\n        stylesInDOM[_index].updater();\n        stylesInDOM.splice(_index, 1);\n      }\n    }\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://ecommerce-app/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

eval("\n\nvar memo = {};\n\n/* istanbul ignore next  */\nfunction getTarget(target) {\n  if (typeof memo[target] === \"undefined\") {\n    var styleTarget = document.querySelector(target);\n\n    // Special case to return head of iframe instead of iframe itself\n    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n      try {\n        // This will throw an exception if access to iframe is blocked\n        // due to cross-origin restrictions\n        styleTarget = styleTarget.contentDocument.head;\n      } catch (e) {\n        // istanbul ignore next\n        styleTarget = null;\n      }\n    }\n    memo[target] = styleTarget;\n  }\n  return memo[target];\n}\n\n/* istanbul ignore next  */\nfunction insertBySelector(insert, style) {\n  var target = getTarget(insert);\n  if (!target) {\n    throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n  }\n  target.appendChild(style);\n}\nmodule.exports = insertBySelector;\n\n//# sourceURL=webpack://ecommerce-app/./node_modules/style-loader/dist/runtime/insertBySelector.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction insertStyleElement(options) {\n  var element = document.createElement(\"style\");\n  options.setAttributes(element, options.attributes);\n  options.insert(element, options.options);\n  return element;\n}\nmodule.exports = insertStyleElement;\n\n//# sourceURL=webpack://ecommerce-app/./node_modules/style-loader/dist/runtime/insertStyleElement.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\n/* istanbul ignore next  */\nfunction setAttributesWithoutAttributes(styleElement) {\n  var nonce =  true ? __webpack_require__.nc : 0;\n  if (nonce) {\n    styleElement.setAttribute(\"nonce\", nonce);\n  }\n}\nmodule.exports = setAttributesWithoutAttributes;\n\n//# sourceURL=webpack://ecommerce-app/./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction apply(styleElement, options, obj) {\n  var css = \"\";\n  if (obj.supports) {\n    css += \"@supports (\".concat(obj.supports, \") {\");\n  }\n  if (obj.media) {\n    css += \"@media \".concat(obj.media, \" {\");\n  }\n  var needLayer = typeof obj.layer !== \"undefined\";\n  if (needLayer) {\n    css += \"@layer\".concat(obj.layer.length > 0 ? \" \".concat(obj.layer) : \"\", \" {\");\n  }\n  css += obj.css;\n  if (needLayer) {\n    css += \"}\";\n  }\n  if (obj.media) {\n    css += \"}\";\n  }\n  if (obj.supports) {\n    css += \"}\";\n  }\n  var sourceMap = obj.sourceMap;\n  if (sourceMap && typeof btoa !== \"undefined\") {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  }\n\n  // For old IE\n  /* istanbul ignore if  */\n  options.styleTagTransform(css, styleElement, options.options);\n}\nfunction removeStyleElement(styleElement) {\n  // istanbul ignore if\n  if (styleElement.parentNode === null) {\n    return false;\n  }\n  styleElement.parentNode.removeChild(styleElement);\n}\n\n/* istanbul ignore next  */\nfunction domAPI(options) {\n  if (typeof document === \"undefined\") {\n    return {\n      update: function update() {},\n      remove: function remove() {}\n    };\n  }\n  var styleElement = options.insertStyleElement(options);\n  return {\n    update: function update(obj) {\n      apply(styleElement, options, obj);\n    },\n    remove: function remove() {\n      removeStyleElement(styleElement);\n    }\n  };\n}\nmodule.exports = domAPI;\n\n//# sourceURL=webpack://ecommerce-app/./node_modules/style-loader/dist/runtime/styleDomAPI.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction styleTagTransform(css, styleElement) {\n  if (styleElement.styleSheet) {\n    styleElement.styleSheet.cssText = css;\n  } else {\n    while (styleElement.firstChild) {\n      styleElement.removeChild(styleElement.firstChild);\n    }\n    styleElement.appendChild(document.createTextNode(css));\n  }\n}\nmodule.exports = styleTagTransform;\n\n//# sourceURL=webpack://ecommerce-app/./node_modules/style-loader/dist/runtime/styleTagTransform.js?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.scss */ \"./src/style.scss\");\n/* harmony import */ var _modules_application__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/application */ \"./src/modules/application.ts\");\n\n\n\n\n//# sourceURL=webpack://ecommerce-app/./src/index.ts?");

/***/ }),

/***/ "./src/modules/application.ts":
/*!************************************!*\
  !*** ./src/modules/application.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _loginPage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./loginPage */ \"./src/modules/loginPage/index.ts\");\nvar _a;\n\nconst lp = new _loginPage__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n(_a = document.querySelector('body')) === null || _a === void 0 ? void 0 : _a.append(lp.elem);\n\n\n//# sourceURL=webpack://ecommerce-app/./src/modules/application.ts?");

/***/ }),

/***/ "./src/modules/loginPage/index.ts":
/*!****************************************!*\
  !*** ./src/modules/loginPage/index.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ui */ \"./src/modules/loginPage/ui/index.ts\");\n\nclass LoginPage {\n    constructor() {\n        this.elem = _ui__WEBPACK_IMPORTED_MODULE_0__[\"default\"].section;\n        this.uiApi = _ui__WEBPACK_IMPORTED_MODULE_0__[\"default\"];\n    }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LoginPage);\n\n\n//# sourceURL=webpack://ecommerce-app/./src/modules/loginPage/index.ts?");

/***/ }),

/***/ "./src/modules/loginPage/ui/index.ts":
/*!*******************************************!*\
  !*** ./src/modules/loginPage/ui/index.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _shared_composite_omponents_form_form__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @shared/compositeСomponents/form/form */ \"./src/shared/compositeСomponents/form/form.ts\");\n/* harmony import */ var _shared_validationRules__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @shared/validationRules */ \"./src/shared/validationRules/index.ts\");\n/* harmony import */ var _style_module_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./style.module.scss */ \"./src/modules/loginPage/ui/style.module.scss\");\n\n\n\nconst emailInputOptions = {\n    labelText: 'Email:',\n    placeholder: 'example@gmail.com',\n    name: 'email',\n    hasHint: true,\n    require: true,\n    type: 'email',\n};\nconst passwordInputOptions = {\n    labelText: 'Password:',\n    placeholder: '2333Wd#sQ',\n    name: 'password',\n    hasHint: true,\n    require: true,\n    type: 'password',\n};\nconst formOptions = {\n    hasFieldset: true,\n    inputsOptions: [\n        {\n            options: emailInputOptions,\n            rule: _shared_validationRules__WEBPACK_IMPORTED_MODULE_1__.emailValidation,\n        },\n        {\n            options: passwordInputOptions,\n            rule: _shared_validationRules__WEBPACK_IMPORTED_MODULE_1__.passwordValidation,\n        },\n    ],\n    buttonOptions: {\n        text: 'Login',\n        type: 'submit',\n        disabled: true,\n    },\n};\nclass LoginPageUI {\n    constructor() {\n        this.section = document.createElement('section');\n        this.container = document.createElement('div');\n        const h = document.createElement('h2');\n        h.textContent = 'Create account';\n        this.section.append(h);\n        const form = new _shared_composite_omponents_form_form__WEBPACK_IMPORTED_MODULE_0__[\"default\"](formOptions);\n        this.inputArr = form.inputArr;\n        this.loginButt = form.button;\n        this.form = form.form;\n        this.section.append(this.container);\n        this.container.append(this.form);\n        this.section.classList.add(_style_module_scss__WEBPACK_IMPORTED_MODULE_2__[\"login-page\"]);\n    }\n}\nconst loginPageUI = new LoginPageUI();\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (loginPageUI);\n\n\n//# sourceURL=webpack://ecommerce-app/./src/modules/loginPage/ui/index.ts?");

/***/ }),

/***/ "./src/shared/components/button/button.ts":
/*!************************************************!*\
  !*** ./src/shared/components/button/button.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _style_module_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.module.scss */ \"./src/shared/components/button/style.module.scss\");\n\nclass Button {\n    constructor({ text = '', type = 'button', icon = {\n        sprite: undefined,\n        towhere: 'start',\n    }, disabled = false, isLink = false, href = '', } = {}) {\n        const button = document.createElement('button');\n        this.button = button;\n        button.textContent = text;\n        button.classList.add(_style_module_scss__WEBPACK_IMPORTED_MODULE_0__[\"simple-button\"]);\n        if (disabled) {\n            button.disabled = true;\n        }\n        if (isLink) {\n            button.classList.add('link');\n            button.setAttribute('data-href', href);\n        }\n        button.type = type;\n        if (icon.sprite) {\n            this.addIcon(icon.sprite, icon.towhere);\n        }\n    }\n    addIcon(sprite, where) {\n        const svg = `\r\n    <svg viewBox=\"${sprite.viewBox}\" width=\"50\" height=\"50\">\r\n      <use xlink:href=\"#${sprite.id}\"/>\r\n    </svg>`;\n        this.button.insertAdjacentHTML(where === 'start' ? 'afterbegin' : 'beforeend', svg);\n    }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Button);\n\n\n//# sourceURL=webpack://ecommerce-app/./src/shared/components/button/button.ts?");

/***/ }),

/***/ "./src/shared/components/index.ts":
/*!****************************************!*\
  !*** ./src/shared/components/index.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Button: () => (/* reexport safe */ _button_button__WEBPACK_IMPORTED_MODULE_1__[\"default\"]),\n/* harmony export */   Input: () => (/* reexport safe */ _input_input__WEBPACK_IMPORTED_MODULE_0__[\"default\"])\n/* harmony export */ });\n/* harmony import */ var _input_input__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./input/input */ \"./src/shared/components/input/input.ts\");\n/* harmony import */ var _button_button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./button/button */ \"./src/shared/components/button/button.ts\");\n\n\n\n\n\n//# sourceURL=webpack://ecommerce-app/./src/shared/components/index.ts?");

/***/ }),

/***/ "./src/shared/components/input/input.ts":
/*!**********************************************!*\
  !*** ./src/shared/components/input/input.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _style_module_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.module.scss */ \"./src/shared/components/input/style.module.scss\");\n\nclass Input {\n    constructor({ name = '', type = 'text', placeholder = '', labelText = '', value = '', required = false, hasHint = false, disabled = false, } = {}) {\n        this.hint = undefined;\n        this.container = document.createElement('div');\n        this.label = document.createElement('label');\n        this.input = document.createElement('input');\n        this.container.append(this.input);\n        this.container.classList.add(_style_module_scss__WEBPACK_IMPORTED_MODULE_0__.input);\n        if (hasHint) {\n            this.addHint();\n        }\n        this.setAtributes({\n            name,\n            type,\n            placeholder,\n            labelText,\n            value,\n            required,\n            disabled,\n        });\n    }\n    addHint() {\n        const hintContainer = document.createElement('div');\n        const hint = document.createElement('ul');\n        hintContainer.classList.add(_style_module_scss__WEBPACK_IMPORTED_MODULE_0__.input__hint);\n        hintContainer.append(hint);\n        this.container.append(hintContainer);\n        this.hint = hint;\n    }\n    setAtributes({ name, type, placeholder, labelText, value, required, disabled, }) {\n        const { label } = this;\n        const { input } = this;\n        if (type) {\n            input.type = type;\n        }\n        if (placeholder) {\n            input.placeholder = placeholder;\n        }\n        if (labelText) {\n            label.textContent = labelText;\n            this.container.prepend(this.label);\n        }\n        if (name) {\n            input.name = name;\n        }\n        if (value) {\n            input.value = value;\n        }\n        if (required) {\n            input.required = true;\n        }\n        if (disabled) {\n            input.disabled = true;\n        }\n    }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Input);\n\n\n//# sourceURL=webpack://ecommerce-app/./src/shared/components/input/input.ts?");

/***/ }),

/***/ "./src/shared/compositeСomponents/form/form.ts":
/*!*****************************************************!*\
  !*** ./src/shared/compositeСomponents/form/form.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _shared_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @shared/components */ \"./src/shared/components/index.ts\");\n\nclass Form {\n    constructor({ hasFieldset = false, inputsOptions = [], buttonOptions = {} } = {}) {\n        const form = document.createElement('form');\n        this.container = form;\n        this.form = form;\n        if (hasFieldset) {\n            const fieldset = document.createElement('fieldset');\n            form.append(fieldset);\n            this.container = fieldset;\n        }\n        this.inputArr = [];\n        if (inputsOptions.length > 0) {\n            this.addInputs(inputsOptions);\n        }\n        const button = new _shared_components__WEBPACK_IMPORTED_MODULE_0__.Button(buttonOptions);\n        this.button = button.button;\n        this.form.append(button.button);\n        this.validityListener();\n    }\n    addInputs(arr) {\n        const { container } = this;\n        arr.forEach((i) => {\n            const input = new _shared_components__WEBPACK_IMPORTED_MODULE_0__.Input(i.options);\n            container.append(input.container);\n            this.inputArr.push(input);\n            if (i.rule) {\n                i.rule.setRules(input);\n            }\n        });\n    }\n    validityListener() {\n        this.form.addEventListener('input', () => {\n            const isValid = !this.inputArr.some((i) => {\n                return i.input.validity.valid === false || i.input.value.length === 0;\n            });\n            this.button.disabled = !isValid;\n        });\n    }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Form);\n\n\n//# sourceURL=webpack://ecommerce-app/./src/shared/composite%D0%A1omponents/form/form.ts?");

/***/ }),

/***/ "./src/shared/validationRules/class/validation.ts":
/*!********************************************************!*\
  !*** ./src/shared/validationRules/class/validation.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass ValidationRule {\n    constructor({ minLength = 0, pattern = '', titleText = '' } = {}) {\n        this.hints = [];\n        this.signedInputs = [];\n        this.minLength = minLength;\n        this.pattern = pattern;\n        this.titleText = titleText;\n    }\n    setRules(input) {\n        this.signedInputs.push(input);\n        const inputElem = input.input;\n        const hintElem = input.hint;\n        if (this.pattern) {\n            const p = this.pattern;\n            inputElem.setAttribute('pattern', p);\n        }\n        if (this.minLength > 0) {\n            const minL = this.minLength;\n            inputElem.setAttribute('minLength', minL.toString());\n        }\n        if (this.titleText) {\n            let minLenStroke = '';\n            if (this.minLength > 0) {\n                minLenStroke = `Minimum line length: ${this.minLength}. `;\n            }\n            const t = `${minLenStroke}${this.titleText}`;\n            inputElem.setAttribute('title', t);\n        }\n        if (this.hints.length > 0 && hintElem) {\n            this.hints.forEach((h) => {\n                const li = document.createElement('li');\n                li.textContent = h.text;\n                hintElem.append(li);\n            });\n        }\n        inputElem.addEventListener('input', this.checkHint.bind(this));\n    }\n    checkHint(e) {\n        var _a;\n        const { target } = e;\n        if (!target)\n            return;\n        const targetInput = target;\n        const { value } = targetInput;\n        const input = this.signedInputs.find((i) => i.input === targetInput);\n        const liArr = (_a = input === null || input === void 0 ? void 0 : input.hint) === null || _a === void 0 ? void 0 : _a.childNodes;\n        if (!liArr)\n            return;\n        this.hints.forEach((h, i) => {\n            const li = liArr[i];\n            if (h.callback(value)) {\n                li.setAttribute('data-correct', 'true');\n            }\n            else {\n                li.setAttribute('data-correct', 'false');\n            }\n        });\n    }\n    addHints(hints) {\n        this.hints.push(...hints);\n    }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ValidationRule);\n\n\n//# sourceURL=webpack://ecommerce-app/./src/shared/validationRules/class/validation.ts?");

/***/ }),

/***/ "./src/shared/validationRules/emailRule.ts":
/*!*************************************************!*\
  !*** ./src/shared/validationRules/emailRule.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _class_validation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./class/validation */ \"./src/shared/validationRules/class/validation.ts\");\n\nconst emailValidation = new _class_validation__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\n    pattern: `\\\\S{1,}@(\\\\w|\\\\d|\\\\.|_|-){1,}\\\\.(\\\\w|\\\\d|\\\\.|_|-){1,}$`,\n});\nemailValidation.addHints([\n    {\n        text: 'There should be no spaces in the email.',\n        callback: (s) => !s.match(/\\s/),\n    },\n    {\n        text: `Must contain an '@' symbol.`,\n        callback: (s) => !!s.match(/@/),\n    },\n    {\n        text: 'There should be a domain part',\n        callback: (s) => !!s.match(/@(\\w|\\d|_|-){1}(\\w|\\d|\\.|_|-)*\\.(\\w|\\d|\\.|_|-){1,}$/),\n    },\n    {\n        text: 'Must contain an account name',\n        callback: (s) => !!s.match(/^\\S{1,}@/),\n    },\n]);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (emailValidation);\n\n\n//# sourceURL=webpack://ecommerce-app/./src/shared/validationRules/emailRule.ts?");

/***/ }),

/***/ "./src/shared/validationRules/index.ts":
/*!*********************************************!*\
  !*** ./src/shared/validationRules/index.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   emailValidation: () => (/* reexport safe */ _emailRule__WEBPACK_IMPORTED_MODULE_0__[\"default\"]),\n/* harmony export */   passwordValidation: () => (/* reexport safe */ _passwordRule__WEBPACK_IMPORTED_MODULE_1__[\"default\"])\n/* harmony export */ });\n/* harmony import */ var _emailRule__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./emailRule */ \"./src/shared/validationRules/emailRule.ts\");\n/* harmony import */ var _passwordRule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./passwordRule */ \"./src/shared/validationRules/passwordRule.ts\");\n\n\n\n\n\n//# sourceURL=webpack://ecommerce-app/./src/shared/validationRules/index.ts?");

/***/ }),

/***/ "./src/shared/validationRules/passwordRule.ts":
/*!****************************************************!*\
  !*** ./src/shared/validationRules/passwordRule.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _class_validation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./class/validation */ \"./src/shared/validationRules/class/validation.ts\");\n\nconst passwordValidation = new _class_validation__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\n    minLength: 8,\n    pattern: `^(?=.*[A-Z])(?=.*[a-z])(?=.*\\\\d)(?=.*[!@#$%^&*])\\\\S.*\\\\S$`,\n});\npasswordValidation.addHints([\n    {\n        text: 'The minimum length is 8 characters long.',\n        callback: (s) => s.length >= 8,\n    },\n    {\n        text: 'Must contain at least one uppercase roman letter.',\n        callback: (s) => !!s.match(/[A-Z]/),\n    },\n    {\n        text: 'Must contain at least one lowercase roman letter.',\n        callback: (s) => !!s.match(/[a-z]/),\n    },\n    {\n        text: 'Must contain at least one digit.',\n        callback: (s) => !!s.match(/\\d/),\n    },\n    {\n        text: 'Must contain at least one special character (!@#$%^&*).',\n        callback: (s) => !!s.match(/[!@#$%^&*]{1}/),\n    },\n    {\n        text: 'Must not contain leading or trailing whitespace.',\n        callback: (s) => (s.length < 3 ? !s.match(/\\s/) : !!s.match(/^\\S.*\\S$/)),\n    },\n]);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (passwordValidation);\n\n\n//# sourceURL=webpack://ecommerce-app/./src/shared/validationRules/passwordRule.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;