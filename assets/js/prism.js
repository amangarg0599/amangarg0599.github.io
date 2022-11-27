/* PrismJS 1.19.0
https://prismjs.com/download.html#themes=prism&languages=markup+css+clike+javascript+diff+git+go+graphql+groovy+haml+handlebars+json+liquid+markup-templating+ruby&plugins=line-numbers+file-highlight+show-language+jsonp-highlight+command-line+toolbar+copy-to-clipboard+download-button+match-braces+diff-highlight+filter-highlight-all+treeview */
var _self =
    "undefined" != typeof window
      ? window
      : "undefined" != typeof WorkerGlobalScope &&
        self instanceof WorkerGlobalScope
      ? self
      : {},
  Prism = (function (u) {
    var c = /\blang(?:uage)?-([\w-]+)\b/i,
      n = 0,
      C = {
        manual: u.Prism && u.Prism.manual,
        disableWorkerMessageHandler:
          u.Prism && u.Prism.disableWorkerMessageHandler,
        util: {
          encode: function e(n) {
            return n instanceof _
              ? new _(n.type, e(n.content), n.alias)
              : Array.isArray(n)
              ? n.map(e)
              : n
                  .replace(/&/g, "&amp;")
                  .replace(/</g, "&lt;")
                  .replace(/\u00a0/g, " ");
          },
          type: function (e) {
            return Object.prototype.toString.call(e).slice(8, -1);
          },
          objId: function (e) {
            return (
              e.__id || Object.defineProperty(e, "__id", { value: ++n }), e.__id
            );
          },
          clone: function t(e, r) {
            var a,
              n,
              l = C.util.type(e);
            switch (((r = r || {}), l)) {
              case "Object":
                if (((n = C.util.objId(e)), r[n])) return r[n];
                for (var i in ((a = {}), (r[n] = a), e))
                  e.hasOwnProperty(i) && (a[i] = t(e[i], r));
                return a;
              case "Array":
                return (
                  (n = C.util.objId(e)),
                  r[n]
                    ? r[n]
                    : ((a = []),
                      (r[n] = a),
                      e.forEach(function (e, n) {
                        a[n] = t(e, r);
                      }),
                      a)
                );
              default:
                return e;
            }
          },
          getLanguage: function (e) {
            for (; e && !c.test(e.className); ) e = e.parentElement;
            return e
              ? (e.className.match(c) || [, "none"])[1].toLowerCase()
              : "none";
          },
          currentScript: function () {
            if ("undefined" == typeof document) return null;
            if ("currentScript" in document) return document.currentScript;
            try {
              throw new Error();
            } catch (e) {
              var n = (/at [^(\r\n]*\((.*):.+:.+\)$/i.exec(e.stack) || [])[1];
              if (n) {
                var t = document.getElementsByTagName("script");
                for (var r in t) if (t[r].src == n) return t[r];
              }
              return null;
            }
          },
        },
        languages: {
          extend: function (e, n) {
            var t = C.util.clone(C.languages[e]);
            for (var r in n) t[r] = n[r];
            return t;
          },
          insertBefore: function (t, e, n, r) {
            var a = (r = r || C.languages)[t],
              l = {};
            for (var i in a)
              if (a.hasOwnProperty(i)) {
                if (i == e)
                  for (var o in n) n.hasOwnProperty(o) && (l[o] = n[o]);
                n.hasOwnProperty(i) || (l[i] = a[i]);
              }
            var s = r[t];
            return (
              (r[t] = l),
              C.languages.DFS(C.languages, function (e, n) {
                n === s && e != t && (this[e] = l);
              }),
              l
            );
          },
          DFS: function e(n, t, r, a) {
            a = a || {};
            var l = C.util.objId;
            for (var i in n)
              if (n.hasOwnProperty(i)) {
                t.call(n, i, n[i], r || i);
                var o = n[i],
                  s = C.util.type(o);
                "Object" !== s || a[l(o)]
                  ? "Array" !== s || a[l(o)] || ((a[l(o)] = !0), e(o, t, i, a))
                  : ((a[l(o)] = !0), e(o, t, null, a));
              }
          },
        },
        plugins: {},
        highlightAll: function (e, n) {
          C.highlightAllUnder(document, e, n);
        },
        highlightAllUnder: function (e, n, t) {
          var r = {
            callback: t,
            container: e,
            selector:
              'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code',
          };
          C.hooks.run("before-highlightall", r),
            (r.elements = Array.prototype.slice.apply(
              r.container.querySelectorAll(r.selector)
            )),
            C.hooks.run("before-all-elements-highlight", r);
          for (var a, l = 0; (a = r.elements[l++]); )
            C.highlightElement(a, !0 === n, r.callback);
        },
        highlightElement: function (e, n, t) {
          var r = C.util.getLanguage(e),
            a = C.languages[r];
          e.className =
            e.className.replace(c, "").replace(/\s+/g, " ") + " language-" + r;
          var l = e.parentNode;
          l &&
            "pre" === l.nodeName.toLowerCase() &&
            (l.className =
              l.className.replace(c, "").replace(/\s+/g, " ") +
              " language-" +
              r);
          var i = { element: e, language: r, grammar: a, code: e.textContent };
          function o(e) {
            (i.highlightedCode = e),
              C.hooks.run("before-insert", i),
              (i.element.innerHTML = i.highlightedCode),
              C.hooks.run("after-highlight", i),
              C.hooks.run("complete", i),
              t && t.call(i.element);
          }
          if ((C.hooks.run("before-sanity-check", i), !i.code))
            return C.hooks.run("complete", i), void (t && t.call(i.element));
          if ((C.hooks.run("before-highlight", i), i.grammar))
            if (n && u.Worker) {
              var s = new Worker(C.filename);
              (s.onmessage = function (e) {
                o(e.data);
              }),
                s.postMessage(
                  JSON.stringify({
                    language: i.language,
                    code: i.code,
                    immediateClose: !0,
                  })
                );
            } else o(C.highlight(i.code, i.grammar, i.language));
          else o(C.util.encode(i.code));
        },
        highlight: function (e, n, t) {
          var r = { code: e, grammar: n, language: t };
          return (
            C.hooks.run("before-tokenize", r),
            (r.tokens = C.tokenize(r.code, r.grammar)),
            C.hooks.run("after-tokenize", r),
            _.stringify(C.util.encode(r.tokens), r.language)
          );
        },
        tokenize: function (e, n) {
          var t = n.rest;
          if (t) {
            for (var r in t) n[r] = t[r];
            delete n.rest;
          }
          var a = new l();
          return (
            M(a, a.head, e),
            (function e(n, t, r, a, l, i, o) {
              for (var s in r)
                if (r.hasOwnProperty(s) && r[s]) {
                  var u = r[s];
                  u = Array.isArray(u) ? u : [u];
                  for (var c = 0; c < u.length; ++c) {
                    if (o && o == s + "," + c) return;
                    var g = u[c],
                      f = g.inside,
                      h = !!g.lookbehind,
                      d = !!g.greedy,
                      v = 0,
                      p = g.alias;
                    if (d && !g.pattern.global) {
                      var m = g.pattern.toString().match(/[imsuy]*$/)[0];
                      g.pattern = RegExp(g.pattern.source, m + "g");
                    }
                    g = g.pattern || g;
                    for (
                      var y = a.next, k = l;
                      y !== t.tail;
                      k += y.value.length, y = y.next
                    ) {
                      var b = y.value;
                      if (t.length > n.length) return;
                      if (!(b instanceof _)) {
                        var x = 1;
                        if (d && y != t.tail.prev) {
                          g.lastIndex = k;
                          var w = g.exec(n);
                          if (!w) break;
                          var A = w.index + (h && w[1] ? w[1].length : 0),
                            P = w.index + w[0].length,
                            S = k;
                          for (S += y.value.length; S <= A; )
                            (y = y.next), (S += y.value.length);
                          if (
                            ((S -= y.value.length),
                            (k = S),
                            y.value instanceof _)
                          )
                            continue;
                          for (
                            var O = y;
                            O !== t.tail &&
                            (S < P ||
                              ("string" == typeof O.value &&
                                !O.prev.value.greedy));
                            O = O.next
                          )
                            x++, (S += O.value.length);
                          x--, (b = n.slice(k, S)), (w.index -= k);
                        } else {
                          g.lastIndex = 0;
                          var w = g.exec(b);
                        }
                        if (w) {
                          h && (v = w[1] ? w[1].length : 0);
                          var A = w.index + v,
                            w = w[0].slice(v),
                            P = A + w.length,
                            E = b.slice(0, A),
                            N = b.slice(P),
                            j = y.prev;
                          E && ((j = M(t, j, E)), (k += E.length)), W(t, j, x);
                          var L = new _(s, f ? C.tokenize(w, f) : w, p, w, d);
                          if (
                            ((y = M(t, j, L)),
                            N && M(t, y, N),
                            1 < x && e(n, t, r, y.prev, k, !0, s + "," + c),
                            i)
                          )
                            break;
                        } else if (i) break;
                      }
                    }
                  }
                }
            })(e, a, n, a.head, 0),
            (function (e) {
              var n = [],
                t = e.head.next;
              for (; t !== e.tail; ) n.push(t.value), (t = t.next);
              return n;
            })(a)
          );
        },
        hooks: {
          all: {},
          add: function (e, n) {
            var t = C.hooks.all;
            (t[e] = t[e] || []), t[e].push(n);
          },
          run: function (e, n) {
            var t = C.hooks.all[e];
            if (t && t.length) for (var r, a = 0; (r = t[a++]); ) r(n);
          },
        },
        Token: _,
      };
    function _(e, n, t, r, a) {
      (this.type = e),
        (this.content = n),
        (this.alias = t),
        (this.length = 0 | (r || "").length),
        (this.greedy = !!a);
    }
    function l() {
      var e = { value: null, prev: null, next: null },
        n = { value: null, prev: e, next: null };
      (e.next = n), (this.head = e), (this.tail = n), (this.length = 0);
    }
    function M(e, n, t) {
      var r = n.next,
        a = { value: t, prev: n, next: r };
      return (n.next = a), (r.prev = a), e.length++, a;
    }
    function W(e, n, t) {
      for (var r = n.next, a = 0; a < t && r !== e.tail; a++) r = r.next;
      ((n.next = r).prev = n), (e.length -= a);
    }
    if (
      ((u.Prism = C),
      (_.stringify = function n(e, t) {
        if ("string" == typeof e) return e;
        if (Array.isArray(e)) {
          var r = "";
          return (
            e.forEach(function (e) {
              r += n(e, t);
            }),
            r
          );
        }
        var a = {
            type: e.type,
            content: n(e.content, t),
            tag: "span",
            classes: ["token", e.type],
            attributes: {},
            language: t,
          },
          l = e.alias;
        l &&
          (Array.isArray(l)
            ? Array.prototype.push.apply(a.classes, l)
            : a.classes.push(l)),
          C.hooks.run("wrap", a);
        var i = "";
        for (var o in a.attributes)
          i +=
            " " +
            o +
            '="' +
            (a.attributes[o] || "").replace(/"/g, "&quot;") +
            '"';
        return (
          "<" +
          a.tag +
          ' class="' +
          a.classes.join(" ") +
          '"' +
          i +
          ">" +
          a.content +
          "</" +
          a.tag +
          ">"
        );
      }),
      !u.document)
    )
      return (
        u.addEventListener &&
          (C.disableWorkerMessageHandler ||
            u.addEventListener(
              "message",
              function (e) {
                var n = JSON.parse(e.data),
                  t = n.language,
                  r = n.code,
                  a = n.immediateClose;
                u.postMessage(C.highlight(r, C.languages[t], t)),
                  a && u.close();
              },
              !1
            )),
        C
      );
    var e = C.util.currentScript();
    function t() {
      C.manual || C.highlightAll();
    }
    if (
      (e &&
        ((C.filename = e.src),
        e.hasAttribute("data-manual") && (C.manual = !0)),
      !C.manual)
    ) {
      var r = document.readyState;
      "loading" === r || ("interactive" === r && e && e.defer)
        ? document.addEventListener("DOMContentLoaded", t)
        : window.requestAnimationFrame
        ? window.requestAnimationFrame(t)
        : window.setTimeout(t, 16);
    }
    return C;
  })(_self);
"undefined" != typeof module && module.exports && (module.exports = Prism),
  "undefined" != typeof global && (global.Prism = Prism);
(Prism.languages.markup = {
  comment: /<!--[\s\S]*?-->/,
  prolog: /<\?[\s\S]+?\?>/,
  doctype: {
    pattern:
      /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:(?!<!--)[^"'\]]|"[^"]*"|'[^']*'|<!--[\s\S]*?-->)*\]\s*)?>/i,
    greedy: !0,
  },
  cdata: /<!\[CDATA\[[\s\S]*?]]>/i,
  tag: {
    pattern:
      /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/i,
    greedy: !0,
    inside: {
      tag: {
        pattern: /^<\/?[^\s>\/]+/i,
        inside: { punctuation: /^<\/?/, namespace: /^[^\s>\/:]+:/ },
      },
      "attr-value": {
        pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/i,
        inside: {
          punctuation: [/^=/, { pattern: /^(\s*)["']|["']$/, lookbehind: !0 }],
        },
      },
      punctuation: /\/?>/,
      "attr-name": {
        pattern: /[^\s>\/]+/,
        inside: { namespace: /^[^\s>\/:]+:/ },
      },
    },
  },
  entity: /&#?[\da-z]{1,8};/i,
}),
  (Prism.languages.markup.tag.inside["attr-value"].inside.entity =
    Prism.languages.markup.entity),
  Prism.hooks.add("wrap", function (a) {
    "entity" === a.type &&
      (a.attributes.title = a.content.replace(/&amp;/, "&"));
  }),
  Object.defineProperty(Prism.languages.markup.tag, "addInlined", {
    value: function (a, e) {
      var s = {};
      (s["language-" + e] = {
        pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
        lookbehind: !0,
        inside: Prism.languages[e],
      }),
        (s.cdata = /^<!\[CDATA\[|\]\]>$/i);
      var n = {
        "included-cdata": { pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i, inside: s },
      };
      n["language-" + e] = { pattern: /[\s\S]+/, inside: Prism.languages[e] };
      var t = {};
      (t[a] = {
        pattern: RegExp(
          "(<__[\\s\\S]*?>)(?:<!\\[CDATA\\[[\\s\\S]*?\\]\\]>\\s*|[\\s\\S])*?(?=<\\/__>)".replace(
            /__/g,
            function () {
              return a;
            }
          ),
          "i"
        ),
        lookbehind: !0,
        greedy: !0,
        inside: n,
      }),
        Prism.languages.insertBefore("markup", "cdata", t);
    },
  }),
  (Prism.languages.xml = Prism.languages.extend("markup", {})),
  (Prism.languages.html = Prism.languages.markup),
  (Prism.languages.mathml = Prism.languages.markup),
  (Prism.languages.svg = Prism.languages.markup);
!(function (s) {
  var e = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/;
  (s.languages.css = {
    comment: /\/\*[\s\S]*?\*\//,
    atrule: {
      pattern: /@[\w-]+[\s\S]*?(?:;|(?=\s*\{))/,
      inside: {
        rule: /^@[\w-]+/,
        "selector-function-argument": {
          pattern:
            /(\bselector\s*\((?!\s*\))\s*)(?:[^()]|\((?:[^()]|\([^()]*\))*\))+?(?=\s*\))/,
          lookbehind: !0,
          alias: "selector",
        },
      },
    },
    url: {
      pattern: RegExp("url\\((?:" + e.source + "|[^\n\r()]*)\\)", "i"),
      greedy: !0,
      inside: { function: /^url/i, punctuation: /^\(|\)$/ },
    },
    selector: RegExp("[^{}\\s](?:[^{};\"']|" + e.source + ")*?(?=\\s*\\{)"),
    string: { pattern: e, greedy: !0 },
    property: /[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i,
    important: /!important\b/i,
    function: /[-a-z0-9]+(?=\()/i,
    punctuation: /[(){};:,]/,
  }),
    (s.languages.css.atrule.inside.rest = s.languages.css);
  var t = s.languages.markup;
  t &&
    (t.tag.addInlined("style", "css"),
    s.languages.insertBefore(
      "inside",
      "attr-value",
      {
        "style-attr": {
          pattern: /\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i,
          inside: {
            "attr-name": { pattern: /^\s*style/i, inside: t.tag.inside },
            punctuation: /^\s*=\s*['"]|['"]\s*$/,
            "attr-value": { pattern: /.+/i, inside: s.languages.css },
          },
          alias: "language-css",
        },
      },
      t.tag
    ));
})(Prism);
Prism.languages.clike = {
  comment: [
    { pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/, lookbehind: !0 },
    { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0, greedy: !0 },
  ],
  string: {
    pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    greedy: !0,
  },
  "class-name": {
    pattern:
      /(\b(?:class|interface|extends|implements|trait|instanceof|new)\s+|\bcatch\s+\()[\w.\\]+/i,
    lookbehind: !0,
    inside: { punctuation: /[.\\]/ },
  },
  keyword:
    /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
  boolean: /\b(?:true|false)\b/,
  function: /\w+(?=\()/,
  number: /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,
  operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
  punctuation: /[{}[\];(),.:]/,
};
(Prism.languages.javascript = Prism.languages.extend("clike", {
  "class-name": [
    Prism.languages.clike["class-name"],
    {
      pattern:
        /(^|[^$\w\xA0-\uFFFF])[_$A-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\.(?:prototype|constructor))/,
      lookbehind: !0,
    },
  ],
  keyword: [
    { pattern: /((?:^|})\s*)(?:catch|finally)\b/, lookbehind: !0 },
    {
      pattern:
        /(^|[^.]|\.\.\.\s*)\b(?:as|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
      lookbehind: !0,
    },
  ],
  number:
    /\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/,
  function:
    /#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
  operator:
    /--|\+\+|\*\*=?|=>|&&|\|\||[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?[.?]?|[~:]/,
})),
  (Prism.languages.javascript["class-name"][0].pattern =
    /(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/),
  Prism.languages.insertBefore("javascript", "keyword", {
    regex: {
      pattern:
        /((?:^|[^$\w\xA0-\uFFFF."'\])\s])\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*]|\\.|[^/\\\[\r\n])+\/[gimyus]{0,6}(?=(?:\s|\/\*[\s\S]*?\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/,
      lookbehind: !0,
      greedy: !0,
    },
    "function-variable": {
      pattern:
        /#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/,
      alias: "function",
    },
    parameter: [
      {
        pattern:
          /(function(?:\s+[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)?\s*\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\))/,
        lookbehind: !0,
        inside: Prism.languages.javascript,
      },
      {
        pattern: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=>)/i,
        inside: Prism.languages.javascript,
      },
      {
        pattern: /(\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*=>)/,
        lookbehind: !0,
        inside: Prism.languages.javascript,
      },
      {
        pattern:
          /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*\s*)\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*\{)/,
        lookbehind: !0,
        inside: Prism.languages.javascript,
      },
    ],
    constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/,
  }),
  Prism.languages.insertBefore("javascript", "string", {
    "template-string": {
      pattern:
        /`(?:\\[\s\S]|\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}|(?!\${)[^\\`])*`/,
      greedy: !0,
      inside: {
        "template-punctuation": { pattern: /^`|`$/, alias: "string" },
        interpolation: {
          pattern: /((?:^|[^\\])(?:\\{2})*)\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}/,
          lookbehind: !0,
          inside: {
            "interpolation-punctuation": {
              pattern: /^\${|}$/,
              alias: "punctuation",
            },
            rest: Prism.languages.javascript,
          },
        },
        string: /[\s\S]+/,
      },
    },
  }),
  Prism.languages.markup &&
    Prism.languages.markup.tag.addInlined("script", "javascript"),
  (Prism.languages.js = Prism.languages.javascript);
!(function (d) {
  d.languages.diff = {
    coord: [/^(?:\*{3}|-{3}|\+{3}).*$/m, /^@@.*@@$/m, /^\d+.*$/m],
  };
  var r = {
    "deleted-sign": "-",
    "deleted-arrow": "<",
    "inserted-sign": "+",
    "inserted-arrow": ">",
    unchanged: " ",
    diff: "!",
  };
  Object.keys(r).forEach(function (e) {
    var n = r[e],
      a = [];
    /^\w+$/.test(e) || a.push(/\w+/.exec(e)[0]),
      "diff" === e && a.push("bold"),
      (d.languages.diff[e] = {
        pattern: RegExp("^(?:[" + n + "].*(?:\r\n?|\n|(?![\\s\\S])))+", "m"),
        alias: a,
      });
  }),
    Object.defineProperty(d.languages.diff, "PREFIXES", { value: r });
})(Prism);
Prism.languages.git = {
  comment: /^#.*/m,
  deleted: /^[-–].*/m,
  inserted: /^\+.*/m,
  string: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/m,
  command: { pattern: /^.*\$ git .*$/m, inside: { parameter: /\s--?\w+/m } },
  coord: /^@@.*@@$/m,
  commit_sha1: /^commit \w{40}$/m,
};
(Prism.languages.go = Prism.languages.extend("clike", {
  keyword:
    /\b(?:break|case|chan|const|continue|default|defer|else|fallthrough|for|func|go(?:to)?|if|import|interface|map|package|range|return|select|struct|switch|type|var)\b/,
  builtin:
    /\b(?:bool|byte|complex(?:64|128)|error|float(?:32|64)|rune|string|u?int(?:8|16|32|64)?|uintptr|append|cap|close|complex|copy|delete|imag|len|make|new|panic|print(?:ln)?|real|recover)\b/,
  boolean: /\b(?:_|iota|nil|true|false)\b/,
  operator:
    /[*\/%^!=]=?|\+[=+]?|-[=-]?|\|[=|]?|&(?:=|&|\^=?)?|>(?:>=?|=)?|<(?:<=?|=|-)?|:=|\.\.\./,
  number: /(?:\b0x[a-f\d]+|(?:\b\d+\.?\d*|\B\.\d+)(?:e[-+]?\d+)?)i?/i,
  string: { pattern: /(["'`])(?:\\[\s\S]|(?!\1)[^\\])*\1/, greedy: !0 },
})),
  delete Prism.languages.go["class-name"];
Prism.languages.graphql = {
  comment: /#.*/,
  string: { pattern: /"(?:\\.|[^\\"\r\n])*"/, greedy: !0 },
  number: /(?:\B-|\b)\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
  boolean: /\b(?:true|false)\b/,
  variable: /\$[a-z_]\w*/i,
  directive: { pattern: /@[a-z_]\w*/i, alias: "function" },
  "attr-name": {
    pattern: /[a-z_]\w*(?=\s*(?:\((?:[^()"]|"(?:\\.|[^\\"\r\n])*")*\))?:)/i,
    greedy: !0,
  },
  "class-name": {
    pattern:
      /(\b(?:enum|implements|interface|on|scalar|type|union)\s+)[a-zA-Z_]\w*/,
    lookbehind: !0,
  },
  fragment: {
    pattern: /(\bfragment\s+|\.{3}\s*(?!on\b))[a-zA-Z_]\w*/,
    lookbehind: !0,
    alias: "function",
  },
  keyword:
    /\b(?:enum|fragment|implements|input|interface|mutation|on|query|scalar|schema|type|union)\b/,
  operator: /[!=|]|\.{3}/,
  punctuation: /[!(){}\[\]:=,]/,
  constant: /\b(?!ID\b)[A-Z][A-Z_\d]*\b/,
};
(Prism.languages.groovy = Prism.languages.extend("clike", {
  string: [
    {
      pattern: /("""|''')(?:[^\\]|\\[\s\S])*?\1|\$\/(?:\$\/\$|[\s\S])*?\/\$/,
      greedy: !0,
    },
    { pattern: /(["'/])(?:\\.|(?!\1)[^\\\r\n])*\1/, greedy: !0 },
  ],
  keyword:
    /\b(?:as|def|in|abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|native|new|package|private|protected|public|return|short|static|strictfp|super|switch|synchronized|this|throw|throws|trait|transient|try|void|volatile|while)\b/,
  number:
    /\b(?:0b[01_]+|0x[\da-f_]+(?:\.[\da-f_p\-]+)?|[\d_]+(?:\.[\d_]+)?(?:e[+-]?[\d]+)?)[glidf]?\b/i,
  operator: {
    pattern:
      /(^|[^.])(?:~|==?~?|\?[.:]?|\*(?:[.=]|\*=?)?|\.[@&]|\.\.<|\.\.(?!\.)|-[-=>]?|\+[+=]?|!=?|<(?:<=?|=>?)?|>(?:>>?=?|=)?|&[&=]?|\|[|=]?|\/=?|\^=?|%=?)/,
    lookbehind: !0,
  },
  punctuation: /\.+|[{}[\];(),.:$]/,
})),
  Prism.languages.insertBefore("groovy", "string", {
    shebang: { pattern: /#!.+/, alias: "comment" },
  }),
  Prism.languages.insertBefore("groovy", "punctuation", {
    "spock-block": /\b(?:setup|given|when|then|and|cleanup|expect|where):/,
  }),
  Prism.languages.insertBefore("groovy", "function", {
    annotation: {
      pattern: /(^|[^.])@\w+/,
      lookbehind: !0,
      alias: "punctuation",
    },
  }),
  Prism.hooks.add("wrap", function (e) {
    if ("groovy" === e.language && "string" === e.type) {
      var t = e.content[0];
      if ("'" != t) {
        var n = /([^\\])(?:\$(?:\{.*?\}|[\w.]+))/;
        "$" === t && (n = /([^\$])(?:\$(?:\{.*?\}|[\w.]+))/),
          (e.content = e.content.replace(/&lt;/g, "<").replace(/&amp;/g, "&")),
          (e.content = Prism.highlight(e.content, {
            expression: {
              pattern: n,
              lookbehind: !0,
              inside: Prism.languages.groovy,
            },
          })),
          e.classes.push("/" === t ? "regex" : "gstring");
      }
    }
  });
!(function (e) {
  e.languages.ruby = e.languages.extend("clike", {
    comment: [/#.*/, { pattern: /^=begin\s[\s\S]*?^=end/m, greedy: !0 }],
    "class-name": {
      pattern: /(\b(?:class)\s+|\bcatch\s+\()[\w.\\]+/i,
      lookbehind: !0,
      inside: { punctuation: /[.\\]/ },
    },
    keyword:
      /\b(?:alias|and|BEGIN|begin|break|case|class|def|define_method|defined|do|each|else|elsif|END|end|ensure|extend|for|if|in|include|module|new|next|nil|not|or|prepend|protected|private|public|raise|redo|require|rescue|retry|return|self|super|then|throw|undef|unless|until|when|while|yield)\b/,
  });
  var n = {
    pattern: /#\{[^}]+\}/,
    inside: {
      delimiter: { pattern: /^#\{|\}$/, alias: "tag" },
      rest: e.languages.ruby,
    },
  };
  delete e.languages.ruby.function,
    e.languages.insertBefore("ruby", "keyword", {
      regex: [
        {
          pattern:
            /%r([^a-zA-Z0-9\s{(\[<])(?:(?!\1)[^\\]|\\[\s\S])*\1[gim]{0,3}/,
          greedy: !0,
          inside: { interpolation: n },
        },
        {
          pattern: /%r\((?:[^()\\]|\\[\s\S])*\)[gim]{0,3}/,
          greedy: !0,
          inside: { interpolation: n },
        },
        {
          pattern: /%r\{(?:[^#{}\\]|#(?:\{[^}]+\})?|\\[\s\S])*\}[gim]{0,3}/,
          greedy: !0,
          inside: { interpolation: n },
        },
        {
          pattern: /%r\[(?:[^\[\]\\]|\\[\s\S])*\][gim]{0,3}/,
          greedy: !0,
          inside: { interpolation: n },
        },
        {
          pattern: /%r<(?:[^<>\\]|\\[\s\S])*>[gim]{0,3}/,
          greedy: !0,
          inside: { interpolation: n },
        },
        {
          pattern:
            /(^|[^/])\/(?!\/)(?:\[[^\r\n\]]+\]|\\.|[^[/\\\r\n])+\/[gim]{0,3}(?=\s*(?:$|[\r\n,.;})]))/,
          lookbehind: !0,
          greedy: !0,
        },
      ],
      variable: /[@$]+[a-zA-Z_]\w*(?:[?!]|\b)/,
      symbol: { pattern: /(^|[^:]):[a-zA-Z_]\w*(?:[?!]|\b)/, lookbehind: !0 },
      "method-definition": {
        pattern: /(\bdef\s+)[\w.]+/,
        lookbehind: !0,
        inside: { function: /\w+$/, rest: e.languages.ruby },
      },
    }),
    e.languages.insertBefore("ruby", "number", {
      builtin:
        /\b(?:Array|Bignum|Binding|Class|Continuation|Dir|Exception|FalseClass|File|Stat|Fixnum|Float|Hash|Integer|IO|MatchData|Method|Module|NilClass|Numeric|Object|Proc|Range|Regexp|String|Struct|TMS|Symbol|ThreadGroup|Thread|Time|TrueClass)\b/,
      constant: /\b[A-Z]\w*(?:[?!]|\b)/,
    }),
    (e.languages.ruby.string = [
      {
        pattern: /%[qQiIwWxs]?([^a-zA-Z0-9\s{(\[<])(?:(?!\1)[^\\]|\\[\s\S])*\1/,
        greedy: !0,
        inside: { interpolation: n },
      },
      {
        pattern: /%[qQiIwWxs]?\((?:[^()\\]|\\[\s\S])*\)/,
        greedy: !0,
        inside: { interpolation: n },
      },
      {
        pattern: /%[qQiIwWxs]?\{(?:[^#{}\\]|#(?:\{[^}]+\})?|\\[\s\S])*\}/,
        greedy: !0,
        inside: { interpolation: n },
      },
      {
        pattern: /%[qQiIwWxs]?\[(?:[^\[\]\\]|\\[\s\S])*\]/,
        greedy: !0,
        inside: { interpolation: n },
      },
      {
        pattern: /%[qQiIwWxs]?<(?:[^<>\\]|\\[\s\S])*>/,
        greedy: !0,
        inside: { interpolation: n },
      },
      {
        pattern: /("|')(?:#\{[^}]+\}|\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
        greedy: !0,
        inside: { interpolation: n },
      },
    ]),
    (e.languages.rb = e.languages.ruby);
})(Prism);
!(function (e) {
  e.languages.haml = {
    "multiline-comment": {
      pattern: /((?:^|\r?\n|\r)([\t ]*))(?:\/|-#).*(?:(?:\r?\n|\r)\2[\t ]+.+)*/,
      lookbehind: !0,
      alias: "comment",
    },
    "multiline-code": [
      {
        pattern:
          /((?:^|\r?\n|\r)([\t ]*)(?:[~-]|[&!]?=)).*,[\t ]*(?:(?:\r?\n|\r)\2[\t ]+.*,[\t ]*)*(?:(?:\r?\n|\r)\2[\t ]+.+)/,
        lookbehind: !0,
        inside: e.languages.ruby,
      },
      {
        pattern:
          /((?:^|\r?\n|\r)([\t ]*)(?:[~-]|[&!]?=)).*\|[\t ]*(?:(?:\r?\n|\r)\2[\t ]+.*\|[\t ]*)*/,
        lookbehind: !0,
        inside: e.languages.ruby,
      },
    ],
    filter: {
      pattern:
        /((?:^|\r?\n|\r)([\t ]*)):[\w-]+(?:(?:\r?\n|\r)(?:\2[\t ]+.+|\s*?(?=\r?\n|\r)))+/,
      lookbehind: !0,
      inside: { "filter-name": { pattern: /^:[\w-]+/, alias: "variable" } },
    },
    markup: {
      pattern: /((?:^|\r?\n|\r)[\t ]*)<.+/,
      lookbehind: !0,
      inside: e.languages.markup,
    },
    doctype: { pattern: /((?:^|\r?\n|\r)[\t ]*)!!!(?: .+)?/, lookbehind: !0 },
    tag: {
      pattern:
        /((?:^|\r?\n|\r)[\t ]*)[%.#][\w\-#.]*[\w\-](?:\([^)]+\)|\{(?:\{[^}]+\}|[^}])+\}|\[[^\]]+\])*[\/<>]*/,
      lookbehind: !0,
      inside: {
        attributes: [
          {
            pattern: /(^|[^#])\{(?:\{[^}]+\}|[^}])+\}/,
            lookbehind: !0,
            inside: e.languages.ruby,
          },
          {
            pattern: /\([^)]+\)/,
            inside: {
              "attr-value": {
                pattern: /(=\s*)(?:"(?:\\.|[^\\"\r\n])*"|[^)\s]+)/,
                lookbehind: !0,
              },
              "attr-name": /[\w:-]+(?=\s*!?=|\s*[,)])/,
              punctuation: /[=(),]/,
            },
          },
          { pattern: /\[[^\]]+\]/, inside: e.languages.ruby },
        ],
        punctuation: /[<>]/,
      },
    },
    code: {
      pattern: /((?:^|\r?\n|\r)[\t ]*(?:[~-]|[&!]?=)).+/,
      lookbehind: !0,
      inside: e.languages.ruby,
    },
    interpolation: {
      pattern: /#\{[^}]+\}/,
      inside: {
        delimiter: { pattern: /^#\{|\}$/, alias: "punctuation" },
        rest: e.languages.ruby,
      },
    },
    punctuation: { pattern: /((?:^|\r?\n|\r)[\t ]*)[~=\-&!]+/, lookbehind: !0 },
  };
  for (
    var t = [
        "css",
        { filter: "coffee", language: "coffeescript" },
        "erb",
        "javascript",
        "less",
        "markdown",
        "ruby",
        "scss",
        "textile",
      ],
      n = {},
      r = 0,
      a = t.length;
    r < a;
    r++
  ) {
    var i = t[r];
    (i = "string" == typeof i ? { filter: i, language: i } : i),
      e.languages[i.language] &&
        (n["filter-" + i.filter] = {
          pattern: RegExp(
            "((?:^|\\r?\\n|\\r)([\\t ]*)):{{filter_name}}(?:(?:\\r?\\n|\\r)(?:\\2[\\t ]+.+|\\s*?(?=\\r?\\n|\\r)))+".replace(
              "{{filter_name}}",
              function () {
                return i.filter;
              }
            )
          ),
          lookbehind: !0,
          inside: {
            "filter-name": { pattern: /^:[\w-]+/, alias: "variable" },
            rest: e.languages[i.language],
          },
        });
  }
  e.languages.insertBefore("haml", "filter", n);
})(Prism);
!(function (h) {
  function v(e, n) {
    return "___" + e.toUpperCase() + n + "___";
  }
  Object.defineProperties((h.languages["markup-templating"] = {}), {
    buildPlaceholders: {
      value: function (a, r, e, o) {
        if (a.language === r) {
          var c = (a.tokenStack = []);
          (a.code = a.code.replace(e, function (e) {
            if ("function" == typeof o && !o(e)) return e;
            for (var n, t = c.length; -1 !== a.code.indexOf((n = v(r, t))); )
              ++t;
            return (c[t] = e), n;
          })),
            (a.grammar = h.languages.markup);
        }
      },
    },
    tokenizePlaceholders: {
      value: function (p, k) {
        if (p.language === k && p.tokenStack) {
          p.grammar = h.languages[k];
          var m = 0,
            d = Object.keys(p.tokenStack);
          !(function e(n) {
            for (var t = 0; t < n.length && !(m >= d.length); t++) {
              var a = n[t];
              if (
                "string" == typeof a ||
                (a.content && "string" == typeof a.content)
              ) {
                var r = d[m],
                  o = p.tokenStack[r],
                  c = "string" == typeof a ? a : a.content,
                  i = v(k, r),
                  u = c.indexOf(i);
                if (-1 < u) {
                  ++m;
                  var g = c.substring(0, u),
                    l = new h.Token(
                      k,
                      h.tokenize(o, p.grammar),
                      "language-" + k,
                      o
                    ),
                    s = c.substring(u + i.length),
                    f = [];
                  g && f.push.apply(f, e([g])),
                    f.push(l),
                    s && f.push.apply(f, e([s])),
                    "string" == typeof a
                      ? n.splice.apply(n, [t, 1].concat(f))
                      : (a.content = f);
                }
              } else a.content && e(a.content);
            }
            return n;
          })(p.tokens);
        }
      },
    },
  });
})(Prism);
!(function (e) {
  (e.languages.handlebars = {
    comment: /\{\{![\s\S]*?\}\}/,
    delimiter: { pattern: /^\{\{\{?|\}\}\}?$/i, alias: "punctuation" },
    string: /(["'])(?:\\.|(?!\1)[^\\\r\n])*\1/,
    number: /\b0x[\dA-Fa-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee][+-]?\d+)?/,
    boolean: /\b(?:true|false)\b/,
    block: {
      pattern: /^(\s*~?\s*)[#\/]\S+?(?=\s*~?\s*$|\s)/i,
      lookbehind: !0,
      alias: "keyword",
    },
    brackets: {
      pattern: /\[[^\]]+\]/,
      inside: { punctuation: /\[|\]/, variable: /[\s\S]+/ },
    },
    punctuation: /[!"#%&':()*+,.\/;<=>@\[\\\]^`{|}~]/,
    variable: /[^!"#%&'()*+,\/;<=>@\[\\\]^`{|}~\s]+/,
  }),
    e.hooks.add("before-tokenize", function (a) {
      e.languages["markup-templating"].buildPlaceholders(
        a,
        "handlebars",
        /\{\{\{[\s\S]+?\}\}\}|\{\{[\s\S]+?\}\}/g
      );
    }),
    e.hooks.add("after-tokenize", function (a) {
      e.languages["markup-templating"].tokenizePlaceholders(a, "handlebars");
    });
})(Prism);
Prism.languages.json = {
  property: { pattern: /"(?:\\.|[^\\"\r\n])*"(?=\s*:)/, greedy: !0 },
  string: { pattern: /"(?:\\.|[^\\"\r\n])*"(?!\s*:)/, greedy: !0 },
  comment: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/,
  number: /-?\d+\.?\d*(?:e[+-]?\d+)?/i,
  punctuation: /[{}[\],]/,
  operator: /:/,
  boolean: /\b(?:true|false)\b/,
  null: { pattern: /\bnull\b/, alias: "keyword" },
};
Prism.languages.liquid = {
  keyword:
    /\b(?:comment|endcomment|if|elsif|else|endif|unless|endunless|for|endfor|case|endcase|when|in|break|assign|continue|limit|offset|range|reversed|raw|endraw|capture|endcapture|tablerow|endtablerow)\b/,
  number:
    /\b0b[01]+\b|\b0x[\da-f]*\.?[\da-fp-]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?[df]?/i,
  operator: {
    pattern:
      /(^|[^.])(?:\+[+=]?|-[-=]?|!=?|<<?=?|>>?>?=?|==?|&[&=]?|\|[|=]?|\*=?|\/=?|%=?|\^=?|[?:~])/m,
    lookbehind: !0,
  },
  function: {
    pattern:
      /(^|[\s;|&])(?:append|prepend|capitalize|cycle|cols|increment|decrement|abs|at_least|at_most|ceil|compact|concat|date|default|divided_by|downcase|escape|escape_once|first|floor|join|last|lstrip|map|minus|modulo|newline_to_br|plus|remove|remove_first|replace|replace_first|reverse|round|rstrip|size|slice|sort|sort_natural|split|strip|strip_html|strip_newlines|times|truncate|truncatewords|uniq|upcase|url_decode|url_encode|include|paginate)(?=$|[\s;|&])/,
    lookbehind: !0,
  },
};
!(function () {
  if ("undefined" != typeof self && self.Prism && self.document) {
    var l = "line-numbers",
      c = /\n(?!$)/g,
      m = function (e) {
        var t = a(e)["white-space"];
        if ("pre-wrap" === t || "pre-line" === t) {
          var n = e.querySelector("code"),
            r = e.querySelector(".line-numbers-rows"),
            s = e.querySelector(".line-numbers-sizer"),
            i = n.textContent.split(c);
          s ||
            (((s = document.createElement("span")).className =
              "line-numbers-sizer"),
            n.appendChild(s)),
            (s.style.display = "block"),
            i.forEach(function (e, t) {
              s.textContent = e || "\n";
              var n = s.getBoundingClientRect().height;
              r.children[t].style.height = n + "px";
            }),
            (s.textContent = ""),
            (s.style.display = "none");
        }
      },
      a = function (e) {
        return e
          ? window.getComputedStyle
            ? getComputedStyle(e)
            : e.currentStyle || null
          : null;
      };
    window.addEventListener("resize", function () {
      Array.prototype.forEach.call(document.querySelectorAll("pre." + l), m);
    }),
      Prism.hooks.add("complete", function (e) {
        if (e.code) {
          var t = e.element,
            n = t.parentNode;
          if (
            n &&
            /pre/i.test(n.nodeName) &&
            !t.querySelector(".line-numbers-rows")
          ) {
            for (
              var r = !1, s = /(?:^|\s)line-numbers(?:\s|$)/, i = t;
              i;
              i = i.parentNode
            )
              if (s.test(i.className)) {
                r = !0;
                break;
              }
            if (r) {
              (t.className = t.className.replace(s, " ")),
                s.test(n.className) || (n.className += " line-numbers");
              var l,
                a = e.code.match(c),
                o = a ? a.length + 1 : 1,
                u = new Array(o + 1).join("<span></span>");
              (l = document.createElement("span")).setAttribute(
                "aria-hidden",
                "true"
              ),
                (l.className = "line-numbers-rows"),
                (l.innerHTML = u),
                n.hasAttribute("data-start") &&
                  (n.style.counterReset =
                    "linenumber " +
                    (parseInt(n.getAttribute("data-start"), 10) - 1)),
                e.element.appendChild(l),
                m(n),
                Prism.hooks.run("line-numbers", e);
            }
          }
        }
      }),
      Prism.hooks.add("line-numbers", function (e) {
        (e.plugins = e.plugins || {}), (e.plugins.lineNumbers = !0);
      }),
      (Prism.plugins.lineNumbers = {
        getLine: function (e, t) {
          if ("PRE" === e.tagName && e.classList.contains(l)) {
            var n = e.querySelector(".line-numbers-rows"),
              r = parseInt(e.getAttribute("data-start"), 10) || 1,
              s = r + (n.children.length - 1);
            t < r && (t = r), s < t && (t = s);
            var i = t - r;
            return n.children[i];
          }
        },
      });
  }
})();
"undefined" != typeof self &&
  self.Prism &&
  self.document &&
  document.querySelector &&
  ((self.Prism.fileHighlight = function (e) {
    e = e || document;
    var i = {
      js: "javascript",
      py: "python",
      rb: "ruby",
      ps1: "powershell",
      psm1: "powershell",
      sh: "bash",
      bat: "batch",
      h: "c",
      tex: "latex",
    };
    Array.prototype.slice
      .call(e.querySelectorAll("pre[data-src]"))
      .forEach(function (e) {
        if (!e.hasAttribute("data-src-loaded")) {
          for (
            var t,
              a = e.getAttribute("data-src"),
              s = e,
              n = /\blang(?:uage)?-([\w-]+)\b/i;
            s && !n.test(s.className);

          )
            s = s.parentNode;
          if ((s && (t = (e.className.match(n) || [, ""])[1]), !t)) {
            var r = (a.match(/\.(\w+)$/) || [, ""])[1];
            t = i[r] || r;
          }
          var o = document.createElement("code");
          (o.className = "language-" + t),
            (e.textContent = ""),
            (o.textContent = "Loading…"),
            e.appendChild(o);
          var l = new XMLHttpRequest();
          l.open("GET", a, !0),
            (l.onreadystatechange = function () {
              4 == l.readyState &&
                (l.status < 400 && l.responseText
                  ? ((o.textContent = l.responseText),
                    Prism.highlightElement(o),
                    e.setAttribute("data-src-loaded", ""))
                  : 400 <= l.status
                  ? (o.textContent =
                      "✖ Error " +
                      l.status +
                      " while fetching file: " +
                      l.statusText)
                  : (o.textContent =
                      "✖ Error: File does not exist or is empty"));
            }),
            l.send(null);
        }
      });
  }),
  document.addEventListener("DOMContentLoaded", function () {
    self.Prism.fileHighlight();
  }));
!(function () {
  if ("undefined" != typeof self && self.Prism && self.document) {
    var i = [],
      l = {},
      c = function () {};
    Prism.plugins.toolbar = {};
    var e = (Prism.plugins.toolbar.registerButton = function (e, n) {
        var t;
        (t =
          "function" == typeof n
            ? n
            : function (e) {
                var t;
                return (
                  "function" == typeof n.onClick
                    ? (((t = document.createElement("button")).type = "button"),
                      t.addEventListener("click", function () {
                        n.onClick.call(this, e);
                      }))
                    : "string" == typeof n.url
                    ? ((t = document.createElement("a")).href = n.url)
                    : (t = document.createElement("span")),
                  n.className && t.classList.add(n.className),
                  (t.textContent = n.text),
                  t
                );
              }),
          e in l
            ? console.warn(
                'There is a button with the key "' + e + '" registered already.'
              )
            : i.push((l[e] = t));
      }),
      t = (Prism.plugins.toolbar.hook = function (a) {
        var e = a.element.parentNode;
        if (
          e &&
          /pre/i.test(e.nodeName) &&
          !e.parentNode.classList.contains("code-toolbar")
        ) {
          var t = document.createElement("div");
          t.classList.add("code-toolbar"),
            e.parentNode.insertBefore(t, e),
            t.appendChild(e);
          var r = document.createElement("div");
          r.classList.add("toolbar");
          var n = i,
            o = (function (e) {
              for (; e; ) {
                var t = e.getAttribute("data-toolbar-order");
                if (null != t)
                  return (t = t.trim()).length ? t.split(/\s*,\s*/g) : [];
                e = e.parentElement;
              }
            })(a.element);
          o &&
            (n = o.map(function (e) {
              return l[e] || c;
            })),
            n.forEach(function (e) {
              var t = e(a);
              if (t) {
                var n = document.createElement("div");
                n.classList.add("toolbar-item"),
                  n.appendChild(t),
                  r.appendChild(n);
              }
            }),
            t.appendChild(r);
        }
      });
    e("label", function (e) {
      var t = e.element.parentNode;
      if (t && /pre/i.test(t.nodeName) && t.hasAttribute("data-label")) {
        var n,
          a,
          r = t.getAttribute("data-label");
        try {
          a = document.querySelector("template#" + r);
        } catch (e) {}
        return (
          a
            ? (n = a.content)
            : (t.hasAttribute("data-url")
                ? ((n = document.createElement("a")).href =
                    t.getAttribute("data-url"))
                : (n = document.createElement("span")),
              (n.textContent = r)),
          n
        );
      }
    }),
      Prism.hooks.add("complete", t);
  }
})();
!(function () {
  if ("undefined" != typeof self && self.Prism && self.document)
    if (Prism.plugins.toolbar) {
      var r = {
        html: "HTML",
        xml: "XML",
        svg: "SVG",
        mathml: "MathML",
        css: "CSS",
        clike: "C-like",
        js: "JavaScript",
        abap: "ABAP",
        abnf: "Augmented Backus–Naur form",
        antlr4: "ANTLR4",
        g4: "ANTLR4",
        apacheconf: "Apache Configuration",
        apl: "APL",
        aql: "AQL",
        arff: "ARFF",
        asciidoc: "AsciiDoc",
        adoc: "AsciiDoc",
        asm6502: "6502 Assembly",
        aspnet: "ASP.NET (C#)",
        autohotkey: "AutoHotkey",
        autoit: "AutoIt",
        shell: "Bash",
        basic: "BASIC",
        bbcode: "BBcode",
        shortcode: "BBcode",
        bnf: "Backus–Naur form",
        rbnf: "Routing Backus–Naur form",
        conc: "Concurnas",
        csharp: "C#",
        cs: "C#",
        dotnet: "C#",
        cpp: "C++",
        cil: "CIL",
        coffee: "CoffeeScript",
        cmake: "CMake",
        csp: "Content-Security-Policy",
        "css-extras": "CSS Extras",
        dax: "DAX",
        django: "Django/Jinja2",
        jinja2: "Django/Jinja2",
        "dns-zone-file": "DNS zone file",
        "dns-zone": "DNS zone file",
        dockerfile: "Docker",
        ebnf: "Extended Backus–Naur form",
        ejs: "EJS",
        etlua: "Embedded Lua templating",
        erb: "ERB",
        "excel-formula": "Excel Formula",
        xlsx: "Excel Formula",
        xls: "Excel Formula",
        fsharp: "F#",
        "firestore-security-rules": "Firestore security rules",
        ftl: "FreeMarker Template Language",
        gcode: "G-code",
        gdscript: "GDScript",
        gedcom: "GEDCOM",
        glsl: "GLSL",
        gml: "GameMaker Language",
        gamemakerlanguage: "GameMaker Language",
        graphql: "GraphQL",
        hs: "Haskell",
        hcl: "HCL",
        http: "HTTP",
        hpkp: "HTTP Public-Key-Pins",
        hsts: "HTTP Strict-Transport-Security",
        ichigojam: "IchigoJam",
        inform7: "Inform 7",
        javadoc: "JavaDoc",
        javadoclike: "JavaDoc-like",
        javastacktrace: "Java stack trace",
        jq: "JQ",
        jsdoc: "JSDoc",
        "js-extras": "JS Extras",
        "js-templates": "JS Templates",
        json: "JSON",
        jsonp: "JSONP",
        json5: "JSON5",
        latex: "LaTeX",
        tex: "TeX",
        context: "ConTeXt",
        lilypond: "LilyPond",
        ly: "LilyPond",
        emacs: "Lisp",
        elisp: "Lisp",
        "emacs-lisp": "Lisp",
        llvm: "LLVM IR",
        lolcode: "LOLCODE",
        md: "Markdown",
        "markup-templating": "Markup templating",
        matlab: "MATLAB",
        mel: "MEL",
        moon: "MoonScript",
        n1ql: "N1QL",
        n4js: "N4JS",
        n4jsd: "N4JS",
        "nand2tetris-hdl": "Nand To Tetris HDL",
        nasm: "NASM",
        neon: "NEON",
        nginx: "nginx",
        nsis: "NSIS",
        objectivec: "Objective-C",
        ocaml: "OCaml",
        opencl: "OpenCL",
        parigp: "PARI/GP",
        objectpascal: "Object Pascal",
        pcaxis: "PC-Axis",
        px: "PC-Axis",
        php: "PHP",
        phpdoc: "PHPDoc",
        "php-extras": "PHP Extras",
        plsql: "PL/SQL",
        powerquery: "PowerQuery",
        pq: "PowerQuery",
        mscript: "PowerQuery",
        powershell: "PowerShell",
        properties: ".properties",
        protobuf: "Protocol Buffers",
        py: "Python",
        q: "Q (kdb+ database)",
        qml: "QML",
        jsx: "React JSX",
        tsx: "React TSX",
        renpy: "Ren'py",
        rest: "reST (reStructuredText)",
        robotframework: "Robot Framework",
        robot: "Robot Framework",
        rb: "Ruby",
        sas: "SAS",
        sass: "Sass (Sass)",
        scss: "Sass (Scss)",
        "shell-session": "Shell session",
        solidity: "Solidity (Ethereum)",
        "solution-file": "Solution file",
        sln: "Solution file",
        soy: "Soy (Closure Template)",
        sparql: "SPARQL",
        rq: "SPARQL",
        "splunk-spl": "Splunk SPL",
        sqf: "SQF: Status Quo Function (Arma 3)",
        sql: "SQL",
        tap: "TAP",
        toml: "TOML",
        tt2: "Template Toolkit 2",
        trig: "TriG",
        ts: "TypeScript",
        "t4-cs": "T4 Text Templates (C#)",
        t4: "T4 Text Templates (C#)",
        "t4-vb": "T4 Text Templates (VB)",
        "t4-templating": "T4 templating",
        vbnet: "VB.Net",
        vhdl: "VHDL",
        vim: "vim",
        "visual-basic": "Visual Basic",
        vb: "Visual Basic",
        wasm: "WebAssembly",
        wiki: "Wiki markup",
        xeoracube: "XeoraCube",
        xojo: "Xojo (REALbasic)",
        xquery: "XQuery",
        yaml: "YAML",
        yml: "YAML",
      };
      Prism.plugins.toolbar.registerButton("show-language", function (e) {
        var a = e.element.parentNode;
        if (a && /pre/i.test(a.nodeName)) {
          var s,
            t =
              a.getAttribute("data-language") ||
              r[e.language] ||
              ((s = e.language)
                ? (s.substring(0, 1).toUpperCase() + s.substring(1)).replace(
                    /s(?=cript)/,
                    "S"
                  )
                : s);
          if (t) {
            var o = document.createElement("span");
            return (o.textContent = t), o;
          }
        }
      });
    } else console.warn("Show Languages plugin loaded before Toolbar plugin.");
})();
!(function () {
  if (self.Prism && self.document && document.querySelectorAll && [].filter) {
    var d = [];
    t(function (t, e) {
      if (t && t.meta && t.data) {
        if (t.meta.status && 400 <= t.meta.status)
          return "Error: " + (t.data.message || t.meta.status);
        if ("string" == typeof t.data.content)
          return "function" == typeof atob
            ? atob(t.data.content.replace(/\s/g, ""))
            : "Your browser cannot decode base64";
      }
      return null;
    }, "github"),
      t(function (t, e) {
        if (t && t.meta && t.data && t.data.files) {
          if (t.meta.status && 400 <= t.meta.status)
            return "Error: " + (t.data.message || t.meta.status);
          var n = t.data.files,
            a = e.getAttribute("data-filename");
          if (null == a)
            for (var r in n)
              if (n.hasOwnProperty(r)) {
                a = r;
                break;
              }
          return void 0 !== n[a]
            ? n[a].content
            : "Error: unknown or missing gist file " + a;
        }
        return null;
      }, "gist"),
      t(function (t, e) {
        return t && t.node && "string" == typeof t.data ? t.data : null;
      }, "bitbucket");
    var s = 0,
      l = "Loading…";
    (Prism.plugins.jsonphighlight = {
      registerAdapter: t,
      removeAdapter: function (t) {
        if (("string" == typeof t && (t = n(t)), "function" == typeof t)) {
          var e = d
            .map(function (t) {
              return t.adapter;
            })
            .indexOf(t);
          0 <= e && d.splice(e, 1);
        }
      },
      highlight: e,
    }),
      e();
  }
  function t(t, e) {
    (e = e || t.name),
      "function" != typeof t || n(t) || n(e) || d.push({ adapter: t, name: e });
  }
  function n(t) {
    if ("function" == typeof t) {
      for (var e = 0; (n = d[e++]); )
        if (n.adapter.valueOf() === t.valueOf()) return n.adapter;
    } else if ("string" == typeof t) {
      var n;
      for (e = 0; (n = d[e++]); ) if (n.name === t) return n.adapter;
    }
    return null;
  }
  function e() {
    Array.prototype.slice
      .call(document.querySelectorAll("pre[data-jsonp]"))
      .forEach(function (a) {
        a.textContent = "";
        var r = document.createElement("code");
        (r.textContent = l), a.appendChild(r);
        var t = a.getAttribute("data-adapter"),
          o = null;
        if (t) {
          if ("function" != typeof window[t])
            return void (r.textContent =
              "JSONP adapter function '" + t + "' doesn't exist");
          o = window[t];
        }
        var i = "prismjsonp" + s++,
          e = document.createElement("a"),
          n = (e.href = a.getAttribute("data-jsonp"));
        e.href +=
          (e.search ? "&" : "?") +
          (a.getAttribute("data-callback") || "callback") +
          "=" +
          i;
        var u = setTimeout(function () {
            r.textContent === l &&
              (r.textContent = "Timeout loading '" + n + "'");
          }, 5e3),
          f = document.createElement("script");
        (f.src = e.href),
          (window[i] = function (t) {
            document.head.removeChild(f), clearTimeout(u), delete window[i];
            var e = "";
            if (o) e = o(t, a);
            else for (var n in d) if (null !== (e = d[n].adapter(t, a))) break;
            null === e
              ? (r.textContent =
                  "Cannot parse response (perhaps you need an adapter function?)")
              : ((r.textContent = e), Prism.highlightElement(r));
          }),
          document.head.appendChild(f);
      });
  }
})();
!(function () {
  if ("undefined" != typeof self && self.Prism && self.document) {
    var u = /(?:^|\s)command-line(?:\s|$)/;
    Prism.hooks.add("before-highlight", function (e) {
      var t = (e.vars = e.vars || {}),
        a = (t["command-line"] = t["command-line"] || {});
      if (!a.complete && e.code) {
        var n = e.element.parentNode;
        if (
          n &&
          /pre/i.test(n.nodeName) &&
          (u.test(n.className) || u.test(e.element.className))
        )
          if (e.element.querySelector(".command-line-prompt")) a.complete = !0;
          else {
            var r = e.code.split("\n");
            a.numberOfLines = r.length;
            var s = (a.outputLines = []),
              o = n.getAttribute("data-output"),
              i = n.getAttribute("data-filter-output");
            if (o || "" === o) {
              o = o.split(",");
              for (var l = 0; l < o.length; l++) {
                var m = o[l].split("-"),
                  p = parseInt(m[0], 10),
                  d = 2 === m.length ? parseInt(m[1], 10) : p;
                if (!isNaN(p) && !isNaN(d)) {
                  p < 1 && (p = 1), d > r.length && (d = r.length), d--;
                  for (var c = --p; c <= d; c++) (s[c] = r[c]), (r[c] = "");
                }
              }
            } else if (i)
              for (l = 0; l < r.length; l++)
                0 === r[l].indexOf(i) &&
                  ((s[l] = r[l].slice(i.length)), (r[l] = ""));
            e.code = r.join("\n");
          }
        else a.complete = !0;
      } else a.complete = !0;
    }),
      Prism.hooks.add("before-insert", function (e) {
        var t = (e.vars = e.vars || {}),
          a = (t["command-line"] = t["command-line"] || {});
        if (!a.complete) {
          for (
            var n = e.highlightedCode.split("\n"),
              r = 0,
              s = (a.outputLines || []).length;
            r < s;
            r++
          )
            a.outputLines.hasOwnProperty(r) && (n[r] = a.outputLines[r]);
          e.highlightedCode = n.join("\n");
        }
      }),
      Prism.hooks.add("complete", function (e) {
        var t = (e.vars = e.vars || {}),
          a = (t["command-line"] = t["command-line"] || {});
        if (!a.complete) {
          var n = e.element.parentNode;
          u.test(e.element.className) &&
            (e.element.className = e.element.className.replace(u, " ")),
            u.test(n.className) || (n.className += " command-line");
          var r = function (e, t) {
              return (n.getAttribute(e) || t).replace(/"/g, "&quot");
            },
            s = new Array((a.numberOfLines || 0) + 1),
            o = r("data-prompt", "");
          if ("" !== o) s = s.join('<span data-prompt="' + o + '"></span>');
          else {
            var i = r("data-user", "user"),
              l = r("data-host", "localhost");
            s = s.join(
              '<span data-user="' + i + '" data-host="' + l + '"></span>'
            );
          }
          var m = document.createElement("span");
          (m.className = "command-line-prompt"), (m.innerHTML = s);
          for (var p = 0, d = (a.outputLines || []).length; p < d; p++)
            if (a.outputLines.hasOwnProperty(p)) {
              var c = m.children[p];
              c.removeAttribute("data-user"),
                c.removeAttribute("data-host"),
                c.removeAttribute("data-prompt");
            }
          e.element.insertBefore(m, e.element.firstChild), (a.complete = !0);
        }
      });
  }
})();
!(function () {
  if ("undefined" != typeof self && self.Prism && self.document)
    if (Prism.plugins.toolbar) {
      var r = window.ClipboardJS || void 0;
      r || "function" != typeof require || (r = require("clipboard"));
      var i = [];
      if (!r) {
        var o = document.createElement("script"),
          e = document.querySelector("head");
        (o.onload = function () {
          if ((r = window.ClipboardJS)) for (; i.length; ) i.pop()();
        }),
          (o.src =
            "https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js"),
          e.appendChild(o);
      }
      Prism.plugins.toolbar.registerButton("copy-to-clipboard", function (e) {
        var t = document.createElement("button");
        return (t.textContent = "Copy"), r ? o() : i.push(o), t;
        function o() {
          var o = new r(t, {
            text: function () {
              return e.code;
            },
          });
          o.on("success", function () {
            (t.textContent = "Copied!"), n();
          }),
            o.on("error", function () {
              (t.textContent = "Press Ctrl+C to copy"), n();
            });
        }
        function n() {
          setTimeout(function () {
            t.textContent = "Copy";
          }, 5e3);
        }
      });
    } else
      console.warn("Copy to Clipboard plugin loaded before Toolbar plugin.");
})();
"undefined" != typeof self &&
  self.Prism &&
  self.document &&
  document.querySelector &&
  Prism.plugins.toolbar.registerButton("download-file", function (t) {
    var e = t.element.parentNode;
    if (
      e &&
      /pre/i.test(e.nodeName) &&
      e.hasAttribute("data-src") &&
      e.hasAttribute("data-download-link")
    ) {
      var a = e.getAttribute("data-src"),
        n = document.createElement("a");
      return (
        (n.textContent =
          e.getAttribute("data-download-link-label") || "Download"),
        n.setAttribute("download", ""),
        (n.href = a),
        n
      );
    }
  });
!(function () {
  if ("undefined" != typeof self && self.Prism && self.document) {
    var c = /(?:^|\s)match-braces(?:\s|$)/,
      a = /(?:^|\s)brace-hover(?:\s|$)/,
      l = /(?:^|\s)brace-selected(?:\s|$)/,
      n = /(?:^|\s)no-brace-hover(?:\s|$)/,
      t = /(?:^|\s)no-brace-select(?:\s|$)/,
      u = { "(": ")", "[": "]", "{": "}" },
      f = { "(": "brace-round", "[": "brace-square", "{": "brace-curly" },
      m = 0,
      r = /^(pair-\d+-)(open|close)$/;
    Prism.hooks.add("complete", function (e) {
      var a = e.element,
        n = a.parentElement;
      if (n && "PRE" == n.tagName) {
        for (var t = [], r = a; r; r = r.parentElement)
          if (c.test(r.className)) {
            t.push("(", "[", "{");
            break;
          }
        if (0 != t.length) {
          n.__listenerAdded ||
            (n.addEventListener("mousedown", function () {
              var e = n.querySelector("code");
              Array.prototype.slice
                .call(e.querySelectorAll(".brace-selected"))
                .forEach(function (e) {
                  e.className = e.className.replace(l, " ");
                });
            }),
            Object.defineProperty(n, "__listenerAdded", { value: !0 }));
          var o = Array.prototype.slice.call(
              a.querySelectorAll("span.token.punctuation")
            ),
            i = [];
          t.forEach(function (e) {
            for (
              var a = u[e], n = f[e], t = [], r = [], s = 0;
              s < o.length;
              s++
            ) {
              var c = o[s];
              if (0 == c.childElementCount) {
                var l = c.textContent;
                l === e
                  ? (i.push({ index: s, open: !0, element: c }),
                    (c.className += " " + n),
                    (c.className += " brace-open"),
                    r.push(s))
                  : l === a &&
                    (i.push({ index: s, open: !1, element: c }),
                    (c.className += " " + n),
                    (c.className += " brace-close"),
                    r.length && t.push([s, r.pop()]));
              }
            }
            t.forEach(function (e) {
              var a = "pair-" + m++ + "-",
                n = o[e[0]],
                t = o[e[1]];
              (n.id = a + "open"),
                (t.id = a + "close"),
                [n, t].forEach(function (e) {
                  e.addEventListener("mouseenter", p),
                    e.addEventListener("mouseleave", d),
                    e.addEventListener("click", h);
                });
            });
          });
          var s = 0;
          i.sort(function (e, a) {
            return e.index - a.index;
          }),
            i.forEach(function (e) {
              e.open
                ? ((e.element.className += " brace-level-" + ((s % 12) + 1)),
                  s++)
                : ((s = Math.max(0, s - 1)),
                  (e.element.className += " brace-level-" + ((s % 12) + 1)));
            });
        }
      }
    });
  }
  function s(e) {
    var a = r.exec(e.id);
    return document.querySelector(
      "#" + a[1] + ("open" == a[2] ? "close" : "open")
    );
  }
  function p() {
    for (var e = this.parentElement; e; e = e.parentElement)
      if (n.test(e.className)) return;
    [this, s(this)].forEach(function (e) {
      e.className = (e.className.replace(a, " ") + " brace-hover").replace(
        /\s+/g,
        " "
      );
    });
  }
  function d() {
    [this, s(this)].forEach(function (e) {
      e.className = e.className.replace(a, " ");
    });
  }
  function h() {
    for (var e = this.parentElement; e; e = e.parentElement)
      if (t.test(e.className)) return;
    [this, s(this)].forEach(function (e) {
      e.className = (e.className.replace(l, " ") + " brace-selected").replace(
        /\s+/g,
        " "
      );
    });
  }
})();
!(function () {
  if ("undefined" != typeof Prism && Prism.languages.diff) {
    var o = /diff-([\w-]+)/i,
      m =
        /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/gi,
      c = RegExp(
        "(?:__|[^\r\n<])*(?:\r\n?|\n|(?:__|[^\r\n<])(?![^\r\n]))".replace(
          /__/g,
          function () {
            return m.source;
          }
        ),
        "gi"
      ),
      d = Prism.languages.diff.PREFIXES;
    Prism.hooks.add("before-sanity-check", function (e) {
      var a = e.language;
      o.test(a) &&
        !e.grammar &&
        (e.grammar = Prism.languages[a] = Prism.languages.diff);
    }),
      Prism.hooks.add("before-tokenize", function (e) {
        var a = e.language;
        o.test(a) &&
          !Prism.languages[a] &&
          (Prism.languages[a] = Prism.languages.diff);
      }),
      Prism.hooks.add("wrap", function (e) {
        var a, s;
        if ("diff" !== e.language) {
          var n = o.exec(e.language);
          if (!n) return;
          (a = n[1]), (s = Prism.languages[a]);
        }
        if (e.type in d) {
          var r,
            i = e.content
              .replace(m, "")
              .replace(/&lt;/g, "<")
              .replace(/&amp;/g, "&"),
            g = i.replace(/(^|[\r\n])./g, "$1");
          r = s ? Prism.highlight(g, s, a) : Prism.util.encode(g);
          var f,
            t = new Prism.Token("prefix", d[e.type], [/\w+/.exec(e.type)[0]]),
            u = Prism.Token.stringify(t, e.language),
            l = [];
          for (c.lastIndex = 0; (f = c.exec(r)); ) l.push(u + f[0]);
          /(?:^|[\r\n]).$/.test(i) && l.push(u),
            (e.content = l.join("")),
            s && e.classes.push("language-" + a);
        }
      });
  }
})();
!(function () {
  if ("undefined" == typeof self || self.Prism) {
    Element.prototype.matches ||
      (Element.prototype.matches =
        Element.prototype.msMatchesSelector ||
        Element.prototype.webkitMatchesSelector);
    var e,
      t = Prism.util.currentScript(),
      r = [],
      n = (Prism.plugins.filterHighlightAll = {
        add: function (t) {
          r.push(function (e) {
            return t({ element: e, language: Prism.util.getLanguage(e) });
          });
        },
        addSelector: function (t) {
          r.push(function (e) {
            return e.matches(t);
          });
        },
        reject: {
          add: function (t) {
            r.push(function (e) {
              return !t({ element: e, language: Prism.util.getLanguage(e) });
            });
          },
          addSelector: function (t) {
            r.push(function (e) {
              return !e.matches(t);
            });
          },
        },
        filterKnown: !!t && t.hasAttribute("data-filter-known"),
      });
    if (
      (n.add(function (e) {
        return !n.filterKnown || "object" == typeof Prism.languages[e.language];
      }),
      t)
    )
      (e = t.getAttribute("data-filter-selector")) && n.addSelector(e),
        (e = t.getAttribute("data-reject-selector")) && n.reject.addSelector(e);
    Prism.hooks.add("before-all-elements-highlight", function (e) {
      e.elements = e.elements.filter(i);
    });
  }
  function i(e) {
    for (var t = 0, n = r.length; t < n; t++) if (!r[t](e)) return !1;
    return !0;
  }
})();
(Prism.languages.treeview = {
  "treeview-part": {
    pattern: /^.+/m,
    inside: {
      "entry-line": [
        { pattern: /\|-- |├── /, alias: "line-h" },
        { pattern: /\|   |│   /, alias: "line-v" },
        { pattern: /`-- |└── /, alias: "line-v-last" },
        { pattern: / {4}/, alias: "line-v-gap" },
      ],
      "entry-name": { pattern: /.*\S.*/, inside: { operator: / -> / } },
    },
  },
}),
  Prism.hooks.add("wrap", function (e) {
    if ("treeview" === e.language && "entry-name" === e.type) {
      var t = e.classes,
        n = /(^|[^\\])\/\s*$/;
      if (n.test(e.content))
        (e.content = e.content.replace(n, "$1")), t.push("dir");
      else {
        e.content = e.content.replace(/(^|[^\\])[=*|]\s*$/, "$1");
        for (
          var a = e.content.toLowerCase().replace(/\s+/g, "").split(".");
          1 < a.length;

        )
          a.shift(), t.push("ext-" + a.join("-"));
      }
      "." === e.content[0] && t.push("dotfile");
    }
  });
