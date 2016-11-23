/**
 * External dependencies
 */
import React, { Component, PropTypes } from 'react';
import ReactDom from 'react-dom';
import { connect } from 'react-redux';
import { clone, noop, throttle, startsWith } from 'lodash';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import Draggable from 'components/draggable';
import MediaUtils from 'lib/media/utils';
import {
	getImageEditorTransform,
	getImageEditorFileInfo,
	getImageEditorCrop,
	getImageEditorAspectRatio,
	isImageEditorImageLoaded
} from 'state/ui/editor/image-editor/selectors';
import {
	imageEditorCrop,
	setImageEditorImageHasLoaded
} from 'state/ui/editor/image-editor/actions';
import { AspectRatios } from 'state/ui/editor/image-editor/constants';

class ImageEditorCanvas extends Component {
	static propTypes = {
		src: PropTypes.string,
		mimeType: PropTypes.string,
		transform: PropTypes.shape( {
			degrees: PropTypes.number,
			scaleX: PropTypes.number,
			scaleY: PropTypes.number
		} ),
		crop: PropTypes.shape( {
			topRatio: PropTypes.number,
			leftRatio: PropTypes.number,
			widthRatio: PropTypes.number,
			heightRatio: PropTypes.number
		} ),
		setImageEditorImageHasLoaded: PropTypes.func,
		onLoadError: PropTypes.func,
		isImageLoaded: PropTypes.bool
	};

	static defaultProps = {
		transform: {
			degrees: 0,
			scaleX: 1,
			scaleY: 1
		},
		crop: {
			cropTopRatio: 0,
			cropLeftRatio: 0,
			cropWidthRatio: 1,
			cropHeightRatio: 1
		},
		setImageEditorImageHasLoaded: noop,
		onLoadError: noop,
		isImageLoaded: false
	};

	constructor( props ) {
		super( props );

		this.onWindowResize = null;

		this.onLoadComplete = this.onLoadComplete.bind( this );
		this.updateCanvasPosition = this.updateCanvasPosition.bind( this );
		this.onBackgroundLoaded = this.onBackgroundLoaded.bind( this );
		this.onDragStart = this.onDragStart.bind( this );
		this.onBorderDrag = this.onBorderDrag.bind( this );
		this.onTopLeftDrag = this.onTopLeftDrag.bind( this );
		this.onTopRightDrag = this.onTopRightDrag.bind( this );
		this.onBottomRightDrag = this.onBottomRightDrag.bind( this );
		this.onBottomLeftDrag = this.onBottomLeftDrag.bind( this );
		this.applyCrop = this.applyCrop.bind( this );

		this.isVisible = false;

		this.state = {
			top: 0,
			left: 0,
			bottom: 0,
			right: 0,
			widthRatio: 1,
			heightRatio: 1,
			bounds: {
				top: 0,
				left: 0,
				bottom: 0,
				right: 0
			}
		};
	}

	componentDidMount() {
		this.isVisible = true;
	}

	componentWillReceiveProps( newProps ) {
		if ( this.props.src !== newProps.src ) {
			this.getImage( newProps.src );
		}
	}

	isBlobSrc( src ) {
		return startsWith( src, 'blob' );
	}

	getImage( src ) {
		const { onLoadError, mimeType } = this.props;

		const req = new XMLHttpRequest();

		if ( ! this.isBlobSrc( src ) ) {
			src = src + '?'; // Fix #7991 by forcing Safari to ignore cache and perform valid CORS request
		}

		req.open( 'GET', src, true );
		req.responseType = 'arraybuffer';

		req.onload = () => {
			if ( ! this.isVisible ) {
				return;
			}

			const objectURL = window.URL.createObjectURL( new Blob( [ req.response ], { type: mimeType } ) );
			this.initImage( objectURL );
		};

		req.onerror = error => onLoadError( error );
		req.send();
	}

	initImage( src ) {
		this.image = new Image();
		this.image.src = src;
		this.image.onload = this.onLoadComplete;
		this.image.onerror = this.onLoadComplete;
	}

