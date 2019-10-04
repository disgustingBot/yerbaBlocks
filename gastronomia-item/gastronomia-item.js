const { RichText, MediaUpload } = wp.editor;
const { registerBlockType } = wp.blocks;
const { Button } = wp.components;

// Our filter function
function setBlockCustomClassName( className, blockName ) { return blockName === 'gutentag/gastronomia-item' ? '' : className; }
wp.hooks.addFilter( 'blocks.getBlockDefaultClassName', 'gutenTag', setBlockCustomClassName );

registerBlockType( 'gutentag/gastronomia-item', {
	title: 'Gastronomia Item',
	icon: 'heart',
	category: 'common',
	attributes: {
    imgOverlayTxt:       { type: 'array', source: 'children', selector: '.imgOverlayTxt' },
	},

	edit( { attributes, setAttributes } ) {
		const getImgButton = openEvent => attributes.item5050Img ? <img src={ attributes.item5050Img } onClick={ openEvent } className={ 'item5050Img itemImg' } alt={ 'si' } /> : <div className={ 'itemImg' }><Button onClick={ openEvent } className="button button-large" >Pick an image</Button></div>;

		return (
      <figure className="gastronomiaItem33 SectionItem">
        <figcaption className="imgOverlay">
          <p className="imgOverlayTxt">
            <RichText
              onChange={ content => setAttributes( { imgOverlayTxt: content } ) }
              value={ attributes.imgOverlayTxt }
              placeholder="Escribir frase estilo 'CBbC es...'"
            />
          </p>
        </figcaption>
        <img src="<?php echo get_template_directory_uri(); ?>/img/home/80.jpg" alt="" class="gastronomiaItemImg itemImg" />
        <figcaption className="gastronomiaItemFigcaption titleTopRight itemTitle">
          Chiringo CBbC
        </figcaption>
      </figure>
		);
	},

	save( { attributes } ) {
		const image = ( src, alt, className ) => src ? <img src={ src } className={ className } alt={ alt } /> : null;

		return (
      <figure className="gastronomiaItem33 SectionItem">
        <figcaption className="imgOverlay">
          <p className="imgOverlayTxt">{ attributes.imgOverlayTxt }</p>
        </figcaption>
        <img src="<?php echo get_template_directory_uri(); ?>/img/home/80.jpg" alt="" class="gastronomiaItemImg itemImg" />
        <figcaption className="gastronomiaItemFigcaption titleTopRight itemTitle">Chiringo CBbC</figcaption>
      </figure>
		);
	},
} );
