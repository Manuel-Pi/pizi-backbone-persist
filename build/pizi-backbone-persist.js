(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("backbone"), require("pizi-backbone-indexedDB"), require("pizi-backbone-localStorage"));
	else if(typeof define === 'function' && define.amd)
		define("pizi-backbone-persist", ["backbone", "pizi-backbone-indexedDB", "pizi-backbone-localStorage"], factory);
	else if(typeof exports === 'object')
		exports["pizi-backbone-persist"] = factory(require("backbone"), require("pizi-backbone-indexedDB"), require("pizi-backbone-localStorage"));
	else
		root["pizi-backbone-persist"] = factory(root["backbone"], root["pizi-backbone-indexedDB"], root["pizi-backbone-localStorage"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_backbone__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_backbone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_backbone__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_pizi_backbone_indexedDB__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_pizi_backbone_indexedDB___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_pizi_backbone_indexedDB__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_pizi_backbone_localStorage__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_pizi_backbone_localStorage___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_pizi_backbone_localStorage__);




/* harmony default export */ __webpack_exports__["default"] = ({
	apply: function apply() {
		var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { models: "indexedDB", session: "localStorage" };


		__WEBPACK_IMPORTED_MODULE_0_backbone___default.a.defaultSync = __WEBPACK_IMPORTED_MODULE_0_backbone___default.a.sync;
		__WEBPACK_IMPORTED_MODULE_0_backbone___default.a.sync = function (method, model) {
			var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};


			options.dbName = options.dbName || opts.dbName;
			options.dbVersion = options.dbVersion || opts.dbVersion;
			options.persist = options.persist || model.persist || opts.persist || opts.models;
			options.conf = opts.conf;

			var storage;
			if (options.persist) {
				storage = options.persist === "indexedDB" ? __WEBPACK_IMPORTED_MODULE_1_pizi_backbone_indexedDB___default.a : __WEBPACK_IMPORTED_MODULE_2_pizi_backbone_localStorage___default.a;
			} else {
				console.log('defaults persit options used!');
				storage = opts.models === "indexedDB" ? __WEBPACK_IMPORTED_MODULE_1_pizi_backbone_indexedDB___default.a : __WEBPACK_IMPORTED_MODULE_2_pizi_backbone_localStorage___default.a;
			}

			switch (method) {
				case 'create':
					storage.saveEntity(model, options);
					break;

				case 'update':
					storage.saveEntity(model, options);
					break;

				case 'delete':
					storage.deleteEntity(model, options);
					break;

				case 'read':
					options = _.extend({ validate: true }, options);
					if (model instanceof __WEBPACK_IMPORTED_MODULE_0_backbone___default.a.Model) {
						storage.getEntity(model, options);
					} else if (model instanceof __WEBPACK_IMPORTED_MODULE_0_backbone___default.a.Collection) {
						storage.getAllEntity(model, options);
					}
					break;
			}
		};

		if (opts.session === "localStorage") {
			__WEBPACK_IMPORTED_MODULE_2_pizi_backbone_localStorage___default.a.initSession(_.extend(opts, { persist: "localStorage" }));
		} else if (opts.session === "indexedDB") {
			__WEBPACK_IMPORTED_MODULE_1_pizi_backbone_indexedDB___default.a.initSession(_.extend(opts, { persist: "indexedDB" }));
		} else if (opts.success) {
			opts.success();
		}
	}
});

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("backbone");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("pizi-backbone-indexedDB");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("pizi-backbone-localStorage");

/***/ })
/******/ ]);
});