	onLoadComplete( event ) {
		if ( event.type !== 'load' || ! this.isVisible ) {
			return;
		}

		this.drawImage();
		this.updateCanvasPosition();
		this.onWindowResize = throttle( this.updateCanvasPosition, 200 );
		if ( typeof window !== 'undefined' ) {
			window.addEventListener( 'resize', this.onWindowResize );
		}

		this.props.setImageEditorImageHasLoaded();
	}

	componentWillUnmount() {
		if ( typeof window !== 'undefined' && this.onWindowResize ) {
			window.removeEventListener( 'resize', this.onWindowResize );
			this.onWindowResize = null;
		}

		this.isVisible = false;
	}

	componentDidUpdate() {
		this.drawImage();
		this.updateCanvasPosition();
	}

	toBlob( callback ) {
		const {
			leftRatio,
			topRatio,
			widthRatio,
			heightRatio
		} = this.props.crop;

		const {
			mimeType,
			transform
		} = this.props;

		const canvas = ReactDom.findDOMNode( this.refs.canvas ),
			context = canvas.getContext( '2d' ),
			rotated = transform.degrees % 180 !== 0,
			imageWidth = rotated ? this.image.height : this.image.width,
			imageHeight = rotated ? this.image.width : this.image.height,
			croppedLeft = leftRatio * imageWidth,
			croppedTop = topRatio * imageHeight,
			croppedWidth = widthRatio * imageWidth,
			croppedHeight = heightRatio * imageHeight;

		const imageData = context.getImageData(
			croppedLeft,
			croppedTop,
			croppedWidth,
			croppedHeight
		);

		const newCanvas = document.createElement( 'canvas' );

		newCanvas.width = croppedWidth;
		newCanvas.height = croppedHeight;

		const newContext = newCanvas.getContext( '2d' );
		newContext.putImageData( imageData, 0, 0 );

		MediaUtils.canvasToBlob( newCanvas, callback, mimeType, 1 );
	}

	updateCanvasPosition() {
//		const {
//			leftRatio,
//			topRatio,
//			widthRatio,
//			heightRatio
//		} = this.props.crop;
//
//		const canvas = ReactDom.findDOMNode( this.refs.canvas ),
//			canvasX = -50 * widthRatio - 100 * leftRatio,
//			canvasY = -50 * heightRatio - 100 * topRatio;
//
//		this.props.setImageEditorCropBounds(
//			canvas.offsetTop - canvas.offsetHeight * -canvasY / 100,
//			canvas.offsetLeft - canvas.offsetWidth * -canvasX / 100,
//			canvas.offsetTop + canvas.offsetHeight * ( 1 + canvasY / 100 ),
//			canvas.offsetLeft + canvas.offsetWidth * ( 1 + canvasX / 100 )
//		);
	}

	drawImage() {
		if ( ! this.image ) {
			return;
		}

		const canvas = ReactDom.findDOMNode( this.refs.canvas );
		const imageWidth = this.image.width;
		const imageHeight = this.image.height;
		const transform = this.props.transform;
		const context = canvas.getContext( '2d' );

		const container = this.refs.container;
		canvas.width = container.offsetWidth;
		canvas.height = container.offsetHeight;

		context.clearRect( 0, 0, canvas.width, canvas.height );
		context.save();

		context.rotate( transform.degrees * Math.PI / 180 );

		const boxWidth = this.state.right - this.state.left;
		const boxHeight = this.state.bottom - this.state.top;

		const boundsWidth = this.state.bounds.right - this.state.bounds.left;
		const boundsHeight = this.state.bounds.bottom - this.state.bounds.top;

		context.drawImage( this.image,
			imageWidth * ( ( this.state.left - this.state.bounds.left ) / boundsWidth ),
			imageHeight * ( ( this.state.top - this.state.bounds.top ) / boundsHeight ),
			imageWidth * ( boxWidth / boundsWidth ),
			imageHeight * ( boxHeight / boundsHeight ),
			this.state.left, this.state.top, boxWidth, boxHeight );

		context.restore();
	}

