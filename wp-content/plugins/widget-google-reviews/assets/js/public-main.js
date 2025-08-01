var rpi = rpi || {};
rpi.Time = {
    getTime: function(a, c, f) {
        return "chat" == f ? this.getChatTime(a, c || "en") : f ? this.getFormatTime(a, f, c || "en") : this.getDefaultTime(a, c || "en")
    },
    getChatTime: function(a, c) {
        var f = ((new Date).getTime() - a) / 1E3 / 60 / 60,
            h = f / 24;
        return 24 > f ? this.getFormatTime(a, "HH:mm", c) : 365 > h ? this.getFormatTime(a, "dd.MM HH:mm", c) : this.getFormatTime(a, "yyyy.MM.dd HH:mm", c)
    },
    getDefaultTime: function(a, c) {
        return this.getTimeAgo(a, c)
    },
    getTimeAgo: function(a, c) {
        a = ((new Date).getTime() - a) / 1E3;
        var f = a / 60,
            h = f / 60,
            e = h / 24,
            k = e / 365;
        c = rpi.Time.Messages[c] ?
            c : "en";
        return 45 > a ? rpi.Time.Messages[c].second : 90 > a ? rpi.Time.Messages[c].minute : 45 > f ? rpi.Time.Messages[c].minutes(f) : 90 > f ? rpi.Time.Messages[c].hour : 24 > h ? rpi.Time.Messages[c].hours(h) : 48 > h ? rpi.Time.Messages[c].day : 30 > e ? rpi.Time.Messages[c].days(e) : 60 > e ? rpi.Time.Messages[c].month : 365 > e ? rpi.Time.Messages[c].months(e) : 2 > k ? rpi.Time.Messages[c].year : rpi.Time.Messages[c].years(k)
    },
    getTime12: function(a, c) {
        a = new Date(a);
        return (a.getHours() % 12 ? a.getHours() % 12 : 12) + ":" + a.getMinutes() + (12 <= a.getHours() ? " PM" :
            " AM")
    },
    getFormatTime: function(a, c, f) {
        var h = new Date(a),
            e = {
                SS: h.getMilliseconds(),
                ss: h.getSeconds(),
                mm: h.getMinutes(),
                HH: h.getHours(),
                hh: (h.getHours() % 12 ? h.getHours() % 12 : 12) + (12 <= h.getHours() ? "PM" : "AM"),
                dd: h.getDate(),
                MM: h.getMonth() + 1,
                yyyy: h.getFullYear(),
                yy: String(h.getFullYear()).toString().substr(2, 2),
                ago: this.getTimeAgo(a, f),
                12: this.getTime12(a, f)
            };
        return c.replace(/(SS|ss|mm|HH|hh|DD|dd|MM|yyyy|yy|ago|12)/g, function(k, m) {
            k = e[m];
            return 10 > k ? "0" + k : k
        })
    },
    declineNum: function(a, c, f, h) {
        return a + " " +
            this.declineMsg(a, c, f, h)
    },
    declineMsg: function(a, c, f, h, e) {
        var k = a % 10;
        return 1 == k && (1 == a || 20 < a) ? c : 1 < k && 5 > k && (20 < a || 10 > a) ? f : a ? h : e
    }
};
rpi.Time.Messages = {
    ru: {
        second: "\u0442\u043e\u043b\u044c\u043a\u043e \u0447\u0442\u043e",
        minute: "\u043c\u0438\u043d\u0443\u0442\u0443 \u043d\u0430\u0437\u0430\u0434",
        minutes: function(a) {
            return rpi.Time.declineNum(Math.round(a), "\u043c\u0438\u043d\u0443\u0442\u0430 \u043d\u0430\u0437\u0430\u0434", "\u043c\u0438\u043d\u0443\u0442\u044b \u043d\u0430\u0437\u0430\u0434", "\u043c\u0438\u043d\u0443\u0442 \u043d\u0430\u0437\u0430\u0434")
        },
        hour: "\u0447\u0430\u0441 \u043d\u0430\u0437\u0430\u0434",
        hours: function(a) {
            return rpi.Time.declineNum(Math.round(a),
                "\u0447\u0430\u0441 \u043d\u0430\u0437\u0430\u0434", "\u0447\u0430\u0441\u0430 \u043d\u0430\u0437\u0430\u0434", "\u0447\u0430\u0441\u043e\u0432 \u043d\u0430\u0437\u0430\u0434")
        },
        day: "\u0434\u0435\u043d\u044c \u043d\u0430\u0437\u0430\u0434",
        days: function(a) {
            return rpi.Time.declineNum(Math.round(a), "\u0434\u0435\u043d\u044c \u043d\u0430\u0437\u0430\u0434", "\u0434\u043d\u044f \u043d\u0430\u0437\u0430\u0434", "\u0434\u043d\u0435\u0439 \u043d\u0430\u0437\u0430\u0434")
        },
        month: "\u043c\u0435\u0441\u044f\u0446 \u043d\u0430\u0437\u0430\u0434",
        months: function(a) {
            return rpi.Time.declineNum(Math.floor(a / 30), "\u043c\u0435\u0441\u044f\u0446 \u043d\u0430\u0437\u0430\u0434", "\u043c\u0435\u0441\u044f\u0446\u0430 \u043d\u0430\u0437\u0430\u0434", "\u043c\u0435\u0441\u044f\u0446\u0435\u0432 \u043d\u0430\u0437\u0430\u0434")
        },
        year: "\u0433\u043e\u0434 \u043d\u0430\u0437\u0430\u0434",
        years: function(a) {
            return rpi.Time.declineNum(Math.round(a), "\u0433\u043e\u0434 \u043d\u0430\u0437\u0430\u0434", "\u0433\u043e\u0434\u0430 \u043d\u0430\u0437\u0430\u0434",
                "\u043b\u0435\u0442 \u043d\u0430\u0437\u0430\u0434")
        }
    },
    en: {
        second: "just now",
        minute: "1m ago",
        minutes: function(a) {
            return Math.round(a) + "m ago"
        },
        hour: "1h ago",
        hours: function(a) {
            return Math.round(a) + "h ago"
        },
        day: "a day ago",
        days: function(a) {
            return Math.round(a) + " days ago"
        },
        month: "a month ago",
        months: function(a) {
            return Math.floor(a / 30) + " months ago"
        },
        year: "a year ago",
        years: function(a) {
            return Math.round(a) + " years ago"
        }
    },
    uk: {
        second: "\u0442\u0456\u043b\u044c\u043a\u0438 \u0449\u043e",
        minute: "\u0445\u0432\u0438\u043b\u0438\u043d\u0443 \u0442\u043e\u043c\u0443",
        minutes: function(a) {
            return rpi.Time.declineNum(Math.round(a), "\u0445\u0432\u0438\u043b\u0438\u043d\u0443 \u0442\u043e\u043c\u0443", "\u0445\u0432\u0438\u043b\u0438\u043d\u0438 \u0442\u043e\u043c\u0443", "\u0445\u0432\u0438\u043b\u0438\u043d \u0442\u043e\u043c\u0443")
        },
        hour: "\u0433\u043e\u0434\u0438\u043d\u0443 \u0442\u043e\u043c\u0443",
        hours: function(a) {
            return rpi.Time.declineNum(Math.round(a), "\u0433\u043e\u0434\u0438\u043d\u0443 \u0442\u043e\u043c\u0443", "\u0433\u043e\u0434\u0438\u043d\u0438 \u0442\u043e\u043c\u0443",
                "\u0433\u043e\u0434\u0438\u043d \u0442\u043e\u043c\u0443")
        },
        day: "\u0434\u0435\u043d\u044c \u0442\u043e\u043c\u0443",
        days: function(a) {
            return rpi.Time.declineNum(Math.round(a), "\u0434\u0435\u043d\u044c \u0442\u043e\u043c\u0443", "\u0434\u043d\u0456 \u0442\u043e\u043c\u0443", "\u0434\u043d\u0456\u0432 \u0442\u043e\u043c\u0443")
        },
        month: "\u043c\u0456\u0441\u044f\u0446\u044c \u0442\u043e\u043c\u0443",
        months: function(a) {
            return rpi.Time.declineNum(Math.floor(a / 30), "\u043c\u0456\u0441\u044f\u0446\u044c \u0442\u043e\u043c\u0443",
                "\u043c\u0456\u0441\u044f\u0446\u0456 \u0442\u043e\u043c\u0443", "\u043c\u0456\u0441\u044f\u0446\u0456\u0432 \u0442\u043e\u043c\u0443")
        },
        year: "\u0440\u0456\u043a \u0442\u043e\u043c\u0443",
        years: function(a) {
            return rpi.Time.declineNum(Math.round(a), "\u0440\u0456\u043a \u0442\u043e\u043c\u0443", "\u0440\u043e\u043a\u0438 \u0442\u043e\u043c\u0443", "\u0440\u043e\u043a\u0456\u0432 \u0442\u043e\u043c\u0443")
        }
    },
    ro: {
        second: "chiar acum",
        minute: "\u00een urm\u0103 minut",
        minutes: function(a) {
            return rpi.Time.declineNum(Math.round(a),
                "o minuta in urma", "minute in urma", "de minute in urma")
        },
        hour: "acum o ora",
        hours: function(a) {
            return rpi.Time.declineNum(Math.round(a), "acum o ora", "ore in urma", "de ore in urma")
        },
        day: "o zi in urma",
        days: function(a) {
            return rpi.Time.declineNum(Math.round(a), "o zi in urma", "zile in urma", "de zile in urma")
        },
        month: "o luna in urma",
        months: function(a) {
            return rpi.Time.declineNum(Math.floor(a / 30), "o luna in urma", "luni in urma", "de luni in urma")
        },
        year: "un an in urma",
        years: function(a) {
            return rpi.Time.declineNum(Math.round(a),
                "un an in urma", "ani in urma", "de ani in urma")
        }
    },
    lv: {
        second: "Maz\u0101k par min\u016bti",
        minute: "Pirms min\u016btes",
        minutes: function(a) {
            return rpi.Time.declineNum(Math.round(a), "pirms min\u016btes", "pirms min\u016bt\u0113m", "pirms min\u016bt\u0113m")
        },
        hour: "pirms stundas",
        hours: function(a) {
            return rpi.Time.declineNum(Math.round(a), "pirms stundas", "pirms stund\u0101m", "pirms stund\u0101m")
        },
        day: "pirms dienas",
        days: function(a) {
            return rpi.Time.declineNum(Math.round(a), "pirms dienas", "pirms dien\u0101m",
                "pirms dien\u0101m")
        },
        month: "pirms m\u0113ne\u0161a",
        months: function(a) {
            return rpi.Time.declineNum(Math.floor(a / 30), "pirms m\u0113ne\u0161a", "pirms m\u0113ne\u0161iem", "pirms m\u0113ne\u0161iem")
        },
        year: "pirms gada",
        years: function(a) {
            return rpi.Time.declineNum(Math.round(a), "pirms gada", "pirms gadiem", "pirms gadiem")
        }
    },
    lt: {
        second: "k\u0105 tik",
        minute: "prie\u0161 minut\u0119",
        minutes: function(a) {
            return rpi.Time.declineNum(Math.round(a), "minut\u0117 prie\u0161", "minut\u0117s prie\u0161", "minu\u010di\u0173 prie\u0161")
        },
        hour: "prie\u0161 valand\u0105",
        hours: function(a) {
            return rpi.Time.declineNum(Math.round(a), "valanda prie\u0161", "valandos prie\u0161", "valand\u0173 prie\u0161")
        },
        day: "prie\u0161 dien\u0105",
        days: function(a) {
            return rpi.Time.declineNum(Math.round(a), "diena prie\u0161", "dienos prie\u0161", "dien\u0173 prie\u0161")
        },
        month: "prie\u0161 m\u0117nes\u012f",
        months: function(a) {
            return rpi.Time.declineNum(Math.floor(a / 30), "m\u0117nes\u012f prie\u0161", "m\u0117nesiai prie\u0161", "m\u0117nesi\u0173 prie\u0161")
        },
        year: "prie\u0161 metus",
        years: function(a) {
            return rpi.Time.declineNum(Math.round(a), "metai prie\u0161", "metai prie\u0161", "met\u0173 prie\u0161")
        }
    },
    kk: {
        second: "\u0431\u0456\u0440 \u043c\u0438\u043d\u0443\u0442\u0442\u0430\u043d \u0430\u0437 \u0443\u0430\u049b\u044b\u0442 \u0431\u04b1\u0440\u044b\u043d",
        minute: "\u0431\u0456\u0440 \u043c\u0438\u043d\u0443\u0442 \u0431\u04b1\u0440\u044b\u043d",
        minutes: function(a) {
            return rpi.Time.declineNum(Math.round(a), "\u043c\u0438\u043d\u0443\u0442 \u0431\u04b1\u0440\u044b\u043d",
                "\u043c\u0438\u043d\u0443\u0442 \u0431\u04b1\u0440\u044b\u043d", "\u043c\u0438\u043d\u0443\u0442 \u0431\u04b1\u0440\u044b\u043d")
        },
        hour: "\u0431\u0456\u0440 \u0441\u0430\u0493\u0430\u0442 \u0431\u04b1\u0440\u044b\u043d",
        hours: function(a) {
            return rpi.Time.declineNum(Math.round(a), "\u0441\u0430\u0493\u0430\u0442 \u0431\u04b1\u0440\u044b\u043d", "\u0441\u0430\u0493\u0430\u0442 \u0431\u04b1\u0440\u044b\u043d", "\u0441\u0430\u0493\u0430\u0442 \u0431\u04b1\u0440\u044b\u043d")
        },
        day: "\u0431\u0456\u0440 \u043a\u04af\u043d \u0431\u04b1\u0440\u044b\u043d",
        days: function(a) {
            return rpi.Time.declineNum(Math.round(a), "\u043a\u04af\u043d \u0431\u04b1\u0440\u044b\u043d", "\u043a\u04af\u043d \u0431\u04b1\u0440\u044b\u043d", "\u043a\u04af\u043d \u0431\u04b1\u0440\u044b\u043d")
        },
        month: "\u0431\u0456\u0440 \u0430\u0439 \u0431\u04b1\u0440\u044b\u043d",
        months: function(a) {
            return rpi.Time.declineNum(Math.floor(a / 30), "\u0430\u0439 \u0431\u04b1\u0440\u044b\u043d", "\u0430\u0439 \u0431\u04b1\u0440\u044b\u043d", "\u0430\u0439 \u0431\u04b1\u0440\u044b\u043d")
        },
        year: "\u0431\u0456\u0440 \u0436\u044b\u043b \u0431\u04b1\u0440\u044b\u043d",
        years: function(a) {
            return rpi.Time.declineNum(Math.round(a), "\u0436\u044b\u043b \u0431\u04b1\u0440\u044b\u043d", "\u0436\u044b\u043b \u0431\u04b1\u0440\u044b\u043d", "\u0436\u044b\u043b \u0431\u04b1\u0440\u044b\u043d")
        }
    },
    ka: {
        second: "\u10ec\u10d0\u10db\u10d8\u10e1 \u10ec\u10d8\u10dc",
        minute: "\u10ec\u10e3\u10d7\u10d8\u10e1 \u10ec\u10d8\u10dc",
        minutes: function(a) {
            return rpi.Time.declineNum(Math.round(a), "\u10ec\u10e3\u10d7\u10d8\u10e1 \u10ec\u10d8\u10dc", "\u10ec\u10e3\u10d7\u10d8\u10e1 \u10ec\u10d8\u10dc",
                "\u10ec\u10e3\u10d7\u10d8\u10e1 \u10ec\u10d8\u10dc")
        },
        hour: "\u10e1\u10d0\u10d0\u10d7\u10d8\u10e1 \u10ec\u10d8\u10dc",
        hours: function(a) {
            return rpi.Time.declineNum(Math.round(a), "\u10e1\u10d0\u10d0\u10d7\u10d8\u10e1 \u10ec\u10d8\u10dc", "\u10e1\u10d0\u10d0\u10d7\u10d8\u10e1 \u10ec\u10d8\u10dc", "\u10e1\u10d0\u10d0\u10d7\u10d8\u10e1 \u10ec\u10d8\u10dc")
        },
        day: "\u10d3\u10e6\u10d8\u10e1 \u10ec\u10d8\u10dc",
        days: function(a) {
            return rpi.Time.declineNum(Math.round(a), "\u10d3\u10e6\u10d8\u10e1 \u10ec\u10d8\u10dc",
                "\u10d3\u10e6\u10d8\u10e1 \u10ec\u10d8\u10dc", "\u10d3\u10e6\u10d8\u10e1 \u10ec\u10d8\u10dc")
        },
        month: "\u10d7\u10d5\u10d8\u10e1 \u10ec\u10d8\u10dc",
        months: function(a) {
            return rpi.Time.declineNum(Math.floor(a / 30), "\u10d7\u10d5\u10d8\u10e1 \u10ec\u10d8\u10dc", "\u10d7\u10d5\u10d8\u10e1 \u10ec\u10d8\u10dc", "\u10d7\u10d5\u10d8\u10e1 \u10ec\u10d8\u10dc")
        },
        year: "\u10ec\u10da\u10d8\u10e1 \u10ec\u10d8\u10dc",
        years: function(a) {
            return rpi.Time.declineNum(Math.round(a), "\u10ec\u10da\u10d8\u10e1 \u10ec\u10d8\u10dc",
                "\u10ec\u10da\u10d8\u10e1 \u10ec\u10d8\u10dc", "\u10ec\u10da\u10d8\u10e1 \u10ec\u10d8\u10dc")
        }
    },
    hy: {
        second: "\u0574\u056b \u0584\u0576\u056b \u057e\u0561\u0575\u0580\u056f\u0575\u0561\u0576 \u0561\u057c\u0561\u057b",
        minute: "\u0574\u0565\u056f \u0580\u0578\u057a\u0565 \u0561\u057c\u0561\u057b",
        minutes: function(a) {
            return rpi.Time.declineNum(Math.round(a), "\u0580\u0578\u057a\u0565 \u0561\u057c\u0561\u057b", "\u0580\u0578\u057a\u0565 \u0561\u057c\u0561\u057b", "\u0580\u0578\u057a\u0565 \u0561\u057c\u0561\u057b")
        },
        hour: "\u0574\u0565\u056f \u056a\u0561\u0574 \u0561\u057c\u0561\u057b",
        hours: function(a) {
            return rpi.Time.declineNum(Math.round(a), "\u056a\u0561\u0574 \u0561\u057c\u0561\u057b", "\u056a\u0561\u0574 \u0561\u057c\u0561\u057b", "\u056a\u0561\u0574 \u0561\u057c\u0561\u057b")
        },
        day: "\u0574\u0565\u056f \u0585\u0580 \u0561\u057c\u0561\u057b",
        days: function(a) {
            return rpi.Time.declineNum(Math.round(a), "\u0585\u0580 \u0561\u057c\u0561\u057b", "\u0585\u0580 \u0561\u057c\u0561\u057b", "\u0585\u0580 \u0561\u057c\u0561\u057b")
        },
        month: "\u0574\u0565\u056f \u0561\u0574\u056b\u057d \u0561\u057c\u0561\u057b",
        months: function(a) {
            return rpi.Time.declineNum(Math.floor(a / 30), "\u0561\u0574\u056b\u057d \u0561\u057c\u0561\u057b", "\u0561\u0574\u056b\u057d \u0561\u057c\u0561\u057b", "\u0561\u0574\u056b\u057d \u0561\u057c\u0561\u057b")
        },
        year: "\u0574\u0565\u056f \u057f\u0561\u0580\u056b \u0561\u057c\u0561\u057b",
        years: function(a) {
            return rpi.Time.declineNum(Math.round(a), "\u057f\u0561\u0580\u056b \u0561\u057c\u0561\u057b", "\u057f\u0561\u0580\u056b \u0561\u057c\u0561\u057b",
                "\u057f\u0561\u0580\u056b \u0561\u057c\u0561\u057b")
        }
    },
    fr: {
        second: "tout \u00e0 l'heure",
        minute: "environ une minute",
        minutes: function(a) {
            return Math.round(a) + " minutes"
        },
        hour: "environ une heure",
        hours: function(a) {
            return "environ " + Math.round(a) + " heures"
        },
        day: "un jour",
        days: function(a) {
            return Math.round(a) + " jours"
        },
        month: "environ un mois",
        months: function(a) {
            return Math.floor(a / 30) + " mois"
        },
        year: "environ un an",
        years: function(a) {
            return Math.round(a) + " ans"
        }
    },
    es: {
        second: "ahora",
        minute: "hace un minuto",
        minutes: function(a) {
            return "hace " + Math.round(a) + " minuts"
        },
        hour: "hace una hora",
        hours: function(a) {
            return "hace " + Math.round(a) + " horas"
        },
        day: "hace un dia",
        days: function(a) {
            return "hace " + Math.round(a) + " d\u00edas"
        },
        month: "hace un mes",
        months: function(a) {
            return "hace " + Math.floor(a / 30) + " meses"
        },
        year: "hace a\u00f1os",
        years: function(a) {
            return "hace " + Math.round(a) + " a\u00f1os"
        }
    },
    el: {
        second: "\u03bb\u03b9\u03b3\u03cc\u03c4\u03b5\u03c1\u03bf \u03b1\u03c0\u03cc \u03ad\u03bd\u03b1 \u03bb\u03b5\u03c0\u03c4\u03cc",
        minute: "\u03b3\u03cd\u03c1\u03c9 \u03c3\u03c4\u03bf \u03ad\u03bd\u03b1 \u03bb\u03b5\u03c0\u03c4\u03cc",
        minutes: function(a) {
            return Math.round(a) + " minutes"
        },
        hour: "\u03b3\u03cd\u03c1\u03c9 \u03c3\u03c4\u03b7\u03bd \u03bc\u03b9\u03b1 \u03ce\u03c1\u03b1",
        hours: function(a) {
            return "about " + Math.round(a) + " hours"
        },
        day: "\u03bc\u03b9\u03b1 \u03bc\u03ad\u03c1\u03b1",
        days: function(a) {
            return Math.round(a) + " days"
        },
        month: "\u03b3\u03cd\u03c1\u03c9 \u03c3\u03c4\u03bf\u03bd \u03ad\u03bd\u03b1 \u03bc\u03ae\u03bd\u03b1",
        months: function(a) {
            return Math.floor(a / 30) + " months"
        },
        year: "\u03b3\u03cd\u03c1\u03c9 \u03c3\u03c4\u03bf\u03bd \u03ad\u03bd\u03b1 \u03c7\u03c1\u03cc\u03bd\u03bf",
        years: function(a) {
            return Math.round(a) + " years"
        }
    },
    de: {
        second: "soeben",
        minute: "vor einer Minute",
        minutes: function(a) {
            return "vor " + Math.round(a) + " Minuten"
        },
        hour: "vor einer Stunde",
        hours: function(a) {
            return "vor " + Math.round(a) + " Stunden"
        },
        day: "vor einem Tag",
        days: function(a) {
            return "vor " + Math.round(a) + " Tagen"
        },
        month: "vor einem Monat",
        months: function(a) {
            return "vor " +
                Math.floor(a / 30) + " Monaten"
        },
        year: "vor einem Jahr",
        years: function(a) {
            return "vor " + Math.round(a) + " Jahren"
        }
    },
    be: {
        second: "\u043c\u0435\u043d\u0448 \u0437\u0430 \u0445\u0432\u0456\u043b\u0456\u043d\u0443 \u0442\u0430\u043c\u0443",
        minute: "\u0445\u0432\u0456\u043b\u0456\u043d\u0443 \u0442\u0430\u043c\u0443",
        minutes: function(a) {
            return rpi.Time.declineNum(Math.round(a), "\u0445\u0432\u0456\u043b\u0456\u043d\u0430 \u0442\u0430\u043c\u0443", "\u0445\u0432\u0456\u043b\u0456\u043d\u044b \u0442\u0430\u043c\u0443",
                "\u0445\u0432\u0456\u043b\u0456\u043d \u0442\u0430\u043c\u0443")
        },
        hour: "\u0433\u0430\u0434\u0437\u0456\u043d\u0443 \u0442\u0430\u043c\u0443",
        hours: function(a) {
            return rpi.Time.declineNum(Math.round(a), "\u0433\u0430\u0434\u0437\u0456\u043d\u0443 \u0442\u0430\u043c\u0443", "\u0433\u0430\u0434\u0437\u0456\u043d\u044b \u0442\u0430\u043c\u0443", "\u0433\u0430\u0434\u0437\u0456\u043d \u0442\u0430\u043c\u0443")
        },
        day: "\u0434\u0437\u0435\u043d\u044c \u0442\u0430\u043c\u0443",
        days: function(a) {
            return rpi.Time.declineNum(Math.round(a),
                "\u0434\u0437\u0435\u043d\u044c \u0442\u0430\u043c\u0443", "\u0434\u043d\u0456 \u0442\u0430\u043c\u0443", "\u0434\u0437\u0451\u043d \u0442\u0430\u043c\u0443")
        },
        month: "\u043c\u0435\u0441\u044f\u0446 \u0442\u0430\u043c\u0443",
        months: function(a) {
            return rpi.Time.declineNum(Math.floor(a / 30), "\u043c\u0435\u0441\u044f\u0446 \u0442\u0430\u043c\u0443", "\u043c\u0435\u0441\u044f\u0446\u0430 \u0442\u0430\u043c\u0443", "\u043c\u0435\u0441\u044f\u0446\u0430\u045e \u0442\u0430\u043c\u0443")
        },
        year: "\u0433\u043e\u0434 \u0442\u0430\u043c\u0443",
        years: function(a) {
            return rpi.Time.declineNum(Math.round(a), "\u0433\u043e\u0434 \u0442\u0430\u043c\u0443", "\u0433\u0430\u0434\u044b \u0442\u0430\u043c\u0443", "\u0433\u043e\u0434 \u0442\u0430\u043c\u0443")
        }
    },
    it: {
        second: "proprio ora",
        minute: "un minuto fa",
        minutes: function(a) {
            return rpi.Time.declineNum(Math.round(a), "un minuto fa", "minuti fa", "minuti fa")
        },
        hour: "un'ora fa",
        hours: function(a) {
            return rpi.Time.declineNum(Math.round(a), "un'ora fa", "ore fa", "ore fa")
        },
        day: "un giorno fa",
        days: function(a) {
            return rpi.Time.declineNum(Math.round(a),
                "un giorno fa", "giorni fa", "giorni fa")
        },
        month: "un mese fa",
        months: function(a) {
            return rpi.Time.declineNum(Math.floor(a / 30), "un mese fa", "mesi fa", "mesi fa")
        },
        year: "un anno fa",
        years: function(a) {
            return rpi.Time.declineNum(Math.round(a), "un anno fa", "anni fa", "anni fa")
        }
    },
    tr: {
        second: "az \u00f6nce",
        minute: "dakika \u00f6nce",
        minutes: function(a) {
            return Math.round(a) + " dakika \u00f6nce"
        },
        hour: "saat \u00f6nce",
        hours: function(a) {
            return Math.round(a) + " saat \u00f6nce"
        },
        day: "g\u00fcn \u00f6nce",
        days: function(a) {
            return Math.round(a) +
                " g\u00fcn \u00f6nce"
        },
        month: "ay \u00f6nce",
        months: function(a) {
            return Math.floor(a / 30) + " ay \u00f6nce"
        },
        year: "y\u0131l \u00f6nce",
        years: function(a) {
            return Math.round(a) + " y\u0131l \u00f6nce"
        }
    },
    nb: {
        second: "n\u00e5 nettopp",
        minute: "ett minutt siden",
        minutes: function(a) {
            return Math.round(a) + " minutter siden"
        },
        hour: "en time siden",
        hours: function(a) {
            return Math.round(a) + " timer siden"
        },
        day: "en dag siden",
        days: function(a) {
            return Math.round(a) + " dager siden"
        },
        month: "en m\u00e5ned siden",
        months: function(a) {
            return Math.floor(a /
                30) + " m\u00e5neder siden"
        },
        year: "ett \u00e5r siden",
        years: function(a) {
            return Math.round(a) + " \u00e5r siden"
        }
    },
    da: {
        second: "lige nu",
        minute: "et minut siden",
        minutes: function(a) {
            return Math.round(a) + " minutter siden"
        },
        hour: "en time siden",
        hours: function(a) {
            return Math.round(a) + " timer siden"
        },
        day: "en dag siden",
        days: function(a) {
            return Math.round(a) + " dage siden"
        },
        month: "en m\u00e5ned siden",
        months: function(a) {
            return Math.floor(a / 30) + " m\u00e5neder siden"
        },
        year: "et \u00e5r siden",
        years: function(a) {
            return Math.round(a) +
                " \u00e5r siden"
        }
    },
    nl: {
        second: "zojuist",
        minute: "minuten geleden",
        minutes: function(a) {
            return Math.round(a) + " minuten geleden"
        },
        hour: "uur geleden",
        hours: function(a) {
            return Math.round(a) + " uur geleden"
        },
        day: "1 dag geleden",
        days: function(a) {
            return Math.round(a) + " dagen geleden"
        },
        month: "maand geleden",
        months: function(a) {
            return Math.floor(a / 30) + " maanden geleden"
        },
        year: "jaar geleden",
        years: function(a) {
            return Math.round(a) + " jaar geleden"
        }
    },
    ca: {
        second: "ara mateix",
        minute: "fa un minut",
        minutes: function(a) {
            return "fa " +
                Math.round(a) + " minuts"
        },
        hour: "fa una hora",
        hours: function(a) {
            return "fa " + Math.round(a) + " hores"
        },
        day: "fa un dia",
        days: function(a) {
            return "fa " + Math.round(a) + " dies"
        },
        month: "fa un mes",
        months: function(a) {
            return "fa " + Math.floor(a / 30) + " mesos"
        },
        year: "fa un any",
        years: function(a) {
            return "fa " + Math.round(a) + " anys"
        }
    },
    sv: {
        second: "just nu",
        minute: "en minut sedan",
        minutes: function(a) {
            return Math.round(a) + " minuter sedan"
        },
        hour: "en timme sedan",
        hours: function(a) {
            return Math.round(a) + " timmar sedan"
        },
        day: "en dag sedan",
        days: function(a) {
            return Math.round(a) + " dagar sedan"
        },
        month: "en m\u00e5nad sedan",
        months: function(a) {
            return Math.floor(a / 30) + " m\u00e5nader sedan"
        },
        year: "ett \u00e5r sedan",
        years: function(a) {
            return Math.round(a) + " \u00e5r sedan"
        }
    },
    pl: {
        second: "w\u0142a\u015bnie teraz",
        minute: "minut\u0119 temu",
        minutes: function(a) {
            return Math.round(a) + " minut temu"
        },
        hour: "godzin\u0119 temu",
        hours: function(a) {
            return Math.round(a) + " godzin temu"
        },
        day: "wczoraj",
        days: function(a) {
            return Math.round(a) + " dni temu"
        },
        month: "miesi\u0105c temu",
        months: function(a) {
            return Math.floor(a / 30) + " miesi\u0119cy temu"
        },
        year: "rok temu",
        years: function(a) {
            return Math.round(a) + " lat temu"
        }
    },
    pt: {
        second: "agora",
        minute: "1 minuto atr\u00e1s",
        minutes: function(a) {
            return Math.round(a) + " minutos atr\u00e1s"
        },
        hour: "1 hora atr\u00e1s",
        hours: function(a) {
            return Math.round(a) + " horas atr\u00e1s"
        },
        day: "1 dia atr\u00e1s",
        days: function(a) {
            return Math.round(a) + " dias atr\u00e1s"
        },
        month: "1 m\u00eas atr\u00e1s",
        months: function(a) {
            return Math.floor(a / 30) + " meses atr\u00e1s"
        },
        year: "1 ano atr\u00e1s",
        years: function(a) {
            return Math.round(a) + " anos atr\u00e1s"
        }
    },
    hu: {
        second: "\u00e9pp az im\u00e9nt",
        minute: "1 perccel ezel\u0151tt",
        minutes: function(a) {
            return Math.round(a) + " perccel ezel\u0151tt"
        },
        hour: "\u00f3r\u00e1val ezel\u0151tt",
        hours: function(a) {
            return Math.round(a) + " \u00f3r\u00e1val ezel\u0151tt"
        },
        day: "nappal ezel\u0151tt",
        days: function(a) {
            return Math.round(a) + " nappal ezel\u0151tt"
        },
        month: "h\u00f3nappal ezel\u0151tt",
        months: function(a) {
            return Math.floor(a / 30) + " h\u00f3nappal ezel\u0151tt"
        },
        year: "\u00e9vvel ezel\u0151tt",
        years: function(a) {
            return Math.round(a) + " \u00e9vvel ezel\u0151tt"
        }
    },
    fi: {
        second: "juuri nyt",
        minute: "minuutti sitten",
        minutes: function(a) {
            return Math.round(a) + " minuuttia sitten"
        },
        hour: "tunti sitten",
        hours: function(a) {
            return Math.round(a) + " tuntia sitten"
        },
        day: "p\u00e4iv\u00e4 sitten",
        days: function(a) {
            return Math.round(a) + " p\u00e4iv\u00e4\u00e4 sitten"
        },
        month: "kuukausi sitten",
        months: function(a) {
            return Math.floor(a / 30) + " kuukautta sitten"
        },
        year: "vuosi sitten",
        years: function(a) {
            return Math.round(a) +
                " vuotta sitten"
        }
    },
    he: {
        second: "\u05d4\u05e8\u05d2\u05e2",
        minute: "\u05dc\u05e4\u05e0\u05d9 \u05d3\u05e7\u05d4",
        minutes: function(a) {
            return "\u05dc\u05e4\u05e0\u05d9 " + Math.round(a) + " \u05d3\u05e7\u05d5\u05ea"
        },
        hour: "\u05dc\u05e4\u05e0\u05d9 \u05e9\u05e2\u05d4",
        hours: function(a) {
            return "\u05dc\u05e4\u05e0\u05d9 " + Math.round(a) + " \u05e9\u05e2\u05d5\u05ea"
        },
        day: "\u05dc\u05e4\u05e0\u05d9 \u05d9\u05d5\u05dd",
        days: function(a) {
            return "\u05dc\u05e4\u05e0\u05d9 " + Math.round(a) + " \u05d9\u05de\u05d9\u05dd"
        },
        month: "\u05dc\u05e4\u05e0\u05d9 \u05d7\u05d5\u05d3\u05e9",
        months: function(a) {
            return 2 == Math.floor(a / 30) ? "\u05dc\u05e4\u05e0\u05d9 \u05d7\u05d5\u05d3\u05e9\u05d9\u05d9\u05dd" : "\u05dc\u05e4\u05e0\u05d9 " + Math.floor(a / 30) + " \u05d7\u05d5\u05d3\u05e9\u05d9\u05dd"
        },
        year: "\u05dc\u05e4\u05e0\u05d9 \u05e9\u05e0\u05d4",
        years: function(a) {
            return "\u05dc\u05e4\u05e0\u05d9 " + Math.round(a) + " \u05e9\u05e0\u05d9\u05dd"
        }
    },
    bg: {
        second: "\u0432 \u043c\u043e\u043c\u0435\u043d\u0442\u0430",
        minute: "\u043f\u0440\u0435\u0434\u0438 1 \u043c\u0438\u043d\u0443\u0442\u0430",
        minutes: function(a) {
            return "\u043f\u0440\u0435\u0434\u0438 " +
                Math.round(a) + " \u043c\u0438\u043d\u0443\u0442\u0438"
        },
        hour: "\u043f\u0440\u0435\u0434\u0438 1 \u0447\u0430\u0441",
        hours: function(a) {
            return "\u043f\u0440\u0435\u0434\u0438 " + Math.round(a) + " \u0447\u0430\u0441\u0430"
        },
        day: "\u043f\u0440\u0435\u0434\u0438 1 \u0434\u0435\u043d",
        days: function(a) {
            return "\u043f\u0440\u0435\u0434\u0438 " + Math.round(a) + " \u0434\u043d\u0438"
        },
        month: "\u043f\u0440\u0435\u0434\u0438 1 \u043c\u0435\u0441\u0435\u0446",
        months: function(a) {
            return "\u043f\u0440\u0435\u0434\u0438 " + Math.floor(a /
                30) + " \u043c\u0435\u0441\u0435\u0446\u0430"
        },
        year: "\u043f\u0440\u0435\u0434\u0438 1 \u0433\u043e\u0434\u0438\u043d\u0430",
        years: function(a) {
            return "\u043f\u0440\u0435\u0434\u0438 " + Math.round(a) + " \u0433\u043e\u0434\u0438\u043d\u0438"
        }
    },
    sk: {
        second: "pr\u00e1ve teraz",
        minute: "pred min\u00fatov",
        minutes: function(a) {
            return "pred " + Math.round(a) + " min\u00fatami"
        },
        hour: "pred hodinou",
        hours: function(a) {
            return "pred " + Math.round(a) + " hodinami"
        },
        day: "v\u010dera",
        days: function(a) {
            return "pred " + Math.round(a) + " d\u0148ami"
        },
        month: "pred mesiacom",
        months: function(a) {
            return "pred " + Math.floor(a / 30) + " mesiacmi"
        },
        year: "pred rokom",
        years: function(a) {
            return "pred " + Math.round(a) + " rokmi"
        }
    },
    lo: {
        second: "\u0ea7\u0eb1\u0ec8\u0e87\u0e81\u0eb5\u0ec9\u0e99\u0eb5\u0ec9",
        minute: "\u0edc\u0eb6\u0ec8\u0e87\u0e99\u0eb2\u0e97\u0eb5\u0e81\u0ec8\u0ead\u0e99",
        minutes: function(a) {
            return Math.round(a) + " \u0e99\u0eb2\u0e97\u0eb5\u0e81\u0ec8\u0ead\u0e99"
        },
        hour: "\u0edc\u0eb6\u0ec8\u0e87\u0e8a\u0ebb\u0ec8\u0ea7\u0ec2\u0ea1\u0e87\u0e81\u0ec8\u0ead\u0e99",
        hours: function(a) {
            return Math.round(a) + " \u0ebb\u0ec8\u0ea7\u0ec2\u0ea1\u0e87\u0e81\u0ec8\u0ead\u0e99"
        },
        day: "\u0edc\u0eb6\u0ec8\u0e87\u0ea1\u0eb7\u0ec9\u0e81\u0ec8\u0ead\u0e99",
        days: function(a) {
            return Math.round(a) + " \u0ea1\u0eb7\u0ec9\u0e81\u0ec8\u0ead\u0e99"
        },
        month: "\u0edc\u0eb6\u0ec8\u0e87\u0ec0\u0e94\u0eb7\u0ead\u0e99\u0e81\u0ec8\u0ead\u0e99",
        months: function(a) {
            return Math.floor(a / 30) + " \u0ec0\u0e94\u0eb7\u0ead\u0e99\u0e81\u0ec8\u0ead\u0e99"
        },
        year: "\u0edc\u0eb6\u0ec8\u0e87\u0e9b\u0eb5\u0e81\u0ec8\u0ead\u0e99",
        years: function(a) {
            return Math.round(a) + " \u0e9b\u0eb5\u0e81\u0ec8\u0ead\u0e99"
        }
    },
    sl: {
        second: "pravkar",
        minute: "pred eno minuto",
        minutes: function(a) {
            return "pred " + Math.round(a) + " minutami"
        },
        hour: "pred eno uro",
        hours: function(a) {
            return "pred " + Math.round(a) + " urami"
        },
        day: "pred enim dnem",
        days: function(a) {
            return "pred " + Math.round(a) + " dnevi"
        },
        month: "pred enim mesecem",
        months: function(a) {
            return "pred " + Math.floor(a / 30) + " meseci"
        },
        year: "pred enim letom",
        years: function(a) {
            return "pred " + Math.round(a) + " leti"
        }
    },
    et: {
        second: "just n\u00fc\u00fcd",
        minute: "minut tagasi",
        minutes: function(a) {
            return Math.round(a) + " minutit tagasi"
        },
        hour: "tund tagasi",
        hours: function(a) {
            return Math.round(a) + " tundi tagasi"
        },
        day: "p\u00e4ev tagasi",
        days: function(a) {
            return Math.round(a) + " p\u00e4eva tagasi"
        },
        month: "kuu aega tagasi",
        months: function(a) {
            return Math.floor(a / 30) + " kuud tagasi"
        },
        year: "aasta tagasi",
        years: function(a) {
            return Math.round(a) + " aastat tagasi"
        }
    },
    ja: {
        second: "\u305f\u3063\u305f\u4eca",
        minute: "1\u5206\u524d",
        minutes: function(a) {
            return Math.round(a) +
                "\u5206\u524d"
        },
        hour: "1\u6642\u9593\u524d",
        hours: function(a) {
            return Math.round(a) + "\u6642\u9593\u524d"
        },
        day: "1\u65e5\u524d",
        days: function(a) {
            return Math.round(a) + "\u65e5\u524d"
        },
        month: "1\u30f6\u6708\u524d",
        months: function(a) {
            return Math.floor(a / 30) + "\u30f6\u6708\u524d"
        },
        year: "1\u5e74\u524d",
        years: function(a) {
            return Math.round(a) + "\u5e74\u524d"
        }
    }
};
rpi = rpi || {};
rpi.Utils = {
    __: function(a, c) {
        return c && c[a] || a
    },
    isVisible: function(a) {
        return !!(a.offsetWidth || a.offsetHeight || a.getClientRects().length) && "hidden" !== window.getComputedStyle(a).visibility
    },
    isRTL: function() {
        return "rtl" == (window.getComputedStyle ? window.getComputedStyle(document.body, null).getPropertyValue("direction") : document.body.currentStyle.direction)
    },
    getParent: function(a, c) {
        c = c || "rplg";
        if (0 > a.className.split(" ").indexOf(c))
            for (;
                (a = a.parentElement) && 0 > a.className.split(" ").indexOf(c););
        return a
    },
    lang: function() {
        var a = navigator;
        return (a.language || a.systemLanguage || a.userLanguage || "en").substr(0, 2).toLowerCase()
    },
    popup: function(a, c, f) {
        var h = document.documentElement;
        a = window.open(a, "", "scrollbars=yes, width=" + c + ", height=" + f + ", top=" + ((window.innerHeight ? window.innerHeight : h.clientHeight ? h.clientHeight : screen.height) / 2 - f / 2 + (void 0 != window.screenTop ? window.screenTop : window.screenY)) + ", left=" + ((window.innerWidth ? window.innerWidth : h.clientWidth ? h.clientWidth : screen.width) / 2 - c / 2 + (void 0 != window.screenLeft ?
            window.screenLeft : window.screenX)));
        window.focus && a.focus();
        return a
    },
    ajax: function(a, c, f, h) {
        const e = new XMLHttpRequest;
        e.open(c, a, !0);
        e.setRequestHeader("Content-Type", "application/json");
        e.onreadystatechange = function() {
            if ((e.readyState === XMLHttpRequest.DONE || e.readyState === e.DONE) && 200 === e.status) {
                const k = JSON.parse(e.responseText);
                "function" === typeof h ? h(k) : "function" === typeof f && f(k)
            }
        };
        e.send(f && "function" !== typeof f ? JSON.stringify(f) : null)
    },
    anchor: function(a, c, f, h, e) {
        const k = [];
        f.open_link &&
            k.push("noopener");
        f.nofollow_link && k.push("nofollow");
        return '<a href="' + a + '"' + (h ? ' class="' + h + '"' : "") + (f.open_link ? ' target="_blank"' : "") + (k.length ? ' rel="' + k.join(" ") + '"' : "") + (e ? ' aria-label="' + e + '"' : "") + ">" + c + "</a>"
    },
    rm: function(a) {
        a && a.parentNode && a.parentNode.removeChild(a)
    },
    capit: function(a) {
        return a.charAt(0).toUpperCase() + a.slice(1)
    },
    clear: function() {
        this.rm(document.getElementById("rpi-style"));
        if (rpi.Instances)
            for (; rpi.Instances.length;) rpi.Instances.pop().clear()
    }
};
rpi = rpi || {};
rpi.Column = function(a, c, f) {
    const h = a.getAttribute("data-id"),
        e = new RegExp(f.col + "-[xsml]+"),
        k = new RegExp('$|(\\[data-id="' + h + '"\\]\\s+.' + f.card + "\\s*{\\s*--col:\\s*\\d+\\s*!important\\s*;?(\\s*--gap:\\s*\\d+\\s*!important;?)?})"),
        m = a.getElementsByClassName(f.cnt)[0];
    var n = null;
    return n = {
        init: function(l, q) {
            rpi.Utils.isVisible(m) ? (l && l(), n.resize(), window.addEventListener("resize", n.resize), q && q(), rpi.Instances = rpi.Instances || [], rpi.Instances.push(n)) : setTimeout(n.init, 300)
        },
        resize: function() {
            let l =
                n.getSize();
            m.className = m.className.replace(e, f.col + "-" + l);
            if (c.breakpoints) {
                let q = m.offsetWidth,
                    d = c.breakpoints.split(",");
                d.sort(n.brsort);
                for (let r = 0; r < d.length; r++) {
                    let u = d[r].split(":");
                    if (q < parseInt(u[0])) {
                        n.setCol(u[1]);
                        break
                    }
                }
            }
            return l
        },
        getSize: function() {
            let l = m.offsetWidth;
            return 510 > l ? "xs" : 750 > l ? "x" : 1100 > l ? "s" : 1450 > l ? "m" : 1800 > l ? "l" : "xl"
        },
        setCol: function(l) {
            let q = this.getStyle();
            q.innerHTML = q.innerHTML.replace(k, '[data-id="' + h + '"] .' + f.card + "{--col:" + l + "!important;--gap:" + (l - 1) + "!important}")
        },
        getCol: function() {
            let l = this.getStyle().innerHTML.match(/--col:\s*(\d+)/);
            return l && 1 < l.length ? l[1] : !1
        },
        getStyle: function() {
            let l = document.getElementById("rpi-style");
            l || (l = document.createElement("style"), l.id = "rpi-style", document.head.appendChild(l));
            return l
        },
        setBreakpoints: function(l) {
            c.breakpoints = l
        },
        brsort: function(l, q) {
            return parseInt(l.split(":")[0]) > parseInt(q.split(":")[0]) ? 1 : -1
        },
        clear: function() {
            window.removeEventListener("resize", n.resize)
        }
    }
};
rpi = rpi || {};
rpi.Common = function(a, c, f) {
    var h = null;
    return h = {
        init: function() {
            var e = a.getElementsByClassName(f.time);
            let k = a.getElementsByClassName(f.text);
            for (var m = 0; m < e.length; m++) e[m].innerHTML = h.time(e[m].getAttribute("data-time"), c.time_format);
            for (e = 0; e < k.length; e++)(m = k[e]) && m.innerHTML && (m.innerHTML = h.trimtext(m.innerHTML, c.text_size, c.trans), m = m.getElementsByClassName(f.readmore)[0]) && (m.onclick = h.opentext)
        },
        initOnce: function(e) {
            var k = e.getElementsByClassName(f.time)[0];
            e = e.getElementsByClassName(f.text)[0];
            k && (k.innerHTML = h.time(k.getAttribute("data-time"), c.time_format));
            e && e.innerHTML && (e.innerHTML = h.trimtext(e.innerHTML, c.text_size, c.trans), k = e.getElementsByClassName(f.readmore)[0]) && (k.onclick = h.opentext)
        },
        time: function(e, k) {
            return k ? e : rpi.Time.getTimeAgo(1E3 * parseInt(e), rpi.Utils.lang())
        },
        trimtext: function(e, k, m) {
            if (e && k && e.length > k) {
                var n = e.substring(0, k).indexOf(" ") + 1;
                if (1 > n || k - n > k / 2) n = k;
                var l = k = "";
                0 < n && (k = e.substring(0, n - 1), l = e.substring(n - 1, e.length));
                return k + (l ? '<span class="rpi-s">... </span><input type="hidden" value="' +
                    l + '"></input><span class="' + f.readmore + '">' + rpi.Utils.__("read more", m) + "</span>" : "")
            }
            return e
        },
        opentext: function() {
            let e = this.parentNode,
                k = this.previousSibling,
                m = this.previousSibling.previousSibling,
                n = k.value;
            rpi.Utils.rm(k);
            rpi.Utils.rm(m);
            rpi.Utils.rm(this);
            e.innerHTML += n
        }
    }
};
rpi = rpi || {};
rpi.Slider = function(a, c, f, h) {
    a.getAttribute("data-id");
    const e = a.getElementsByClassName(f.cnt)[0],
        k = a.getElementsByClassName(f.content)[0],
        m = k.getElementsByClassName(f.cards)[0],
        n = k.getElementsByClassName(f.dotsWrap)[0],
        l = k.getElementsByClassName(f.dots)[0],
        q = parseInt(e.getAttribute("data-count"));
    var d = null,
        r = k.getElementsByClassName(f.card),
        u = "",
        C = "",
        y = null,
        w = null,
        v = null,
        z = null,
        A = !1,
        x = !1,
        B = 0,
        D = 0;
    return d = {
        init: function(b, g) {
            rpi.Utils.isVisible(e) ? (b && b(), d.resize(), d.actions(), r.length && d.swipeAutoStart(),
                g && g(), rpi.Instances = rpi.Instances || [], rpi.Instances.push(d)) : setTimeout(d.init, 300)
        },
        resize: function(b) {
            let g = h.column.resize(),
                p = h.column.getCol();
            b && m.scrollLeft != b * d.reviewWidth() && m.scrollTo(r[b].offsetLeft, 0);
            !r.length || u == g && C == p || (d.hasDots() && (d.dotsInit(), d.dotSwipe(b, !0)), u = g, C = p)
        },
        actions: function() {
            c.mousestop && d.addMouseEvents();
            window.addEventListener("resize", d.resizeListener);
            m && (m.addEventListener("scroll", d.scrollListener, !1), c.wheelscroll && k.addEventListener("wheel", d.wheelListener, !1));
            var b = e.getElementsByClassName(f.btnPrev)[0];
            b && (b.onclick = function(g) {
                d.btnClick(-1)
            });
            if (b = e.getElementsByClassName(f.btnNext)[0]) b.onclick = function(g) {
                d.btnClick(1)
            }
        },
        resizeListener: function() {
            var b = D;
            clearTimeout(y);
            y = setTimeout(d.resize, 150, b)
        },
        scrollListener: function() {
            clearTimeout(w);
            clearTimeout(v);
            v = setTimeout(d.scrollEnd, 150)
        },
        wheelListener: function(b) {
            var g = b.target;
            if ((g = -1 < g.className.indexOf(f.text) ? g : -1 < g.parentNode.className.indexOf(f.text) ? g.parentNode : null) && g.scrollHeight >
                g.clientHeight) return !0;
            b.preventDefault();
            B++;
            clearTimeout(z);
            z = setTimeout(d.wheelEnd, 150, b)
        },
        addMouseEvents: function() {
            e.addEventListener("mouseover", d.mouseOver, !1);
            e.addEventListener("mouseleave", d.mouseLeave, !1)
        },
        delMouseEvents: function() {
            e.removeEventListener("mouseover", d.mouseOver);
            e.removeEventListener("mouseleave", d.mouseLeave)
        },
        mouseOver: function() {
            A = 1;
            d.swipeAutoStop()
        },
        mouseLeave: function() {
            A = 0;
            d.swipeAutoStart()
        },
        btnClick: function(b) {
            d.swipeManual(b * d.swipePerBtn())
        },
        wheelEnd: function(b) {
            d.swipeManual(Math.sign(b.wheelDelta) *
                B * d.swipeStep());
            B = 0
        },
        scrollEnd: function() {
            D = d.reviewsIdx();
            x ? x = !1 : d.loadNextReviews();
            (!c.mousestop || A) && c.mousestop || (!c.clickstop || x) && c.clickstop || d.swipeAutoStart();
            d.hasDots() && d.dotSwipe(void 0, !0)
        },
        loadNextReviews: function(b) {
            b = b ? d.reviewsIdx() + parseInt(b) : d.hasDots() ? (b = l.getElementsByClassName("active")[0]) ? parseInt(b.getAttribute("data-index")) * d.swipePerDot() : d.reviewsIdx() : d.reviewsIdx();
            b = d.getAjaxSize(b);
            0 < b && h.view.loadNextReviews(b)
        },
        getAjaxSize: function(b) {
            let g = 0;
            const p = parseInt(e.getAttribute("data-offset")),
                t = parseInt(c.pagination);
            if (q > p) {
                let E = b - p;
                Math.abs(E) < 3 * d.swipePerDot() ? g = t : E && (g = Math.ceil(b / t) * t - p)
            }
            b = p + g - q;
            return 0 < b ? g - b : g
        },
        dotsInit: function() {
            if (l) {
                var b = Math.round(q / d.swipePerDot());
                l.innerHTML = "";
                for (let g = 0; g < b; g++) {
                    let p = document.createElement("div");
                    p.className = f.dot;
                    p.setAttribute("data-index", g);
                    p.setAttribute("title", g);
                    p.onclick = d.dotClick;
                    l.appendChild(p)
                }
                d.dotsPadding()
            }
        },
        dotClick: function() {
            let b = parseInt(this.getAttribute("data-index"));
            var g = l.getElementsByClassName("active")[0];
            g = parseInt(g.getAttribute("data-index"));
            d.swipeManual(Math.abs(b - g) * d.swipePerDot() * Math.sign(b - g))
        },
        dotsPadding: function() {
            let b = n.getBoundingClientRect().height;
            e.style.paddingBottom = b + "px"
        },
        dotSwipe: function(b, g) {
            b = Math.round((void 0 !== b ? b : d.reviewsIdx()) / d.swipePerDot());
            b = 0 > b ? 0 : b >= l.childNodes.length ? l.childNodes.length - 1 : b;
            b = l.querySelector("." + f.dot + '[data-index="' + b + '"]');
            let p = l.getElementsByClassName("active")[0];
            d.dotActivate(p, b);
            d.dotScroll(b, g)
        },
        dotScroll: function(b, g) {
            let p = Math.round(l.scrollWidth /
                    l.childNodes.length),
                t = Math.floor(Math.round(l.offsetWidth / p) / 2);
            g ? l.scrollTo(b.offsetLeft - t * p, 0) : l.scrollTo({
                left: b.offsetLeft - t * p,
                behavior: "smooth"
            })
        },
        dotActivate: function(b, g) {
            b && (b.classList.remove("active"), b.classList.remove("s1"), b.previousSibling && (b.previousSibling.classList.remove("s2"), b.previousSibling.previousSibling && b.previousSibling.previousSibling.classList.remove("s3")), b.nextSibling && (b.nextSibling.classList.remove("s2"), b.nextSibling.nextSibling && b.nextSibling.nextSibling.classList.remove("s3")));
            g && (g.classList.add("active"), g.classList.add("s1"), g.previousSibling && (g.previousSibling.classList.add("s2"), g.previousSibling.previousSibling && g.previousSibling.previousSibling.classList.add("s3")), g.nextSibling && (g.nextSibling.classList.add("s2"), g.nextSibling.nextSibling && g.nextSibling.nextSibling.classList.add("s3")))
        },
        swipeManual: function(b) {
            x = !0;
            d.loadNextReviews(b);
            d.scroll(b);
            c.clickstop && (d.swipeAutoStop(), d.delMouseEvents())
        },
        swipeAuto: function() {
            if (d.isScrollEnd()) d.scroll(-(q - d.reviewsPerView()));
            else {
                let b = d.swipeStep() < d.reviewsAhead() ? d.swipeStep() : d.reviewsAhead();
                d.scroll(b)
            }
            d.swipeAutoStart()
        },
        scroll: function(b) {
            b = d.reviewsIdx() + parseInt(b);
            let g = rpi.Utils.isRTL() ? b + d.reviewsPerView() - 1 : b;
            g = 0 > g ? 0 : g >= r.length ? r.length - 1 : g; - 1 < g && g < r.length && (m.scrollTo({
                left: r[g].offsetLeft,
                behavior: "smooth"
            }), d.hasDots() && d.dotSwipe(b))
        },
        swipeAutoStart: function() {
            c.autoplay && (w = setTimeout(d.swipeAuto, 1E3 * parseInt(c.speed)))
        },
        swipeAutoStop: function() {
            clearTimeout(w);
            v && setTimeout(function() {
                    clearTimeout(v)
                },
                100)
        },
        isScrollEnd: function() {
            var b = m.querySelector("." + f.card + ":last-child"),
                g = b.getBoundingClientRect();
            b = b.parentNode.getBoundingClientRect();
            return (2 > Math.abs(b.left - g.left) || b.left <= g.left) && g.left < b.right && (2 > Math.abs(b.right - g.right) || b.right >= g.right) && g.right > b.left
        },
        swipeStep: function() {
            return c.swipe_step || d.reviewsPerView()
        },
        swipePerBtn: function() {
            return c.swipe_per_btn || d.reviewsPerView()
        },
        swipePerDot: function() {
            return c.swipe_per_dot || d.reviewsPerView()
        },
        reviewWidth: function() {
            return Math.round(m.scrollWidth /
                r.length)
        },
        reviewHeight: function() {
            return r[0].offsetHeight
        },
        reviewsPerView: function() {
            return Math.round(m.offsetWidth / d.reviewWidth())
        },
        reviewsIdx: function() {
            let b = rpi.Utils.isRTL() ? -m.scrollLeft : m.scrollLeft;
            return Math.round(b / d.reviewWidth())
        },
        reviewsAhead: function() {
            return r.length - (d.reviewsIdx() + d.reviewsPerView())
        },
        hasDots: function() {
            return l && !c.hide_dots && 0 < d.swipePerDot()
        },
        setBreakpoints: function(b) {
            h.column.setBreakpoints(b);
            d.resize()
        },
        clear: function() {
            clearTimeout(y);
            clearTimeout(w);
            clearTimeout(v);
            clearTimeout(z);
            window.removeEventListener("resize", d.resizeListener);
            m.removeEventListener("scroll", d.scrollListener);
            k.removeEventListener("wheel", d.wheelListener)
        }
    }
};

