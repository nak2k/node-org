"use strict";

var org = require('org');

class N2ConverterHTML extends org.ConverterHTML {
  convertHeader(node, childText, auxData, taskStatus, sectionNumberText) {
    var headerAttributes = {};

    if (taskStatus) {
      childText = this.inlineTag("span", childText.substring(0, 4), {
        "class": "task-status " + taskStatus
      }) + childText.substring(5);
    }

    if (sectionNumberText) {
      /*
       * Output a section number text only if num is true.
       */
      if (this.documentOptions.num) {
        childText = this.inlineTag("span", sectionNumberText, {
          "class": "section-number"
        }) + childText;
      }
      headerAttributes["id"] = "header-" + sectionNumberText.replace(/\./g, "-");
    }

    if (taskStatus)
      headerAttributes["class"] = "task-status " + taskStatus;

    return this.tag("h" + (this.headerOffset + node.level),
      childText, headerAttributes, auxData);
  }

  convertLink(node, childText, auxData) {
    /*
     * For a relative path.
     */
    if (node.src.startsWith('file:')) {
      node.src = node.src.substr(5);
    }

    /*
     * Convert an extension.
     */
    if (node.src.endsWith('.org')) {
      node.src = node.src.substr(0, node.src.length - 4) + '.html';
    }

    return super.convertLink(node, childText, auxData);
  }
}

exports = module.exports = org;
exports.N2ConverterHTML = N2ConverterHTML;
