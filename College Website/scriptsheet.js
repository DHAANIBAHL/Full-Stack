
const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('main-nav');
navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
});

(function () {
    const form = document.getElementById('contact-form');
    const status = document.getElementById('form-status');

    const fields = {
    name: {
        el: document.getElementById('name'),
        validate: (value) => {
        if (value.trim().length === 0) return 'Enter your full name.';
        if (value.trim().length < 2) return 'That name looks too short.';
        return '';
        }
    },
    email: {
        el: document.getElementById('email'),
        validate: (value) => {
        if (value.trim().length === 0) return 'Enter your email address.';
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!pattern.test(value.trim())) return 'Enter a valid email address, like name@example.com.';
        return '';
        }
    },
    message: {
        el: document.getElementById('message'),
        validate: (value) => {
        if (value.trim().length === 0) return 'Enter a message.';
        if (value.trim().length < 10) return 'Say a bit more — at least 10 characters.';
        return '';
        }
    }
    };

    function setFieldError(name, message) {
    const { el } = fields[name];
    const errorEl = document.getElementById(name + '-error');
    if (message) {
        errorEl.textContent = message;
        el.classList.add('has-error');
        el.setAttribute('aria-invalid', 'true');
    } else {
        errorEl.textContent = '';
        el.classList.remove('has-error');
        el.removeAttribute('aria-invalid');
    }
    }

    function validateField(name) {
    const { el, validate } = fields[name];
    const message = validate(el.value);
    setFieldError(name, message);
    return message === '';
    }

    Object.keys(fields).forEach((name) => {
    const { el } = fields[name];
    el.addEventListener('blur', () => validateField(name));
    el.addEventListener('input', () => {
        if (el.classList.contains('has-error')) validateField(name);
    });
    });

    form.addEventListener('submit', function (event) {
    event.preventDefault();

    const results = Object.keys(fields).map(validateField);
    const isValid = results.every(Boolean);

    if (!isValid) {
        status.textContent = 'Please fix the highlighted fields before sending.';
        status.className = 'form-status form-status-error';
        const firstInvalidName = Object.keys(fields).find(
        (name) => !fields[name].el.checkValidity || fields[name].el.classList.contains('has-error')
        );
        if (firstInvalidName) fields[firstInvalidName].el.focus();
        return;
    }

    status.textContent = 'Thanks — your message has been sent. Admissions will follow up within two business days.';
    status.className = 'form-status form-status-success';
    form.reset();
    Object.keys(fields).forEach((name) => setFieldError(name, ''));
    });
})();
