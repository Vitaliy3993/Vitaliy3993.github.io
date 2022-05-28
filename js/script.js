"use strict";

window.addEventListener('DOMContentLoaded', () => {
    const menu = () => {
        const hamburger = document.querySelector('.hamburger'),
              menu = document.querySelector('.menu'),
              closeElem = document.querySelector('.menu__close'),
              overlay = document.querySelector('.menu__overlay');

        hamburger.addEventListener('click', () => {
            menu.classList.add('active');
        });

        function closeMenu() {
            closeElem.addEventListener('click', () => {
                menu.classList.remove('active');
            });
            overlay.addEventListener('click', () => {
                menu.classList.remove('active');
            });
        }

        document.addEventListener('keydown', (e) => {
            if (e.code === "Escape" && menu.classList.contains('active')) {
                menu.classList.remove('active');
            }
        });

        closeMenu();
    }

    const accordeon = (triggers, selector) => {
        const trggs = document.querySelectorAll(triggers),
              selectorName = document.querySelectorAll(selector);

        trggs.forEach((trigger, i) => {
            selectorName.forEach(sel => {
                sel.classList.add('hidden');
            });

            function openAccord() {
                selectorName[i].classList.add('active', '.animate__animated', 'animate__fadeIn');
                selectorName[i].classList.remove('hidden');
            }

            function closeAccord() {
                selectorName[i].classList.remove('active', '.animate__animated', 'animate__fadeIn');
                selectorName[i].classList.add('hidden');
            }

            trigger.addEventListener('click', () => {
                if (selectorName[i].classList.contains("hidden")) {
                    openAccord();
                } else {
                    closeAccord();
                }
            });
        });
    }

    const percents = document.querySelectorAll('.skill__percent-number'),
          blocks = document.querySelectorAll('.skill__percent-block');

    percents.forEach((item, i) => {
        blocks[i].style.width = item.innerHTML;
    });

    const scrolling = (upSelector) => {
        const upElem = document.querySelector(upSelector);
    
        window.addEventListener('scroll', () => {
            if (document.documentElement.scrollTop > 1650) {
                upElem.style.opacity = '1';
                upElem.classList.add('.animate__animated', 'animate__fadeIn');
                upElem.classList.remove('.animate__animated', 'animate__fadeInDown');
            } else {
                upElem.style.opacity = '0';
                upElem.classList.remove('.animate__animated', 'animate__fadeIn');
                upElem.classList.add('.animate__animated', 'animate__fadeInDown');
            }
        });
    
        let links = document.querySelectorAll('[href^="#"]'),
            speed = 0.2;
    
        links.forEach(link => {
            link.addEventListener('click', function(event) {
                event.preventDefault();
    
                let widthTop = document.documentElement.scrollTop,
                    hash = this.hash,
                    toBlock = document.querySelector(hash).getBoundingClientRect().top,
                    start = null;
    
                requestAnimationFrame(step);
    
                function step(time) {
                    if (start === null) {
                        start = time;
                    }
    
                    let progress = time - start,
                        r = (toBlock < 0 ? Math.max(widthTop - progress/speed, widthTop + toBlock ) : 
                        Math.min(widthTop + progress/speed, widthTop + toBlock ));
    
                    document.documentElement.scrollTo(0, r);
    
                    if (r != widthTop + toBlock) {
                        requestAnimationFrame(step);
                    } else {
                        location.hash = hash;
                    }
                }
    
            });
        });
    };

    const borderDescr = (selector, descrSelector) => {
        const select = document.querySelectorAll(selector),
              descr = document.querySelectorAll(descrSelector);

        select.forEach((sel, i) => {
            sel.addEventListener('click', () => {
                if (sel.classList.contains("border-yellow")) {
                    sel.classList.remove('border-yellow', '.animate__animated', 'animate__fadeIn');
                    descr[i].style.display = 'none';
                } else {
                    select.forEach(item => {
                        item.classList.remove('border-yellow', '.animate__animated', 'animate__fadeIn');
                    });
                    sel.classList.add('border-yellow', '.animate__animated', 'animate__fadeIn');

                    descr.forEach(item => {
                        item.style.display = 'none';
                    });
                    descr[i].style.display = 'block';
                }
                
            });
        });
    }

    $(document).ready(function(){
        $('form').submit(function(e) {
            e.preventDefault();

            $.ajax({
                type: "POST",
                url: "mailer/smart.php",
                data: $(this).serialize()
            }).done(function() {
                $(this).find("input, textarea").val("");

                $('form').trigger('reset');
            });
            console.log('done');
            return false;
        });
    });

    function slider({container, slide, nextArrow, prevArrow, wrapper, field}) {
        const slides = document.querySelectorAll(slide),
              slider = document.querySelector(container),
              prev = document.querySelector(prevArrow),
              next = document.querySelector(nextArrow),
              slidesWrapper = document.querySelector(wrapper),
              slidesField = document.querySelector(field),
              width = window.getComputedStyle(slidesWrapper).width;
    
        let offset = 0;
        let slideIndex = 1;

        slidesField.style.width = 100 * slides.length + '%';
        slidesField.style.display = 'flex';
        slidesField.style.transition = '0.5s all';
    
        // slidesWrapper.style.overflow = 'hidden';
    
        slides.forEach(slide => {
            slide.style.width = width;
        });
    
        slider.style.position = 'relative';
    
        function replaceWidth(str) {
            if (document.documentElement.offsetWidth < 600) {
                return +str.replace(/\D/g, '').slice(0, 3); 
            } else {
              return +str.replace(/\D/g, '');  
            }
            
        }
    
        next.addEventListener('click', () => {
            if (offset == parseFloat(replaceWidth(width)) * (slides.length - 1)) {
                offset = 0;
            } else {
                offset += parseFloat(replaceWidth(width));
            }
    
            slidesField.style.transform = `translateX(-${offset}px)`;
    
            if (slideIndex == slides.length) {
                slideIndex = 1;
            } else {
                slideIndex++;
            }
        });
    
        prev.addEventListener('click', () => {
            if (offset == 0) {
                offset = replaceWidth(width) * (slides.length - 1);
            } else {
                offset -= replaceWidth(width);
            }
    
            slidesField.style.transform = `translateX(-${offset}px)`;
    
            if (slideIndex == 1) {
                slideIndex = slides.length;
            } else {
                slideIndex--;
            }
        });
    }

    menu();
    accordeon('.about__skill-main-wrapper', '.about__skill-accordeon');
    scrolling('.pageup');
    borderDescr('.skill__item', '.skill__descr');
    slider({
        container: '.portfolio__slider',
        slide: '.portfolio__image',
        nextArrow: '.chevron-right',
        prevArrow: '.chevron-left',
        wrapper: '.portfolio__window',
        field: '.porfolio__field'
    });
});