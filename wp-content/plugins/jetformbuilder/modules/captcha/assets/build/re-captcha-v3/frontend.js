! function(e) {
    const t = function(e, {
            key: t
        }, r) {
            let o = document.querySelector("script#jet-form-builder-recaptcha-js");
            const c = e.querySelector('[name="_captcha_token"]'),
                a = +e.dataset.formId;
            o || (o = document.createElement("script"), o.id = "jet-form-builder-recaptcha-js", o.src = "https://www.google.com/recaptcha/api.js?render=" + t, c.parentNode.insertBefore(o, c)), window.grecaptcha ? window.grecaptcha.execute(t, {
                action: "jet_form_builder_captcha__" + a
            }).then((function(e) {
                c.value = e, r()
            })) : r()
        },
        r = function(e, t, r) {
            const o = +e.dataset.formId,
                c = window.JetFormBuilderCaptchaConfig ? .[o] || {};
            if (!Object.values(c) ? .length) return t();
            window.JetFormBuilderCaptcha(e, c, t, r)
        };
    e((function() {
        let e;
        e = window.JetFormBuilderAbstract ? window.JetPlugins.hooks.addFilter : wp.hooks.addFilter, window.JetFormBuilderCaptcha || (window.JetFormBuilderCaptcha = t), e("jet.fb.submit.ajax.promises", "jet-form-builder-recaptcha", (function(e, t) {
            return e.push(new Promise(((e, o) => {
                r(t[0], e, o)
            }))), e
        })), e("jet.fb.submit.reload.promises", "jet-form-builder-recaptcha", (function(e, t) {
            return e.push(new Promise(((e, o) => {
                r(t.target, e, o)
            }))), e
        }))
    }))
}(jQuery);