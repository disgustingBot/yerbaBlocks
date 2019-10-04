/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
const { MediaUpload, PlainText } = wp.editor;
const { registerBlockType } = wp.blocks;
const { Button } = wp.components;

// import './style.scss';
// import './editor.scss';

// Our filter function
function setBlockCustomClassName( className, blockName ) {
	return blockName === 'card-block/main' ? 'notATF' : className;
}
// Adding the filter
wp.hooks.addFilter( 'blocks.getBlockDefaultClassName', 'gutenTag', setBlockCustomClassName );

registerBlockType( 'card-block/main', {
	title: 'Card',
	icon: 'heart',
	category: 'common',
	attributes: {
		title: {
			source: 'text',
			selector: '.card__title',
		},
		body: {
			type: 'array',
			source: 'children',
			selector: '.card__body',
		},
		imageAlt: {
			attribute: 'alt',
			selector: '.card__image',
		},
		imageUrl: {
			attribute: 'src',
			selector: '.card__image',
		},
	},
	edit( { attributes, setAttributes } ) {
		const getImageButton = openEvent => {
			if ( attributes.imageUrl ) {
				return (
					// eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
					// eslint-disable-next-line jsx-a11y/click-events-have-key-events
					<img
						src={ attributes.imageUrl }
						onClick={ openEvent }
						className="image"
						alt={ 'pepe' }
					/>
				);
			}
			return (
				<div className="button-container">
					<Button
						onClick={ openEvent }
						className="button button-large"
					>Pick an image</Button>
				</div>
			);
		};

		return (
			<section className={ 'ATF' }>
				<video className={ 'videoATF' } loop="loop" autoPlay={ 'true' } playsinline={ 'true' } muted={ 'true' }>
					<source type="video/mp4" src="http://localhost/cbbc/wp-content/themes/yerba/img/home/shutterstock_25094927_4-1.mp4" alt="Fondo-de-video-del-mediterraneo-desde-arriba" ></source>
				</video>
				<figure className={ 'cards cardsATF cardATF1' }>
					<MediaUpload
						onSelect={ media => {
							setAttributes( { imageAlt: media.alt, imageUrl: media.url } );
						} }
						type="image"
						value={ attributes.imageID }
						render={ ( { open } ) => getImageButton( open ) }
						className={ 'standarCardImg itemImg' }
					/>
					<figcaption className={ 'cardsTxt specialTitle' }>
						<PlainText
							onChange={ content => setAttributes( { title: content } ) }
							value={ attributes.title }
							placeholder={ 'Your card title' }
							className={ 'heading' }
						/>
					</figcaption>
				</figure>
			</section>
		);
	},
	save( { attributes } ) {
		const cardImage = ( src, alt ) => {
			// eslint-disable-next-line brace-style
			if ( ! src ) { return null; }
			return alt ? <img className={ 'standarCardImg itemImg' } src={ src } alt={ alt } /> : <img className={ 'standarCardImg itemImg' } src={ src } alt="" aria-hidden="true" />;
		};

		return (
			<section className={ 'ATF' }>
				<video className={ 'videoATF' } loop="loop" autoPlay={ 'true' } playsinline={ 'true' } muted={ 'true' }>
					<source type="video/mp4" src="http://localhost/cbbc/wp-content/themes/yerba/img/home/shutterstock_25094927_4-1.mp4" alt="Fondo-de-video-del-mediterraneo-desde-arriba" ></source>
				</video>
				<figure className={ 'cards cardsATF cardATF1' }>
					{ cardImage( attributes.imageUrl, attributes.imageAlt ) }
					<figcaption className={ 'cardsTxt specialTitle' }>
						<h3>{ attributes.title }</h3>
					</figcaption>
				</figure>
			</section>
		);
	},
} );