	updateCrop( newValues, props ) {
		props = props || this.props;

		const aspectRatio = props.aspectRatio;

		const rotated = props.transform.degrees % 180 !== 0;
		const bounds = this.state.bounds;
		const boundsWidth = bounds.right - bounds.left;
		const boundsHeight = bounds.bottom - bounds.top;
		const newState = Object.assign( {}, this.state, newValues );

		//limits the min crop to one hundredth of the original image or at least one px
		const onePx = boundsWidth / this.state.imageWidth;
		const oneHundredth = Math.min( this.state.imageWidth / 100, this.state.imageHeight / 100 ) * onePx;
		const newWidth = Math.max( 1, onePx, oneHundredth, newState.right - newState.left );
		const newHeight = Math.max( 1, onePx, oneHundredth, newState.bottom - newState.top );

		let aspectWidth, aspectHeight;

		switch ( aspectRatio ) {
			case AspectRatios.FREE:
				aspectWidth = newWidth;
				aspectHeight = newHeight;
				break;
			case AspectRatios.ORIGINAL:
				aspectWidth = boundsWidth;
				aspectHeight = boundsHeight;
				break;
			case AspectRatios.ASPECT_1X1:
				aspectWidth = 1;
				aspectHeight = 1;
				break;
			case AspectRatios.ASPECT_16X9:
				aspectWidth = rotated ? 9 : 16;
				aspectHeight = rotated ? 16 : 9;
				break;
			case AspectRatios.ASPECT_4X3:
				aspectWidth = rotated ? 3 : 4;
				aspectHeight = rotated ? 4 : 3;
				break;
			case AspectRatios.ASPECT_3X2:
				aspectWidth = rotated ? 2 : 3;
				aspectHeight = rotated ? 3 : 2;
				break;
		}

		const ratio = Math.min( newWidth / aspectWidth, newHeight / aspectHeight );
		const finalWidth = aspectWidth * ratio;
		const finalHeight = aspectHeight * ratio;

		if ( newValues.hasOwnProperty( 'top' ) ) {
			newValues.top = newState.bottom - finalHeight;
		} else if ( newValues.hasOwnProperty( 'bottom' ) ) {
			newValues.bottom = newState.top + finalHeight;
		}

		if ( newValues.hasOwnProperty( 'left' ) ) {
			newValues.left = newState.right - finalWidth;
		} else if ( newValues.hasOwnProperty( 'right' ) ) {
			newValues.right = newState.left + finalWidth;
		}

		newValues.bounds = {
			top: this.initialBoundsTop,
			left: this.initialBoundsLeft,
			right: this.initialBoundsRight,
			bottom: this.initialBoundsBottom
		};

		return newValues;
	}

	onDragStart() {
		this.initialBounds = clone( this.state.bounds );
		this.initialTop = this.state.top;
		this.initialLeft = this.state.left;
		this.initialBottom = this.state.bottom;
		this.initialRight = this.state.right;
		this.initialBoundsTop = this.state.bounds.top;
		this.initialBoundsLeft = this.state.bounds.left;
		this.initialBoundsBottom = this.state.bounds.bottom;
		this.initialBoundsRight = this.state.bounds.right;
	}

	onTopLeftDrag( x, y ) {
		const newState = this.updateCrop( {
			top: y,
			left: x
		} );

		this.setState( newState, this.drawImage );
	}

	onTopRightDrag( x, y ) {
		const newState = this.updateCrop( {
			top: y,
			right: x
		} );

		this.setState( newState, this.drawImage );
	}

	onBottomRightDrag( x, y ) {
		const newState = this.updateCrop( {
			bottom: y,
			right: x
		} );

		this.setState( newState, this.drawImage );
	}

	onBottomLeftDrag( x, y ) {
		const newState = this.updateCrop( {
			bottom: y,
			left: x
		} );

		this.setState( newState, this.drawImage );
	}

	onBorderDrag( x, y, dx, dy ) {
		const boundsHeight = this.initialBounds.bottom - this.initialBounds.top;
		const boundsWidth = this.initialBounds.right - this.initialBounds.left;

		let top = Math.min( this.state.top, this.initialBounds.top + dy );
		if ( top + boundsHeight <= this.state.bottom ) {
			top = this.state.bottom - boundsHeight;
		}

		let left = Math.min( this.state.left, this.initialBounds.left + dx );
		if ( left + boundsWidth <= this.state.right ) {
			left = this.state.right - boundsWidth;
		}

		const bottom = top + boundsHeight;
		const right = left + boundsWidth;

		this.setState( {
			bounds: { top, left, bottom, right }
		}, this.drawImage );
	}

