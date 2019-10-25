const { RichText, MediaUpload, InnerBlocks, InspectorControls } = wp.editor;
const { registerBlockType } = wp.blocks;
const { Button, SelectControl, PanelBody, PanelRow, TextControl } = wp.components;

// Our filter function
function setBlockCustomClassName( className, blockName ) { return blockName === 'gutentag/hidshow' ? '' : className; }
wp.hooks.addFilter( 'blocks.getBlockDefaultClassName', 'gutenTag', setBlockCustomClassName );

registerBlockType( 'gutentag/hidshow', {
	title: 'hidshow',
	icon: 'heart',
	category: 'multicard',
	attributes: {
		itemTitle: { type: 'array', source: 'children', selector: '.itemTitle' },
		hidshowTxt: { type: 'array', source: 'children', selector: '.hidshowTxt' },
		cardImg: { attribute: 'src', selector: '.hidshowImg' },
		cardAlt: { attribute: 'alt', selector: '.hidshowImg' },

		titlePosition: {default:'TR'},
	},

	edit( { attributes, setAttributes } ) {
		const getImgButton = openEvent => attributes.cardImg ? <img src={ attributes.cardImg } onClick={ openEvent } className={ 'hidshowImg rowcol1' } alt={ 'si' } /> : <div className={ 'hidshowImg rowcol1' }><Button onClick={ openEvent } className="button button-large" >Pick an image</Button></div>;

		return [

      <InspectorControls key='inspector'>
				<PanelBody title='Settings' initialOpen='true'>
					<PanelRow>
						<SelectControl
							onChange= {value => setAttributes( { titlePosition: value } )}
							value={ attributes.titlePosition }
							label={ 'Position of title' }
							options={ [
								{ label: 'Center',       value: 'C' },
								{ label: 'Top Right',    value: 'TR' },
								{ label: 'Top Left',     value: 'TL' },
								{ label: 'Bottom Right', value: 'BR' },
								{ label: 'Bottom Left',  value: 'BL' },
							] }
						/>
					</PanelRow>
				</PanelBody>
      </InspectorControls>,

      <figure className="hidshow grid">
				<MediaUpload
					onSelect={ media => {
						setAttributes( { cardImg: media.url, cardAlt: media.alt } );
					} }
					type="image"
					value={ attributes.cardImg }
					render={ ( { open } ) => getImgButton( open ) }
				/>
        <figcaption className="grid rowcol1">
          <p className={ "itemTitle rowcol1 itemTitle" + attributes.titlePosition }>
						<RichText
							onChange={ content => setAttributes( { itemTitle: content } ) }
							value={ attributes.itemTitle }
							placeholder="contenido"
						/>
					</p>
          <p className="rowcol1 hidshowTxt">
						<RichText
							onChange={ content => setAttributes( { hidshowTxt: content } ) }
							value={ attributes.hidshowTxt }
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
      <figure className="hidshow grid">
				{ image( attributes.cardImg, attributes.cardAlt, 'hidshowImg rowcol1' ) }
        <figcaption className="grid rowcol1">
					<p className={ "itemTitle rowcol1 itemTitle" + attributes.titlePosition }>{ attributes.itemTitle }</p>
					{ attributes.hidshowTxt == [] ? <p className="rowcol1 hidshowTxt">{ attributes.hidshowTxt }</p> : null }
        </figcaption>
      </figure>
		);
	},
} );