function rplg_badge_init(a, c, f) {
    var h = a.querySelector(".wp-" + c + "-badge"),
        e = a.querySelector(".wp-" + c + "-form");
    h && e && (a = document.createElement("div"), a.className = f + " wpac", -1 < h.className.indexOf("-fixed") && a.appendChild(h), a.appendChild(e), document.body.appendChild(a), h.onclick = function() {
        e.style.display = "block"
    })
}

function rplg_next_reviews(a, c) {
    var f = this.parentNode,
        h = "." + a + "-review." + a + "-hide";
    reviews = f.querySelectorAll(h);
    for (var e = 0; e < c && e < reviews.length; e++) reviews[e] && (reviews[e].className = reviews[e].className.replace(a + "-hide", " "));
    reviews = f.querySelectorAll(h);
    1 > reviews.length && f.removeChild(this);
    return !1
}

function rplg_leave_review_window() {
    rpi.Utils.popup(this.getAttribute("href"), 620, 500);
    return !1
}

function grw_init(a, c) {
    a = rpi.Utils.getParent(a, "wp-gr");
    if ("true" != a.getAttribute("data-exec")) {
        a.setAttribute("data-exec", "true");
        var f = JSON.parse(a.getAttribute("data-options"));
        rpi.Common(a, f, {
            time: "wp-google-time",
            text: "wp-google-text",
            readmore: "wp-more-toggle"
        }).init();
        if ("slider" == c || "grid" == c) c = a.getElementsByClassName("grw-row")[0], c = JSON.parse(c.getAttribute("data-options")), f = rpi.Column(a, c, {
            cnt: "grw-row",
            col: "grw-row",
            card: "grw-review"
        }), rpi.Slider(a, c, {
            cnt: "grw-row",
            col: "grw-row",
            content: "grw-content",
            cards: "grw-reviews",
            card: "grw-review",
            text: "wp-google-text",
            btnPrev: "grw-prev",
            btnNext: "grw-next",
            dotsWrap: "rpi-dots-wrap",
            dots: "rpi-dots",
            dot: "rpi-dot"
        }, {
            column: f
        }).init()
    }
}
document.addEventListener("DOMContentLoaded", function() {
    const a = document.querySelectorAll('.wp-gr[data-exec="false"]');
    for (let f = 0; f < a.length; f++) {
        var c = a[f];
        grw_init(c, c.getAttribute("data-layout"))
    }
});