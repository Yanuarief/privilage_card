/**
 * @license Copyright (c) 2014-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor.js';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat.js';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote.js';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold.js';
import Heading from '@ckeditor/ckeditor5-heading/src/heading.js';
import Indent from '@ckeditor/ckeditor5-indent/src/indent.js';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic.js';
import Link from '@ckeditor/ckeditor5-link/src/link.js';
import List from '@ckeditor/ckeditor5-list/src/list.js';
import Table from '@ckeditor/ckeditor5-table/src/table.js';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar.js';
import Code from '@ckeditor/ckeditor5-basic-styles/src/code.js';
import FontFamily from '@ckeditor/ckeditor5-font/src/fontfamily.js';
import FontColor from '@ckeditor/ckeditor5-font/src/fontcolor.js';
import FontSize from '@ckeditor/ckeditor5-font/src/fontsize.js';
import Highlight from '@ckeditor/ckeditor5-highlight/src/highlight.js';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline.js';
import WordCount from '@ckeditor/ckeditor5-word-count/src/wordcount.js';
import SpecialCharactersText from '@ckeditor/ckeditor5-special-characters/src/specialcharacterstext.js';
import SpecialCharacters from '@ckeditor/ckeditor5-special-characters/src/specialcharacters.js';
import SpecialCharactersMathematical from '@ckeditor/ckeditor5-special-characters/src/specialcharactersmathematical.js';
import SpecialCharactersLatin from '@ckeditor/ckeditor5-special-characters/src/specialcharacterslatin.js';
import SpecialCharactersCurrency from '@ckeditor/ckeditor5-special-characters/src/specialcharacterscurrency.js';
import SpecialCharactersArrows from '@ckeditor/ckeditor5-special-characters/src/specialcharactersarrows.js';
import SpecialCharactersEssentials from '@ckeditor/ckeditor5-special-characters/src/specialcharactersessentials.js';
import RemoveFormat from '@ckeditor/ckeditor5-remove-format/src/removeformat.js';
import StandardEditingMode from '@ckeditor/ckeditor5-restricted-editing/src/standardeditingmode.js';
import PageBreak from '@ckeditor/ckeditor5-page-break/src/pagebreak.js';
import Mention from '@ckeditor/ckeditor5-mention/src/mention.js';
import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed.js';
import MediaEmbedToolbar from '@ckeditor/ckeditor5-media-embed/src/mediaembedtoolbar.js';
import IndentBlock from '@ckeditor/ckeditor5-indent/src/indentblock.js';
import FontBackgroundColor from '@ckeditor/ckeditor5-font/src/fontbackgroundcolor.js';
import CodeBlock from '@ckeditor/ckeditor5-code-block/src/codeblock.js';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment.js';
import Autosave from '@ckeditor/ckeditor5-autosave/src/autosave.js';
import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough.js';
import Subscript from '@ckeditor/ckeditor5-basic-styles/src/subscript.js';
import Superscript from '@ckeditor/ckeditor5-basic-styles/src/superscript.js';
import TableCellProperties from '@ckeditor/ckeditor5-table/src/tablecellproperties';
import TableProperties from '@ckeditor/ckeditor5-table/src/tableproperties';
import Title from '@ckeditor/ckeditor5-heading/src/title.js';
import TodoList from '@ckeditor/ckeditor5-list/src/todolist';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials.js';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph.js';

export default class Editor extends ClassicEditor {}

// Plugins to include in the build.
Editor.builtinPlugins = [
	Autoformat,
	BlockQuote,
	Bold,
	Heading,
	Indent,
	Italic,
	Link,
	List,
	Table,
	TableToolbar,
	Code,
	FontFamily,
	FontColor,
	FontSize,
	Highlight,
	Underline,
	WordCount,
	SpecialCharactersText,
	SpecialCharacters,
	SpecialCharactersMathematical,
	SpecialCharactersLatin,
	SpecialCharactersCurrency,
	SpecialCharactersArrows,
	SpecialCharactersEssentials,
	RemoveFormat,
	StandardEditingMode,
	PageBreak,
	Mention,
	MediaEmbed,
	MediaEmbedToolbar,
	IndentBlock,
	FontBackgroundColor,
	CodeBlock,
	Alignment,
	Autosave,
	Strikethrough,
	Subscript,
	Superscript,
	TableCellProperties,
	TableProperties,
	Title,
	TodoList,
	Essentials,
	Paragraph
];

