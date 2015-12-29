var mzc = mzc || {};
mzc.util = (function(w, d, $){

 var _fnc = {
      setListener:function(options){
        $(options.selector).on(options.event, options.data, options.listener);
      }
  }; // End listeners

  return{
  	fnc:_fnc
  };

})(window, document, jQuery);