const hasScrollOptionsSupport =
  typeof document !== "undefined" &&
  "scrollBehavior" in document.documentElement.style;

const scrollToCurrent = (position: number) => {
  window.scrollTo({
    behavior: "smooth",
    top: position,
  });
};

const scrollToLegacy = (position: number) => {
  window.scrollTo(0, position);
};

const scrollTo = hasScrollOptionsSupport ? scrollToCurrent : scrollToLegacy;

export const smoothScrollToTarget = (targetId: string, offset = 0) => {
  const targetElement = document.getElementById(targetId.replace("#", ""));
  if (targetElement) {
    const top = targetElement.getBoundingClientRect().top + window.scrollY;
    scrollTo(top - offset);
    targetElement.focus({preventScroll: true});
  }
};
