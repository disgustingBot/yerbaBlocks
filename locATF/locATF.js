const { RichText, MediaUpload } = wp.editor;
const { registerBlockType } = wp.blocks;
const { Button } = wp.components;

// Our filter function
function setBlockCustomClassName( className, blockName ) { return blockName === 'gutentag/loc-atf' ? '' : className; }
wp.hooks.addFilter( 'blocks.getBlockDefaultClassName', 'gutenTag', setBlockCustomClassName );

registerBlockType( 'gutentag/loc-atf', {
	title: 'Location ATF',
	icon: 'heart',
	category: 'multicard',
	attributes: {
		cardTitle: { type: 'array', source: 'children', selector: '.locATFTitle' },
		cardTxt: { type: 'array', source: 'children', selector: '.locATFTxt' },
		cardImg: { attribute: 'src', selector: '.locATFImg' },
		cardAlt: { attribute: 'alt', selector: '.locATFImg' },

	},

	edit( { attributes, setAttributes } ) {
		const getImgButton = openEvent => attributes.cardImg ? <img src={ attributes.cardImg } onClick={ openEvent } className={ 'locATFImg rowcol1' } alt={ 'si' } /> : <div className={ 'locATFImg rowcol1' }><Button onClick={ openEvent } className="button button-large" >Pick an image</Button></div>;

		return (
      <figure className="locATF" id="headerActivator">
				<MediaUpload
					onSelect={ media => {
						setAttributes( { cardImg: media.url, cardAlt: media.alt } );
					} }
					type="image"
					value={ attributes.cardImg }
					render={ ( { open } ) => getImgButton( open ) }
				/>
        <figcaption className="locATFCaption rowcol1">
          <h3 className="cardTitle centerTitle specialTitle">
						<RichText
							onChange={ content => setAttributes( { cardTitle: content } ) }
							value={ attributes.cardTitle }
							placeholder="contenido"
						/>
					</h3>
          <p className="cardTxt">
						<RichText
							onChange={ content => setAttributes( { cardTxt: content } ) }
							value={ attributes.cardTxt }
							placeholder="contenido"
						/>
					</p>
        </figcaption>
      </figure>
		);
	},

	save( { attributes } ) {
		const image = ( src, alt, className ) => src ? <img src={ src } className={ className } alt={ alt } /> : null;

		return (
      <figure className="locATF" id="headerActivator">
				{ image( attributes.cardImg, attributes.cardAlt, 'locATFImg rowcol1' ) }
        <figcaption className="locATFCaption rowcol1">
					<h3 className="locATFTitle centerTitle specialTitle">{ attributes.cardTitle }</h3>
					<p className="locATFTxt centerTitle specialTitle">{ attributes.cardTxt }</p>
        </figcaption>
      </figure>
		);
	},
} );
