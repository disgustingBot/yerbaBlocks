/* eslint-disable linebreak-style */
// Stripped down version of src/block/block.js

// PART 1: Import dependencies
import './editor.scss';
import './style.scss';

// PART 2: Setup references to external functions
const { __ } = wp.i18n;
const { RichText, MediaUpload } = wp.editor;
const { registerBlockType } = wp.blocks;
const { Button } = wp.components;

// PART 3: Register the block!
const testBlock = {
	// Part 3.1: Block settings
	title: __( 'este bloque es extra!' ), // Block title.
	icon: 'screenoptions', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'gutentag — CGB Block' ),
		__( 'CGB Example' ),
		__( 'create-guten-block' ),
	],
	attributes: {
		firstText: { type: 'string', default: 'Lorem Ipsum' },
		id: { type: 'string', default: 'Lorem Ipsum' },
		url: { type: 'string', default: 'Lorem Ipsum' },
		alt: { type: 'string', default: 'Lorem Ipsum' },
		txt: { type: 'string', default: 'Lorem Ipsum' },
	},

	testEdit: props => {
		return (
			<figure className="cards cardsATF cardATF3">
				<MediaUpload
					onSelect={ props.select }
					// onSelect={ media => { setAttributes( { url: media.url, alt: media.alt } ); } }
					type="image"
					value={ props.url }
					render={ props.render }
					// render={ ( { open } ) => getLogoButton( open ) }
				/>
				<figcaption className="cardsTxt specialTitle">
					<h3 className="card3Text">
						{ /* { props.abc } */ }
						<RichText
							onChange={ props.change }
							value={ props.txt }
							placeholder="Your card text"
						/>
					</h3>
				</figcaption>
			</figure>
		);
	},

	testSave: props => {
		return (
			<div>
				<p>aca esta la version del save</p>
				<p>{ props.abc }</p>
			</div>
		);
	},
	// PART 3.2: Markup in editor
	// edit: testEdit( this.attributes ),
	edit( { attributes, setAttributes } ) {
		const render = openEvent => attributes.logoUrl ? <img src={ attributes.logoUrl } onClick={ openEvent } className="ATFLogo itemImg" alt={ 'si' } /> : <div className={ 'ATFLogo itemImg' }><Button onClick={ openEvent } className="button button-large" >Pick a Logo image</Button></div>;
		const select = media => { setAttributes( { url: media.url, alt: media.alt } ); }
		const change = content => setAttributes( { copyATF: content } )
		const props = { ...attributes, render, select, change }
		return (
			<div>
				{ testBlock.testEdit( props ) }
			</div>
		);
	},

	// PART 3.3: Markup saved to database
	save( { attributes } ) {
		return (
			testBlock.testSave( attributes )
		);
	},
};

registerBlockType( 'card-block/main', testBlock );
export default testBlock.testEdit;
