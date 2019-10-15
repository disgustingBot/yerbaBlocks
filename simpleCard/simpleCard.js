const { RichText, MediaUpload } = wp.editor;
const { registerBlockType } = wp.blocks;
const { Button } = wp.components;

// Our filter function
function setBlockCustomClassName( className, blockName ) { return blockName === 'gutentag/simple-card' ? '' : className; }
wp.hooks.addFilter( 'blocks.getBlockDefaultClassName', 'gutenTag', setBlockCustomClassName );

registerBlockType( 'gutentag/simple-card', {
	title: 'Simple Card',
	icon: 'heart',
	category: 'multicard',
	attributes: {
		cardTxt: { type: 'array', source: 'children', selector: '.simpleCardTxt' },
		cardImg: { attribute: 'src', selector: '.simpleCardImg' },
		cardAlt: { attribute: 'alt', selector: '.simpleCardImg' },

	},

	edit( { attributes, setAttributes } ) {
		const getImgButton = openEvent => attributes.cardImg ? <img src={ attributes.cardImg } onClick={ openEvent } className={ 'simpleCardImg rowcol1' } alt={ 'si' } /> : <div className={ 'simpleCardImg rowcol1' }><Button onClick={ openEvent } className="button button-large" >Pick an image</Button></div>;

		return (
      <figure className="simpleCard">
				<MediaUpload
					onSelect={ media => {
						setAttributes( { cardImg: media.url, cardAlt: media.alt } );
					} }
					type="image"
					value={ attributes.cardImg }
					render={ ( { open } ) => getImgButton( open ) }
				/>
        <figcaption className="itemTitleCenter itemTitle rowcol1">
          <h5 className="simpleCardTxt">
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
      <figure className="simpleCard">
				{ image( attributes.cardImg, attributes.cardAlt, 'simpleCardImg rowcol1' ) }
        <figcaption className="itemTitleCenter itemTitle rowcol1">
					<h5 className="simpleCardTxt">{ attributes.cardTxt }</h5>
        </figcaption>
      </figure>
		);
	},
} );
