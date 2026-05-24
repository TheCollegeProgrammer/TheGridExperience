export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

export const animationPresets = {
  fadeUp: {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] },
  },
  fadeIn: {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 1.5, ease: [0.25, 0.1, 0.25, 1] },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    whileInView: { opacity: 1, scale: 1 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] },
  },
  stagger: (index: number) => ({
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.8, delay: index * 0.15, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

export const sectionClasses = {
  section: "relative w-full min-h-screen",
  inner: "relative z-10 w-full h-full px-6 md:px-12 lg:px-24",
  overlay: "absolute inset-0 z-0 cinema-overlay",
};
