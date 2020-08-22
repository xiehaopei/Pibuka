(function() {
  window.onresize = function() {
    resize();
  };
  function resize() {
    const baseFontSize = 100; //100px --> 1rem，设计稿100px相当于1rem
    const designWidth = 750; //设计稿宽度，750px相当于7.5rem
    const width = window.innerWidth; //屏幕宽度
    const currentFontSize = (width / designWidth) * baseFontSize;
    document.querySelector('html').style.fontSize = currentFontSize + 'px';
  }
  document.addEventListener('DOMContentLoaded', resize);
})();
