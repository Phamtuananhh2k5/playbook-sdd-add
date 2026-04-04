(function () {
  var STYLE_ID = 'shared-footer-ui-style';
  var FOOTER_ID = 'footer-ui';
  var AUTHOR_TEXT = 'LinhNDM \u2014 Nguy\u1ec5n \u0110\u00ecnh M\u1ea1nh Linh';

  function injectStyle() {
    if (document.getElementById(STYLE_ID)) return;

    var style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = [
      '#footer-ui{position:fixed;left:50%;bottom:12px;transform:translateX(-50%);z-index:200;display:flex;align-items:center;gap:.55rem;pointer-events:none;background:rgba(0,12,0,.5);border:1px solid rgba(0,255,85,.2);border-radius:8px;padding:6px 10px}',
      '#footer-ui #nav,#footer-ui .nav-buttons,#footer-ui .controls{display:flex;gap:.45rem;align-items:center;pointer-events:auto;position:static !important;left:auto !important;right:auto !important;bottom:auto !important;top:auto !important;transform:none !important;background:transparent !important;border:none !important;padding:0 !important;border-radius:0 !important;box-shadow:none !important;backdrop-filter:none !important}',
      '#footer-ui .controls{position:static !important;bottom:auto !important;left:auto !important;right:auto !important;transform:none !important;padding:0 !important;border:none !important;background:transparent !important}',
      '#footer-ui #nav button,#footer-ui .nav-buttons button,#footer-ui .controls button,#footer-ui .nb,#footer-ui .nav-btn,#footer-ui .nav-arrow{background:rgba(0,255,85,.08);border:1px solid rgba(0,255,85,.25);color:#00ff55;font-family:"Josefin Sans",sans-serif;font-size:.68rem;letter-spacing:.1em;text-transform:uppercase;padding:5px 14px;cursor:pointer;transition:.2s}',
      '#footer-ui #nav button:hover,#footer-ui .nav-buttons button:hover,#footer-ui .controls button:hover,#footer-ui .nb:hover,#footer-ui .nav-btn:hover,#footer-ui .nav-arrow:hover{background:rgba(0,255,85,.18)}',
      '#footer-ui #sc,#footer-ui #slide-counter,#footer-ui #counter,#footer-ui #ctr,#footer-ui .counter{font-family:"Josefin Sans",sans-serif;font-size:.66rem;color:rgba(0,255,85,.5);letter-spacing:.1em;min-width:62px;text-align:center;position:static !important;left:auto !important;right:auto !important;bottom:auto !important;top:auto !important;transform:none !important}',
      '#footer-ui #author,#footer-ui .watermark,#footer-ui #watermark{font-family:"Josefin Sans",sans-serif;font-size:.62rem;letter-spacing:.12em;text-transform:uppercase;color:rgba(0,255,85,.35);pointer-events:none;user-select:none;position:static !important;left:auto !important;right:auto !important;bottom:auto !important;top:auto !important;transform:none !important;white-space:nowrap}',
      '@media (max-width:800px){#footer-ui{width:calc(100% - 18px);bottom:8px;gap:8px;padding:8px 10px;justify-content:center;flex-wrap:wrap}#footer-ui #nav,#footer-ui .nav-buttons,#footer-ui .controls{order:1}#footer-ui #nav button,#footer-ui .nav-buttons button,#footer-ui .controls button,#footer-ui .nb,#footer-ui .nav-btn,#footer-ui .nav-arrow{min-width:42px;min-height:42px}#footer-ui #sc,#footer-ui #slide-counter,#footer-ui #counter,#footer-ui #ctr,#footer-ui .counter{order:2;font-size:12px;letter-spacing:.08em;min-width:72px}#footer-ui #author,#footer-ui .watermark,#footer-ui #watermark{order:3;width:100%;padding:2px 0 0;text-align:center;font-size:10px;letter-spacing:.08em;color:rgba(0,255,65,.55)}}'
    ].join('');

    document.head.appendChild(style);
  }

  function first(selectors, root) {
    var scope = root || document;
    for (var i = 0; i < selectors.length; i++) {
      var found = scope.querySelector(selectors[i]);
      if (found) return found;
    }
    return null;
  }

  function createAuthor() {
    var author = document.createElement('div');
    author.id = 'author';
    author.textContent = AUTHOR_TEXT;
    return author;
  }

  function buildNavFromButtons() {
    var buttons = Array.prototype.slice.call(document.querySelectorAll('button'));
    var prev = buttons.find(function (b) {
      return /prev|\u2190|\u25c0|\u2b05/i.test((b.textContent || '').trim());
    });
    var next = buttons.find(function (b) {
      return /next|\u2192|\u25b6|\u27a1/i.test((b.textContent || '').trim());
    });

    if (!prev || !next) return null;

    var nav = document.createElement('div');
    nav.id = 'nav';
    nav.appendChild(prev);
    nav.appendChild(next);
    return nav;
  }

  function ensureFooterUI() {
    var footer = document.getElementById(FOOTER_ID);
    if (!footer) {
      footer = document.createElement('div');
      footer.id = FOOTER_ID;
    }

    var author = first(['#author', '#watermark', '.watermark']);
    if (!author) author = createAuthor();

    var counter = first(['#sc', '#slide-counter', '#counter', '#ctr', '.counter']);
    var nav = first(['#nav', '.nav-buttons', '.controls']);

    if (nav && nav.classList && nav.classList.contains('controls') && counter && nav.contains(counter)) {
      nav.removeChild(counter);
    }

    if (!nav) nav = buildNavFromButtons();
    if (!counter) {
      counter = document.createElement('div');
      counter.id = 'sc';
      counter.textContent = '';
    }

    if (nav && nav.id !== 'nav') nav.id = 'nav';

    footer.appendChild(author);
    if (nav) footer.appendChild(nav);
    footer.appendChild(counter);

    var anchor = document.body.querySelector('script');
    if (anchor) document.body.insertBefore(footer, anchor);
    else document.body.appendChild(footer);
  }

  function init() {
    injectStyle();
    ensureFooterUI();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
