"use strict";

window.addEventListener('DOMContentLoaded', () => {
    const menu = () => {
        const hamburger = document.querySelector('.hamburger'),
              menu = document.querySelector('.menu'),
              closeElem = document.querySelector('.menu__close'),
              overlay = document.querySelector('.menu__overlay');


        hamburger.addEventListener('click', () => {
            menu.classList.add('active');
            document.body.style.overflow = 'hidden';
            let scroll = calcScroll();
            document.body.style.marginRight = `${scroll}px`;
        });

        function closeMenu() {
            closeElem.addEventListener('click', () => {
                menu.classList.remove('active');
                document.body.style.overflow = '';
                document.body.style.marginRight = `0px`;
            });
            overlay.addEventListener('click', () => {
                menu.classList.remove('active');
                document.body.style.overflow = '';
                document.body.style.marginRight = `0px`;
            });
        }

        document.addEventListener('keydown', (e) => {
            if (e.code === "Escape" && menu.classList.contains('active')) {
                menu.classList.remove('active');
                document.body.style.overflow = '';
                document.body.style.marginRight = `0px`;
            }
        });

        function calcScroll() {
            let div = document.createElement('div');
    
            div.style.width = '50px';
            div.style.height = '50px';
            div.style.overflowY = 'scroll';
            div.style.visibility = 'hidden';
    
            document.body.appendChild(div);
            let scrollWidth = div.offsetWidth - div.clientWidth;
            div.remove();
    
            return scrollWidth;
        }

        closeMenu();
    }

    const accordion = (triggers, selector) => {
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

    const skillDescr = (selector, descrSelector) => {
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
        let paused = false;

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
    
        function nextBtnSlide() {
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
        }

        let timerSlide = setInterval(nextBtnSlide, 6000);

        next.addEventListener('click', () => {
            nextBtnSlide();  
        });

        slider.addEventListener('mouseenter', () => {
            clearInterval(timerSlide);
        });
        slider.addEventListener('mouseleave', () => {
            timerSlide = setInterval(nextBtnSlide, 5000);
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

    function animationTextInterval(textAnimation) {
        const title = document.querySelector(textAnimation);

        setInterval(function() {
            title.classList.remove('animate__fadeInUp');
            title.classList.toggle('animate__fast');
            title.classList.toggle('animate__flash');
        }, 5000);
    }

    function changeLang() {
        const langTrigger = document.querySelectorAll('.menu__trigger__lang');
        const langClassUa = document.querySelectorAll('.lang-ua'),
              langClassRu = document.querySelectorAll('.lang-ru');

        langClassRu.forEach(lang => {
            lang.style.display = 'none';
        });

        langTrigger.forEach((trigger, i) => {
            trigger.addEventListener('click', (e) => {
                langTrigger.forEach(item => {
                   item.classList.remove('menu__trigger__lang__active'); 
                })
                e.target.classList.add('menu__trigger__lang__active');

                if (e.target.classList.contains('language-ru')) {
                    langClassUa.forEach(lang => {
                        lang.style.display = 'none';
                        langClassRu.forEach(lang => {
                            lang.style.display = '';
                        });
                    });
                } else {
                    langClassRu.forEach(lang => {
                        lang.style.display = 'none';
                        langClassUa.forEach(lang => {
                            lang.style.display = '';
                        });
                    });
                }
            });
        })
    }

    function scrollHeightAnimation(selector) {
        function onEntry(entry) {
            entry.forEach(change => {
              if (change.isIntersecting) {
               change.target.classList.add('animate__animated', 'animate__fast', 'animate__fadeInUp');
              }
            });
          }
          
        let options = {
            threshold: [0.5] 
        };
        let observer = new IntersectionObserver(onEntry, options);
        let elements = document.querySelectorAll(selector);
        
        for (let elm of elements) {
            observer.observe(elm);
        }
    }

    menu();
    accordion('.about__skill-main-wrapper', '.about__skill-accordeon');
    scrolling('.pageup');
    skillDescr('.skill__item', '.skill__descr');
    slider({
        container: '.portfolio__slider',
        slide: '.portfolio__image',
        nextArrow: '.chevron-right',
        prevArrow: '.chevron-left',
        wrapper: '.portfolio__window',
        field: '.porfolio__field'
    });
    animationTextInterval('[data-anime]');
    changeLang();
    scrollHeightAnimation('.skill__percents');
    scrollHeightAnimation('.price');
});