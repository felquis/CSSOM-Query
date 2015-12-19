/**
  CSSOM Query - Cascading Style Sheets - Object Model - Query
  Dynamically find CSS Selector into the page's stylesheets and manipulate elements
  selector's styles, without touching the DOM directly
  */
(function CSSOMQueryIIFE() {
  var prefixEvent = {
    transitionend: ['transitionend', 'oTransitionEnd', 'webkitTransitionEnd']
  }
  /*
    Use this function with the `new`

    @param selectorText is a string, it need to me exactly equal the selector
    specified in the stylesheet, it is not a query into the DOM, it is used
    as `a === b`
  */
  function CSSOMQuery(selectorText) {
    // grab all the stylesheets of the page
    var styleSheets = document.styleSheets
    var _this = this

    /*
      For each styleSheet in the page, call forEachRule
    */
    function forEachStylesheet(stylesheetIndex) {
      var styleSheet = styleSheets.item(stylesheetIndex)
      var rules = styleSheet.cssRules

      // Iterate over the rules of the given style sheet
      each(rules, forEachRule)

      // It may be useful for GC
      styleSheet = rules = null
    }

    /*
      check if the rule selectorText matches with the desired selector
    */
    function forEachRule(rule, ruleIndex) {
      // Matches the selectorText with the current
      // selectorText used in the style sheet
      if (rule.selectorText === selectorText) {
        return _this.rule = rule
      }
    }

    // Iterate into all style sheets added to the page
    each(styleSheets, forEachStylesheet)

    return _this
  }

  /*
    Utility, iterate Objects, Lists, Arrays..
  */
  function each(list, transform) {
    var keys = Object.keys(list),
        index = 0,
        total

    // Check if 'length' is the last key
    // this is a guess to turn around this Safari bug
    // https://bugs.webkit.org/show_bug.cgi?id=152454
    if (keys.indexOf('length') === (keys.length - 1)) {
      keys.pop()
    }

    total = keys.length

    if (typeof transform !== 'function') {
      throw('The second param must be a function')
      return
    }

    for (; index < total; index++) {
      transform(list[keys[index]], keys[index])
    }
  }

  /*
    Parse property value, returning useful information
    to manipulate the value
  */
  function parseProperty(value) {
    console.log('parse', value)
    return value
  }

  /*
    Set a collection of properties
  */
  CSSOMQuery.prototype.set = function set(object) {
    var _this = this

    function forEachPropertyName(value, property) {
      if (typeof value === 'function') {
        _this.rule.style[property] = value(parseProperty(_this.rule.style[property]))
      } else {
        _this.rule.style[property] = value
      }
    }

    each(object, forEachPropertyName)
  }

  /*
    Delegate events, only support the events defined in `prefixEvent`
  */
  CSSOMQuery.prototype.on = function on(eventName, callback) {
    var _this = this
    function call(e) { callback(e) }

    if (!_this.domNodes) {
      _this.domNodes = document.querySelectorAll(_this.rule.selectorText) || []
    }

    each(_this.domNodes, function forEachEvent(element, index) {
      // Add the event for each prefix
      each(prefixEvent[eventName], function (value, index) {
        element.addEventListener(value, call, false)
      })
    })
  }

  window.CSSOMQuery = window.CSSOMQuery || CSSOMQuery
}())
