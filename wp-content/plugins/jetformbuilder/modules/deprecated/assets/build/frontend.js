(() => {
    var e;
    window.JetFormBuilderMain = {
        filters: (e = {}, {
            addFilter: function(r, t) {
                Boolean(window.JetFormBuilderSettings.devmode) && console.warn("This method is deprecated since JetFormBuilder 3.0.0. \nUse JetPlugins.hooks.addFilter instead."), e.hasOwnProperty(r) || (e[r] = []), e[r].push(t)
            },
            applyFilters: function(r, t, i) {
                if (!e.hasOwnProperty(r)) return t;
                void 0 === i && (i = []);
                for (var n = e[r], o = n.length, l = 0; l < o; l++) "function" == typeof n[l] && (t = n[l](t, i));
                return t
            }
        })
    }, window.JetFormBuilder = {
        getFieldValue(e) {
            const r = e.val();
            return JetFormBuilderMain.filters.applyFilters("forms/calculated-field-value", r, e)
        }
    }
})();