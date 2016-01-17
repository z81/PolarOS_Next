/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _polarComponents = polarComponents;
	var Nav = _polarComponents.Nav;
	var Pane = _polarComponents.Pane;
	var PaneGroup = _polarComponents.PaneGroup;
	var NavGroup = _polarComponents.NavGroup;
	var NavGroupItem = _polarComponents.NavGroupItem;
	var NavTitle = _polarComponents.NavTitle;
	var Table = _polarComponents.Table;
	var Icon = _polarComponents.Icon;
	var Content = _polarComponents.Content;
	var ListItem = _polarComponents.ListItem;
	var ListGroup = _polarComponents.ListGroup;

	var TestApp = function (_React$Component) {
	  _inherits(TestApp, _React$Component);

	  function TestApp(props) {
	    _classCallCheck(this, TestApp);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TestApp).call(this, props));

	    _this.state = {
	      apps: [],
	      nav: 1,
	      wallpapers: ['mxcp89366.png', 'mxcp465753.png', 'mxcp3268386.png', 'mxcp1101098.png']
	    };

	    Chan.call({
	      method: "apps.get",
	      params: "",
	      success: function success(apps) {
	        return _this.setState({ apps: apps });
	      }
	    });

	    Chan.call({
	      method: "wallpapers.get",
	      params: "",
	      success: function success(wallpapers) {
	        return _this.setState({ wallpapers: wallpapers });
	      }
	    });

	    Chan.call({
	      method: "title.change",
	      params: "new title!!!!",
	      success: function success() {}
	    });
	    return _this;
	  }

	  _createClass(TestApp, [{
	    key: 'onSelectNav',
	    value: function onSelectNav(key) {
	      this.setState({ nav: key });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      // <Table striped header={['ID', 'Name']} rows={this.state.apps} />
	      return React.createElement(
	        Content,
	        { style: { height: '100%' } },
	        React.createElement(
	          'div',
	          { className: 'app-left_panel' },
	          React.createElement(
	            Pane,
	            { sidebar: true, size: 'sm' },
	            React.createElement(
	              NavGroup,
	              { active: true, Key: this.state.nav, onSelect: this.onSelectNav.bind(this) },
	              React.createElement(
	                NavTitle,
	                null,
	                'App id: ',
	                window.name
	              ),
	              React.createElement(NavGroupItem, { eventKey: 1, glyph: 'download', text: 'Apps' }),
	              React.createElement(NavGroupItem, { eventKey: 2, glyph: 'picture', text: 'Wallpapers' })
	            )
	          )
	        ),
	        React.createElement(
	          Pane,
	          null,
	          this.state.nav != 1 || React.createElement(
	            Table,
	            null,
	            React.createElement(
	              'thead',
	              null,
	              React.createElement(
	                'tr',
	                null,
	                React.createElement(
	                  'th',
	                  { style: { width: '10px' } },
	                  'ID'
	                ),
	                React.createElement(
	                  'th',
	                  null,
	                  'Name'
	                )
	              )
	            ),
	            React.createElement(
	              'tbody',
	              null,
	              this.state.apps.map(function (app) {
	                return React.createElement(
	                  'tr',
	                  null,
	                  React.createElement(
	                    'td',
	                    null,
	                    app.id
	                  ),
	                  React.createElement(
	                    'td',
	                    null,
	                    app.name
	                  )
	                );
	              })
	            )
	          ),
	          this.state.nav != 2 || React.createElement(
	            ListGroup,
	            null,
	            this.state.wallpapers.map(function (img, i) {
	              var setWallpaper = function setWallpaper() {
	                Chan.call({
	                  method: "wallpaper.change",
	                  params: '/static/wallpapers/' + img.name,
	                  success: function success() {}
	                });
	              };

	              return React.createElement(
	                'div',
	                { key: i, onClick: setWallpaper },
	                React.createElement(ListItem, {
	                  image: '/static/wallpapers/' + img.name,
	                  title: img.name,
	                  subtitle: ''
	                })
	              );
	            })
	          )
	        )
	      );
	    }
	  }]);

	  return TestApp;
	}(React.Component);

	ReactDOM.render(React.createElement(TestApp, { name: window.name }), root);

/***/ }
/******/ ]);