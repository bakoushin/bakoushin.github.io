'use strict';

$(function () {

    var main = $('#main');
    var button = $('.button');
    var createButton = $('#app-create-meeting-button');
    var editButton = $('.slot-tooltip__button-edit');
    var formCreate = $('#form-create');
    var formEdit = $('#form-edit');
    var deleteButton = $('.js-delete-button');
    var modalDelete = $('#modal-delete');
    var modalCreated = $('#modal-created');
    var modalOverlay = $('.modal__overlay');
    var modalButton = $('#modal button');
    var formButton = $('.form__button--close, .form__toolbar .button');
    var createEventButton = $('.js-create-event');
    var freeSlot = $('.slot--free');

    button.click(function (event) {
        event.preventDefault();
    });

    freeSlot.click(function (event) {
        main.hide();
        formCreate.show();
    });

    createButton.click(function (event) {
        main.hide();
        formCreate.show();
    });

    editButton.click(function (event) {
        main.hide();
        formEdit.show();
    });

    modalOverlay.click(function (event) {
        modalDelete.hide();
        modalCreated.hide();
    });

    modalButton.click(function (event) {
        modalDelete.hide();
        modalCreated.hide();
    });

    formButton.click(function (event) {
        formCreate.hide();
        formEdit.hide();
        formCalendar.hide();
        main.show();
    });

    createEventButton.click(function (event) {
        formCreate.hide();
        modalCreated.show();
    });

    deleteButton.click(function (event) {
        modalDelete.show();
    });

    // Date Calendar

    var date = $('.date__text');
    var calendar = $('.calendar__container.date__calendar');

    date.click(calendarShow);

    function calendarShow(event) {
        calendar.show();
        event.stopPropagation();
        $('body').on('click', calendarHide);
    }

    function calendarHide(event) {
        $('body').off('click', calendarHide);
        calendar.hide();
    }

    // Form Calendar

    var dateInput = $('.form__input--date');
    var calendarButton = $('.button.button--calendar');
    var formCalendar = $('.calendar__container.form__calendar');

    dateInput.click(formCalendarShow);
    calendarButton.click(formCalendarShow);

    function formCalendarShow(event) {
        formCalendar.show();
        event.stopPropagation();
        $('body').on('click', formCalendarHide);
    }

    function formCalendarHide(event) {
        $('body').off('click', formCalendarHide);
        formCalendar.hide();
    }
});
'use strict';

$(function () {

    var members = $('input[name=members]');

    var awesomplete = new Awesomplete(members[0], {
        minChars: 0,
        item: renderMemberItem,
        replace: addMember,
        data: function data(item, input) {
            return { label: item.login, value: item };
        }
    });

    var dropdownButton = members.parent().next('.form__input-inline-button');

    $(document).on('awesomplete-open', function () {
        dropdownButton.css('visibility', 'visible');
    });

    $(document).on('awesomplete-close', function () {
        dropdownButton.css('visibility', 'hidden');
    });

    members.on('focus', function (event) {
        awesomplete.evaluate();
    });

    awesomplete.list = [{
        id: 1,
        avatarUrl: 'http://placebeard.it/32x32',
        login: 'Лекс Лютер',
        floor: 7
    }, {
        id: 2,
        avatarUrl: 'http://placebeard.it/32x32',
        login: 'Томас Андерсон',
        floor: 2
    }, {
        id: 3,
        avatarUrl: 'http://placebeard.it/32x32',
        login: 'Дарт Вейдер',
        floor: 1
    }, {
        id: 4,
        avatarUrl: 'http://placebeard.it/32x32',
        login: 'Кларк Кент',
        floor: 2
    }];

    function renderMemberItem(data, input) {
        var person = data.value;
        return $('<li class="person__dropdown-item">\n                <img class="person__avatar person__avatar--dropdown" src="' + person.avatarUrl + '">\n                <span class="person__name">' + person.login + '</span> \xB7\n                <span class="person__floor">' + person.floor + ' \u044D\u0442\u0430\u0436</span>\n            </li>')[0];
    }

    function addMember(data) {
        this.input.value = '';
        var person = data.value;
        $('.form__people').append('<span class="person person--sticker">\n                <img class="person__avatar" src="' + person.avatarUrl + '">\n                <span>' + person.login + '</span>\n                <button class="button button--clear person__button-clear"></button>\n            </span>');
    }
});
'use strict';

$(function () {
    $(window).on('scroll', function () {
        var threshold = 181;
        if (window.pageXOffset > threshold) {
            $('.schedule__room-title').addClass('schedule__room-title--sticky');
            $('.schedule__floor-title').addClass('schedule__floor-title--sticky');
        } else {
            $('.schedule__room-title').removeClass('schedule__room-title--sticky');
            $('.schedule__floor-title').removeClass('schedule__floor-title--sticky');
        }
    });
});
'use strict';

