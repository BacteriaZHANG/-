var data = [
	{img:1,h1:'Creative',h2:'DUTE'},
	{img:2,h1:'Friendly',h2:'DEVIL'},
	{img:3,h1:'Tranquilent',h2:'COMPATRIOT'},
	{img:4,h1:'Insecure',h2:'HUSSLER'},
	{img:5,h1:'Loving',h2:'REBEL'},
	{img:6,h1:'Passionate',h2:'SEEKER'},
	{img:7,h1:'Crazy',h2:'FRIEND'}
];
function addHandler(ele, type, handler) {
	if(ele.addEventListener) {
		ele.addEventListener(type, handler, false);
	} else if (ele.attachEvent) {
		ele.attachEvent('on'+type, handler);
	} else {
		ele['on'+type] = handler;
	}
}
function g(str) {
	if(str.substr(0,1) == '.') {
		return document.getElementsByClassName(str.substr(1));
	}
	return document.getElementById(str);
}
var template_main = g('template_main'),
	template_ctrl = g('template_ctrl'),
	len = data.length;
function changeTemplate() {
	var temp_main = template_main.innerHTML.replace(/^\s*/,'').replace(/\s*$/,''),
		temp_ctrl = template_ctrl.innerHTML.replace(/^\s*/,'').replace(/\s*$/,'');
	var out_main = [],
		out_ctrl = [];
	for (var i = 0; i < len; i++) {
		var _html_main = temp_main.replace(/{{index}}/g,data[i].img)
								.replace(/{{h2}}/g,data[i].h1)
								.replace(/{{h3}}/g,data[i].h2)
								.replace(/{{css}}/g,['','main_right'][i%2]);
		var _html_ctrl = temp_ctrl.replace(/{{index}}/g,data[i].img);
		out_main.push(_html_main);
		out_ctrl.push(_html_ctrl);
	}
	template_main.innerHTML = out_main.join('');
	template_ctrl.innerHTML = out_ctrl.join('');
	template_main.innerHTML += temp_main.replace(/{{index}}/g,'{{index}}')
								.replace(/{{h2}}/g,data[0].h1)
								.replace(/{{h3}}/g,data[0].h2);
	g('main_{{index}}').id = 'main_background';
}
function switchSlider(n) {
	var main = g('main_'+n);
	var ctrl = g('ctrl_'+n);
	var allmain = g('.main-i');
	var allctrl = g('.ctrl-i');
	for (var i = len - 1; i >= 0; i--) {
		if(allctrl[i].className.indexOf('ctrl-i_active') > -1) {
			allmain[i].className = allmain[i].className.replace(' main-i_active', '');
			allctrl[i].className = allctrl[i].className.replace(' ctrl-i_active', '');
			break;
		}
	}
	main.className += ' main-i_active'; 
	ctrl.className += ' ctrl-i_active';
	setTimeout(function(){
		g('main_background').innerHTML = main.innerHTML;
	},1000);
}
function reloacatePics() {
	var pictures = g('.picture');
	for (var i = pictures.length - 1; i >= 0; i--) {
		pictures[i].style.marginTop = (-1 * pictures[i].clientHeight/2) + 'px';
	}
}
var id = 1;
function handler(e) {
	var e = e || window.event;
		id = e.target.id.substr(-1);
	switchSlider(id);
}
var timer = null;
var slider = g('.slider')[0];
function autoSlider() {
	timer = setInterval(function() {
		if(id > len - 1) {id = 0};
		switchSlider(++id);
	}, 5000);
}
function stopSlider() {
	clearInterval(timer);
}
window.onload = function() {
	changeTemplate();
	switchSlider(1);
	setTimeout(reloacatePics,10);
	addHandler(template_ctrl, 'click', handler);
	addHandler(slider, 'mouseover', stopSlider);
	addHandler(slider, 'mouseout', autoSlider);
	autoSlider();
}
