jQuery(document).ready(function($) {
  var $window = $(window);
  var $document = $(document);


  /*
   * Scrollspy.
   */

  $document.on('flatdoc:ready', function() {
     $("h2, h3").scrollagent(function(cid, pid, currentElement, previousElement) {
       if (pid) {
        $("[href='#"+pid+"']").removeClass('active');
       }
       if (cid) {
        $("[href='#"+cid+"']").addClass('active');
       }
     });
   });


  /*
   * Anchor jump links.
   */

  $document.on('flatdoc:ready', function() {
    $('.menu a').anchorjump();
  });


  /*
   * Sidebar stick.
   */

  $(function() {
    var $sidebar = $('.menubar');
    var elTop;

    $window
      .on('resize.sidestick', function() {
        $sidebar.removeClass('fixed');
        elTop = $sidebar.offset().top;
        $window.trigger('scroll.sidestick');
      })
      .on('scroll.sidestick', function() {
        var scrollY = $window.scrollTop();
        $sidebar.toggleClass('fixed', (scrollY >= elTop));
      })
      .trigger('resize.sidestick');
  });


  /*
   * Run Flatdoc.
   */

  Flatdoc.run();


});