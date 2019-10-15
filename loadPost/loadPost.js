const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { InspectorControls, MediaUpload } = wp.editor; // Import registerBlockType() from wp.blocks
const { SelectControl } = wp.components;
const { Component, Fragment } = wp.element;


class mySelectPosts extends Component {
  // Method for setting the initial state.
  static getInitialState( selectedPost ) {
    return {
      posts: [],
      selectedPost: selectedPost,
      post: {},
    };
  }
  // Constructing our component. With super() we are setting everything to 'this'.
  // Now we can access the attributes with this.props.attributes
  constructor() {
    super( ...arguments );
    this.state = this.constructor.getInitialState( this.props.attributes.selectedPost );
    // Bind so we can use 'this' inside the method.
    this.getOptions = this.getOptions.bind(this);
    // Load posts.
    this.getOptions();
    // Bind it.
    this.onChangeSelectPost = this.onChangeSelectPost.bind(this);
  }


  onChangeSelectPost( value ) {
    // Find the post
    const post = this.state.posts.find( ( item ) => { return item.id == parseInt( value ) } );
    // Set the state
    this.setState( { selectedPost: parseInt( value ), post } );

    new wp.api.collections.Media().fetch().then(medias => {
      const img = medias.find( item => item.id == post.featured_media );
      post.featured_media = img;

      // Set the attributes
      this.props.setAttributes( {
        selectedPost: parseInt( value ),
        title: post.title.rendered,
        content: post.excerpt.rendered,
        link: post.link,
      });
    });

  }

  /**
  * Loading Posts
  */
  getOptions() {
    return ( new wp.api.collections.Posts() ).fetch().then( posts => {

      if( posts && 0 !== this.state.selectedPost ) {
        // If we have a selected Post, find that post and add it.
        const post = posts.find( item => item.id == this.state.selectedPost );
        // Now we look for the image, we gonna need it later on
        new wp.api.collections.Media().fetch().then(medias => {
          const img = medias.find( item => item.id == post.featured_media );
          post.featured_media = img;
          // This is the same as { post: post, posts: posts }
          this.setState( { post, posts } );
        });
      } else {
        this.setState({ posts });
      }
    });
  }

  render() {
    let options = [ { value: 0, label: __( 'Select a Post' ) } ];
    let output  = __( 'Loading Posts' );
    if( this.state.posts.length > 0 ) {
      const loading = __( 'We have %d posts. Choose one, please.' );
      output = loading.replace( '%d', this.state.posts.length );
      this.state.posts.forEach(post => {
        options.push({value:post.id, label:post.title.rendered});
      });
     } else {
       output = __( 'No posts found. Please create some first.' );
     }
    // Checking if we have anything in the object
    if( this.state.post.hasOwnProperty('title') ) {
      output = (
        <div className="simpleCard">
          <img src={ this.state.post.featured_media.source_url } />
          <a href={ this.state.post.link }><h2 dangerouslySetInnerHTML={ { __html: this.state.post.title.rendered } }></h2></a>
          <div dangerouslySetInnerHTML={ { __html: this.state.post.excerpt.rendered } }></div>
        </div>
      );
      this.props.className += ' has-post';
    } else {
      this.props.className += ' no-post';
    }

    return [
      !! this.props.isSelected && (
        <InspectorControls key='inspector'>
          <SelectControl onChange={this.onChangeSelectPost} value={ this.props.attributes.selectedPost } label={ __( 'Select a Post' ) } options={ options } />
        </InspectorControls>
      ),
      <Fragment>{ output }</Fragment>
    ]
  }
}
/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'gutentag/load-post', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Load a Post' ), // Block title.
	icon: 'shield', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'multicard', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
  keywords: [
		__( 'load' ),
		__( 'Load Post' ),
		__( 'guten-load-post' ),
	],
  attributes: {
    content: {
      type: 'string',
      source: 'html',
      multiline: 'p',
      selector: '.pepe',
    },
    title: {
      type: 'string',
      selector: 'h2'
    },
    link: {
      type: 'string',
      selector: 'a'
    },
    selectedPost: {
      type: 'number',
      default: 0,
    },
  },

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Component.
	 */

	// The "edit" property must be a valid function.
	edit: mySelectPosts,

   // The "save" property must be specified and must be a valid function.
   save: function( props ) {
     return (
       <div className="post">
         <a href={ props.attributes.link }><h2 dangerouslySetInnerHTML={ { __html: props.attributes.title } }></h2></a>
         <div className="pepe" dangerouslySetInnerHTML={ { __html: props.attributes.content } }></div>
       </div>
     );
   },
} );
