const { RichText, MediaUpload } = wp.editor;
const { registerBlockType } = wp.blocks;
const { Button } = wp.components;

// Our filter function
function setBlockCustomClassName( className, blockName ) { return blockName === 'gutentag/item5050' ? '' : className; }
wp.hooks.addFilter( 'blocks.getBlockDefaultClassName', 'gutenTag', setBlockCustomClassName );

registerBlockType( 'gutentag/item5050', {
	title: 'item5050',
	icon: 'heart',
	category: 'common',
	attributes: {
	},

	edit( { attributes, setAttributes } ) {
		const getImgButton = openEvent => attributes.fPSectionImg ? <img src={ attributes.fPSectionImg } onClick={ openEvent } className={ 'fPSectionImg itemImg' } alt={ 'si' } /> : <div style={ styleButton } className={ 'itemImg' }><Button onClick={ openEvent } className="button button-large" >Pick an image</Button></div>;

		return (
      <figure class="item5050 SectionItem">
        <img src="<?php echo get_template_directory_uri(); ?>/img/home/view-sandy-beach_23-2147836788.jpg" alt="" class="item5050Img itemImg" />
        <figcaption class="localizacionItemFigcaption itemTitleCenter itemTitle">
          <a href="#"><h5>Ibiza</h5></a>
        </figcaption>
      </figure>
		);
	},

	save( { attributes } ) {
		const image = ( src, alt, className ) => src ? <img src={ src } className={ className } alt={ alt } /> : null;

		return (
      <figure class="item5050 SectionItem">
        <img src="<?php echo get_template_directory_uri(); ?>/img/home/view-sandy-beach_23-2147836788.jpg" alt="" class="item5050Img itemImg" />
        <figcaption class="localizacionItemFigcaption itemTitleCenter itemTitle">
          <a href="#"><h5>Ibiza</h5></a>
        </figcaption>
      </figure>
		);
	},
} );
