type InitSiteMenuOptions = {
	closeOnDesktopNav?: boolean;
};

export function initSiteMenu({ closeOnDesktopNav = true }: InitSiteMenuOptions = {}) {
	const menuRoot = document.querySelector('[data-site-menu]');
	if (!menuRoot) return;

	const menuToggle = menuRoot.querySelector('[data-menu-toggle]');
	const menuPanel = menuRoot.querySelector('[data-menu-panel]');
	const menuLabel = menuRoot.querySelector('[data-menu-label]');
	const menuCloseIcon = menuRoot.querySelector('[data-menu-close-icon]');
	if (!(menuToggle instanceof HTMLButtonElement) || !(menuPanel instanceof HTMLElement)) return;

	const desktopNavQuery = window.matchMedia('(min-width: 1024px)');
	let menuOpen = false;

	const setMenuOpen = (open: boolean, { restoreFocus = true }: { restoreFocus?: boolean } = {}) => {
		menuOpen = open;
		menuToggle.setAttribute('aria-expanded', String(open));
		menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
		menuPanel.hidden = !open;
		document.body.classList.toggle('menu-open', open);

		if (menuLabel instanceof HTMLElement) {
			menuLabel.hidden = open;
		}
		if (menuCloseIcon instanceof HTMLElement) {
			menuCloseIcon.hidden = !open;
		}

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

		if (target.closest('[data-menu-backdrop]')) {
			setMenuOpen(false);
			return;
		}

		if (target.closest('a')) {
			setMenuOpen(false, { restoreFocus: false });
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
