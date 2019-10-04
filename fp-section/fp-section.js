/* eslint-disable linebreak-style */
/* eslint-disable brace-style */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
const { RichText, MediaUpload } = wp.editor;
const { registerBlockType } = wp.blocks;
const { Button } = wp.components;

// Our filter function
function setBlockCustomClassName( className, blockName ) { return blockName === 'gutentag/fp-section' ? '' : className; }
wp.hooks.addFilter( 'blocks.getBlockDefaultClassName', 'gutenTag', setBlockCustomClassName );

registerBlockType( 'gutentag/fp-section', {
	title: 'homeATF',
	icon: 'heart',
	category: 'common',
	attributes: {},

	edit( { attributes, setAttributes } ) {
		return (
			<section className="fPSection">

			</section>
		);
	},

	save( { attributes } ) {
		return (
			<section className="fPSection">

			</section>
		),
	},

} );
