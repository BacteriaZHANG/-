var data = [
	{img:1,h1:'Creative',h2:'DUTE'},
	{img:2,h1:'Friendly',h2:'DEVIL'},
	{img:3,h1:'Tranquilent',h2:'COMPATRIOT'},
	{img:4,h1:'Insecure',h2:'HUSSLER'},
	{img:5,h1:'Loving',h2:'REBEL'},
	{img:6,h1:'Passionate',h2:'SEEKER'},
	{img:7,h1:'Crazy',h2:'FRIEND'}
];
var g = function(id) {
	if(id.substr(0,1) == '.'){
		return document.getElementsByClassName(id.substr(1));
	}
	return document.getElementById(id);
}
function tempChange() {
	var _out_main = [];
	var _out_ctrl = [];
	var _tpl_main = g('template_main').innerHTML.trim();
	var _tpl_ctrl = g('template_ctrl').innerHTML.trim();
	for (var i = 0; i < data.length; i++) {
		_html_main = _tpl_main.replace(/{{index}}/g, data[i].img)
				 			  .replace(/{{h2}}/g, data[i].h1)
				 			  .replace(/{{h3}}/g, data[i].h2)
				 			  .replace(/{{css}}/g, ['','main-i_right'][i%2]);
		_html_ctrl = _tpl_ctrl.replace(/{{index}}/g, data[i].img);
		_out_main.push(_html_main);
		_out_ctrl.push(_html_ctrl);
	}
	g('template_main').innerHTML = _out_main.join('');
	g('template_ctrl').innerHTML = _out_ctrl.join('');

	g('template_main').innerHTML += _tpl_main
							  .replace(/{{index}}/g, '{{index}}')
				 			  .replace(/{{h2}}/g, data[0].h1)
				 			  .replace(/{{h3}}/g, data[0].h2);
	g('main_{{index}}').id = 'main_background';
}
function switchSlider(n) {
	var main = g('main_'+n),
		ctrl = g('ctrl_'+n);
	var clear_main = g('.main-i'),
		clear_ctrl = g('.ctrl-i');
	for (var j = 0; j < clear_ctrl.length; j++) {
		clear_main[j].className = clear_main[j].className.replace(' main-i_active', '');
		clear_ctrl[j].className = clear_ctrl[j].className.replace(' ctrl-i_active', '');
	}
	main.className += ' main-i_active';
	ctrl.className += ' ctrl-i_active';
	setTimeout(function(){
		g('main_background').innerHTML = main.innerHTML;
	},1000);
}
function movePictures() {
	var pictures = g('.picture');
	for (var k = 0; k < pictures.length; k++) {
		pictures[k].style.marginTop = (-1 * pictures[k].clientHeight/2) + 'px';
	}
}
window.onload = function() {
	tempChange();
	switchSlider(1);
	setTimeout(movePictures, 100);
}