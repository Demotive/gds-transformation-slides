/*!
 An experiment in getting accurate visible viewport dimensions across devices
 (c) 2012 Scott Jehl.
 MIT/GPLv2 Licence
*/

function viewportSize(){
  var test = document.createElement( "div" );

  test.style.cssText = "position: fixed;top: 0;left: 0;bottom: 0;right: 0;";
  document.documentElement.insertBefore( test, document.documentElement.firstChild );

  var dims = { width: test.offsetWidth, height: test.offsetHeight };
  document.documentElement.removeChild( test );

  return dims;
}


// Notes:
// relies on position:fixed support, but it should work in browsers that partially support position: fixed like iOS4 and such...

//sample usage: var viewportwidth = viewportSize().width;

var presentationView = {

  containerEl: {},
  unitEls: {},

  totalUnits: 0,
  viewportWidth: 0,
  currentUnit: 1,

  init: function() {

    this.containerEl = $('#slide-container');

    this.unitEls = this.containerEl.find('.slide');
    this.totalUnits = this.unitEls.length;

    this.setWidth();

    window.scrollTo(0,0);

    this.sliderTimer = window.setInterval(presentationView.slide, 10000);

    $(window).on('resize', function (e) {
      presentationView.setWidth();
    });

  },

  setWidth: function() {
    presentationView.viewportWidth = viewportSize().width;
    presentationView.unitEls.each(function() {
      $(this).css('min-width', presentationView.viewportWidth + 'px');
    });
  },

  slide: function() {
    if (presentationView.currentUnit === presentationView.totalUnits) {
      presentationView.currentUnit = 0;
    }
    var pos = parseInt(presentationView.containerEl.css('margin-left'));
    presentationView.containerEl.css({
      'margin-left' : '-' + (presentationView.viewportWidth * presentationView.currentUnit) + 'px'
    });
    presentationView.currentUnit++;
  }

};

$(function() {
  presentationView.init();
});