(function () {
  function isChapterPage() {
    return /\/\d+\/index\.html$/i.test(window.location.pathname);
  }

  function findCounter() {
    return (
      document.getElementById('sc') ||
      document.getElementById('slide-counter') ||
      document.getElementById('counter') ||
      document.getElementById('ctr') ||
      null
    );
  }

  function parseCounter(text) {
    var m = String(text || '').match(/(\d+)\s*\/\s*(\d+)/);
    if (!m) return null;
    return { current: Number(m[1]), total: Number(m[2]) };
  }

  function isLastSlide() {
    var counter = findCounter();
    if (!counter) return false;
    var parsed = parseCounter(counter.textContent);
    if (!parsed) return false;
    return parsed.current >= parsed.total;
  }

  function findNextButton() {
    var byId =
      document.getElementById('next') ||
      document.getElementById('btn-next') ||
      document.getElementById('nextBtn') ||
      document.getElementById('next-btn');
    if (byId) return byId;

    var buttons = Array.prototype.slice.call(document.querySelectorAll('button'));
    return buttons.find(function (b) {
      return /next|\u2192|\u25b6|\u27a1/i.test((b.textContent || '').trim());
    }) || null;
  }

  function goMenuSlide2() {
    window.location.href = '../menu.html#slide=2';
  }

  function syncNextButton() {
    var nextBtn = findNextButton();
    if (!nextBtn) return;

    if (isLastSlide()) {
      if (!nextBtn.dataset.menuOrigLabel) {
        nextBtn.dataset.menuOrigLabel = nextBtn.textContent || 'Next';
      }
      nextBtn.textContent = 'Menu ->';
      nextBtn.disabled = false;
      nextBtn.dataset.menuMode = '1';
    } else if (nextBtn.dataset.menuMode === '1') {
      nextBtn.textContent = nextBtn.dataset.menuOrigLabel || 'Next';
      nextBtn.dataset.menuMode = '';
    }
  }

  function bindHandlers() {
    document.addEventListener(
      'click',
      function (e) {
        var nextBtn = findNextButton();
        if (!nextBtn) return;
        if (e.target !== nextBtn) return;
        if (!isLastSlide()) return;
        e.preventDefault();
        e.stopPropagation();
        goMenuSlide2();
      },
      true
    );

    document.addEventListener(
      'keydown',
      function (e) {
        if (!isLastSlide()) return;
        if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
          e.preventDefault();
          e.stopPropagation();
          goMenuSlide2();
        }
      },
      true
    );
  }

  function init() {
    if (!isChapterPage()) return;
    bindHandlers();
    setInterval(syncNextButton, 200);
    syncNextButton();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
