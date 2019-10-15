const { RichText, MediaUpload, InspectorControls } = wp.editor;
const { registerBlockType } = wp.blocks;
const { Button, SelectControl, PanelBody, PanelRow } = wp.components;
const { Component, Fragment } = wp.element;

// Our filter function
function setBlockCustomClassName( className, blockName ) { return blockName === 'gutentag/load-cont' ? '' : className; }
wp.hooks.addFilter( 'blocks.getBlockDefaultClassName', 'gutenTag', setBlockCustomClassName );

registerBlockType( 'gutentag/load-cont', {
	title: 'Load Content',
	icon: 'smiley',
	category: 'multicard',
	attributes: {

    posts: {type: 'array'},
    selected: {type: 'array'},
    options: {type: 'array', default: [{label: 'Choose:', value: 0}]},
    styles: {type: 'array', default: [
      {label: 'Choose:', value: 0},
      {label: 'card:', value: 'card'},
      {label: 'standardCard:', value: 'standardCard'},
      {label: 'tarjeta:', value: 'tarjeta'},
      {label: 'hidshow:', value: 'hidshow'},
      {label: 'musical:', value: 'musical'},
      {label: 'mega:', value: 'mega'},
      {label: 'show:', value: 'show'},
      {label: 'carus:', value: 'carus'},
      {label: 'simpleCard:', value: 'simpleCard'},
    ]},

		style: {type: 'array', selector:'#mc', attribute: 'class' },
    title: {type: 'array', selector: '#mcTitle', attribute: 'child'},
    content: {type: 'array'},
    link: {type: 'array'},
    img: {type: 'array', selector: '#mcImg', attribute: 'src'},

	},

	edit( { attributes, setAttributes } ) {
		const getImgButton = openEvent => attributes.cardImg ? <img src={ attributes.cardImg } onClick={ openEvent } className={ 'standarCardImg' } alt={ 'si' } /> : <div className={ 'standarCardImg' }><Button onClick={ openEvent } className="button button-large" >Pick an image</Button></div>;

    // console.log(this);

    const getCont = a => {
      console.log(wp.api)
      // const a = new wp.api.collections.Posts();
      switch (a) {
        case 0:
          new wp.api.collections.Posts().fetch().then( posts => {
            var options = posts.map(post => { return { label: post.title.rendered, value: post.id }; })
            options.unshift({label: 'Choose:', value: 0});
            setAttributes( { posts, options } );
          });
          break;
        case 1:
          new wp.api.collections.Location().fetch().then( posts => {
            var options = posts.map(post => { return { label: post.title.rendered, value: post.id }; })
            options.unshift({label: 'Choose:', value: 0});
            setAttributes( { posts, options } );
          });
          break;
        case 2:
          new wp.api.collections.Restaurant().fetch().then( posts => {
            var options = posts.map(post => { return { label: post.title.rendered, value: post.id }; })
            options.unshift({label: 'Choose:', value: 0});
            setAttributes( { posts, options } );
          });
          break;
        default:

      }
    }


    const onChangeSelect = value => {
      // Find the post
      const post = attributes.posts.find( ( item ) => { return item.id == parseInt( value ) } );

      setAttributes({
        selected: parseInt( value ),
        title: post.title.rendered,
        content: post.excerpt.rendered,
        link: post.link,
      });

      new wp.api.models.Media( { id: post.featured_media } ).fetch().then(img => {
        setAttributes({ img: img.source_url });
      });
    }
    // getCont();

		return [
      <InspectorControls key='inspector'>
        <PanelRow>
          <Button  onClick={ () => getCont(0) } className="button button-large" >
            Post
          </Button>
          <Button  onClick={ () => getCont(1) } className="button button-large" >
            Location
          </Button>
          <Button  onClick={ () => getCont(2) } className="button button-large" >
            Restaurant
          </Button>
        </PanelRow>
				<PanelBody title='Settings' initialOpen='true'>
          <PanelRow>
            <SelectControl onChange={ (value) => onChangeSelect(value) } value={ attributes.selected } label={ 'Select one' } options={ attributes.options } />
          </PanelRow>
          <PanelRow>
            <SelectControl onChange={ (value) => setAttributes({ style: value }) } value={ attributes.style } label={ 'Select a style' } options={ attributes.styles } />
          </PanelRow>
        </PanelBody>
      </InspectorControls>,

			<figure id="mc" className={ attributes.style != 0 ? attributes.style : 'card' }>
				<img id="mcImg" className={ attributes.style ? attributes.style + 'Img' : 'cardImg' } src={ attributes.img } />
				<figcaption id="mcCaption" className={ attributes.style ? attributes.style + 'Caption' : 'cardCaption' }>
					<h5 id="mcTitle" className="cardTxt">
						{ attributes.title }
					</h5>
				</figcaption>
			</figure>
		];
	},

	save( { attributes } ) {
		const image = ( src, alt, className ) => src ? <img src={ src } className={ className } alt={ alt } /> : null;

		return (
      <figure id="mc" className={ attributes.style != 0 ? attributes.style : 'card' }>
        <img id="mcImg" className={ attributes.style ? attributes.style + 'Img' : 'cardImg' } src={ attributes.img } />
        <figcaption id="mcCaption" className={ attributes.style ? attributes.style + 'Caption' : 'cardCaption' }>
          <h5 id="mcTitle" className="cardTxt">
            { attributes.title }
					</h5>
        </figcaption>
      </figure>
		);
	},
} );