	applyCrop() {
		const container = this.refs.container;
		const containerWidth = container.offsetWidth;
		const containerHeight = container.offsetHeight;

		const boxWidth = this.state.right - this.state.left;
		const boxHeight = this.state.bottom - this.state.top;

		const ratio = Math.min( 0.85 * containerWidth / boxWidth, 0.85 * containerHeight / boxHeight );

		//1. scale
		let boundsTop = this.state.bounds.top;
		let boundsLeft = this.state.bounds.left;
		let boundsRight = boundsLeft + ( this.state.bounds.right - this.state.bounds.left ) * ratio;
		let boundsBottom = boundsTop + ( this.state.bounds.bottom - this.state.bounds.top ) * ratio;

		let boxTop = this.state.bounds.top + ( this.state.top - this.state.bounds.top ) * ratio;
		let boxLeft = this.state.bounds.left + ( this.state.left - this.state.bounds.left ) * ratio;
		let boxRight = boxLeft + boxWidth * ratio;
		let boxBottom = boxTop + boxHeight * ratio;

		//2. translate
		const deltaX = ( containerWidth / 2 - ( ratio * boxWidth ) / 2 ) - boxLeft;
		boundsLeft += deltaX;
		boundsRight += deltaX;
		boxLeft += deltaX;
		boxRight += deltaX;

		const deltaY = ( containerHeight / 2 - ( ratio * boxHeight ) / 2 ) - boxTop;
		boundsTop += deltaY;
		boundsBottom += deltaY;
		boxTop += deltaY;
		boxBottom += deltaY;

		this.animateCrop(
			( boxTop - this.state.top ) / 30,
			( boxLeft - this.state.left ) / 30,
			( boxRight - this.state.right ) / 30,
			( boxBottom - this.state.bottom ) / 30,
			( boundsTop - this.state.bounds.top ) / 30,
			( boundsLeft - this.state.bounds.left ) / 30,
			( boundsRight - this.state.bounds.right ) / 30,
			( boundsBottom - this.state.bounds.bottom ) / 30,
			30
		);
	}

	animateCrop( boxTopDelta, boxLeftDelta, boxRightDelta, boxBottomDelta,
		boundsTopDelta, boundsLeftDelta, boundsRightDelta, boundsBottomDelta, frames ) {
		if ( frames === 0 ) {
			const imageWidth = this.state.right - this.state.left,
				imageHeight = this.state.bottom - this.state.top,
				boundsWidth = this.state.bounds.right - this.state.bounds.left,
				boundsHeight = this.state.bounds.bottom - this.state.bounds.top;

			this.props.imageEditorCrop(
				this.state.top / boundsHeight,
				this.state.left / boundsWidth,
				imageWidth / boundsWidth,
				imageHeight / boundsHeight
			);
			return;
		}

		this.setState( {
			top: this.state.top + boxTopDelta,
			left: this.state.left + boxLeftDelta,
			right: this.state.right + boxRightDelta,
			bottom: this.state.bottom + boxBottomDelta,
			bounds: {
				top: this.state.bounds.top + boundsTopDelta,
				left: this.state.bounds.left + boundsLeftDelta,
				right: this.state.bounds.right + boundsRightDelta,
				bottom: this.state.bounds.bottom + boundsBottomDelta
			}
		}, this.drawImage );

		setTimeout( () => this.animateCrop( boxTopDelta, boxLeftDelta, boxRightDelta, boxBottomDelta,
			boundsTopDelta, boundsLeftDelta, boundsRightDelta, boundsBottomDelta, frames - 1 ), 3 );
	}

