// Create a "close" button and append it to each list item
var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);
//Collapse button
function toggle(event){
    var x = event.target;
    //document.write(x);
    var parent = event.target.parentNode;
    //document.write(parent);
    var mainpar = parent.parentNode;
    var sib = mainpar.nextElementSibling;
    //document.write(sib);
    if(sib.style.display=="block"){
      sib.style.display="none";
    }
    else{
      sib.style.display="block"
    }
  
  
  }

//To mark an to do item
  function checkdef(clicked_id,event){
    var x = event.target;
    //document.write(x);
   
    var parent1 = event.target.parentNode;
  
    
    var mainpar = parent1.parentNode;
    var sib = mainpar.nextElementSibling;
    var btn = document.getElementById("button");
    var c =  mainpar.childNodes;
    var delvis = c[c.length-2];
    
  
  
    if(event.target.checked)
      {
     mainpar.style.backgroundColor="orange";
     document.getElementById('button').className = "button1";
     delvis.style.display="block";
     sib.style.display="none";
    }
     else{
      mainpar.style.backgroundColor="";
      document.getElementById('button').className = "";
      delvis.style.display="none";
     }
  
  }

//to display delete button
function del_btn(event){
    var x = event.target;
  
    var parent = event.target.parentNode;
    
    var mainpar = parent.parentNode;
    
    mainpar.style.display="none";
  }

// Create a new list item when clicking on the "Add" button
function newElement() {
  var td = document.createElement("td");
  li.className = 'collapsible';

  var inputValue = document.getElementById("myInput").value;
  var inputValue_D = document.getElementById("myInput_D").value;
  var inputValue_DD = document.getElementById("myInput_DD").value;
  var inputValue_T = document.getElementById("myInput_T").value;

  var t = document.createTextNode(inputValue);
  li.appendChild(t);

  if (inputValue === '') {
    alert("You must enter title for to do card!!!");
  }
  else if(inputValue_D === ''){
    alert("You must enter description for to do card!!!");
  }
    else {
    document.getElementById("myUL").appendChild(li);
  }

  //making values null after entering in to todo list
  document.getElementById("myInput").value = "";
  document.getElementById("myInput_D").value = "";
  document.getElementById("myInput_DD").value= "";
  document.getElementById("myInput_T").value= "";

//   var btn = document.createElement("button");
//   btn.className='collapsible';
// //   btn.innerHTML='Open Collapsible';
//   li.appendChild(btn);

  var div = document.createElement("divison");
  div.className = contentClass;
  li.appendChild(div);

  var p = document.createElement("p");
  p.className = content;
  div.appendChild(p);
  p.innerHTML(inputValue_D);

  var coll = document.getElementsByClassName("collapsible");
  var i;

//   var detailList = document.createElement("li");
//   detailList.className = 
 for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    // this.classList.toggle("active");
    var content = this.children;
    alert("the context menu will be displayed");
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }


  });
}
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}