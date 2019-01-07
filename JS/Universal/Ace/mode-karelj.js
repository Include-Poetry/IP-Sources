define("ace/mode/doc_comment_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,t,n){"use strict";var o=e("../lib/oop"),r=e("./text_highlight_rules").TextHighlightRules,i=function(){this.$rules={start:[{token:"comment.doc.tag",regex:"@[\\w\\d_]+"},i.getTagRule(),{defaultToken:"comment.doc",caseInsensitive:!0}]}};o.inherits(i,r),i.getTagRule=function(e){return{token:"comment.doc.tag.storage.type",regex:"\\b(?:TODO|FIXME|XXX|HACK)\\b"}},i.getStartRule=function(e){return{token:"comment.doc",regex:"\\/\\*(?=\\*)",next:e}},i.getEndRule=function(e){return{token:"comment.doc",regex:"\\*\\/",next:e}},t.DocCommentHighlightRules=i}),define("ace/mode/karelj_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/doc_comment_highlight_rules","ace/mode/text_highlight_rules"],function(e,t,n){"use strict";var o=e("../lib/oop"),r=e("./doc_comment_highlight_rules").DocCommentHighlightRules,i=e("./text_highlight_rules").TextHighlightRules,a=function(){var e=this.$keywords=this.createKeywordMapper({"keyword.control":"iszero|pred|succ|else|if|iterate|while|como|return|class|pickbeeper|putbeeper|turnleft|move|turnoff|frontIsClear|frontIsBlocked|leftIsClear|leftIsBlocked|rightIsClear|rightIsBlocked|nextToABeeper|notNextToABeeper|anyBeepersInBeeperBag|noBeepersInBeeperBag|facingNorth|facingSouth|facingEast|facingWest|notFacingNorth|notFacingSouth|notFacingEast|notFacingWest","variable.language":"this"},"identifier");this.$rules={start:[{token:"comment",regex:"//$",next:"start"},{token:"comment",regex:"//",next:"singleLineComment"},r.getStartRule("doc-start"),{token:"comment",regex:"\\/\\*",next:"comment"},{token:"constant.numeric",regex:"[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?(L|l|UL|ul|u|U|F|f|ll|LL|ull|ULL)?\\b"},{token:"karelDeParametros",regex:"iszero|pred|succ"},{token:"karelSentencias",regex:"else|if|iterate|while|define|void"},{token:"karelFunciones",regex:"class|return"},{token:"karelComandos",regex:"pickbeeper|putbeeper|turnleft|move|turnoff"},{token:"karelCondiciones",regex:"frontIsClear|frontIsBlocked|leftIsClear|leftIsBlocked|rightIsClear|rightIsBlocked|nextToABeeper|notNextToABeeper|anyBeepersInBeeperBag|noBeepersInBeeperBag|facingNorth|facingSouth|facingEast|facingWest|notFacingNorth|notFacingSouth|notFacingEast|notFacingWest"},{token:"karelBloque",regex:"{|}"},{token:"karelNexos",regex:"&&|\\|\\||!"},{token:e,regex:"[a-zA-Z_$][a-zA-Z0-9_$]*"},{token:"punctuation.operator",regex:"\\?|\\:|\\,|\\;|\\."},{token:"paren.lparen",regex:"[[({]"},{token:"paren.rparen",regex:"[\\])}]"},{token:"text",regex:"\\s+"}],comment:[{token:"comment",regex:".*?\\*\\/",next:"start"},{token:"comment",regex:".+"}],singleLineComment:[{token:"comment",regex:/\\$/,next:"singleLineComment"},{token:"comment",regex:/$/,next:"start"},{defaultToken:"comment"}],directive:[{token:"constant.other.multiline",regex:/\\/},{token:"constant.other.multiline",regex:/.*\\/},{token:"constant.other",regex:"\\s*<.+?>",next:"start"},{token:"constant.other",regex:'\\s*["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]',next:"start"},{token:"constant.other",regex:"\\s*['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']",next:"start"},{token:"constant.other",regex:/[^\\\/]+/,next:"start"}]},this.embedRules(r,"doc-",[r.getEndRule("start")]),this.normalizeRules()};o.inherits(a,i),t.kareljHighlightRules=a}),define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(e,t,n){"use strict";var a=e("../range").Range,o=function(){};(function(){this.checkOutdent=function(e,t){return!!/^\s+$/.test(e)&&/^\s*\}/.test(t)},this.autoOutdent=function(e,t){var n=e.getLine(t).match(/^(\s*\})/);if(!n)return 0;var o=n[1].length,r=e.findMatchingBracket({row:t,column:o});if(!r||r.row==t)return 0;var i=this.$getIndent(e.getLine(r.row));e.replace(new a(t,0,t,o-1),i)},this.$getIndent=function(e){return e.match(/^\s*/)[0]}}).call(o.prototype),t.MatchingBraceOutdent=o}),define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(e,t,n){"use strict";var o=e("../../lib/oop"),c=e("../../range").Range,r=e("./fold_mode").FoldMode,i=t.FoldMode=function(e){e&&(this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+e.start)),this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+e.end)))};o.inherits(i,r),function(){this.foldingStartMarker=/(\{|\[)[^\}\]]*$|^\s*(\/\*)/,this.foldingStopMarker=/^[^\[\{]*(\}|\])|^[\s\*]*(\*\/)/,this.singleLineBlockCommentRe=/^\s*(\/\*).*\*\/\s*$/,this.tripleStarBlockCommentRe=/^\s*(\/\*\*\*).*\*\/\s*$/,this.startRegionRe=/^\s*(\/\*|\/\/)#?region\b/,this._getFoldWidgetBase=this.getFoldWidget,this.getFoldWidget=function(e,t,n){var o=e.getLine(n);if(this.singleLineBlockCommentRe.test(o)&&!this.startRegionRe.test(o)&&!this.tripleStarBlockCommentRe.test(o))return"";var r=this._getFoldWidgetBase(e,t,n);return!r&&this.startRegionRe.test(o)?"start":r},this.getFoldWidgetRange=function(e,t,n,o){var r,i=e.getLine(n);if(this.startRegionRe.test(i))return this.getCommentRegionBlock(e,i,n);if(r=i.match(this.foldingStartMarker)){var a=r.index;if(r[1])return this.openingBracketBlock(e,r[1],n,a);var s=e.getCommentFoldRange(n,a+r[0].length,1);return s&&!s.isMultiLine()&&(o?s=this.getSectionRange(e,n):"all"!=t&&(s=null)),s}if("markbegin"!==t&&(r=i.match(this.foldingStopMarker))){a=r.index+r[0].length;return r[1]?this.closingBracketBlock(e,r[1],n,a):e.getCommentFoldRange(n,a,-1)}},this.getSectionRange=function(e,t){for(var n=e.getLine(t),o=n.search(/\S/),r=t,i=n.length,a=t+=1,s=e.getLength();++t<s;){var g=(n=e.getLine(t)).search(/\S/);if(-1!==g){if(g<o)break;var l=this.getFoldWidgetRange(e,"all",t);if(l){if(l.start.row<=r)break;if(l.isMultiLine())t=l.end.row;else if(o==g)break}a=t}}return new c(r,i,a,e.getLine(a).length)},this.getCommentRegionBlock=function(e,t,n){for(var o=t.search(/\s*$/),r=e.getLength(),i=n,a=/^\s*(?:\/\*|\/\/|--)#?(end)?region\b/,s=1;++n<r;){t=e.getLine(n);var g=a.exec(t);if(g&&(g[1]?s--:s++,!s))break}if(i<n)return new c(i,o,n,t.length)}}.call(i.prototype)}),define("ace/mode/karelj",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/karelj_highlight_rules","ace/mode/matching_brace_outdent","ace/range","ace/mode/behaviour/cstyle","ace/mode/folding/cstyle"],function(e,t,n){"use strict";var o=e("../lib/oop"),r=e("./text").Mode,i=e("./karelj_highlight_rules").kareljHighlightRules,a=e("./matching_brace_outdent").MatchingBraceOutdent,s=(e("../range").Range,e("./behaviour/cstyle").CstyleBehaviour),g=e("./folding/cstyle").FoldMode,l=function(){this.HighlightRules=i,this.$outdent=new a,this.$behaviour=new s,this.foldingRules=new g};o.inherits(l,r),function(){this.lineCommentStart="//",this.blockComment={start:"/*",end:"*/"},this.getNextLineIndent=function(e,t,n){var o=this.$getIndent(t),r=this.getTokenizer().getLineTokens(t,e),i=r.tokens,a=r.state;if(i.length&&"comment"==i[i.length-1].type)return o;if("start"==e)(s=t.match(/^.*[\{\(\[]\s*$/))&&(o+=n);else if("doc-start"==e){if("start"==a)return"";var s;(s=t.match(/^\s*(\/?)\*/))&&(s[1]&&(o+=" "),o+="* ")}return o},this.checkOutdent=function(e,t,n){return this.$outdent.checkOutdent(t,n)},this.autoOutdent=function(e,t,n){this.$outdent.autoOutdent(t,n)},this.$id="ace/mode/karelj"}.call(l.prototype),t.Mode=l});