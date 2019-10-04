// Stripped down version of src/block/block.js

// PART 1: Import dependencies
import './editor.scss';
import './style.scss';

// PART 2: Setup references to external functions
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

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
	},

	// PART 3.2: Markup in editor
	edit: ( props ) => {
		const changeText = event => {
			props.setAttributes( { firstText: event.target.textContent } );
		};
		return (
			<div className={ props.className }>
				<p contentEditable={ true } onBlur={ changeText }>{ props.attributes.firstText }</p>
				<p>
					CGB BLOCK: <code>gutentag</code> is a new Gutenberg block
				</p>
				<p>
					It was created via el link magico!{ ' ' }
					<code>
						<a href="https://github.com/ahmadawais/create-guten-block">
							este es el link magico!!!
						</a>
					</code>.
				</p>
			</div>
		);
	},

	// PART 3.3: Markup saved to database
	save: ( props ) => {
		return (
			<div className={ props.className }>
				<p>{ props.attributes.firstText }</p>
				<p>
					CGB BLOCK: <code>gutentag</code> is a new Gutenberg block.
				</p>
				<p>
					It was created via{ ' ' }
					<code>
						<a href="https://github.com/ahmadawais/create-guten-block">
							create-guten-block
						</a>
					</code>.
				</p>
			</div>
		);
	},
};

const testExternalBlock = () => {
	return (
		<p>here it is</p>
	);
};

registerBlockType( 'card-block/main', testBlock );
export default testBlock;
