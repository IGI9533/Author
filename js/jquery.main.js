$(document).ready(function() {
    initCarousel();
    initMobileNav();
    initFixedScrollBlock();
    documentNav();
    initPlansHover();
    initValidate();
});

function initCarousel() {
    $("#main-carousel").owlCarousel({
      navigation : true,
      autoPlay : true,
      slideSpeed : 600,
      paginationSpeed : 800,
 
      items : 1, 
      itemsDesktop : false,
      itemsDesktopSmall : false,
      itemsTablet: false,
      itemsMobile : false
  });
};

function initMobileNav() {
    $('.wrap').mobileNav({
      hideOnClickOutside: true,
      menuActiveClass: 'active',
      menuOpener: '.opener',
      menuDrop: '.drop'
  });
}

function initFixedScrollBlock(){
    $(window).scroll(function(){
      var sticky = $('.sticky'),
          scroll = $(window).scrollTop();

      if (scroll >= 30) sticky.addClass('fixed');
      else sticky.removeClass('fixed');
    });
};
function animateScroll(anchor, t) {
  $('html, body').stop().animate({
        scrollTop: $(anchor.attr('href')).offset().top
    }, t);
};

function documentNav(){
  $('body').on("click", '.main-menu a', function() {
      var anchor = $(this);
      animateScroll(anchor, 600);
      return false;
  });
};

function initPlansHover () {
    var button = $(".plans .item .btn"),
        parent = ".plans-block .item";
    button.hover(
       function(){
            $(this).closest(parent).addClass('hover')
        },
       function(){
            $(this).closest(parent).removeClass('hover')
        }
    );
};
function initValidate () {
    $(".contact-form").validate({
       rules:{
            name:{
                required: true,
                pattern: "^([a-zA-Z\s]{3,})$",
            },
            email:{
                required: true,
                email: true,
            },
            textarea:{
                required: true,
            },
       },

       messages:{
            name:{
                required: "This field is required",
                pattern: "This value seems to be invalid",
            },
            email:{
                required: "This field is required",
                email: "Enter the correct email",
            },
            textarea: {
                required: "This field is required",
            },
       },
    });
}

/*
 * Simple Mobile Navigation
 */
;(function($) {
  function MobileNav(options) {
    this.options = $.extend({
      container: null,
      hideOnClickOutside: false,
      menuActiveClass: 'active',
      menuOpener: '.opener',
      menuDrop: '.drop',
      toggleEvent: 'click',
      outsideClickEvent: 'click touchstart pointerdown MSPointerDown'
    }, options);
    this.initStructure();
    this.attachEvents();
  }
  MobileNav.prototype = {
    initStructure: function() {
      this.page = $('html');
      this.container = $(this.options.container);
      this.opener = this.container.find(this.options.menuOpener);
      this.drop = this.container.find(this.options.menuDrop);
    },
    attachEvents: function() {
      var self = this;

      if(activateResizeHandler) {
        activateResizeHandler();
        activateResizeHandler = null;
      }

      this.outsideClickHandler = function(e) {
        if(self.isOpened()) {
          var target = $(e.target);
          if(!target.closest(self.opener).length && !target.closest(self.drop).length) {
            self.hide();
          }
        }
      };

      this.openerClickHandler = function(e) {
        e.preventDefault();
        self.toggle();
      };

      this.opener.on(this.options.toggleEvent, this.openerClickHandler);
    },
    isOpened: function() {
      return this.container.hasClass(this.options.menuActiveClass);
    },
    show: function() {
      this.container.addClass(this.options.menuActiveClass);
      if(this.options.hideOnClickOutside) {
        this.page.on(this.options.outsideClickEvent, this.outsideClickHandler);
      }
    },
    hide: function() {
      this.container.removeClass(this.options.menuActiveClass);
      if(this.options.hideOnClickOutside) {
        this.page.off(this.options.outsideClickEvent, this.outsideClickHandler);
      }
    },
    toggle: function() {
      if(this.isOpened()) {
        this.hide();
      } else {
        this.show();
      }
    },
    destroy: function() {
      this.container.removeClass(this.options.menuActiveClass);
      this.opener.off(this.options.toggleEvent, this.clickHandler);
      this.page.off(this.options.outsideClickEvent, this.outsideClickHandler);
    }
  };

  var activateResizeHandler = function() {
    var win = $(window),
      doc = $('html'),
      resizeClass = 'resize-active',
      flag, timer;
    var removeClassHandler = function() {
      flag = false;
      doc.removeClass(resizeClass);
    };
    var resizeHandler = function() {
      if(!flag) {
        flag = true;
        doc.addClass(resizeClass);
      }
      clearTimeout(timer);
      timer = setTimeout(removeClassHandler, 500);
    };
    win.on('resize orientationchange', resizeHandler);
  };

  $.fn.mobileNav = function(options) {
    return this.each(function() {
      var params = $.extend({}, options, {container: this}),
        instance = new MobileNav(params);
      $.data(this, 'MobileNav', instance);
    });
  };
}(jQuery));