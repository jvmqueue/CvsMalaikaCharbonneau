var mzc = mzc || {};
mzc.main = (function(w, d, $){

	var Model = Backbone.Model.extend({
	    defaults:{
	      PDF:'docs/MalaikaZCharboneauResume2015May18.pdf',
	      WORD:'docs/MalaikaZCharboneauResume2015May17.doc',
	      GALLERY:'http://wwww.malaikazcharbonneau.com'
	    }		
	});

	var View = Backbone.View.extend({
		model:new Model(),
		el:$('#jumbotron'),
		selectorBtnDownLoad:'#btnShowDownloadForm',
		selectorContainerBtn:'.containerBtnShowDownLoad',
		selectorBtnFormClose:'#btnClose, #btnClose1, #screen',
		selectorBtnDownLoadFile:'#modalListContainer',
		selectorNodeScreenMask:'#screenModalBackground',
		selectorFormDownLoad:'#frmScreen',
		selectorButtonDownLoad:'.btnDownloadResume',
		initialize:function(){
			this.addListeners();
			this.renderHiddenElements();
		},
		renderHiddenElements:function(){
			$(this.el).addClass('transition');
		},
		openDownLoadForm:function(e){
			// open model
			var that = e.data.context;
			$(that.selectorFormDownLoad).addClass('jsContainerModelShow');
			$(that.selectorNodeScreenMask).addClass('jsContainerModelShow').removeClass('hide');
		},
		closeDownLoadForm:function(e){
			var that = e.data.context;
			$(that.selectorFormDownLoad).removeClass('jsContainerModelShow');
			$(that.selectorNodeScreenMask).addClass('hide');
		},
		keyEventCloseModel:function(e){
			var that = e.data.context;
			if(e.keyCode === 27){
				that.closeDownLoadForm(e);
			}else{
				return false;
			}
		},
		downloadFile:function(e){
			var that = e.data.context;
			var strInnerHtml = e.target.innerHTML.toUpperCase();

			if(!!that.model.get(strInnerHtml) === true){
				strUrl = that.model.get(strInnerHtml);
			}else{
				throw new Error('Exception: main View.downloadFile discovered value not in model');
			}

			// visitor's monitor screen width
			var screenDim = {width:screen.width, height:screen.height};
			// visitor's monitor screen height
			
			var nameWindow = "newWindow";
			var myWindow = window.open(strUrl, nameWindow, 'toolbar=yes, directories=yes, location=yes, status=yes, menubar=yes, resizable=yes, scrollbars=yes, width='+screenDim.width+', height='+screenDim.height+', screenX=0,screenY=0,left=0,top=0');
			myWindow.focus();
		},
		addListeners:function(){
			var that = this;
			mzc.util.fnc.setListener({selector:this.selectorBtnDownLoad, 
				event:'click', 
				data:{context:that}, 
				listener:that.openDownLoadForm
			});
			mzc.util.fnc.setListener({selector:that.selectorBtnFormClose + ', ' + that.selectorNodeScreenMask, 
				event:'click', 
				data:{context:that}, 
				listener:that.closeDownLoadForm
			});	
			mzc.util.fnc.setListener({selector:that.selectorBtnDownLoadFile, 
				event:'click', 
				data:{context:that}, 
				listener:that.downloadFile
			});			
			mzc.util.fnc.setListener({selector:'#index', 
				event:'keyup', 
				data:{context:that}, 
				listener:that.keyEventCloseModel
			});						
		}
	});

	var main = function(){
		var view = new View();
	};

	var interval = w.setInterval(function(){
		if( d.getElementsByTagName('div').length > 0 ){
			w.clearInterval(interval);
			main();
		}
	}, 333);

})(window, document, jQuery);