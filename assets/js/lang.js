/* Sprachumschalter DE/EN fuer die ZU AI Club Website.
   Jeder Text steht als .de und .en im HTML; hier wird nur die Klasse am <html> gesetzt.
   Reihenfolge: ?lang=en in der URL, sonst die zuletzt gewaehlte Sprache, sonst Deutsch. */
(function () {
	var root = document.documentElement;
	var titles = {
		de: 'ZU AI Club · AI für alle, die nicht Informatik studieren',
		en: 'ZU AI Club · AI for everyone not studying computer science'
	};

	function setLang(lang) {
		root.classList.toggle('lang-en', lang === 'en');
		root.setAttribute('lang', lang);
		document.title = titles[lang];
		document.querySelectorAll('.lang-switch button').forEach(function (b) {
			var on = b.getAttribute('data-lang') === lang;
			b.classList.toggle('on', on);
			b.setAttribute('aria-pressed', on ? 'true' : 'false');
		});
		document.querySelectorAll('img[data-alt-en]').forEach(function (img) {
			if (!img.hasAttribute('data-alt-de')) img.setAttribute('data-alt-de', img.alt);
			img.alt = lang === 'en' ? img.getAttribute('data-alt-en') : img.getAttribute('data-alt-de');
		});
		try { localStorage.setItem('zuai-lang', lang); } catch (e) {}
	}

	var start = 'de';
	try {
		var q = new URLSearchParams(window.location.search).get('lang');
		var saved = localStorage.getItem('zuai-lang');
		if (q === 'de' || q === 'en') start = q;
		else if (saved === 'de' || saved === 'en') start = saved;
	} catch (e) {}

	document.querySelectorAll('.lang-switch button').forEach(function (b) {
		b.addEventListener('click', function () { setLang(b.getAttribute('data-lang')); });
	});
	setLang(start);
})();
