(function(modules) { // webpackBootstrap
	// install a JSONP callback for chunk loading
	// jsonpArray.push =  window["webpackJsonp"].push = webpackJsonpCallback;
	function webpackJsonpCallback(data) {
		var chunkIds = data[0];
		var moreModules = data[1];


		// add "moreModules" to the modules object,
		// then flag all "chunkIds" as loaded and fire callback
		var moduleId, chunkId, i = 0, resolves = [];
		for(;i < chunkIds.length; i++) {
			chunkId = chunkIds[i];
			if(installedChunks[chunkId]) {
				console.log('installedChunks[chunkId]', installedChunks[chunkId])
				resolves.push(installedChunks[chunkId][0]); // installedChunks[chunkId] = [rosolve, reject, promise]
			}
			// 操作一将 installedChunks[chunkId] 置为 0 可以让 __webpack_require__.e 在第二次加载同一 chunk 时返回一个立即决议的 promise（Promise.all([])）
			installedChunks[chunkId] = 0; // 置为0，表示该模块已安装
		}
		// 在 modules 层面，chunk 中的 moreModules 被合入入口文件的 modules 中，可供下一个微任务中的 __webpack_require__ 同步加载模块。
		for(moduleId in moreModules) {
			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
				modules[moduleId] = moreModules[moduleId];
			}
		}
		// 操作二将 chunk data 添加进 window["webpackJsonp"] 数组，可以在多入口模式时，方便地拿到已加载过的 chunk 缓存
		if(parentJsonpFunction){ 
			parentJsonpFunction(data); // 等于 jsonpArray.push(data) 等于 window["webpackJsonp"].push(data)
		}
		console.log('window["webpackJsonp"]', window["webpackJsonp"])

		while(resolves.length) {
			let func = resolves.shift()
			func()
			// resolves.shift()(); // 从数组中移除第一项，并返回移除项，立即执行
		}

	};

	window['webpackJsonpCallback'] = webpackJsonpCallback


	// The module cache
	var installedModules = {};

	// object to store loaded and loading chunks
	// undefined = chunk not loaded, null = chunk preloaded/prefetched
	// Promise = chunk loading, 0 = chunk loaded
	var installedChunks = {
		"main": 0
	};
	// installedChunks = {
	//	"0": [resolve, reject, promise]	// => 安装后,修改值为  "0":"0"
	// 	"main": 0
	// };



	// script path function
	function jsonpScriptSrc(chunkId) {
		return __webpack_require__.p + "" + ({}[chunkId]||chunkId) + ".js"
	}

	// The require function
	function __webpack_require__(moduleId) {

		// Check if module is in cache
		if(installedModules[moduleId]) {
			return installedModules[moduleId].exports;
		}
		// Create a new module (and put it into the cache)
		var module = installedModules[moduleId] = {
			i: moduleId,
			l: false,
			exports: {}
		};

		// Execute the module function
		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

		// Flag the module as loaded
		module.l = true;

		// Return the exports of the module
		return module.exports;
	}

	// This file contains only the entry chunk.
	// The chunk loading function for additional chunks
	__webpack_require__.e = function requireEnsure(chunkId) {		
		var promises = [];


		// JSONP chunk loading for javascript

		var installedChunkData = installedChunks[chunkId];
		if(installedChunkData !== 0) { // 0 means "already installed".

			// a Promise means "currently loading".
			if(installedChunkData) {
				promises.push(installedChunkData[2]);
			} else {
				// setup Promise in chunk cache
				var promise = new Promise(function(resolve, reject) {
					installedChunkData = installedChunks[chunkId] = [resolve, reject];
				});
				promises.push(installedChunkData[2] = promise);

				// start chunk loading
				var head = document.getElementsByTagName('head')[0];
				var script = document.createElement('script');
				var onScriptComplete;

				script.charset = 'utf-8';
				script.timeout = 120;
				if (__webpack_require__.nc) {
					script.setAttribute("nonce", __webpack_require__.nc);
				}
				script.src = jsonpScriptSrc(chunkId);

				onScriptComplete = function (event) {
					// avoid mem leaks in IE.
					script.onerror = script.onload = null;
					clearTimeout(timeout);
					var chunk = installedChunks[chunkId];
					if(chunk !== 0) {
						if(chunk) {
							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
							var realSrc = event && event.target && event.target.src;
							var error = new Error('Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')');
							error.type = errorType;
							error.request = realSrc;
							chunk[1](error);
						}
						installedChunks[chunkId] = undefined;
					}
				};
				var timeout = setTimeout(function(){
					onScriptComplete({ type: 'timeout', target: script });
				}, 120000);
				script.onerror = script.onload = onScriptComplete;
				head.appendChild(script);
			}
		}
		return Promise.all(promises);
	};

	// expose the modules object (__webpack_modules__)
	__webpack_require__.m = modules;

	// expose the module cache
	__webpack_require__.c = installedModules;

	// define getter function for harmony exports
	__webpack_require__.d = function(exports, name, getter) {
		if(!__webpack_require__.o(exports, name)) {
			Object.defineProperty(exports, name, { enumerable: true, get: getter });
		}
	};

	// define __esModule on exports
	__webpack_require__.r = function(exports) {
		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
		}
		Object.defineProperty(exports, '__esModule', { value: true });
	};

	// create a fake namespace object
	// mode & 1: value is a module id, require it
	// mode & 2: merge all properties of value into the ns
	// mode & 4: return value when already ns object
	// mode & 8|1: behave like require
	__webpack_require__.t = function(value, mode) {
		if(mode & 1) value = __webpack_require__(value);
		if(mode & 8) return value;
		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
		var ns = Object.create(null);
		__webpack_require__.r(ns);
		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
		return ns;
	};

	// getDefaultExport function for compatibility with non-harmony modules
	__webpack_require__.n = function(module) {
		var getter = module && module.__esModule ?
			function getDefault() { return module['default']; } :
			function getModuleExports() { return module; };
		__webpack_require__.d(getter, 'a', getter);
		return getter;
	};

	// Object.prototype.hasOwnProperty.call
	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

	// __webpack_public_path__
	__webpack_require__.p = "/dist/";

	// on error function for async loading
	__webpack_require__.oe = function(err) { console.error(err); throw err; };

	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
	// bind()方法会创建一个新函数，称为绑定函数，当调用这个绑定函数时，绑定函数会以创建它时传入 bind()方法的第一个参数作为 this，传入 bind() 方法的第二个以及以后的参数加上绑定函数运行时本身的参数按照顺序作为原函数的参数来调用原函数。
	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);  // oldJsonpFunction 是 window["webpackJsonp"] 的原生 push 方法
	jsonpArray.push = webpackJsonpCallback;	
	jsonpArray = jsonpArray.slice();
	for(var i = 0; i < jsonpArray.length; i++) {
		webpackJsonpCallback(jsonpArray[i]);
	}
	var parentJsonpFunction = oldJsonpFunction;  // parentJsonpFunction 是 window["webpackJsonp"] 的原生 push 方法


	// 立即执行函数，加载入口
	return __webpack_require__(__webpack_require__.s = "./src/index.js");
})
({
  "./src/index.js" : (function(module, exports, __webpack_require__) {
    document.write('Hello webpack!\n');

    window.setTimeout(() => {
      __webpack_require__.e(/*! import() */ 0)
      .then(
        // <script src='/dist/0.js' ></script>
        __webpack_require__.bind(null, /*! ./utils/math */ "./src/utils/math.js")
      )
      .then(sumUtil => {
        console.log('sumUtil', sumUtil)
        console.log(sumUtil.sum([1, 2, 3, 4]));
      });
    }, 2000);
  })
});
//# sourceMappingURL=main.js.map