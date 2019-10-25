const { RichText, MediaUpload, InnerBlocks, InspectorControls } = wp.editor;
const { registerBlockType } = wp.blocks;
const { Button, SelectControl, PanelBody, PanelRow, TextControl } = wp.components;

// Our filter function
function setBlockCustomClassName( className, blockName ) { return blockName === 'gutentag/flex' ? '' : className; }
// Adding the filter
wp.hooks.addFilter( 'blocks.getBlockDefaultClassName', 'gutenTag', setBlockCustomClassName );

registerBlockType( 'gutentag/flex', {
	title: 'Flex',
	icon: 'heart',
	category: 'sections',
	attributes: {
		cantCol: { type: 'string', default: 2 },
	},

	edit( { attributes, setAttributes } ) {
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

		  <flex className={ "flex" + attributes.cantCol }>
				<InnerBlocks />
			</flex>
		];
	},
	save( { attributes } ) {
		return (
		  <flex className={ "flex" + attributes.cantCol }>
 				<InnerBlocks.Content />
			</flex>
		);
	},
} );
