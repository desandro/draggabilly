/* eslint-disable camelcase */

const fs = require('fs');
const highlightjs = require('highlight.js');
const path = require('path');
const { marked } = require('marked');

// ----- site content ----- //

function dir( file ) {
  return path.resolve( __dirname, file );
}

// configure highlightjs
highlightjs.configure({
  classPrefix: '',
});
let hljsJavascript = highlightjs.getLanguage('javascript');
hljsJavascript.keywords.draggabilly_keyword = 'Draggabilly'; // highlight keyword
hljsJavascript.keywords.draggie_var = 'draggie'; // highlight variables

marked.setOptions({
  highlight: function( code, language ) {
    return language ? highlightjs.highlight( code, { language } ).value : code;
  },
});

let readmeHtml = marked.parse( fs.readFileSync( dir('../README.md'), 'utf8' ) );
let content = fs.readFileSync( dir('../assets/page.html'), 'utf8' )
  .replace( '{{{ content }}}', readmeHtml );
fs.writeFileSync( dir('../build/index.html'), content );
