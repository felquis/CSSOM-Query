/**
  CSSOM Query - Cascading Style Sheets - Object Model - Query
  Dynamically find CSS Selector into style sheets and manipulate elements
  selector's styles without touching the DOM
  */
function CSSOMQuery(selectorText) {
  var styleSheets = document.styleSheets
  var _this = this
  _this.domNodes = document.querySelectorAll(selectorText)
  var item
  var rules

  // Iterate into all style sheets added to the page
  Object.keys(styleSheets).forEach(function (styleIndex) {
    styleSheet = styleSheets.item(styleIndex)
    rules = styleSheet.cssRules

    console.log('styleSheet: ', styleSheet)
    console.log('rules: ', rules)

    // Iterate over the rules of the given style sheet
    Object.keys(rules).forEach(function (ruleIndex) {
      // Matches the selectorText with the current
      // selectorText used in the style sheet
      if (rules.item(ruleIndex).selectorText === selectorText) {

        // Found this rule
        var rule = rules.item(ruleIndex)
        console.log('rule: ', rule)

        // ** Put some extra information
        _this.rules = rules
        _this.rule = rule
        _this.styleSheet = styleSheet

        // index of the style sheet
        // ex: document.styleSheets[styleIndex]
        _this.styleIndex = styleIndex

        // store the index rule
        // ex: document.styleSheets[styleIndex].cssRules[ruleIndex]
        _this.ruleIndex = ruleIndex

        // Also, save the styleSheets
        // with this, to change a style sheet we don't need to
        // access document.styleSheets into helper functions
        // only this.styleSheets[this.styleIndex].cssRules[this.ruleIndex]
        _this.styleSheet = styleSheet
      }
    })
  })

  console.log(rules)
  if (rules) {
    _this.cssRules = rules[_this.ruleIndex]
  } else {
    console.log('not supported', rules)
  }

  return _this
}

// ** Set a property in the called rule
CSSOMQuery.prototype.set = function (property, value) {
  console.log('set', this.rule);
  this.rule.style[property] = value
}
