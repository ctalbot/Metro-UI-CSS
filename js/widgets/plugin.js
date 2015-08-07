$.widget( "metro.widget" , {

    version: "3.0.0",

    options: {
        someValue: null
    },
    
    getOptionsFromDom:function() {
        var _self = this;
        $.each(_self.element.data(), function(key, value){
            if (key in _self.options) {
                try {
                    _self.options[key] = $.parseJSON(value);
                } catch (e) {
                    _self.options[key] = value;
                }
            }
        });
    },

    _create: function () {
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = $.parseJSON(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });

        console.log('Hi');

        element.data('widget', this);

    },

    _executeEvent: function(event){
        var result, args = arguments.splice(0, 1);

        if (typeof event === 'function') {
            event.apply(args);
        } else {
            if (typeof window[event] === 'function') {
                window[event].apply(args);
            } else {
                result = eval("(function(){"+event+"})");
                result.apply(args);
            }
        }

    },

    _destroy: function () {
    },

    _setOption: function ( key, value ) {
        this._super('_setOption', key, value);
    }
});
