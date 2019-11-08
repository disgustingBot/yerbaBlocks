/* eslint-disable linebreak-style */
/* eslint-disable brace-style */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
const { RichText, MediaUpload, InnerBlocks, InspectorControls } = wp.editor;
const { registerBlockType } = wp.blocks;
const { Button, SelectControl, PanelBody, PanelRow, TextControl } = wp.components;
// import './style.scss';
// import './editor.scss';

// Our filter function
function setBlockCustomClassName( className, blockName ) { return blockName === 'gutentag/home-atf' ? '' : className; }
// Adding the filter
wp.hooks.addFilter( 'blocks.getBlockDefaultClassName', 'gutenTag', setBlockCustomClassName );

registerBlockType( 'gutentag/home-atf', {
	title: 'homeATF',
	icon: 'heart',
	category: 'sections',
	attributes: {
		videoUrl: { attribute: 'src', selector: '.homeATFvideoSrc' },
		logoUrl: { attribute: 'src', selector: '.homeATFLogo' },
		logoAlt: { attribute: 'alt', selector: '.homeATFLogo' },
		copyATF: { type: 'array', source: 'children', selector: '.homeATFCopy' },
		cantCol: { type: 'string', },
	},

	edit( { attributes, setAttributes } ) {
		const getVideoButton = openEvent => attributes.videoUrl ? <video id="headerActivator" className="homeATFvideo rowcol1" onClick={ openEvent } loop="loop" autoPlay={ 'true' } playsinline={ 'true' } muted={ 'true' }><source className='homeATFvideoSrc' src={ attributes.videoUrl }></source></video> : <div className="homeATFvideo rowcol1"><Button onClick={ openEvent } className="button button-large" >Pick a background video</Button></div>;
		const getLogoButton = openEvent => attributes.logoUrl ? <img src={ attributes.logoUrl } onClick={ openEvent } className="homeATFLogo" alt={ 'si' } /> : <div className={ 'homeATFLogo' }><Button onClick={ openEvent } className="button button-large" >Pick a Logo image</Button></div>;

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
				</PanelBody>
      </InspectorControls>,

			<section className="homeATF">
				<MediaUpload
					onSelect={ media => {
						setAttributes( { videoUrl: media.url } );
					} }
					value={ attributes.imageID }
					render={ ( { open } ) => getVideoButton( open ) }
				/>

				<figure className="homeATFIsoLogo rowcol1">
					<MediaUpload
						onSelect={ media => {
							setAttributes( { logoUrl: media.url, logoAlt: media.alt } );
						} }
						type="image"
						value={ attributes.imageID }
						render={ ( { open } ) => getLogoButton( open ) }
					/>
					<figcaption className="specialTitle">
						<h2 className="homeATFCopy">
							<RichText
								onChange={ content => setAttributes( { copyATF: content } ) }
								value={ attributes.copyATF }
								placeholder="The copy of the site"
							/>
						</h2>
					</figcaption>
				</figure>

			  <flex className={ attributes.cantCol ? "homeATFflex flex" + attributes.cantCol : "homeATFflex flex3" }>
 					<InnerBlocks />
				</flex>
			</section>
		];
	},
	save( { attributes } ) {
		const backgroundVideo = src => src ? <video id="headerActivator" className="homeATFvideo rowcol1" loop="loop" autoPlay={ 'true' } playsinline={ 'true' } muted={ 'true' }><source className={ 'homeATFvideoSrc' } src={ src }></source></video> : null;
		const image = ( src, alt, className ) => src ? <img src={ src } className={ className } alt={ alt } /> : null;

		return (
			<section className="homeATF">
				{ backgroundVideo( attributes.videoUrl ) }

				<figure className="homeATFIsoLogo rowcol1">
					{ image( attributes.logoUrl, attributes.logoAlt, 'homeATFLogo' ) }
					<figcaption className="specialTitle">
						<h2 className="homeATFCopy">{ attributes.copyATF }</h2>
					</figcaption>
				</figure>

			  <flex className={ attributes.cantCol ? "homeATFflex flex" + attributes.cantCol : "homeATFflex flex3" }>
   				<InnerBlocks.Content />
				</flex>
			</section>
		);
	},
} );
