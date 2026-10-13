type InitSiteMenuOptions = {
	closeOnDesktopNav?: boolean;
};

export function initSiteMenu({ closeOnDesktopNav = true }: InitSiteMenuOptions = {}) {
	const menuRoot = document.querySelector('[data-site-menu]');
	if (!menuRoot) return;

	const menuToggle = menuRoot.querySelector('[data-menu-toggle]');
	const menuPanel = menuRoot.querySelector('[data-menu-panel]');
	if (!(menuToggle instanceof HTMLButtonElement) || !(menuPanel instanceof HTMLElement)) return;

	const desktopNavQuery = window.matchMedia('(min-width: 1024px)');
	let menuOpen = false;

	const setMenuOpen = (open: boolean, { restoreFocus = true }: { restoreFocus?: boolean } = {}) => {
		menuOpen = open;
		menuToggle.setAttribute('aria-expanded', String(open));
		menuToggle.textContent = open ? 'close' : 'menu';
		menuPanel.hidden = !open;
		document.body.classList.toggle('menu-open', open);

		document.querySelectorAll('[data-menu-inert]').forEach((el) => {
			el.toggleAttribute('inert', open);
		});

		if (!open && restoreFocus) menuToggle.focus();
	};

	menuToggle.addEventListener('click', () => {
		setMenuOpen(!menuOpen);
	});

	menuPanel.addEventListener('click', (event) => {
		const target = event.target;
		if (!(target instanceof Element)) return;
		if (target === menuPanel || target.closest('a')) {
			setMenuOpen(false, { restoreFocus: target === menuPanel });
		}
	});

	document.addEventListener('keydown', (event) => {
		if (event.key === 'Escape' && menuOpen) {
			event.preventDefault();
			setMenuOpen(false);
		}
	});

	if (closeOnDesktopNav) {
		desktopNavQuery.addEventListener('change', (event) => {
			if (event.matches && menuOpen) setMenuOpen(false, { restoreFocus: false });
		});
	}
}
