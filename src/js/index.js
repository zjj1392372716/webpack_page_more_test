import "../less/reset.less"
import "../less/index.less"
import './base.js'
var div = document.createElement("div");
div.innerText = "helloworld";
div.className = 'index';
document.body.appendChild(div);

$('.index').text('11111');