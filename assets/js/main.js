document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger, SplitText, Draggable, DrawSVGPlugin);

  // ScrollTrigger.defaults({
  //   markers: true,
  // });

  //Loader
  function loaderAnimation() {
    const shapes = document.querySelectorAll(".loader-shape");
    const loader = document.querySelector(".loader");

    gsap.set(shapes, {
      drawSVG: "0%",
    });

    let loaderAnimation = gsap.to(loader, {
      paused: true,
      y: "-100%",
      duration: 1,
      ease: "circ.out",
    });

    gsap.to(shapes, {
      drawSVG: "100%",
      duration: 2,

      onComplete: () => {
        loaderAnimation.play();
      },
    });
  }

  loaderAnimation();

  //Logo Scale
  function heroAnimation() {
    const hero = document.querySelector(".hero");
    const targetElement = document.querySelector(".nav_logo");

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "bottom top",
        scrub: 0.8,
      },
    });
    tl.from(targetElement, {
      y: "-150%",
      width: "135%",
      duration: 1,
    });

    return tl;
  }

  heroAnimation();

  // Intro moves
  function introAnimation() {
    const introText = document.querySelector(".intro-text");

    const splitText = new SplitText(introText, {
      type: "lines",
    });

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: introText,
        start: "-200% top",
        end: "10% top",
        scrub: 0.8,
      },
    });

    tl.from(splitText.lines, {
      duration: 0.1,
      opacity: 0,
      rotate: 2,
      y: 20,
      stagger: 0.02,
    });
  }

  introAnimation();

  //Picture circle
  function circlePicture() {
    const circleSticky = document.querySelector(".sticky-image_wrap");
    const stickyItem = document.querySelector(".sticky-item");

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: circleSticky,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
    });
    tl.fromTo(
      stickyItem,
      {
        width: "35em",
        height: "35em",
        borderRadius: "35em",
        duration: 1,
      },
      {
        width: "100vw",
        height: "100vh",
        borderRadius: "0em",
        duration: 1,
      }
    );
  }

  circlePicture();

  //Quote
  const dragArea = document.querySelector(".image-hover-wrapper");
  const rectItems = document.querySelectorAll(".rectangle");

  Draggable.create(rectItems, {
    bounds: dragArea,
    onDragStart: () => {
      console.log("comenzamos drag");
    },
    onDrag: () => {
      console.log("estams draggeando");
    },
    onThrowUpdate: () => {
      console.log("cuando para la inercia");
    },
    onDragEnd: () => {
      console.log("dejamos de hacer drag");
    },
  });

  //Highlights-Timeline

  const timelineItems = document.querySelectorAll(".timeline-item");

  timelineItems.forEach(function (timelineItem) {
    let timelineText = timelineItem.querySelector(".timeline-title.is-1");
    let timelineText2 = timelineItem.querySelector(".timeline-title.is-2");

    if (timelineText && timelineText2) {
      let tl = gsap.timeline({
        paused: true,
        overwrite: true,
      });

      const splittimelineText = new SplitText(timelineText, {
        type: "chars",
      });

      const splittimelineText2 = new SplitText(timelineText2, {
        type: "chars",
      });

      tl.to(splittimelineText.chars, {
        y: "-120%",
        color: "blue",
        stagger: { each: 0.015 },
        ease: "power2.inOut",
        duration: 0.5,
      });
      tl.from(
        splittimelineText2.chars,
        {
          y: "120%",
          color: "blue",
          stagger: { each: 0.015 },
          ease: "power2.inOut",
          duration: 0.5,
        },
        0
      );

      timelineItem.addEventListener("mouseenter", function () {
        tl.restart();
      });
      timelineItem.addEventListener("mouseleave", function () {
        tl.reverse();
      });
    }
  });

  // Reveal images
  const workItems = document.querySelectorAll(".work-item");

  gsap.registerPlugin(ScrollTrigger);

  workItems.forEach((workItem) => {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: workItem,
        start: "top center",
        toggleActions: "play pause resume reverse",
      },
    });

    const cover = workItem.querySelector(".cover");

    tl.to(workItem, {
      borderColor: "white",
    }).to(cover, {
      width: "0%",
    });
  });

  //Footer

  function footerSroll() {
    const footerInfo = document.querySelector(".footer-info");
    const widthfooterInfo = footerInfo.offsetWidth;
    const viewportWidth = window.innerWidth;
    console.log(widthfooterInfo);

    const footerHeight = document.querySelector(".footer-wrapper").offsetHeight;

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: footerInfo,
        pin: true,
        start: "center center",
        end: footerHeight,
        scrub: 100,
        markers: true,
      },
    });

    tl.to(footerInfo, {
      x: -widthfooterInfo + viewportWidth,
    });
  }

  footerSroll();
});
