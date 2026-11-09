(function () {
  var skills = window.SKILLS || [];
  var ledger = document.getElementById('ledger');
  var filters = document.getElementById('filters');
  var stars = {};
  var current = 'Tất cả';

  function fmt(n) { return typeof n === 'number' ? n.toLocaleString('vi-VN') : '—'; }
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  function render() {
    ledger.textContent = '';
    var list = skills.filter(function (s) { return current === 'Tất cả' || s.topic === current; });
    if (!list.length) { ledger.appendChild(el('li', 'empty', 'Chưa có skill nào trong chủ đề này.')); return; }
    list.forEach(function (s, i) {
      var li = el('li');
      li.style.animationDelay = (i * 40) + 'ms';
      var name = el('div', 'name');
      var a = el('a', null, s.repo.split('/')[1]);
      a.href = 'https://github.com/' + s.repo;
      a.rel = 'noopener';
      name.appendChild(a);
      name.appendChild(el('small', null, s.repo.split('/')[0] + ' · ' + s.topic));
      var meta = el('div', 'meta');
      meta.appendChild(el('span', 'stars', fmt(stars[s.repo]) + ' sao'));
      meta.appendChild(el('span', 'lic', s.license));
      li.appendChild(name);
      li.appendChild(el('p', null, s.desc));
      li.appendChild(meta);
      ledger.appendChild(li);
    });
  }

  function buildFilters() {
    var topics = ['Tất cả'].concat(skills.map(function (s) { return s.topic; })
      .filter(function (t, i, a) { return a.indexOf(t) === i; }));
    topics.forEach(function (t) {
      var b = el('button', null, t);
      b.type = 'button';
      b.setAttribute('aria-pressed', String(t === current));
      b.addEventListener('click', function () {
        current = t;
        filters.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
        render();
      });
      filters.appendChild(b);
    });
  }

  function loadStars() {
    skills.forEach(function (s) {
      fetch('https://api.github.com/repos/' + s.repo)
        .then(function (r) { return r.ok ? r.json() : null; })
        .then(function (d) { if (d) { stars[s.repo] = d.stargazers_count; render(); } })
        .catch(function () {});
    });
  }

  buildFilters();
  render();
  loadStars();
})();
