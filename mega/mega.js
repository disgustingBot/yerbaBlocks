const { RichText, MediaUpload, InnerBlocks, InspectorControls } = wp.editor;
const { registerBlockType } = wp.blocks;
const { Button, PanelBody, PanelRow, ToggleControl } = wp.components;

// Our filter function
function setBlockCustomClassName( className, blockName ) { return blockName === 'gutentag/mega' ? '' : className; }
wp.hooks.addFilter( 'blocks.getBlockDefaultClassName', 'gutenTag', setBlockCustomClassName );

registerBlockType( 'gutentag/mega', {
	title: 'Mega',
	icon: 'heart',
	category: 'sections',
	attributes: {
		cardTitle: { type: 'array', source: 'children', selector: '.megaTitle' },
		cardSubTitle: { type: 'array', source: 'children', selector: '.megaSubTitle' },
		cardTxt: { type: 'array', source: 'children', selector: '.megaTxt' },
		cardImg: { attribute: 'src', selector: '.megaImg' },
		cardAlt: { attribute: 'alt', selector: '.megaImg' },

		altStyle: {type:'array'}

	},

	edit( { attributes, setAttributes } ) {
		const getImgButton = openEvent => attributes.cardImg ? <img src={ attributes.cardImg } onClick={ openEvent } className={ 'megaImg' } alt={ 'si' } /> : <div className={ 'megaImg' }><Button onClick={ openEvent } className="button button-large" >Pick an image</Button></div>;

		return [
      <InspectorControls key='inspector'>
				<PanelBody title='Settings' initialOpen='true'>
					<PanelRow>
						<ToggleControl
			        label="Alt style"
			        help={ !attributes.altStyle ? 'Normal style' : 'Alternate style' }
			        checked={ attributes.altStyle }
			        onChange={ () => setAttributes( { altStyle: ! attributes.altStyle } ) }
				    />
					</PanelRow>
				</PanelBody>
      </InspectorControls>,

      <figure className="mega">
				<MediaUpload
					onSelect={ media => {
						setAttributes( { cardImg: media.url, cardAlt: media.alt } );
					} }
					type="image"
					value={ attributes.cardImg }
					render={ ( { open } ) => getImgButton( open ) }
				/>
        <figcaption className={ attributes.altStyle ? "megaCaption alt" : "megaCaption" }>
          <h4 className="megaTitle centerTitle specialTitle">
						<RichText
							onChange={ content => setAttributes( { cardTitle: content } ) }
							value={ attributes.cardTitle }
							placeholder="contenido"
						/>
					</h4>
					{ attributes.altStyle ? (
	          <h5 className="megaSubTitle">
							<RichText
								onChange={ content => setAttributes( { cardSubTitle: content } ) }
								value={ attributes.cardSubTitle }
								placeholder="contenido"
							/>
						</h5>
					) : null }
          <p className="megaTxt">
						<RichText
							onChange={ content => setAttributes( { cardTxt: content } ) }
							value={ attributes.cardTxt }
							placeholder="contenido"
						/>
					</p>
        </figcaption>
      </figure>
		];
	},

	save( { attributes } ) {
		const image = ( src, alt, className ) => src ? <img src={ src } className={ className } alt={ alt } /> : null;

		return (
      <figure className="mega">
				{ image( attributes.cardImg, attributes.cardAlt, 'megaImg' ) }
        <figcaption className="megaCaption">
					<h4 className="megaTitle centerTitle specialTitle">{ attributes.cardTitle }</h4>
					{ attributes.altStyle ? (
	          <h5 className="megaSubTitle">{ attributes.cardSubTitle }</h5>
					) : null }
					<p className="megaTxt">{ attributes.cardTxt }</p>
        </figcaption>
      </figure>
		);
	},
} );