	onBackgroundLoaded( event ) {
		const img = event.target;
		const imageWidth = img.naturalWidth;
		const imageHeight = img.naturalHeight;

		const container = this.refs.container;
		const containerWidth = container.offsetWidth;
		const containerHeight = container.offsetHeight;

		const width = Math.min( 0.85 * containerWidth, imageWidth );
		const height = Math.min( 0.85 * containerHeight, imageHeight );
		const ratio = Math.min( width / imageWidth, height / imageHeight );

		const top = containerHeight / 2 - ( ratio * imageHeight ) / 2;
		const left = containerWidth / 2 - ( ratio * imageWidth ) / 2;
		const bottom = top + ratio * imageHeight;
		const right = left + ratio * imageWidth;

		this.setState( {
			loaded: true,
			top,
			left,
			bottom,
			right,
			imageWidth,
			imageHeight,
			bounds: {
				top,
				left,
				bottom,
				right
			}
		} );
	}

	renderBackground() {
		if ( ! this.props.isImageLoaded ) {
			return;
		}

		const imageStyle = {};
		const boundsRatio = ( this.state.bounds.right - this.state.bounds.left ) / this.state.imageWidth;
		imageStyle.transform = 'translate(' +
			this.state.bounds.left + 'px, ' +
			this.state.bounds.top + 'px) scale(' + boundsRatio + ')';

		return ( <img
			onLoad={ this.onBackgroundLoaded }
			src={ this.props.src }
			style={ imageStyle }
			className="image-editor__image" /> );
	}

	render() {
		const { top, left, right, bottom } = this.state;
		const width = right - left;
		const height = bottom - top;
		const handleClassName = 'image-editor__crop-handle';

		return (
			<div className="image-editor__canvas-container" ref="container">
				{ this.renderBackground() }
				<canvas ref="canvas" className="image-editor__canvas" />
				<Draggable
					ref="border"
					onStart={ this.onDragStart }
					onDrag={ this.onBorderDrag }
					onStop={ this.applyCrop }
					x={ left }
					y={ top }
					width={ width }
					height={ height }
					controlled
					className="image-editor__crop" />
				<Draggable
					onStart={ this.onDragStart }
					onDrag={ this.onTopLeftDrag }
					onStop={ this.applyCrop }
					x={ left }
					y={ top }
					controlled
					bounds={ { top: this.state.bounds.top - 1, left: this.state.bounds.left - 1, bottom, right } }
					ref="topLeft"
					className={ classNames( handleClassName, handleClassName + '-nwse' ) } />
				<Draggable
					onStart={ this.onDragStart }
					onDrag={ this.onTopRightDrag }
					onStop={ this.applyCrop }
					y={ top }
					x={ right }
					controlled
					bounds={ { top: this.state.bounds.top - 1, right: this.state.bounds.right - 1, bottom, left } }
					ref="topRight"
					className={ classNames( handleClassName, handleClassName + '-nesw' ) } />
				<Draggable
					onStart={ this.onDragStart }
					onDrag={ this.onBottomRightDrag }
					onStop={ this.applyCrop }
					y={ bottom }
					x={ right }
					controlled
					bounds={ { bottom: this.state.bounds.bottom - 1, right: this.state.bounds.right - 1, top, left } }
					ref="bottomRight"
					className={ classNames( handleClassName, handleClassName + '-nwse' ) } />
				<Draggable
					onStart={ this.onDragStart }
					onDrag={ this.onBottomLeftDrag }
					onStop={ this.applyCrop }
					y={ bottom }
					x={ left }
					controlled
					bounds={ { bottom: this.state.bounds.bottom - 1, left: this.state.bounds.left - 1, top, right } }
					ref="bottomLeft"
					className={ classNames( handleClassName, handleClassName + '-nesw' ) } />
			</div>
		);
	}
}

export default connect(
	( state ) => {
		const transform = getImageEditorTransform( state );
		const aspectRatio = getImageEditorAspectRatio( state );
		const { src, mimeType } = getImageEditorFileInfo( state );
		const crop = getImageEditorCrop( state );
		const isImageLoaded = isImageEditorImageLoaded( state );

		return {
			src,
			mimeType,
			transform,
			crop,
			aspectRatio,
			isImageLoaded
		};
	},
	{
		imageEditorCrop,
		setImageEditorImageHasLoaded
	},
	null,
	{ withRef: true }
)( ImageEditorCanvas );
