const { RichText, MediaUpload } = wp.editor;
const { registerBlockType } = wp.blocks;
const { Button } = wp.components;

// Our filter function
function setBlockCustomClassName( className, blockName ) { return blockName === 'gutentag/item5050' ? '' : className; }
wp.hooks.addFilter( 'blocks.getBlockDefaultClassName', 'gutenTag', setBlockCustomClassName );

registerBlockType( 'gutentag/item5050', {
	title: 'item5050',
	icon: 'heart',
	category: 'multicard',
	attributes: {
		itemTitleH5: { type: 'array', source: 'children', selector: '.itemTitleH5' },
		item5050Img: { attribute: 'src', selector: '.item5050Img' },
		item5050Alt: { attribute: 'alt', selector: '.item5050Img' },

	},

	edit( { attributes, setAttributes } ) {
		const getImgButton = openEvent => attributes.item5050Img ? <img src={ attributes.item5050Img } onClick={ openEvent } className={ 'item5050Img itemImg' } alt={ 'si' } /> : <div className={ 'itemImg' }><Button onClick={ openEvent } className="button button-large" >Pick an image</Button></div>;

		return (
      <figure className="item5050 SectionItem">
				<MediaUpload
					onSelect={ media => {
						setAttributes( { item5050Img: media.url, item5050Alt: media.alt } );
					} }
					type="image"
					value={ attributes.item5050Img }
					render={ ( { open } ) => getImgButton( open ) }
				/>
        <figcaption className="localizacionItemFigcaption itemTitleCenter itemTitle">
          <h5 className="itemTitleH5">
						<RichText
							onChange={ content => setAttributes( { itemTitleH5: content } ) }
							value={ attributes.itemTitleH5 }
							placeholder="contenido"
						/>
					</h5>
        </figcaption>
      </figure>
		);
	},

	save( { attributes } ) {
		const image = ( src, alt, className ) => src ? <img src={ src } className={ className } alt={ alt } /> : null;

		return (
      <figure className="item5050 SectionItem">
				{ image( attributes.item5050Img, attributes.item5050Alt, 'item5050Img itemImg' ) }
        <figcaption className="localizacionItemFigcaption itemTitleCenter itemTitle">
				<h5 className="itemTitleH5">{ attributes.itemTitleH5 }</h5>
        </figcaption>
      </figure>
		);
	},
} );
