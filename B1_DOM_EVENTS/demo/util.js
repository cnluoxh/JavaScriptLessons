/**********************************
 * utilities for demos            *
 * @author Bosn Ma                *
 * @mail   bosnma@live.cn         *
 * @date   Jun.18th 2012          *
 **********************************/
var util = {};
!function() {
    var _logId = 1,               // log line number
        _eQueue = [],             // event queue
        _con = [],                // console
        _initialized = false;     // util initialization state

    /**
     * check util state
     * @return {boolean} true is valid
     */
    function check() {
        if (!_initialized) {
            alert('please invoke util.init() before use');
            return false;
        }
        return true;
    }

    /**
     * push function to queue
     * @param f {function} function to be invoked
     */
    function _pushQueue(f) {
        _eQueue.push({
            handler : f
        });
    }

    /**
     * initialize util
     * must be invoked before use
     */
    util.init = function() {
        if (_initialized) return;
        _con = $('#console');
        _initialized = true;

        $('#btnSplit').length && $('#btnSplit').click(function() {
            util.log('<hr />', true);
        });

        $('#btnClear').length && $('#btnClear').click(function() {
            _logId = 1;
            $('#console').html('');
        });
    };

    /**
     * add log message
     * @pre   initialize <div id="console"></div> on the page
     * @param msg      {string} message
     * @param noLineNo {boolean} true if no format needed
     */
    util.log = function(msg, noLineNo) {
        if(!check())return;
        if (!_con.length) {
            alert('Plz intialize console by create div with id=console!');
            return;
        }
        _con.html((noLineNo ? msg : '#' + (_logId++) + '#  ' + msg + '<br />') + _con.html()); 
    };

    /**
     * hightlight element
     * @param obj {DOMElement} element to be highlighted
     */
    util.highlight = function(obj) {
        if(!check())return;
        var ele = ((typeof obj === 'string') ? $('#' + obj) : $(obj)),
            oldBg = ele.css('background-color'),
            oldBorder = ele.css('border'),
            oldHtml = ele.html();

        _pushQueue(function() {
            ele.css('background-color', 'yellow');
            ele.css('border', '4px solid red');
            setTimeout(function() {
                ele.css('background-color', oldBg);
                ele.css('border', '');
            }, 1000);
        });
    };

    setInterval(function() {
        if (!_eQueue.length) return;
        _eQueue.shift().handler();
    }, 2000);
}();
