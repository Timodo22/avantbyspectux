(() => {
    "use strict";
    const {
        InputData: t
    } = JetFormBuilderAbstract;

    function e() {
        t.call(this), this.isSupported = function() {
            return !0
        }, this.addListeners = function() {
            t.prototype.addListeners.call(this);
            const [e] = this.nodes, i = this.getWrapperNode() ? .querySelector ? .(".jfb-eye-icon");
            i && (i.addEventListener("click", (function() {
                i.classList.toggle("seen");
                const t = "true" === this.getAttribute("aria-pressed");
                this.setAttribute("aria-pressed", !t), e.type = i.classList.contains("seen") ? "password" : "text"
            })), i.addEventListener("keydown", (function(t) {
                " " !== t.key && "Enter" !== t.key || (t.preventDefault(), this.click())
            })), i.addEventListener("keyup", (function(t) {
                " " === t.key && t.preventDefault()
            })))
        }
    }
    e.prototype = Object.create(t.prototype);
    const i = e,
        {
            BaseSignal: n
        } = JetFormBuilderAbstract;

    function s() {
        n.call(this), this.isSupported = function() {
            return !0
        }, this.runSignal = function() {
            this.input.calcValue = Number.isNaN(Number(this.input.calcValue)) ? this.input.calcValue : parseFloat(this.input.calcValue);
            const [t] = this.input.nodes;
            t.value !== this.input.value.current && (t.value = this.input.value.current, this.triggerJQuery(t))
        }
    }
    s.prototype = Object.create(n.prototype);
    const r = s,
        {
            addFilter: u
        } = JetPlugins.hooks;
    u("jet.fb.inputs", "jet-form-builder/text-field", (function(t) {
        return t.push(i), t
    }), 999), u("jet.fb.signals", "jet-form-builder/text-field", (function(t) {
        return t.push(r), t
    }), 999)
})();