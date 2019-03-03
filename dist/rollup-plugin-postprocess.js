function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var MagicString = _interopDefault(require('magic-string'));

var currentToken;
var replacer = function (str, index) { return currentToken[index]; };
function postprocess(allReplacements) {
    return {
        name: 'postprocess',
        renderChunk: function renderChunk(code, ref) {
            var sourceMap = ref.sourceMap;
            var format = ref.format;

            var str = new MagicString(code);
            var replacements = typeof allReplacements === 'function' ? allReplacements({
                code: code,
                sourceMap: sourceMap,
                format: format
            }) : allReplacements;
            for (var i = 0;i < replacements.length; i++) {
                var ref$1 = replacements[i];
                var find = ref$1[0];
                var replace = ref$1[1]; if ( replace === void 0 ) replace = '';
                if (typeof find === 'string') 
                    { find = new RegExp(find); }
                if (!find.global) {
                    find = new RegExp(find.source, 'g' + String(find).split('/').pop());
                }
                var token = (void 0);
                while (token = find.exec(code)) {
                    var value = (void 0);
                    if (typeof replace === 'function') {
                        value = replace.apply(null, token);
                        if (value == null) 
                            { value = ''; }
                    } else {
                        currentToken = token;
                        value = replace.replace(/\$(\d+)/, replacer);
                    }
                    str.overwrite(token.index, token.index + token[0].length, value);
                }
            }
            return {
                code: str.toString(),
                map: sourceMap === false ? null : str.generateMap({
                    hires: true
                })
            };
        }
    };
}

module.exports = postprocess;
//# sourceMappingURL=rollup-plugin-postprocess.js.map
