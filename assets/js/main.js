(() => {
  'use strict';

  const body = document.body;
  const header = document.getElementById('site-header');
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('primary-nav');

  const closeNav = () => {
    body.classList.remove('nav-open');
    if (navToggle) {
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Buka menu navigasi');
    }
  };

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const willOpen = !body.classList.contains('nav-open');
      body.classList.toggle('nav-open', willOpen);
      navToggle.setAttribute('aria-expanded', String(willOpen));
      navToggle.setAttribute('aria-label', willOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi');
    });

    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeNav));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeNav();
    });
  }

  const currentPage = body.dataset.page;
  if (currentPage) {
    document.querySelectorAll(`[data-nav="${currentPage}"]`).forEach((link) => link.classList.add('is-active'));
  }

  const handleHeader = () => {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 16);
  };
  handleHeader();
  window.addEventListener('scroll', handleHeader, { passive: true });

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  const ministrySearch = document.getElementById('ministry-search');
  const ministryCards = Array.from(document.querySelectorAll('.ministry-card'));
  const ministryEmpty = document.getElementById('ministry-empty');
  if (ministrySearch && ministryCards.length) {
    ministrySearch.addEventListener('input', () => {
      const query = ministrySearch.value.trim().toLowerCase();
      let visible = 0;
      ministryCards.forEach((card) => {
        const haystack = `${card.dataset.search || ''} ${card.textContent}`.toLowerCase();
        const match = !query || haystack.includes(query);
        card.hidden = !match;
        if (match) visible += 1;
      });
      if (ministryEmpty) ministryEmpty.hidden = visible !== 0;
    });
  }

  const demoClose = document.querySelector('.demo-close');
  if (demoClose) {
    demoClose.addEventListener('click', () => {
      const banner = demoClose.closest('.demo-banner');
      if (banner) banner.remove();
    });
  }

  const counters = document.querySelectorAll('.counter[data-target]');
  const animateCounter = (element) => {
    const target = Number(element.dataset.target || 0);
    const duration = 1100;
    const startTime = performance.now();
    const formatter = new Intl.NumberFormat('id-ID');
    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = formatter.format(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  if (counters.length && 'IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach((counter) => counterObserver.observe(counter));
  } else {
    counters.forEach((counter) => animateCounter(counter));
  }

  const documentSearch = document.getElementById('document-search');
  const documentItems = Array.from(document.querySelectorAll('#document-list article'));
  const documentFilters = Array.from(document.querySelectorAll('[data-doc-filter]'));
  const documentEmpty = document.getElementById('document-empty');
  let activeDocumentFilter = 'all';

  const filterDocuments = () => {
    if (!documentItems.length) return;
    const query = documentSearch ? documentSearch.value.trim().toLowerCase() : '';
    let visible = 0;
    documentItems.forEach((item) => {
      const matchesCategory = activeDocumentFilter === 'all' || item.dataset.category === activeDocumentFilter;
      const haystack = `${item.dataset.title || ''} ${item.textContent}`.toLowerCase();
      const matchesSearch = !query || haystack.includes(query);
      const matches = matchesCategory && matchesSearch;
      item.hidden = !matches;
      if (matches) visible += 1;
    });
    if (documentEmpty) documentEmpty.hidden = visible !== 0;
  };

  documentFilters.forEach((button) => {
    button.addEventListener('click', () => {
      documentFilters.forEach((item) => item.classList.remove('is-active'));
      button.classList.add('is-active');
      activeDocumentFilter = button.dataset.docFilter || 'all';
      filterDocuments();
    });
  });
  if (documentSearch) documentSearch.addEventListener('input', filterDocuments);

  document.querySelectorAll('.document-list button').forEach((button) => {
    button.addEventListener('click', () => {
      const original = button.textContent;
      button.textContent = 'Demo';
      button.disabled = true;
      setTimeout(() => {
        button.textContent = original;
        button.disabled = false;
      }, 1200);
    });
  });

  const aspirationForm = document.getElementById('aspiration-form');
  if (aspirationForm) {
    const identityModeInputs = aspirationForm.querySelectorAll('input[name="identity_mode"]');
    const identityFields = document.getElementById('identity-fields');
    const identityInputs = identityFields ? identityFields.querySelectorAll('input') : [];
    const message = document.getElementById('form-message');
    const modal = document.getElementById('success-modal');
    const modalCloseButtons = modal ? modal.querySelectorAll('.modal-close, .modal-ok') : [];
    const trackingCode = document.getElementById('tracking-code');

    const setIdentityMode = () => {
      const selected = aspirationForm.querySelector('input[name="identity_mode"]:checked');
      const anonymous = selected && selected.value === 'anonymous';
      if (identityFields) identityFields.classList.toggle('is-hidden', anonymous);
      identityInputs.forEach((input) => {
        input.disabled = anonymous;
        if (anonymous) {
          input.value = '';
          input.classList.remove('is-invalid');
        }
      });
    };

    identityModeInputs.forEach((input) => input.addEventListener('change', setIdentityMode));
    setIdentityMode();

    aspirationForm.querySelectorAll('textarea[maxlength]').forEach((textarea) => {
      const counter = aspirationForm.querySelector(`.char-count[data-for="${textarea.name}"]`);
      const updateCount = () => {
        if (counter) counter.textContent = `${textarea.value.length}/${textarea.maxLength}`;
      };
      textarea.addEventListener('input', updateCount);
      updateCount();
    });

    const validateForm = () => {
      let valid = true;
      aspirationForm.querySelectorAll('[required]').forEach((field) => {
        const isRadio = field.type === 'radio';
        const isCheckbox = field.type === 'checkbox';
        let fieldValid = true;
        if (isRadio) {
          fieldValid = Boolean(aspirationForm.querySelector(`input[name="${field.name}"]:checked`));
        } else if (isCheckbox) {
          fieldValid = field.checked;
        } else {
          fieldValid = field.value.trim() !== '';
        }
        if (!fieldValid) {
          valid = false;
          if (!isRadio && !isCheckbox) field.classList.add('is-invalid');
        } else if (!isRadio && !isCheckbox) {
          field.classList.remove('is-invalid');
        }
      });
      return valid;
    };

    aspirationForm.addEventListener('input', (event) => {
      if (event.target.classList) event.target.classList.remove('is-invalid');
      if (message) message.textContent = '';
    });

    aspirationForm.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!validateForm()) {
        if (message) message.textContent = 'Lengkapi seluruh bagian wajib sebelum mengirim formulir.';
        const firstInvalid = aspirationForm.querySelector('.is-invalid');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      const serial = String(Math.floor(1000 + Math.random() * 9000));
      if (trackingCode) trackingCode.textContent = `ASP-2026-${serial}`;
      if (modal) {
        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        const closeButton = modal.querySelector('.modal-close');
        if (closeButton) closeButton.focus();
      }
      aspirationForm.reset();
      setIdentityMode();
      aspirationForm.querySelectorAll('.char-count').forEach((counter) => {
        const textarea = aspirationForm.querySelector(`textarea[name="${counter.dataset.for}"]`);
        if (textarea) counter.textContent = `0/${textarea.maxLength}`;
      });
    });

    const closeModal = () => {
      if (!modal) return;
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
    };
    modalCloseButtons.forEach((button) => button.addEventListener('click', closeModal));
    if (modal) {
      modal.addEventListener('click', (event) => {
        if (event.target === modal) closeModal();
      });
      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
      });
    }

    aspirationForm.addEventListener('reset', () => {
      setTimeout(() => {
        setIdentityMode();
        aspirationForm.querySelectorAll('.is-invalid').forEach((field) => field.classList.remove('is-invalid'));
        if (message) message.textContent = '';
      }, 0);
    });
  }
})();
