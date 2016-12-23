/*! AlightBox 1.0.1 - Ajaxson Chan - 2016-12-23 */
/* 
	*params  以下均为可选参数
	@param (windowClass)	//弹窗容器名称，默认为 ".windows_all"
	@param (animateClass)	//弹出动画，默认为 "windows_animate",  可加css动画库，添加多个要空格隔开 ，，如 “classNameA classNameA”
	@param (alertType)		//弹窗类型 ， 0为默认alert, 1为提示窗
	@param (atitle)			//提示主标题，弹窗时设定，默认为温馨提示
	@param (alertWord)		//提示的内容，默认为空
	@param (confirmWord)	//第一个按钮钮内容,默认”确定“
	@param (cancelWord)		//第二个按钮内容,默认是 "取消""	
	@param (cancelShow)		//是否显示第二个(取消或者的、自定义)按钮，true就显示
	@param (unclose)		//禁止关闭,需要回调时禁止立即关闭，例如ajax回调，
	@param (scrollLock)		//禁止滚动,alert弹窗出现时禁止滚动
	@param (removeTime)		//提示窗关闭删除时间,默认2500，可根据自己设定的动画，消失后删除,毫秒为单位

	*callback
	@param (confirm)		//点击左边（确定）按钮回调  or  提示风格 消失前回调
	@param (cancel)			//点击右边（取消）回调

	*function
	_reffer()				//外部调用初始化，常用于ajax回调后
*/

(function(c,d){AlightBox=function(a){var b=this;b.options={windowClass:a.windowClass||".windows_all",animateClass:a.animateClass||'windows_animate',alertType:a.alertType||0,atitle:a.atitle||"温馨提示",alertWord:a.alertWord||"",confirmWord:a.confirmWord||"确定",cancelWord:a.cancelWord||"取消",cancelShow:a.cancelShow||false,confirm:a.confirm||"",cancel:a.cancel||"",unclose:a.unclose||false,scrollLock:a.scrollLock||false,removeTime:a.removeTime||2500,}b.tipsTime="";b.confirmLock=false;b._todo()}AlightBox.prototype={_newHtml:function(){var a=this;a.alerthtml="";if(a.options.alertType==0){a.alerthtml='<div class="windows alert_windows on '+a.options.windowClass.replace(".","")+'">'+'<div class="windows_bg"></div>'+'<div class="windows_box '+a.options.animateClass+'">'+'<div class="alert_result">'+'<div class="alert_word">'+'<div class="result_top">'+a.options.atitle+'</div>'+'<div class="result_content">'+a.options.alertWord+'</div>'+'</div>'+'<div class="alert_btnbox">'+'<a href="javascript:void(0);" class="btn_confirm btn_alert">'+a.options.confirmWord+'</a>'+'<a href="javascript:void(0);" class="btn_cancel btn_alert">'+a.options.cancelWord+'</a>'+'</div>'+'</div>'+'</div>'+'</div>'}if(a.options.alertType==1){a.alerthtml='<div class="tips_windows '+a.options.windowClass.replace(".","")+'"><div class="tipsbox '+a.options.animateClass+'">'+a.options.alertWord+'</div></div>'}var b=document.createElement('div')document.body.appendChild(b);b.outerHTML=a.alerthtml},_afterNew:function(){var a=this;if(a.options.alertType==0){if(a.options.cancelShow==true){document.querySelector(".btn_cancel").classList.add("on");document.querySelectorAll(".btn_alert")[0].style.width="50%";document.querySelectorAll(".btn_alert")[1].style.width="50%"}document.querySelector(".btn_confirm").onclick=function(){a._callback()}document.querySelector(".btn_cancel").onclick=function(){if(a.options.cancel&&typeof(a.options.cancel)==="function"){a.option.cancel()}a._reffer()}}if(a.options.alertType==1){a.tipsTime=setTimeout(function(){if(document.querySelector(a.options.windowClass)&&(document.querySelector(a.options.windowClass).className).indexOf("tips_windows")>=0){a._callback()}clearTimeout(a.tipsTime)},a.options.removeTime)}},_scrollLock:function(){var a=this;if(a.options.scrollLock==true){var w=document.querySelector(a.options.windowClass);w.addEventListener("touchmove",function(e){e.preventDefault()})}},_callback:function(){var a=this if(a.options.confirm&&typeof(a.options.confirm)==="function"){a.options.confirm()}if(a.options.unclose!=true){a._reffer()}},_reffer:function(){var a=this;var w=document.querySelector(a.options.windowClass);if(w){w.remove()}},_todo:function(){var a=this;a._reffer();a._newHtml();a._afterNew();a._scrollLock()}}})(window,document)