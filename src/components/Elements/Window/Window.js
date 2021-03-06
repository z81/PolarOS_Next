import React, {PropTypes} from 'react';
import Draggable  from 'react-draggable';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classNames from 'classnames';
import styles from './Window.scss';

export const MIN  = 1;
export const MAX  = 2;
export const CLOSE = 4;
export const ALL = (MAX | MIN | CLOSE);
const borderSizeDefault = 7;
const resize = {
  NONE: 'default',
  TOP:'n-resize',
  BOTTOM: 'n-resize',
  LEFT: 'e-resize',
  RIGHT: 'e-resize',
  TOPLEFT: 'se-resize',
  TOPRIGHT: 'sw-resize',
  BOTTOMLEFT: 'sw-resize',
  BOTTOMRIGHT: 'se-resize'
};

class Window extends React.Component {
  static propTypes = {
    children: PropTypes.any,
    active: PropTypes.number,
    onChangePos: PropTypes.func,
    onActive: PropTypes.func,
    onClose: PropTypes.func,
    onMax: PropTypes.func,
    onMin: PropTypes.func,
    footer: PropTypes.node,
    header: PropTypes.node,
    controls: PropTypes.any,
    disabled: PropTypes.any,
    config: PropTypes.any,
    onStopDrag: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      resizeType: 'NONE',
      isDrag: false,
      isResize: false,
      resizeStartPos: [0, 0]
    };
  }

  onActive() {
    if (this.props.onActive) {
      this.props.onActive(this.props.config.id);
    }
  }

  _handleStart(event, ui) {
    this.setState({
      isDrag: true
    });
    // console.log('Event: ', event);
    // console.log('Position: ', ui.position);
  }

  _handleDrag(event, ui) {
    // console.log('Event: ', event);
    //console.warn('Position: ', ui);
    const conf = this.props.config;
    const pos = {
      left: ui.node.offsetWidth,
      top: ui.node.offsetHeight
    };

    if (this.props.onChangePos) {
      this.props.onChangePos({position: ui.position, id: conf.id});
    }
  }

  _handleStop(event, ui) {
    this.setState({
      isDrag: false
    });

    if (this.props.onStopDrag) {
      this.props.onStopDrag(this.props.config)
    }
    // console.log('Event: ', event);
    /* if (this.props.onChangePos) {
      this.props.onChangePos({position: ui.position, id: this.props.config.id});
    }*/
  }


  _borderMouseDown(e) {
    if (e.button === 0 && this.state.resizeType !== 'NONE') {
        this.setState({
          isResize: true,
          resizeStartPos: [e.clinetX, e.clientY]
        });
    }
  }

  _borderMouseUp(e) {
    this.setState({
      isResize: false
    });
  }

  _borderMouseMove(e) {
    if (this.state.isDrag) return false

    const {left, top, width, height} = this.props.config
    const x = e.clientX
    const y = e.clientY
    /* console.info(`events: [${x}, ${y}]`);
    console.info(`pos: [${left}, ${top}]`);
    console.info(`size: [${left+width}, ${top+height}]`);*/

    const _top = (y - borderSizeDefault * 2 <= top) ? 1 : 0
    const _bottom = (y >= top + height + borderSizeDefault) ? 3 : 0
    const _left = (x - borderSizeDefault <= left) ? 7 : 0
    const _right = (x >= left + width - borderSizeDefault) ? 11 : 0

    /*eslint-disable */
    const resizeType = ([
      'NONE'        , 'TOP'    ,
      null          , 'BOTTOM' ,
      null          , null     ,
      null          , 'LEFT'   ,
      'TOPLEFT'     , null     ,
      'BOTTOMLEFT'  , 'RIGHT'  ,
      'TOPRIGHT'    , null     ,
      'BOTTOMRIGHT' , null     ,
    ])[_top + _left + _right + _bottom];
    /*eslint-enable */


    /* if (resizeType.left && resizeType.top) {
      resizeType = 'TOPLEFT';
    } else if (resizeType.left && resizeType.bottom) {
      resizeType = 'BOTTOMLEFT';
    } else if (resizeType.right && resizeType.top) {
      resizeType = 'TOPRIGHT';
    } else if (resizeType.right && resizeType.bottom) {
      resizeType = 'BOTTOMRIGHT';
    } else if (!resizeType.right && !resizeType.bottom && !resizeType.left && !resizeType.top) {
      resizeType = 'NONE';
    } else if (resizeType.right) {
      resizeType = 'RIGHT';
    } else if (resizeType.left) {
      resizeType = 'LEFT';
    } else if (resizeType.top) {
      resizeType = 'TOP';
    } else if (resizeType.bottom) {
      resizeType = 'BOTTOM';
    }*/

    if (e.buttons === 1) {
      if (this.state.isDrag !== true) {
        console.info('Resize start', e.pageX, e.pageY);
        this.state.isDrag = true;
        this.state.resizeStartPos = [e.pageX, e.pageY];
      } else {
         //console.info('Resize progress', e.pageX, e.pageY);
        // this.state.left = this.state.resizeStartPos[0] - e.pageX;
        // this.state.top  = this.state.resizeStartPos[1] - e.pageY;
      }
    } else {
      // console.info('Resize stop');
      this.state.isDrag = false;
    }

    this.state.resizeType = resizeType;

    this.setState(this.state);
  }

  _checkIsDrag(e) {
    if (e.button === 0) {
      this.setState({
        isDrag: false
      })
    }
  }

  // Todo: move style to class
  render() {
    const {left, top, width, height, title, id, max, min, sort} = this.props.config;
    const controls = this.props.controls || ALL;
    const disabled = this.props.disabled || 0;
    const onClose  = () => !this.props.onClose || this.props.onClose(id);
    const onMin    = () => !this.props.onMin || this.props.onMin(id);
    const onMax    = () => !this.props.onMax || this.props.onMax(id);
    const borderSize = borderSizeDefault; //this.state.isDrag ? 1000 : borderSizeDefault;
    const className = classNames({
      'window-wrapper': true,
      'window-min': (min && (disabled ^ MIN)),
      'window-max': (max && (disabled ^ MAX))
    });
    const draggable_fix_style = {display: this.state.isDrag ? 'block' : 'none'}
    // console.log(className, this.props);
    return (
        <Draggable
        handle='.window>header>.title,.window>header>.title>*'
        start={{x: left, y: top}}
        moveOnStartChange={false}
        zIndex={1800}
        onStart={this._handleStart.bind(this)}
        onDrag={this._handleDrag.bind(this)}
        onStop={this._handleStop.bind(this)}
        bounds="parent"
        >
            <div
            style={{
              width:  `${(width + borderSize * 2)}px`,
              height:  `${(height + borderSize * 2)}px`,
              zIndex: (1000 + (500 - sort)),
              cursor: resize[this.state.resizeType],
              position: 'fixed'
            }}
            className={className}
            onMouseMove={this._borderMouseMove.bind(this)}
            >
                <div
                  onMouseDown={this.onActive.bind(this)}
                  className={`window ${styles.window}`} style={{borderRadius: '6px', position: 'fixed !important', margin: `${borderSize}px`}}
                  >

                    <header className="toolbar toolbar-header" style={{borderRadius: '6px 6px 0 0'}}>
                      <h1 className="title" style={{borderRadius: '6px 6px 0 0'}}>
                        {title}
                      <div className={styles.controls}>
                          {!(controls & MIN) || <div onClick={onMin} className={(disabled & MIN) ? `${styles.disabled} ${styles.min}` : styles.min}/>}
                          {!(controls & MAX) || <div onClick={onMax} className={(disabled & MAX) ? `${styles.disabled} ${styles.max}` : styles.max}/>}
                          {!(controls & CLOSE) || <div onClick={onClose} className={(disabled & CLOSE) ? `${styles.disabled} ${styles.close}` : styles.close}/>}
                        </div>
                      </h1>
                      {!this.props.header || <div className="toolbar-actions">
                          {this.props.header}
                      </div>}
                    </header>

                    <div className="window-content">
                      <div className={styles.draggable_fix} onMouseMove={this._checkIsDrag.bind(this)} style={draggable_fix_style} />
                      {this.props.children}
                    {/*<iframe
                        frameBorder="0"
                        src="http://rawgit.com/IamNotUrKitty/fiveteen_React.js/master/public/"
                        scrolling="no"
                        style={{width: '100%', height: '100%'}}
                      />*/}
                    </div>

                   {!this.props.footer || <footer className="toolbar toolbar-footer">
                    <div className="toolbar-actions">
                      {this.props.footer}
                    </div>
                   </footer>}

               </div>
            </div>
        </Draggable>
    );
  }
}

Window.MIN   = MIN;
Window.MAX   = MAX;
Window.CLOSE = CLOSE;
Window.ALL   = ALL;

export default Window;
