/*global jQuery*/

(function ($) {
    "use strict";
    $.fn.gallery = function (options) {



        options = $.extend({}, $.fn.gallery.defaults, options);

        $.fn.gallery.globals.numberOfChildren = $(this).children().length;

        //Control and default some values
        //items can be maximum the amount of children
        if (options.items <= 0) {
            options.items = 1;
        }

        if ($.fn.gallery.globals.numberOfChildren <= options.items) {
            options.items = $.fn.gallery.globals.numberOfChildren;
        }

        $.fn.gallery.globals.items = options.items;
        $.fn.gallery.globals.thumbnailSize = options.thumbnailSize;
        $.fn.gallery.globals.margins = options.margins;
        $.fn.gallery.globals.fill = options.fill;
        $.fn.gallery.globals.width = options.width;
        $.fn.gallery.globals.height = options.height;

        if (((options.thumbnailSize + options.margins) * options.items) + options.margins + 3 + options.thumbnailSize > options.width) {
            options.width = ((options.thumbnailSize + options.margins) * options.items) + options.margins + 3 + options.thumbnailSize;
            $.fn.gallery.defauls.width = ((options.thumbnailSize + options.margins) * options.items) + options.margins + 3 + options.thumbnailSize;
        }

        //Create the selected-box class
        var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = '.selected-box { outline: 1px solid ' + options.outline + '; }';
        document.getElementsByTagName('head')[0].appendChild(style);

        $(this).css({
            'width': ((options.thumbnailSize + options.margins) * options.items) + options.margins + 3,
            'padding-left': 1,
            'height': options.thumbnailSize + 2,
            'overflow': 'hidden',
            'position': 'absolute',
            'margin-left': (options.width - (((options.thumbnailSize + options.margins) * options.items) + options.margins + 3)) / 2,
            'margin-top': options.height - (options.thumbnailSize + 2)
        });


        $(this).children().each(function () {
            $(this).wrap('<li style="background: url(' + $(this).attr('src') + ');"></li>');
            $(this).remove();
        });
        var x = 0;
        $(this).children().each(function () {
            $(this).css({
                'width': options.thumbnailSize,
                'height': options.thumbnailSize,
                'position': 'absolute',
                'margin-left': (options.thumbnailSize + 2 * options.margins) * x + 'px',
                'background-size': options.thumbnailSize + 'px ' + options.thumbnailSize + 'px'
            });
            x += 1;
        });

        $(this).wrapInner('<ul id="photo-ul-list"></ul>');

        $.fn.gallery.globals.jsList = document.getElementById('photo-ul-list');
        $.fn.gallery.globals.jqList = $('#photo-ul-list');

        $($.fn.gallery.globals.jqList).css({
            'margin': 0,
            'height': (options.thumbnailSize + 2),
            'width': (((options.thumbnailSize + options.margins) * options.items) + options.margins),
            'padding': '1px 1px',
            'list-style': 'none',
            'transition': 'all 0.3s linear'
        });

        $(this).wrap('<div id="gallery"></div>');

        $('<img id="gallery-pic"></img>').insertBefore($(this)).css({
            'max-width': options.width,
            'max-height': options.height - (options.thumbnailSize + 2),
            'float': 'left',
            'position': 'absolute'
        });

        $('#gallery').css({
            'width': options.width,
            'height': options.height,
            'background-color': options.color
        });

        $.fn.gallery.globals.rightSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

        $.fn.gallery.globals.rightSvg.setAttribute("id", "rightSvg");
        $.fn.gallery.globals.rightSvg.setAttribute("width", options.thumbnailSize / 2);
        $.fn.gallery.globals.rightSvg.setAttribute("height", options.thumbnailSize);


        $($.fn.gallery.globals.rightSvg).insertAfter($(this));
        $('#rightSvg').css({
            'margin-top': $(this).css('margin-top'),
            'margin-left': Number($(this).css('margin-left').replace("px", "")) + $(this).width() + 1,
            'position': 'absolute'
        });

        $.fn.gallery.globals.leftSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

        $.fn.gallery.globals.leftSvg.setAttribute("id", "leftSvg");
        $.fn.gallery.globals.leftSvg.setAttribute("width", options.thumbnailSize / 2);
        $.fn.gallery.globals.leftSvg.setAttribute("height", options.thumbnailSize);



        $($.fn.gallery.globals.leftSvg).insertBefore($(this));
        $('#leftSvg').css({
            'margin-top': $(this).css('margin-top'),
            'margin-left': Number($(this).css('margin-left').replace("px", "")) - options.thumbnailSize / 2,
            'position': 'absolute',
            'transform': 'rotate(180deg)'
        });

        var fourth = options.thumbnailSize / 4;
        var threeFourth = fourth * 3;
        var half = fourth * 2;

        $.fn.gallery.globals.rightArrow = document.createElementNS("http://www.w3.org/2000/svg", "polygon");

        var points = "0," + fourth + " " + fourth + "," + fourth + " " + fourth + ",0 " + half + "," + half + " " + fourth + "," + options.thumbnailSize + " " + fourth + "," + threeFourth + " 0," + threeFourth + " 0," + fourth;

        $.fn.gallery.globals.rightArrow.setAttribute("points", points);
        $.fn.gallery.globals.rightArrow.setAttribute("fill", options.fill);
        $.fn.gallery.globals.rightArrow.setAttribute("onclick", "$.fn.gallery.slideRight()");
        document.getElementById('rightSvg').appendChild($.fn.gallery.globals.rightArrow);

        $.fn.gallery.globals.leftArrow = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        $.fn.gallery.globals.leftArrow.setAttribute("points", points);
        $.fn.gallery.globals.leftArrow.setAttribute("fill", "lightgrey");
        $.fn.gallery.globals.leftArrow.setAttribute("stroke", "grey");
        $.fn.gallery.globals.leftArrow.setAttribute("strokeWidth", "1");
        $.fn.gallery.globals.leftArrow.setAttribute("onclick", "$.fn.gallery.slideLeft()");
        document.getElementById('leftSvg').appendChild($.fn.gallery.globals.leftArrow);

        $(this).click(function (e) {

            if ($.fn.gallery.globals.selected === e.toElement || e.toElement === this || e.toElement === $.fn.gallery.globals.jsList) {
                return;
            }

            $($.fn.gallery.globals.selected).removeClass('selected-box');

            $.fn.gallery.globals.selected = e.toElement;
            $($.fn.gallery.globals.selected).addClass('selected-box');


            if ($.fn.gallery.globals.selected) {
                $('#gallery-pic').fadeIn(200);
                $('#gallery-pic').attr('src', $($.fn.gallery.globals.selected).css('background-image').split('"')[1]);
                $('#gallery-pic').css('margin-left', ($.fn.gallery.globals.width - $('#gallery-pic').width()) / 2);
                $('#gallery-pic').css('margin-top', ($.fn.gallery.globals.height - ($.fn.gallery.globals.thumbnailSize + 2) - $('#gallery-pic').height()) / 2);
            }
        });
    };

    $.fn.gallery.defaults = {
        'items': 3,
        'thumbnailSize': 48,
        'margins': 5,
        'height': 500,
        'width': 600,
        'color': 'lightgrey',
        'fill': 'red',
        'outline': 'red'
    };

    $.fn.gallery.globals = {
        'numberOfChildren': 0,
        'selected': null,
        'jsList': null,
        'jqList': null,
        'leftSvg': null,
        'rightSvg': null,
        'leftArrow': null,
        'rightArrow': null,
        'slidePos': 0
    };

    $.fn.gallery.slideRight = function () {
        if ($.fn.gallery.globals.slidePos === (-1) * $.fn.gallery.globals.numberOfChildren + $.fn.gallery.globals.items) {
            return;
        }

        $.fn.gallery.globals.leftArrow.style.fill = $.fn.gallery.globals.fill;
        $.fn.gallery.globals.leftArrow.style.stroke = '';
        $.fn.gallery.globals.leftArrow.style.strokeWidth = '0';

        $.fn.gallery.globals.slidePos -= 1;
        $($.fn.gallery.globals.jqList).css('margin-left', $.fn.gallery.globals.slidePos * ($.fn.gallery.globals.thumbnailSize + 2 * $.fn.gallery.globals.margins));

        if ($.fn.gallery.globals.slidePos === (-1) * $.fn.gallery.globals.numberOfChildren + $.fn.gallery.globals.items) {
            $.fn.gallery.globals.rightArrow.style.fill = 'lightgrey';
            $.fn.gallery.globals.rightArrow.style.stroke = 'grey';
            $.fn.gallery.globals.rightArrow.style.strokeWidth = '1';
        }
    };

    $.fn.gallery.slideLeft = function () {
        if ($.fn.gallery.globals.slidePos === 0) {
            return;
        }

        $.fn.gallery.globals.rightArrow.style.fill = $.fn.gallery.globals.fill;
        $.fn.gallery.globals.rightArrow.style.fill = '';
        $.fn.gallery.globals.rightArrow.style.strokeWidth = '0';
        $.fn.gallery.globals.slidePos += 1;
        $($.fn.gallery.globals.jqList).css('margin-left', $.fn.gallery.globals.slidePos * ($.fn.gallery.globals.thumbnailSize + 2 * $.fn.gallery.globals.margins));

        if ($.fn.gallery.globals.slidePos === 0) {
            $.fn.gallery.globals.leftArrow.style.fill = 'lightgrey';
            $.fn.gallery.globals.leftArrow.style.stroke = 'grey';
            $.fn.gallery.globals.leftArrow.style.strokeWidth = '1';
        }
    };

}(jQuery));
