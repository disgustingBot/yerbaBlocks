const { RichText, MediaUpload } = wp.editor;
const { registerBlockType } = wp.blocks;
const { Button } = wp.components;

// Our filter function
function setBlockCustomClassName( className, blockName ) { return blockName === 'gutentag/show' ? '' : className; }
wp.hooks.addFilter( 'blocks.getBlockDefaultClassName', 'gutenTag', setBlockCustomClassName );

registerBlockType( 'gutentag/show', {
	title: 'Show',
	icon: 'heart',
	category: 'sections',
	attributes: {
		cardTitle: { type: 'array', source: 'children', selector: '.showTitle' },
		cardSubTitle: { type: 'array', source: 'children', selector: '.showSubTitle' },
		cardTxt: { type: 'array', source: 'children', selector: '.showTxt' },
		cardImg: { attribute: 'src', selector: '.megaImg' },
		cardAlt: { attribute: 'alt', selector: '.megaImg' },

		logoImg: { attribute: 'src', selector: '.megaImg' },
	},

	edit( { attributes, setAttributes } ) {
		const getImgButton = openEvent => attributes.cardImg ? <img src={ attributes.cardImg } onClick={ openEvent } className={ 'showImg rowcol1' } alt={ 'si' } /> : <div className={ 'showImg rowcol1' }><Button onClick={ openEvent } className="button button-large" >Pick an image</Button></div>;


    const onChangeSelect = media => {

      setAttributes( { cardImg: media.url, cardAlt: media.alt } );

      new wp.api.models.Media( { id: 1265 } ).fetch().then(img => {
				console.log(img);
        setAttributes({ logoImg: img.source_url });
      });
    }

		return (
      <figure className="show">
				<MediaUpload
					onSelect={ media => {
						onChangeSelect( media );
					} }
					type="image"
					value={ attributes.cardImg }
					render={ ( { open } ) => getImgButton( open ) }
				/>
				{ attributes.cardImg ? <img src={ attributes.logoImg } className={ 'showLogo rowcol1' } alt='' /> : null }
        <figcaption className="showCaption">
          <h4 className="showTitle specialTitle">
						<RichText
							onChange={ content => setAttributes( { cardTitle: content } ) }
							value={ attributes.cardTitle }
							placeholder="contenido"
						/>
					</h4>
          <h4 className="showSubTitle">
						<RichText
							onChange={ content => setAttributes( { cardSubTitle: content } ) }
							value={ attributes.cardSubTitle }
							placeholder="contenido"
						/>
					</h4>
          <p className="showTxt">
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
      <figure className="show">
				{ image( attributes.cardImg, attributes.cardAlt, 'showImg rowcol1' ) }
				{ attributes.cardImg ? image( attributes.logoImg, '', 'showLogo rowcol1' ) : null }
        <figcaption className="showCaption">
					<h4 className="showTitle specialTitle">{ attributes.cardTitle }</h4>
					<h5 className="showSubTitle">{ attributes.cardSubTitle }</h5>
					<p className="showTxt">{ attributes.cardTxt }</p>
        </figcaption>
      </figure>
		);
	},
} );
