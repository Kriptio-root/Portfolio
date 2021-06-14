///////////range//////////
var $range = $(".js-range-slider");
var $inputFrom = $(".js-input-from");
var $inputTo = $(".js-input-to");
var instance;
var min = 100000;
var max = 500000;
var from = 100000;
var to = 500000;
//////////////////
$(function () {
    $('.banner-section__slider').slick({
        dots: true,
        prevArrow: '<button class="banner-section__slider-btn banner-section__slider-btnprev"><img src="img/arrow-left.png" alt="previous"> </button>',
        nextArrow: '<button class="banner-section__slider-btn banner-section__slider-btnnext"><img src="img/arrow-right.png" alt="next"> </button>',
        responsive: [
            {
                breakpoint: 969,
                settings: {
                    arrows: false,
                    adaptiveHeight: true,
                    infinite: true,
                    speed: 300
                }
            }
        ]
    });
    $('.tab').on('click', function (e) {
        e.preventDefault();
        $($(this).siblings()).removeClass('tab--active');
        $($(this).parent().parent().parent().find('.tabs-content')).removeClass('tabs-content--active');
        $($(this).find('div')).removeClass('tabs-content--active');
        $(this).addClass('tab--active');
        $($(this).attr('href')).addClass('tabs-content--active');

        $('.slick-initialized').slick('setPosition');
    });

    $('.product-item__favorite').on('click', function () {
        $(this).toggleClass('product-item__favorite--active');
    });

    $('.product-slider').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        prevArrow: '<button class="product-slider__slider-btn product-slider__slider-btnprev"><img src="img/arrow-black-left.png" alt="previous"> </button>',
        nextArrow: '<button class="product-slider__slider-btn product-slider__slider-btnnext"><img src="img/arrow-black-right.png" alt="next"> </button>',
        responsive: [
            {
                breakpoint: 1301,
                settings: {
                    arrows: false,
                    dots: true
                }
            },
            {
                breakpoint: 1201,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    arrows: false,
                    dots: true,
                    infinite: true,
                    speed: 300
                }
            },
            {
                breakpoint: 870,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    arrows: false,
                    adaptiveHeight: true,
                    dots: true,
                    infinite: true,
                    speed: 300
                }
            },
            {
                breakpoint: 770,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    adaptiveHeight: true,
                    dots: true,
                    infinite: true,
                    speed:300
                }
            },
        ]
    });
    $('.filter-style').styler();
    $('.filter__item-drop').on('click', function () {
        $(this).toggleClass('filter__item-drop--active');
        $(this).next().slideToggle('200');
    });
    ////////range/////////////////////////////////////
    $range.ionRangeSlider({
        skin: "flat",
        grid: false,
        force_edges: true,
        type: "double",
        min: min,
        max: max,
        from: from,
        to: to,
        prefix: "₪",
        hide_from_to: true,
        onStart: updateInputs,
        onChange: updateInputs,
        onFinish: updateInputs
    });
    instance = $range.data("ionRangeSlider");

    function updateInputs(data) {
        from = data.from;
        to = data.to;

        $inputFrom.prop("value", from);
        $inputTo.prop("value", to);
    }

    $inputFrom.on("change", function () {
        var val = $(this).prop("value");

        // validate
        if (val < min) {
            val = min;
        } else if (val > to) {
            val = to;
        }

        instance.update({
            from: val
        });

        $(this).prop("value", val);

    });

    $inputTo.on("change", function () {
        var val = $(this).prop("value");

        // validate
        if (val < from) {
            val = from;
        } else if (val > max) {
            val = max;
        }

        instance.update({
            to: val
        });

        $(this).prop("value", val);
    });
    $('.catalog__filter-btngrid').on('click', function () {
        $(this).addClass('catalog__filter-button--active');
        $('.catalog__filter-btnline').removeClass('catalog__filter-button--active');
        $('.product-item__wrapper').removeClass('product-item__wrapper--list');
        $('.product-item__hover-text').css('right', '13%');
    });
    $('.catalog__filter-btnline').on('click', function () {
        $(this).addClass('catalog__filter-button--active');
        $('.catalog__filter-btngrid').removeClass('catalog__filter-button--active');
        $('.product-item__wrapper').addClass('product-item__wrapper--list');
        $('.product-item__hover-text').css('right', '35%');
    });
    ///////////////rating///////////
    $(function () {

        $("#rateYo").rateYo({
            ratedFill: " #1c62cd",
            spacing: "7px",
            normalFill: "#c4c4c4"
        });

    });
    $('.menu__btn').on('click', function () {
        $('.menu-mobile-list').toggleClass('menu-mobile-list--active')
    });
    $('.footer__topdrop').on('click',function() {
        $(this).next().slideToggle();
        $(this).toggleClass('footer__topdrop--active');
    });
    $('.aside__btn').on('click',function() {
        $(this).next().slideToggle();
    });
});
