type NavigatorWithStandalone = Navigator & {
  standalone?: boolean;
};

export function useDevice() {
  const whereIsTheApplication = navigator.userAgent.toLowerCase();

  const isAndroid = /android/.test(whereIsTheApplication);

  const isIOS =
    /iphone|ipad|ipod/.test(whereIsTheApplication) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

  const isStandalone =
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as NavigatorWithStandalone).standalone === true;

  return {
    isAndroid,
    isIOS,
    isStandalone,
  };
}
