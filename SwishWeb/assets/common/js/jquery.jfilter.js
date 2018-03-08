// Highlight function

jQuery.fn.extend({
    highlight: function(search, insensitive, hls_class){
      var regex = new RegExp("(<[^>]*>)|("+ search.replace(/([-.*+?^${}()|[\]\/\\])/i,"\\$1") +")", "gi");
      return this.html(this.html().replace(regex, function(a, b, c){
        return (a.charAt(0) == "<") ? a : "<span class=\""+ hls_class +"\">" + c + "</span>";
      }));
    }
});

// Unwrap function

jQuery.fn.extend({ 
  unwrap: function(){
    return this.each(function(){ $(this.childNodes).insertBefore(this); }).remove();
  }
});

// jFilter function

jQuery.fn.jfilter = function(o) {
    
  // Defaults
  var o = jQuery.extend( {
  	list: '#filterable',
	speed: '100',
	highlight: 'highlight'
  },o);
  
  return this.each(function(){
    $(this).keyup(function(){
		$('.'+o.highlight).unwrap();
    var out = false;
		var filter = $(this).val();
	    $(o.list+' .search-target').each(function () {
	        if ($(this).text().search(new RegExp(filter, "i")) < 0) {
	            $(this).parent().parent().parent().fadeOut(o.speed);
	        } else {
	          $(this).parent().parent().parent().show();
				    $(this).highlight(filter, 0, o.highlight);
              out = true;
	        }
	    });

      if(out == false){
        $("#attractionList").hide();
        $("#not-found").show();
      }else{
        $("#not-found").hide();
        $("#attractionList").show();
      }

	});		
  });
};