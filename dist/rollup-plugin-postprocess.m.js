import MagicString from 'magic-string';

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



//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBvc3Rwcm9jZXNzLmpzKG9yaWdpbmFsKSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLGlCQUFpQjtBQUV4QixHQUFBLENBQUk7QUFDSixLQUFBLENBQU0sWUFBWSxHQUFLLEVBQUEsT0FBTixHQUFnQixZQUFBLENBQWE7QUFFOUMsZUFBZSxTQUFTLFlBQVksaUJBQWlCO0lBQ3BELE9BQU87UUFDTixNQUFNLGFBREEsQ0FBQTtRQUVOLFlBQVksSUFBTSxFQUFBLENBQUUsV0FBVyxTQUFVO1lBQ3hDLEdBQUEsQ0FBSSxNQUFNLElBQUksV0FBSixDQUFnQjtZQUMxQixHQUFBLENBQUksZUFBZSxNQUFBLENBQU8sZUFBUCxDQUFBLEdBQUEsQ0FBeUIsVUFBekIsR0FBc0MsZUFBQSxDQUFnQjtnQkFBRSxJQUFGLENBQUE7Z0JBQVEsU0FBUixDQUFBO2dCQUFtQjtpQkFBWTtZQUV4RyxLQUFLLEdBQUEsQ0FBSSxJQUFFLEVBQUcsQ0FBQSxDQUFBLENBQUEsQ0FBRSxZQUFBLENBQWEsUUFBUSxDQUFBLElBQUs7Z0JBQ3pDLEdBQUEsQ0FBSSxDQUFDLEtBQU0sT0FBQSxHQUFRLE1BQU0sWUFBQSxDQUFhO2dCQUN0QyxJQUFJLE1BQUEsQ0FBTyxJQUFQLENBQUEsR0FBQSxDQUFjO29CQUFVLElBQUEsQ0FBQSxDQUFBLENBQU8sSUFBSSxNQUFKLENBQVc7Z0JBQzlDLElBQUksQ0FBQyxJQUFBLENBQUssUUFBUTtvQkFDakIsSUFBQSxDQUFBLENBQUEsQ0FBTyxJQUFJLE1BQUosQ0FBVyxJQUFBLENBQUssUUFBUSxHQUFBLENBQUEsQ0FBQSxDQUFNLE1BQUEsQ0FBTyxLQUFQLENBQWEsS0FBYixDQUFtQixJQUFuQixDQUF3QixHQUF4QjtnQkFDMUM7Z0JBRUksR0FBQSxDQUFJO2dCQUNKLE9BQU8sS0FBQSxDQUFBLENBQUEsQ0FBTSxJQUFBLENBQUssSUFBTCxDQUFVLE9BQU87b0JBQzdCLEdBQUEsQ0FBSTtvQkFDSixJQUFJLE1BQUEsQ0FBTyxPQUFQLENBQUEsR0FBQSxDQUFpQixZQUFZO3dCQUNoQyxLQUFBLENBQUEsQ0FBQSxDQUFRLE9BQUEsQ0FBUSxLQUFSLENBQWMsTUFBTTt3QkFDNUIsSUFBSSxLQUFBLENBQUEsRUFBQSxDQUFPOzRCQUFNLEtBQUEsQ0FBQSxDQUFBLENBQVE7b0JBQy9CLE9BQ1U7d0JBQ0osWUFBQSxDQUFBLENBQUEsQ0FBZTt3QkFDZixLQUFBLENBQUEsQ0FBQSxDQUFRLE9BQUEsQ0FBUSxPQUFSLENBQWdCLFdBQVc7b0JBQ3pDO29CQUNLLEdBQUEsQ0FBSSxTQUFKLENBQWMsS0FBQSxDQUFNLE9BQU8sS0FBQSxDQUFNLEtBQU4sQ0FBQSxDQUFBLENBQWMsS0FBQSxDQUFNLEVBQU4sQ0FBUyxRQUFRO2dCQUMvRDtZQUNBO1lBRUcsT0FBTztnQkFDTixNQUFNLEdBQUEsQ0FBSSxRQUFKLEVBREEsQ0FBQTtnQkFFTixLQUFLLFNBQUEsQ0FBQSxHQUFBLENBQVksS0FBWixHQUFvQixPQUFPLEdBQUEsQ0FBSSxXQUFKLENBQWdCO29CQUFFLE9BQU87OztRQUU3RDs7QUFFQTs7QUF4Q0EiLCJmaWxlIjoicG9zdHByb2Nlc3MuanMob3JpZ2luYWwpIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE1hZ2ljU3RyaW5nIGZyb20gJ21hZ2ljLXN0cmluZyc7XG5cbmxldCBjdXJyZW50VG9rZW47XG5jb25zdCByZXBsYWNlciA9IChzdHIsIGluZGV4KSA9PiBjdXJyZW50VG9rZW5baW5kZXhdO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwb3N0cHJvY2VzcyhhbGxSZXBsYWNlbWVudHMpIHtcblx0cmV0dXJuIHtcblx0XHRuYW1lOiAncG9zdHByb2Nlc3MnLFxuXHRcdHJlbmRlckNodW5rKGNvZGUsIHsgc291cmNlTWFwLCBmb3JtYXQgfSkge1xuXHRcdFx0bGV0IHN0ciA9IG5ldyBNYWdpY1N0cmluZyhjb2RlKTtcblx0XHRcdGxldCByZXBsYWNlbWVudHMgPSB0eXBlb2YgYWxsUmVwbGFjZW1lbnRzPT09J2Z1bmN0aW9uJyA/IGFsbFJlcGxhY2VtZW50cyh7IGNvZGUsIHNvdXJjZU1hcCwgZm9ybWF0IH0pIDogYWxsUmVwbGFjZW1lbnRzO1xuXG5cdFx0XHRmb3IgKGxldCBpPTA7IGk8cmVwbGFjZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGxldCBbZmluZCwgcmVwbGFjZT0nJ10gPSByZXBsYWNlbWVudHNbaV07XG5cdFx0XHRcdGlmICh0eXBlb2YgZmluZD09PSdzdHJpbmcnKSBmaW5kID0gbmV3IFJlZ0V4cChmaW5kKTtcblx0XHRcdFx0aWYgKCFmaW5kLmdsb2JhbCkge1xuXHRcdFx0XHRcdGZpbmQgPSBuZXcgUmVnRXhwKGZpbmQuc291cmNlLCAnZycgKyBTdHJpbmcoZmluZCkuc3BsaXQoJy8nKS5wb3AoKSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRsZXQgdG9rZW47XG5cdFx0XHRcdHdoaWxlICh0b2tlbj1maW5kLmV4ZWMoY29kZSkpIHtcblx0XHRcdFx0XHRsZXQgdmFsdWU7XG5cdFx0XHRcdFx0aWYgKHR5cGVvZiByZXBsYWNlPT09J2Z1bmN0aW9uJykge1xuXHRcdFx0XHRcdFx0dmFsdWUgPSByZXBsYWNlLmFwcGx5KG51bGwsIHRva2VuKTtcblx0XHRcdFx0XHRcdGlmICh2YWx1ZT09bnVsbCkgdmFsdWUgPSAnJztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHRjdXJyZW50VG9rZW4gPSB0b2tlbjtcblx0XHRcdFx0XHRcdHZhbHVlID0gcmVwbGFjZS5yZXBsYWNlKC9cXCQoXFxkKykvLCByZXBsYWNlcik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHN0ci5vdmVyd3JpdGUodG9rZW4uaW5kZXgsIHRva2VuLmluZGV4ICsgdG9rZW5bMF0ubGVuZ3RoLCB2YWx1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0Y29kZTogc3RyLnRvU3RyaW5nKCksXG5cdFx0XHRcdG1hcDogc291cmNlTWFwPT09ZmFsc2UgPyBudWxsIDogc3RyLmdlbmVyYXRlTWFwKHsgaGlyZXM6IHRydWUgfSlcblx0XHRcdH07XG5cdFx0fVxuXHR9O1xufVxuIl19

export default postprocess;
//# sourceMappingURL=rollup-plugin-postprocess.m.js.map
