export function getVisibleCount (){
    const width = window.innerWidth;
    if (width < 340) return 2;
    if (width <= 500) return 3;
    if (width <= 640) return 4;
    if (width <= 1024) return 5;
    return 7;
};