var updateCurrentTime = function currentTimeUpdater() {
    var actualHour;
    var actualMinute;

    return function updateCurrentTime() {
        var VISIBILITY_CLASS = 'timeline__current-time-mark--visible';
        var HOUR_LENGTH = 66;
        var MIN_TIME = new Date().setHours(8, 0, 0, 0);
        var MAX_TIME = new Date().setHours(23, 0, 59, 999);
        var MIN_HOUR = new Date(MIN_TIME).getHours();

        var currentDate = new Date();
        var currentTime = currentDate.getTime();
        var hour = currentDate.getHours();
        var minute = currentDate.getMinutes();

        if (hour == actualHour && minute == actualMinute) {
            return;
        }

        actualHour = hour;
        actualMinute = minute;

        var currentTimeElement = document.getElementById('js-current-time');

        if (currentTime < MIN_TIME || currentTime > MAX_TIME) {
            currentTimeElement.classList.remove(VISIBILITY_CLASS);
            return;
        }

        var position = Math.round(HOUR_LENGTH * (hour - MIN_HOUR) + HOUR_LENGTH / 60 * minute);

        document.getElementById('js-current-time-value').innerText = hour + ':' + minute.toString().padStart(2, '0');

        currentTimeElement.style.marginLeft = position + 'px';
        currentTimeElement.classList.add(VISIBILITY_CLASS);
    };
}();

updateCurrentTime();
setInterval(updateCurrentTime, 1000);
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Simple, lightweight, usable local autocomplete library for modern browsers
 * Because there weren’t enough autocomplete scripts in the world? Because I’m completely insane and have NIH syndrome? Probably both. :P
 * @author Lea Verou http://leaverou.github.io/awesomplete
 * MIT license
 */

