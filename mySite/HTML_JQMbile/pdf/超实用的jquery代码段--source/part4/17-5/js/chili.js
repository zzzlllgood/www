/*
===============================================================================
Chili is the jQuery code highlighter plugin
...............................................................................
                                               Copyright 2007 / Andrea Ercolino
-------------------------------------------------------------------------------
LICENSE: http://www.opensource.org/licenses/mit-license.php
WEBSITE: http://noteslog.com/chili/
===============================================================================
*/

ChiliBook.recipeLoading = false;

ChiliBook.recipes[ "html.js" ] = 
{
    steps: {
          mlcom : { exp: /\<!--(?:.|\n)*?--\>/ }
        , tag   : { exp: /(?:\<\!?[\w:]+)|(?:\>)|(?:\<\/[\w:]+\>)|(?:\/\>)/ }
        , php   : { exp: /(?:\<\?php\s)|(?:\<\?)|(?:\?\>)/ }
        , aname : { exp: /\s+?[\w-]+:?\w+(?=\s*=)/ }
        , avalue: { exp: /(=\s*)(([\"\'])(?:(?:[^\3\\]*?(?:\3\3|\\.))*?[^\3\\]*?)\3)/
        , replacement: '$1<span class="$0">$2</span>' }
        , entity: { exp: /&[\w#]+?;/ }
    }
};

ChiliBook.recipes[ "javascript.js" ] = 
{
  steps: {
      mlcom   : { exp: /\/\*[^*]*\*+(?:[^\/][^*]*\*+)*\// }
    , com     : { exp: /\/\/.*/ }
    , regexp  : { exp: /\/[^\/\\\n]*(?:\\.[^\/\\\n]*)*\/[gim]*/ }
    , string  : { exp: /(?:\'[^\'\\\n]*(?:\\.[^\'\\\n]*)*\')|(?:\"[^\"\\\n]*(?:\\.[^\"\\\n]*)*\")/ }
    , numbers : { exp: /\b[+-]?(?:\d*\.?\d+|\d+\.?\d*)(?:[eE][+-]?\d+)?\b/ }
    , paren   : { exp: /({|})/ }
    , reserved: { exp: /\b(function|this)\b/ }
    , keywords: { exp: /\b(arguments|break|case|catch|continue|default|delete|do|else|false|for|if|in|instanceof|new|null|return|switch|true|try|typeof|var|void|while|with)\b/ }
    , global  : { exp: /\b(toString|valueOf|window|self|element|prototype|constructor|document|escape|unescape|parseInt|parseFloat|setTimeout|clearTimeout|setInterval|clearInterval|NaN|isNaN|Infinity)\b/ }
  }
};
