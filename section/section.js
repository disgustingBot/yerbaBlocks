const { RichText, MediaUpload, InnerBlocks, InspectorControls } = wp.editor;
const { registerBlockType } = wp.blocks;
const { Button, SelectControl, PanelBody, PanelRow, TextControl } = wp.components;

// Our filter function
function setBlockCustomClassName( className, blockName ) { return blockName === 'gutentag/section' ? '' : className; }
// Adding the filter
wp.hooks.addFilter( 'blocks.getBlockDefaultClassName', 'gutenTag', setBlockCustomClassName );

registerBlockType( 'gutentag/section', {
	title: 'section',
	icon: 'heart',
	category: 'sections',
	attributes: {
		figureImg: { attribute: 'src', selector: '.standarCardImg' },
		figureAlt: { attribute: 'alt', selector: '.standarCardImg' },
		cbbcEs: { type: 'array', source: 'children', selector: '.cbbcEs' },
		superTitle: { type: 'array', source: 'children', selector: '.superTitle' },
		standardCardTitle: { type: 'array', source: 'children', selector: '.standardCardTitle' },
		cardTxt: { type: 'array', source: 'children', selector: '.cardTxt' },
		extraClass: { type: 'string', },
		cantCol: { type: 'string', default: 2 },

	},

	edit( { attributes, setAttributes } ) {
		const getLogoButton = openEvent => attributes.figureImg ? <img src={ attributes.figureImg } onClick={ openEvent } className="standarCardImg rowcol1" alt={ 'si' } /> : <div className={ 'standarCardImg rowcol1' }><Button onClick={ openEvent } className="button button-large" >Pick a Logo image</Button></div>;

		return [

      <InspectorControls key='inspector'>
				<PanelBody title='Settings' initialOpen='true'>
					<PanelRow>
						<SelectControl
							onChange= {value => setAttributes( { cantCol: value } )}
							value={ attributes.cantCol }
							label={ '# of columns:' }
							options={ [
								{ label: '2', value: '2' },
								{ label: '3', value: '3' },
								{ label: '4', value: '4' },
							] }
						/>
					</PanelRow>
					<PanelRow>
						<TextControl
							label='Extra class for flex:'
							onChange= {value => setAttributes( { extraClass: value } )}
							value={ attributes.extraClass }
						/>
					</PanelRow>
				</PanelBody>
      </InspectorControls>,


			<section className="section">
		    <h4 className="sectionTitle specialTitle rowcol1 colMax">
		      <span className="cbbcEs">
						<RichText
							onChange={ content => setAttributes( { cbbcEs: content } ) }
							value={ attributes.cbbcEs }
							placeholder="intro"
						/>
					</span>
		      <span className="superTitle">
						<RichText
							onChange={ content => setAttributes( { superTitle: content } ) }
							value={ attributes.superTitle }
							placeholder="Section Title"
						/>
					</span>
		    </h4>

				<figure className="standarCard rowcol1">
					<MediaUpload
						onSelect={ media => {
							setAttributes( { figureImg: media.url, figureAlt: media.alt } );
						} }
						type="image"
						value={ attributes.imageID }
						render={ ( { open } ) => getLogoButton( open ) }
					/>
					<figcaption className="standarCardCaption">
						<h5 className="standardCardTitle">
							<RichText
								onChange={ content => setAttributes( { standardCardTitle: content } ) }
								value={ attributes.standardCardTitle }
								placeholder="Card Title"
							/>
						</h5>
						<p className="cardTxt">
							<RichText
								onChange={ content => setAttributes( { cardTxt: content } ) }
								value={ attributes.cardTxt }
								placeholder="Card Text"
							/>
						</p>
					</figcaption>
				</figure>

			  <flex className={ "colMax flex" + attributes.cantCol + " " + attributes.extraClass }>
 					<InnerBlocks />
				</flex>
			</section>
		];
	},
	save( { attributes } ) {
		const image = ( src, alt, className ) => src ? <img src={ src } className={ className } alt={ alt } /> : null;

		return (
			<section className="section">
				<h4 className="sectionTitle specialTitle rowcol1 colMax">
					<span className="cbbcEs">{ attributes.cbbcEs }</span>
					<span className="superTitle">{ attributes.superTitle }</span>
				</h4>

				<figure className="standarCard rowcol1">
					{ image( attributes.figureImg, attributes.figureAlt, 'standarCardImg rowcol1' ) }
					<figcaption className="standarCardCaption">
						<h5 className="standardCardTitle">{ attributes.standardCardTitle }</h5>
						<p className="cardTxt">{ attributes.cardTxt }</p>
					</figcaption>
				</figure>

			  <flex className={ "colMax flex" + attributes.cantCol + " " + attributes.extraClass }>
   				<InnerBlocks.Content />
				</flex>
			</section>
		);
	},
} );
