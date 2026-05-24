import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function animateFrom(
  target: string | Element,
  vars: gsap.TweenVars,
  trigger?: string | Element
) {
  return gsap.from(target, {
    ...vars,
    scrollTrigger: trigger
      ? { trigger, start: "top 85%", toggleActions: "play none none reverse" }
      : undefined,
  });
}

export function animateTo(
  target: string | Element,
  vars: gsap.TweenVars,
  trigger?: string | Element
) {
  return gsap.to(target, {
    ...vars,
    scrollTrigger: trigger
      ? { trigger, start: "top 85%", toggleActions: "play none none reverse" }
      : undefined,
  });
}

export function parallaxFactory(
  target: string | Element,
  speed: number = 0.3
) {
  return gsap.to(target, {
    y: () => window.innerHeight * speed,
    ease: "none",
    scrollTrigger: {
      trigger: target as Element,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
}

export function createTimeline(trigger: string | Element) {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger,
      start: "top 80%",
      end: "bottom 20%",
      scrub: 1,
    },
  });
  return tl;
}
