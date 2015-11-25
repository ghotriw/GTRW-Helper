/*!
 * Gtrw Helper; version: 1.1.0 build: 20150721
 * http://ghotriw.pro/
 * Copyright (c) 2015 Andrew Goncharov;
 */
(function(e){
    var methods = {
        info : function() {
            console.info('Gtrw Helper; version: 1.1.0 build: 20150721');
        },
        scrollToTop : function( options ) {
            return this.each(function(){
                var $this_element = $(this),
                    defaults = {
                        'page_width': 980,
                        'bottom': 20,
                        'top': 'auto',
                        'vertical_alignment': false,
                        'horizontal_position': 'press_the_right',
                        'visible_position': 100,
                        'speed': 300,
                        'duration': 400
                    },
                    settings = e.extend(defaults, options);

                $this_element.css({
                    'display': 'none',
                    'position': 'fixed',
                    'cursor': 'pointer',
                    'right': '50%',
                    'margin-right': -settings.page_width /2 - $this_element.outerWidth(),
                    'bottom': settings.bottom + 'px'
                });

                if(settings.vertical_alignment) {
                    var this_height = $this_element.outerHeight();
                    $this_element.css({
                        'bottom': 'auto',
                        'top': '50%',
                        'margin-top': -this_height/2
                    })
                }

                if(settings.horizontal_position != 'press_the_right') {
                    $this_element.css({
                        'margin-left': $this_element.css('margin-left'),
                        'left': settings.horizontal_position + 'px'
                    })
                }

                if(settings.top != 'auto') {
                    $this_element.css({
                        'margin-left': $this_element.css('margin-left'),
                        'bottom': 'auto',
                        'top': settings.top + 'px'
                    })
                }

                function show_button(){
                    var page_position = $(window).scrollTop();
                    if(page_position > settings.visible_position) {
                        $($this_element).fadeIn(settings.duration);
                    } else {
                        $($this_element).fadeOut(settings.duration);
                    }
                }
                show_button();

                $(window).on('scroll', function() {
                    show_button();
                });

                $this_element.on('click', function() {
                    $('body, html').animate({
                        scrollTop: 0
                    }, settings.speed)
                })
            })
        },
        folding : function( options ) {
            return this.each(function() {
                var $self = $(this),
                    self_class = '.'+$self.attr('class').split(' ').join('.'),
                    defaults = {
                        'button': '.fold_but',
                        'block': '.fold_block',
                        'foldedClass': 'folded',
                        'speed': 200,
                        'folding': true,
                        'afterShow': function() {},
                        'afterHide': function() {}
                    },
                    settings = e.extend(defaults, options);
                $self.each(function() {
                    var $self = $(this);
                    if(!$self.hasClass(settings.foldedClass)){
                        $self.find(settings.block).hide();
                    } else {
                        $self.find(settings.block).show();
                    }
                });

                $self.find(settings.button).on('click', function() {
                    if($self.hasClass(settings.foldedClass)) {
                        $self.find(settings.block).stop().slideUp(settings.speed);
                        $self.removeClass(settings.foldedClass);
                        // afterHide callback call:
                        setTimeout(function() {settings.afterHide.call();},1)
                    } else {
                        if(settings.folding){
                            $(self_class).removeClass(settings.foldedClass);
                            $(settings.block).stop().slideUp(settings.speed);
                        }
                        $self.find(settings.block).stop().slideDown(settings.speed);
                        $self.addClass(settings.foldedClass);
                        // afterShow callback call:
                        setTimeout(function() {settings.afterShow.call();},1)
                    }
                });
            })
        }
    };

    $.fn.gtrwHelper = function( method ) {
        if ( methods[method] ) {
            return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.info.apply( this, arguments );
        } else {
            $.error( 'Метод с именем ' +  method + ' не существует для jQuery.gtrwHelper' );
        }
    };
})(jQuery);