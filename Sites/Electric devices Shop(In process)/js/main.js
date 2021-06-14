$(function(){
    $('.banner-section__slider').slick({
        dots:true,
        prevArrow: '<button class="banner-section__slider-btn banner-section__slider-btnprev"><img src="img/arrow-left.png" alt="previous"> </button>',
        nextArrow: '<button class="banner-section__slider-btn banner-section__slider-btnnext"><img src="img/arrow-right.png" alt="next"> </button>',
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    arrows: false,
                    adaptiveHeight: true,
                    infinite: true,
                    speed: 300
                }
            }
        ]
    });
    $('.product-slider').slick({
        slidesToShow:4,
        slidesToScroll:1,
        prevArrow: '<button class="product-slider__slider-btn product-slider__slider-btnprev"><img src="img/arrow-black-left.png" alt="previous"> </button>',
        nextArrow: '<button class="product-slider__slider-btn product-slider__slider-btnnext"><img src="img/arrow-black-right.png" alt="next"> </button>',
    });
    var el = document.getElementById('#dataholder');
    });

