(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define(["exports", "module", "backbone", "pizi-backbone-indexedDB", "pizi-backbone-localStorage"], factory);
	} else if (typeof exports !== "undefined" && typeof module !== "undefined") {
		factory(exports, module, require("backbone"), require("pizi-backbone-indexedDB"), require("pizi-backbone-localStorage"));
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports, mod, global.Backbone, global.piziBackboneIndexedDB, global.piziBackboneLocalStorage);
		global.piziBackbonePersist = mod.exports;
	}
})(this, function (exports, module, _backbone, _piziBackboneIndexedDB, _piziBackboneLocalStorage) {
	"use strict";

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var _Backbone = _interopRequireDefault(_backbone);

	var _piziBackboneIndexedDB2 = _interopRequireDefault(_piziBackboneIndexedDB);

	var _piziBackboneLocalStorage2 = _interopRequireDefault(_piziBackboneLocalStorage);

	module.exports = {
		apply: function apply() {
			var opts = arguments.length <= 0 || arguments[0] === undefined ? { models: "indexedDB", session: "localStorage" } : arguments[0];

			_Backbone["default"].defaultSync = _Backbone["default"].sync;
			_Backbone["default"].sync = function (method, model) {
				var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

				options.dbName = options.dbName || opts.dbName;
				options.dbVersion = options.dbVersion || opts.dbVersion;
				options.persist = options.persist || model.persist || opts.persist || opts.models;
				options.conf = opts.conf;

				var storage;
				if (options.persist) {
					storage = options.persist === "indexedDB" ? _piziBackboneIndexedDB2["default"] : _piziBackboneLocalStorage2["default"];
				} else {
					console.log('defaults persit options used!');
					storage = opts.models === "indexedDB" ? _piziBackboneIndexedDB2["default"] : _piziBackboneLocalStorage2["default"];
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
						if (model instanceof _Backbone["default"].Model) {
							storage.getEntity(model, options);
						} else if (model instanceof _Backbone["default"].Collection) {
							storage.getAllEntity(model, options);
						}
						break;
				}
			};

			if (opts.session === "localStorage") {
				_piziBackboneLocalStorage2["default"].initSession(_.extend(opts, { persist: "localStorage" }));
			} else if (opts.session === "indexedDB") {
				_piziBackboneIndexedDB2["default"].initSession(_.extend(opts, { persist: "indexedDB" }));
			} else if (opts.success) {
				opts.success();
			}
		}
	};
});
