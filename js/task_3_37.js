(function(win,doc){
	var unique;
	var layer = function(txt,config){
		this.txt = txt;
		this.config = config;
		this.dragging = false;
		this.startX = 0;
		this.startY = 0;
	}
	layer.prototype = {
		init : function(){
			var that = this;
			this.pop = doc.createElement('div'),
		    this.popTitle = doc.createElement('div'),
		    this.popContent = doc.createElement('div'),
		    this.popBtns = doc.createElement('div'),
		    this.confirmBtn = doc.createElement('button');
		    this.cancelBtn = doc.createElement('button');

		    this.confirmBtn.className = 'btn';
		    this.confirmBtn.innerText = '确认';
		    this.cancelBtn.className = 'btn';
		    this.cancelBtn.innerText = '取消';
		    this.popBtns.className = 'popup-btns';
		    this.popContent.className = 'popup-content';
		    this.popTitle.className = 'popup-title';
		    this.popTitle.innerHtml = this.txt;
		    this.pop.className = 'popup';

		    this.popBtns.appendChild(this.confirmBtn);
		    this.popBtns.appendChild(this.cancelBtn);

		    this.pop.appendChild(this.popTitle);
		    this.pop.appendChild(this.popContent);
		    this.pop.appendChild(this.popBtns);
		    doc.getElementsByTagName('body')[0].appendChild(this.pop);


		    this.popTitle.addEventListener('mousedown',function(){
		    	that.dragging = true;
		    	that.startX = event.pageX;
		    	that.startY = event.pageY;
		    	that.left = parseInt(window.getComputedStyle(that.pop,null).left);
		    	that.top = parseInt(window.getComputedStyle(that.pop,null).top);
		    });
		    doc.getElementsByTagName('body')[0].addEventListener('mouseup',function(){
		    	that.dragging = false;
		    });
		    this.pop.addEventListener('mousemove',function(){
		    	if(that.dragging){
		    		var x = parseInt(event.pageX - that.startX + that.left);
		    		var y = parseInt(event.pageY - that.startY + that.top)
		    		if(x > 0){
		    			that.pop.style.left = x+'px';
		    		}else{
		    			that.pop.style.left = 0+'px';
		    		}
		    		if(y >0){
						that.pop.style.top = y+'px';
		    		}else{
		    			that.pop.style.top = 0+'px';
		    		}
		    	}
		    });
		},
		alert : function(){
			var that = this;
			this.init();
			this.popBtns.removeChild(this.cancelBtn);
			this.confirmBtn.addEventListener('click', btnFn = function(){that.close(that)});
		},
		pay : function(){
			var that = this;
			this.init();
			this.cancelBtn.addEventListener('click', btnFn = function(){that.close(that)});
		},
		close : function(that){
			unique = undefined;
			doc.getElementsByTagName('body')[0].removeChild(that.pop);
		}
	};
	var POP = {
		alert : function(txt,config){
			var layer = this.single(txt,config);
			if(layer){
				layer.alert();
			}
		},
		pay : function(txt,config){
			var layer = this.single(txt,config);
			if(layer){
				layer.pay();
			}
		},
		single : function(txt,config){
			if(unique === undefined){
				unique = new layer(txt,config);
				return unique;
			}else{
				return false ;
			}
		}
	}
	window.pop = POP;
})(window,document);