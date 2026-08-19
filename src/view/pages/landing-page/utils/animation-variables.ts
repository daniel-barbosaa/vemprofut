export const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" } as const,
  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
};
export const fadeLeft = {
  ...fadeUp,
  initial: { opacity: 0, x: -24 },
  whileInView: { opacity: 1, x: 0 },
};
export const fadeRight = {
  ...fadeUp,
  initial: { opacity: 0, x: 24 },
  whileInView: { opacity: 1, x: 0 },
};
