/**
  CSSOM Query - Cascading Style Sheets - Object Model - Query
  Dynamically query and manipulate CSS Selectors into the style sheets
  */
function CSSOMQuery(selectorText) {
  var styleSheets = document.styleSheets
  var _this

  (function () {
    _this = {};

    // Iterate into all style sheets added to the page
    Object.keys(styleSheets).forEach(function (styleIndex) {
      var rules = styleSheets.item(styleIndex).cssRules

      // Iterate over the rules of the given style sheet
      Object.keys(rules).forEach(function (ruleIndex) {
        // Matches the selectorText with the
        // selectorText written in the style sheet
        if (rules.item(ruleIndex).selectorText === selectorText) {
          // First store the whole object into _this
          _this = rules.item(ruleIndex)

          // ** Put some extra information
          // since we found the selector into a style sheet
          // we'll use this information to determine
          // where do we set properties in the future
          // otherwise, we'd need to loop all the styles again
          // if to be able to change styles

          // index of the style sheet
          // ex: document.styleSheets[styleIndex]
          _this.styleIndex = styleIndex

          // store the index rule
          // ex: document.styleSheets[styleIndex].cssRules[ruleIndex]
          _this.ruleIndex = ruleIndex
        }
      })
    })

    // Also, save the styleSheets
    // with this, to change a style sheet we don't need to
    // access document.styleSheets into helper functions
    // only this.styleSheets[this.styleIndex].cssRules[this.ruleIndex]
    _this.styleSheets = styleSheets;
  }())

    // Set a property in the called rule
  _this.set = function (property, value) {
    _this.styleSheets[_this.styleIndex].cssRules[_this.ruleIndex].style[property] = value
  }

  return _this
}
