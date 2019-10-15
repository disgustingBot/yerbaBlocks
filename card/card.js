const { RichText, MediaUpload } = wp.editor;
const { registerBlockType } = wp.blocks;
const { Button } = wp.components;

// Our filter function
function setBlockCustomClassName( className, blockName ) { return blockName === 'gutentag/card' ? '' : className; }
wp.hooks.addFilter( 'blocks.getBlockDefaultClassName', 'gutenTag', setBlockCustomClassName );

registerBlockType( 'gutentag/card', {
	title: 'card',
	icon: 'heart',
	category: 'multicard',
	attributes: {
		cardTxt: { type: 'array', source: 'children', selector: '.cardTxt' },
		cardImg: { attribute: 'src', selector: '.cardImg' },
		cardAlt: { attribute: 'alt', selector: '.cardImg' },

	},

	edit( { attributes, setAttributes } ) {
		const getImgButton = openEvent => attributes.cardImg ? <img src={ attributes.cardImg } onClick={ openEvent } className={ 'standarCardImg' } alt={ 'si' } /> : <div className={ 'standarCardImg' }><Button onClick={ openEvent } className="button button-large" >Pick an image</Button></div>;

		return (
      <figure className="card">
				<MediaUpload
					onSelect={ media => {
						setAttributes( { cardImg: media.url, cardAlt: media.alt } );
					} }
					type="image"
					value={ attributes.cardImg }
					render={ ( { open } ) => getImgButton( open ) }
				/>
        <figcaption className="cardTitle specialTitle">
          <h5 className="cardTxt">
						<RichText
							onChange={ content => setAttributes( { cardTxt: content } ) }
							value={ attributes.cardTxt }
							placeholder="contenido"
						/>
					</h5>
        </figcaption>
      </figure>
		);
	},

	save( { attributes } ) {
		const image = ( src, alt, className ) => src ? <img src={ src } className={ className } alt={ alt } /> : null;

		return (
      <figure className="card">
				{ image( attributes.cardImg, attributes.cardAlt, 'standarCardImg' ) }
        <figcaption className="cardTitle specialTitle">
					<h5 className="cardTxt">{ attributes.cardTxt }</h5>
        </figcaption>
      </figure>
		);
	},
} );