(function () {

    var _ = function _(input, o) {
        var me = this;

        // Keep track of number of instances for unique IDs
        Awesomplete.count = (Awesomplete.count || 0) + 1;
        this.count = Awesomplete.count;

        // Setup

        this.isOpened = false;

        this.input = $(input);
        this.input.setAttribute("autocomplete", "off");
        this.input.setAttribute("aria-owns", "awesomplete_list_" + this.count);
        this.input.setAttribute("role", "combobox");

        o = o || {};

        configure(this, {
            minChars: 2,
            maxItems: 10,
            autoFirst: false,
            data: _.DATA,
            filter: _.FILTER_CONTAINS,
            sort: o.sort === false ? false : _.SORT_BYLENGTH,
            item: _.ITEM,
            replace: _.REPLACE
        }, o);

        this.index = -1;

        // Create necessary elements

        this.container = $.create("div", {
            className: "awesomplete",
            around: input
        });

        this.ul = $.create("ul", {
            hidden: "hidden",
            role: "listbox",
            id: "awesomplete_list_" + this.count,
            inside: this.container
        });

        this.status = $.create("span", {
            className: "visually-hidden",
            role: "status",
            "aria-live": "assertive",
            "aria-atomic": true,
            inside: this.container,
            textContent: this.minChars != 0 ? "Type " + this.minChars + " or more characters for results." : "Begin typing for results."
        });

        // Bind events

        this._events = {
            input: {
                "input": this.evaluate.bind(this),
                "blur": this.close.bind(this, { reason: "blur" }),
                "keydown": function keydown(evt) {
                    var c = evt.keyCode;

                    // If the dropdown `ul` is in view, then act on keydown for the following keys:
                    // Enter / Esc / Up / Down
                    if (me.opened) {
                        if (c === 13 && me.selected) {
                            // Enter
                            evt.preventDefault();
                            me.select();
                        } else if (c === 27) {
                            // Esc
                            me.close({ reason: "esc" });
                        } else if (c === 38 || c === 40) {
                            // Down/Up arrow
                            evt.preventDefault();
                            me[c === 38 ? "previous" : "next"]();
                        }
                    }
                }
            },
            form: {
                "submit": this.close.bind(this, { reason: "submit" })
            },
            ul: {
                "mousedown": function mousedown(evt) {
                    var li = evt.target;

                    if (li !== this) {

                        while (li && !/li/i.test(li.nodeName)) {
                            li = li.parentNode;
                        }

                        if (li && evt.button === 0) {
                            // Only select on left click
                            evt.preventDefault();
                            me.select(li, evt.target);
                        }
                    }
                }
            }
        };

        $.bind(this.input, this._events.input);
        $.bind(this.input.form, this._events.form);
        $.bind(this.ul, this._events.ul);

        if (this.input.hasAttribute("list")) {
            this.list = "#" + this.input.getAttribute("list");
            this.input.removeAttribute("list");
        } else {
            this.list = this.input.getAttribute("data-list") || o.list || [];
        }

        _.all.push(this);
    };

    _.prototype = {
        set list(list) {
            if (Array.isArray(list)) {
                this._list = list;
            } else if (typeof list === "string" && list.indexOf(",") > -1) {
                this._list = list.split(/\s*,\s*/);
            } else {
                // Element or CSS selector
                list = $(list);

                if (list && list.children) {
                    var items = [];
                    slice.apply(list.children).forEach(function (el) {
                        if (!el.disabled) {
                            var text = el.textContent.trim();
                            var value = el.value || text;
                            var label = el.label || text;
                            if (value !== "") {
                                items.push({ label: label, value: value });
                            }
                        }
                    });
                    this._list = items;
                }
            }

            if (document.activeElement === this.input) {
                this.evaluate();
            }
        },

        get selected() {
            return this.index > -1;
        },

        get opened() {
            return this.isOpened;
        },

        close: function close(o) {
            if (!this.opened) {
                return;
            }

            this.ul.setAttribute("hidden", "");
            this.isOpened = false;
            this.index = -1;

            $.fire(this.input, "awesomplete-close", o || {});
        },

        open: function open() {
            this.ul.removeAttribute("hidden");
            this.isOpened = true;

            if (this.autoFirst && this.index === -1) {
                this.goto(0);
            }

            $.fire(this.input, "awesomplete-open");
        },

        destroy: function destroy() {
            //remove events from the input and its form
            $.unbind(this.input, this._events.input);
            $.unbind(this.input.form, this._events.form);

            //move the input out of the awesomplete container and remove the container and its children
            var parentNode = this.container.parentNode;

            parentNode.insertBefore(this.input, this.container);
            parentNode.removeChild(this.container);

            //remove autocomplete and aria-autocomplete attributes
            this.input.removeAttribute("autocomplete");
            this.input.removeAttribute("aria-autocomplete");

            //remove this awesomeplete instance from the global array of instances
            var indexOfAwesomplete = _.all.indexOf(this);

            if (indexOfAwesomplete !== -1) {
                _.all.splice(indexOfAwesomplete, 1);
            }
        },

        next: function next() {
            var count = this.ul.children.length;
            this.goto(this.index < count - 1 ? this.index + 1 : count ? 0 : -1);
        },

        previous: function previous() {
            var count = this.ul.children.length;
            var pos = this.index - 1;

            this.goto(this.selected && pos !== -1 ? pos : count - 1);
        },

        // Should not be used, highlights specific item without any checks!
        goto: function goto(i) {
            var lis = this.ul.children;

            if (this.selected) {
                lis[this.index].setAttribute("aria-selected", "false");
            }

            this.index = i;

            if (i > -1 && lis.length > 0) {
                lis[i].setAttribute("aria-selected", "true");

                this.status.textContent = lis[i].textContent + ", list item " + (i + 1) + " of " + lis.length;

                this.input.setAttribute("aria-activedescendant", this.ul.id + "_item_" + this.index);

                // scroll to highlighted element in case parent's height is fixed
                this.ul.scrollTop = lis[i].offsetTop - this.ul.clientHeight + lis[i].clientHeight;

                $.fire(this.input, "awesomplete-highlight", {
                    text: this.suggestions[this.index]
                });
            }
        },

        select: function select(selected, origin) {
            if (selected) {
                this.index = $.siblingIndex(selected);
            } else {
                selected = this.ul.children[this.index];
            }

            if (selected) {
                var suggestion = this.suggestions[this.index];

                var allowed = $.fire(this.input, "awesomplete-select", {
                    text: suggestion,
                    origin: origin || selected
                });

                if (allowed) {
                    this.replace(suggestion);
                    this.close({ reason: "select" });
                    $.fire(this.input, "awesomplete-selectcomplete", {
                        text: suggestion
                    });
                }
            }
        },

        evaluate: function evaluate() {
            var me = this;
            var value = this.input.value;

            if (value.length >= this.minChars && this._list.length > 0) {
                this.index = -1;
                // Populate list with options that match
                this.ul.innerHTML = "";

                this.suggestions = this._list.map(function (item) {
                    return new Suggestion(me.data(item, value));
                }).filter(function (item) {
                    return me.filter(item, value);
                });

                if (this.sort !== false) {
                    this.suggestions = this.suggestions.sort(this.sort);
                }

                this.suggestions = this.suggestions.slice(0, this.maxItems);

                this.suggestions.forEach(function (text, index) {
                    me.ul.appendChild(me.item(text, value, index));
                });

                if (this.ul.children.length === 0) {

                    this.status.textContent = "No results found";

                    this.close({ reason: "nomatches" });
                } else {
                    this.open();

                    this.status.textContent = this.ul.children.length + " results found";
                }
            } else {
                this.close({ reason: "nomatches" });

                this.status.textContent = "No results found";
            }
        }
    };

    // Static methods/properties

    _.all = [];

    _.FILTER_CONTAINS = function (text, input) {
        return RegExp($.regExpEscape(input.trim()), "i").test(text);
    };

    _.FILTER_STARTSWITH = function (text, input) {
        return RegExp("^" + $.regExpEscape(input.trim()), "i").test(text);
    };

    _.SORT_BYLENGTH = function (a, b) {
        if (a.length !== b.length) {
            return a.length - b.length;
        }

        return a < b ? -1 : 1;
    };

    _.ITEM = function (text, input, item_id) {
        var html = input.trim() === "" ? text : text.replace(RegExp($.regExpEscape(input.trim()), "gi"), "<mark>$&</mark>");
        return $.create("li", {
            innerHTML: html,
            "aria-selected": "false",
            "id": "awesomplete_list_" + this.count + "_item_" + item_id
        });
    };

    _.REPLACE = function (text) {
        this.input.value = text.value;
    };

    _.DATA = function (item /*, input*/) {
        return item;
    };

    // Private functions

    function Suggestion(data) {
        var o = Array.isArray(data) ? { label: data[0], value: data[1] } : (typeof data === "undefined" ? "undefined" : _typeof(data)) === "object" && "label" in data && "value" in data ? data : { label: data, value: data };

        this.label = o.label || o.value;
        this.value = o.value;
    }
    Object.defineProperty(Suggestion.prototype = Object.create(String.prototype), "length", {
        get: function get() {
            return this.label.length;
        }
    });
    Suggestion.prototype.toString = Suggestion.prototype.valueOf = function () {
        return "" + this.label;
    };

    function configure(instance, properties, o) {
        for (var i in properties) {
            var initial = properties[i],
                attrValue = instance.input.getAttribute("data-" + i.toLowerCase());

            if (typeof initial === "number") {
                instance[i] = parseInt(attrValue);
            } else if (initial === false) {
                // Boolean options must be false by default anyway
                instance[i] = attrValue !== null;
            } else if (initial instanceof Function) {
                instance[i] = null;
            } else {
                instance[i] = attrValue;
            }

            if (!instance[i] && instance[i] !== 0) {
                instance[i] = i in o ? o[i] : initial;
            }
        }
    }

    // Helpers

    var slice = Array.prototype.slice;

    function $(expr, con) {
        return typeof expr === "string" ? (con || document).querySelector(expr) : expr || null;
    }

    function $$(expr, con) {
        return slice.call((con || document).querySelectorAll(expr));
    }

    $.create = function (tag, o) {
        var element = document.createElement(tag);

        for (var i in o) {
            var val = o[i];

            if (i === "inside") {
                $(val).appendChild(element);
            } else if (i === "around") {
                var ref = $(val);
                ref.parentNode.insertBefore(element, ref);
                element.appendChild(ref);
            } else if (i in element) {
                element[i] = val;
            } else {
                element.setAttribute(i, val);
            }
        }

        return element;
    };

    $.bind = function (element, o) {
        if (element) {
            for (var event in o) {
                var callback = o[event];

                event.split(/\s+/).forEach(function (event) {
                    element.addEventListener(event, callback);
                });
            }
        }
    };

    $.unbind = function (element, o) {
        if (element) {
            for (var event in o) {
                var callback = o[event];

                event.split(/\s+/).forEach(function (event) {
                    element.removeEventListener(event, callback);
                });
            }
        }
    };

    $.fire = function (target, type, properties) {
        var evt = document.createEvent("HTMLEvents");

        evt.initEvent(type, true, true);

        for (var j in properties) {
            evt[j] = properties[j];
        }

        return target.dispatchEvent(evt);
    };

    $.regExpEscape = function (s) {
        return s.replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&");
    };

    $.siblingIndex = function (el) {
        /* eslint-disable no-cond-assign */
        for (var i = 0; el = el.previousElementSibling; i++) {}
        return i;
    };

    // Initialization

    function init() {
        $$("input.awesomplete").forEach(function (input) {
            new _(input);
        });
    }

    // Are we in a browser? Check for Document constructor
    if (typeof Document !== "undefined") {
        // DOM already loaded?
        if (document.readyState !== "loading") {
            init();
        } else {
            // Wait for it
            document.addEventListener("DOMContentLoaded", init);
        }
    }

    _.$ = $;
    _.$$ = $$;

    // Make sure to export Awesomplete on self when in a browser
    if (typeof self !== "undefined") {
        self.Awesomplete = _;
    }

    // Expose Awesomplete as a CJS module
    if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
        module.exports = _;
    }

    return _;
})();