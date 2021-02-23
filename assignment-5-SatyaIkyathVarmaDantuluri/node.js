/**
* Node represents an HTML Element. A node can have a tag name,
* a list of CSS classes and a list of children nodes.
*/
class Node {

  constructor(tag, id, classes, children) {
    // Tag name of the node.
    this.tag = tag;
    //
    this.id = id;
    // Array of CSS class names (string) on this element.
    this.classes = classes;
    // Array of children nodes.
    this.children = children; // All children are of type Node
  }
  
  /**
  * Returns descendent nodes matching the selector. Selector can be 
  * a tag name or a CSS class name.
  * 
  * For example: 
  * 
  * 1.
  * <div> 
  *   <span id="span-1"></span>
  *   <span id="span-2"></span>
  *   <div>
  *     <span id="span-3"></span>
  *   </div>
  * </div>
  * Selector `span` should return 3 span nodes in this order
  * span-1 -> span-2 -> span-3.
  *
  * 2.
  * <div> 
  *   <span id="span-1" class="note"></span>
  *   <span id="span-2"></span>
  *   <div>
  *     <span id="span-3"></span>
  *   </div>
  * </div>
  * Selector `.note` should return one span node with `note` class.
  * 
  * @param {string} the selector string.
  * @returns {Array} Array of descendent nodes.
  * @public
  */

  //started creating search function
  search(selector) {
    //used a list to store the list
    var res = [];

    var element = "tag";
    // if not any selector return res itself
    if(!selector){
      return res;
    }
    //identifying class using charAt
    var classIdentifier = selector.charAt(0);
    // if clause to seperate differnt categories
    if(classIdentifier == "."){
      element = "class";
      selector = selector.substring(1);
    }
    var i;
    for(i=0;i<this.children.length;i++){
      //function calling for each children
      this.searchindivid(res, selector, this.children[i], element);
    }
    return res;
  }

  //use to search each individual element tag , class
  searchindivid(res, selector, node, element){
    // if it is a tag push to the result
    if(element == "tag"){
      if(node.tag == selector){
        res.push(node.id);
      }
    }
    
    else if(element == "class"){
      var index = node.classes.indexOf(selector);
      if(index >= 0){
        res.push(node.id);
      }
    }
    
    var i;
    for(i=0;i<node.children.length;i++){
      //recursive function for tags in tags
      this.searchindivid(res, selector, node.children[i], element);
    }
  }

}

//DOM Tree
let p1 = new Node("p", "para-1", ["sub-p1", "note"], []);
let span3 = new Node("span", "span-3", ["sub1-span3"], []);
let span2 = new Node("span", "span-2", [], []);
let span1 = new Node("span", "span-1", ["note"], []);
let divNode2 = new Node("div", "div-2", ["subContainer1"], [span3, p1]);
let label1 = new Node("label", "lbl-1", [], []);
let section1 = new Node("section", "sec-1", [], [label1])
let divNode3 = new Node("div", "div-3", ["subContainer2"], [section1]);
let span4 = new Node("span", "span-4", ["mania"], []);
let span5 = new Node("span", "span-5", ["note", "mania"], []);
let divNode4 = new Node("div", "div-4", [], [span4, span5]);
let divNode1 = new Node("div", "div-1", ["mainContainer"], [span1, span2, divNode2, divNode3, divNode4]);
let randomNode = new Node("span", "span-6", ["randomSpan"], []);
let body = new Node("body", "content", [], [divNode1, randomNode]);

// console.log(divNode2.search("p"));
// console.log(divNode2.search(".sub1-span3"));
// console.log(divNode2.children);

// Testing
// console.log("Started...");
// Test case 1 -
console.log("Testcase1 " + divNode1.search("span"));
// Test case 2 -
console.log("Testcase2 " + divNode1.search(".note"));
// Test case 3 -
console.log("Testcase3 " + divNode1.search("label"));
// Test case 4 -
console.log("Testcase4 " + p1.search(".note"));
// Test case 5 -
console.log("Testcase5 " + divNode1.search("div"));
// Test case 6 -
console.log("Testcase6 " + randomNode.search("div"));
// Test case 7 -
console.log("Testcase7 " + divNode2.search("section"));
// Test case 8 -
console.log("Testcase8 " + body.search());
// Error conditions need to be handled
// invalid input need to be handled
// Test case 9 -
console.log("Testcase9 " + body.search("section"));
// Test case 10 -
console.log("Testcase10 " + divNode1.search(".randomSpan"));
// randomSpan is some Span outside your divNode1 closed