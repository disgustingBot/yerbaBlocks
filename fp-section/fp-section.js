/* eslint-disable linebreak-style */
/* eslint-disable brace-style */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
const { RichText, MediaUpload } = wp.editor;
const { registerBlockType } = wp.blocks;
const { Button } = wp.components;

// Our filter function
function setBlockCustomClassName( className, blockName ) { return blockName === 'gutentag/fp-section' ? '' : className; }
wp.hooks.addFilter( 'blocks.getBlockDefaultClassName', 'gutenTag', setBlockCustomClassName );

registerBlockType( 'gutentag/fp-section', {
	title: 'fPSection',
	icon: 'heart',
	category: 'common',
	attributes: {
		cbbcEs:       { type: 'array', source: 'children', selector: '.cbbcEs' },
		specialTitle: { type: 'array', source: 'children', selector: '.specialTitle' },
		fPSectionImg: { attribute: 'src', selector: '.fPSectionImg' },
		fPSectionAlt: { attribute: 'alt', selector: '.fPSectionImg' },
		localizacionesFigcaptionH5: { type: 'array', source: 'children', selector: '.localizacionesFigcaptionH5' },
		localizacionesFigcaptionP: { type: 'array', source: 'children', selector: '.localizacionesFigcaptionP' },

	},

	edit( { attributes, setAttributes } ) {
		const styleButton = {
			position: 'absolute',
			zIndex: '10',
		}
		const getImgButton = openEvent => attributes.fPSectionImg ? <img src={ attributes.fPSectionImg } onClick={ openEvent } className={ 'fPSectionImg itemImg' } alt={ 'si' } /> : <div style={ styleButton } className={ 'itemImg' }><Button onClick={ openEvent } className="button button-large" >Pick an image</Button></div>;

		return (
			<section className="fPSection">

			  <article className="fPSectionHead">
			    <h4 className="fPSectionTitle rowcol1">
						<span className="cbbcEs">
							<RichText
								onChange={ content => setAttributes( { cbbcEs: content } ) }
								value={ attributes.cbbcEs }
								placeholder="Escribir frase estilo 'CBbC es...'"
							/>
						</span>
						<span className="specialTitle">
							<RichText
								onChange={ content => setAttributes( { specialTitle: content } ) }
								value={ attributes.specialTitle }
								placeholder="Aquí va el titulo, como 'Localizaciones'"
							/>
						</span>
					</h4>
			    <figure className="fPSectionFigure rowcol1">
						<MediaUpload
							onSelect={ media => {
								setAttributes( { fPSectionImg: media.url, fPSectionAlt: media.alt } );
							} }
							type="image"
							value={ attributes.imageID }
							render={ ( { open } ) => getImgButton( open ) }
						/>
			      <figcaption className="localizacionesHeadFigcaption">
			        <h5 className="localizacionesFigcaptionH5">
								<RichText
									onChange={ content => setAttributes( { localizacionesFigcaptionH5: content } ) }
									value={ attributes.localizacionesFigcaptionH5 }
									placeholder="Sub titulo"
								/>
							</h5>
			        <p className="localizacionesFigcaptionP">
								<RichText
									onChange={ content => setAttributes( { localizacionesFigcaptionP: content } ) }
									value={ attributes.localizacionesFigcaptionP }
									placeholder="contenido"
								/>
							</p>
			      </figcaption>
			    </figure>
			  </article>

			</section>
		);
	},

	save( { attributes } ) {
		const image = ( src, alt, className ) => src ? <img src={ src } className={ className } alt={ alt } /> : null;

		return (
			<section className="fPSection">
			  <article className="fPSectionHead">
			    <h4 className="fPSectionTitle rowcol1">
						<span className="cbbcEs">
							{ attributes.cbbcEs }
						</span>
						<span className="specialTitle">
							{ attributes.specialTitle }
						</span>
					</h4>
			    <figure className="fPSectionFigure rowcol1">
						{ image( attributes.fPSectionImg, attributes.fPSectionAlt, 'fPSectionImg itemImg' ) }
						<figcaption className="localizacionesHeadFigcaption">
							<h5 className="localizacionesFigcaptionH5">{ attributes.localizacionesFigcaptionH5 }</h5>
							<p className="localizacionesFigcaptionP">{ attributes.localizacionesFigcaptionP }</p>
						</figcaption>
					</figure>
				</article>
			</section>
		);
	},
} );
