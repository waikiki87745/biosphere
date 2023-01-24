/*----- Utility functions ------*/
const select = (selector) => document.querySelector(selector),
  selectAll = (selector) => document.querySelectorAll(selector);

/*----- Vars declaration ------*/
// Sections
let sections = gsap.utils.toArray(".section-container"),
  track = select(".track"),
  sHome = select("#home"),
  sChallenge = select("#the-challenge"),
  sContact = select("#work-with-us");

// Navigation
let anchors = selectAll(".nav__link");

// Animations properties
let duration = 0.6,
  easingFunction = "power3.out";

/*-------------------------------------------------------------------------------*/

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

/*------- Main navigation -------*/
// Anchor navigation
anchors.forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    let targetElem = document.querySelector(e.target.getAttribute("href")),
      y = targetElem;
    if (targetElem && track.isSameNode(targetElem.parentElement)) {
      let totalScroll = mainTl.scrollTrigger.end - mainTl.scrollTrigger.start,
        totalMovement = (sections.length - 1) * targetElem.offsetWidth;
      y = Math.round(
        mainTl.scrollTrigger.start +
          (targetElem.offsetLeft / totalMovement) * totalScroll
      );
    }
    gsap.to(window, {
      scrollTo: {
        y: y,
        autoKill: false,
      },
      duration: duration,
      ease: easingFunction,
    });
  });
});

// Anchor animation
// sections.forEach((panel, i) => {
//   ScrollTrigger.create({
//     start: "left center",
//     end: "right center",
//     markers: true,
//     onLeave: () => {
//       if (anchors[i + 1]) {
//         gsap.to(anchors[i + 1], { scale: 1.3, color: "white" });
//         gsap.to(anchors[i], { scale: 1, color: "blue" });
//       }
//     },
//     onEnterBack: () => {
//       gsap.to(anchors[i], { scale: 1.3, color: "white" });
//       if (anchors[i + 1]) {
//         gsap.to(anchors[i + 1], { scale: 1, color: "blue" });
//       }
//     }
//   });
// });

/*----- Horizontal scroll -----*/
track.style.display = "flex";
// track.style.width = sections.length * 100 + "%";

let mainTl = gsap
  .timeline({
    scrollTrigger: {
      trigger: ".track",
      pin: true,
      scrub: 1,
      start: "top top",
      snap: {
        snapTo: 1 / (sections.length - 1),
        inertia: false,
        delay: 0.1,
        // directional: false,
        duration: { min: 0.1, max: 0.8 },
      },
      end: () => "+=" + track.offsetWidth,
    },
  })
  .to(sections, {
    xPercent: -100 * (sections.length - 1),
    ease: "none",
  });

/*---- Sections animation -----*/

// Nav logo
gsap.timeline({
  scrollTrigger: {
    trigger: sHome,
    onEnter: () => {
      gsap.to(".nav__brand", { scale: 1, duration: 0, ease: "none" });
    },
    onLeave: () => {
      gsap.to(".nav__brand", {
        scale: 0.3333,
        duration: duration,
        ease: easingFunction,
      });
    },
    onEnterBack: () => {
      gsap.to(".nav__brand", {
        scale: 1,
        duration: duration,
        ease: easingFunction,
      });
    },
  },
});

// Home section
gsap
  .timeline({
    scrollTrigger: {
      trigger: sHome,
      start: "left left",
      end: "right left",
      scrub: true,
      containerAnimation: mainTl,
    },
  })
  .to(sHome, { opacity: 0 });
