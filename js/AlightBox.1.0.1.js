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


(function(window,doc){

	AlightBox = function(option){
		var that = this;
		// 可选配置参数
		that.options = {		
			//可选参数
			windowClass : option.windowClass || ".windows_all",	
			animateClass: option.animateClass || 'windows_animate',	
			alertType : option.alertType || 0,  
			atitle : option.atitle || "温馨提示",
			alertWord : option.alertWord || "",  
			confirmWord : option.confirmWord || "确定",  
			cancelWord : option.cancelWord || "取消",  
			cancelShow : option.cancelShow || false, 
			confirm : option.confirm || "",		
			cancel : option.cancel || "",
			unclose : option.unclose || false, 	
			scrollLock : option.scrollLock || false,
			removeTime : option.removeTime || 2500,
			
		}	

		// 系统配置参数
		that.tipsTime =  "";
		that.confirmLock = false;

		// 执行
		that._todo();
	}

	AlightBox.prototype = {
		
		// 文本	
		_newHtml : function(){
			var that = this;
			that.alerthtml = "";
			// 弹窗
			if(that.options.alertType == 0){
				that.alerthtml = '<div class="windows alert_windows on '+ that.options.windowClass.replace(".","") +'">' + 
									'<div class="windows_bg"></div>' +
									'<div class="windows_box '+ that.options.animateClass +'">' +
										'<div class="alert_result">' +
											'<div class="alert_word">' +
												'<div class="result_top">'+ that.options.atitle +'</div>' +
												'<div class="result_content">'+ that.options.alertWord +'</div>' +
											'</div>' +
											'<div class="alert_btnbox">' +
												'<a href="javascript:void(0);" class="btn_confirm btn_alert">'+ that.options.confirmWord +'</a>' +
												'<a href="javascript:void(0);" class="btn_cancel btn_alert">'+ that.options.cancelWord +'</a>' +
											'</div>' +
										'</div>' +
									'</div>' +
								'</div>';
			}
			// 提示窗
			if(that.options.alertType == 1){
				that.alerthtml = '<div class="tips_windows '+ that.options.windowClass.replace(".","") +'"><div class="tipsbox '+ that.options.animateClass +'">' + that.options.alertWord + '</div></div>';
			}
			// 追加文本
			var el = document.createElement('div')
			document.body.appendChild(el);
			el.outerHTML = that.alerthtml;

		},

		// 插入
		_afterNew : function(){
			var that = this;
			// 弹窗
			if(that.options.alertType == 0){
				if(that.options.cancelShow == true){
					document.querySelector(".btn_cancel").classList.add("on");
					document.querySelectorAll(".btn_alert")[0].style.width = "50%";
					document.querySelectorAll(".btn_alert")[1].style.width = "50%";
				}
		 		//第一个按钮点击
		 		document.querySelector(".btn_confirm").onclick = function(){
					that._callback();
				}
				//第二个按钮点击
				document.querySelector(".btn_cancel").onclick = function(){
					if(that.options.cancel && typeof(that.options.cancel) === "function"){
			 			that.option.cancel();
			 		}
			 		that._reffer();
				}
			}
			if(that.options.alertType == 1){
			// 提示窗
				that.tipsTime = setTimeout(function(){
					if( document.querySelector(that.options.windowClass) && (document.querySelector(that.options.windowClass).className).indexOf("tips_windows") >= 0){
						that._callback();
					}
					clearTimeout(that.tipsTime);
				},that.options.removeTime)
			}
		},

		// 滚动关闭
		_scrollLock: function(){
			var that = this;
			if(that.options.scrollLock == true){
				var w = document.querySelector(that.options.windowClass);
				w.addEventListener("touchmove", function(e){
					e.preventDefault();	
				})
			}
		},

		// 回调
		_callback : function(){
			var that = this
			if(that.options.confirm && typeof(that.options.confirm) === "function"){
	 			that.options.confirm();
	 		}
	 		if(that.options.unclose != true){
	 			that._reffer();
	 		}
		},

		_reffer : function(){
			var that = this;
			var w = document.querySelector(that.options.windowClass);
			if(w){				
				w.remove();
			}
		},

		_todo : function(){
			var that = this;
			that._reffer();
			that._newHtml();
			that._afterNew();
			that._scrollLock();
		}

	}

})(window,document)