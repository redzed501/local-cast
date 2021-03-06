import React from 'react';
import {LeftNav, Mixins, Styles} from 'material-ui';
import MenuItem from 'material-ui/lib/menu/menu-item';
const {Colors, Spacing, Typography} = Styles;
const {StylePropable} = Mixins;

const menuItems = [
  {
    route: 'get-started',
    text: 'Get Started',
  },
  {
    route: 'customization',
    text: 'Customization',
  },
  {
    route: 'media',
    text: 'Media',
  },
  {
    type: MenuItem.Types.SUBHEADER,
    text: 'Resources',
  },
  {
    type: MenuItem.Types.LINK,
    payload: 'https://github.com/rm-hull/local-cast',
    text: 'GitHub',
  },
];


const AppLeftNav = React.createClass({
  mixins: [StylePropable],

  propTypes: {
    history: React.PropTypes.object,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
    router: React.PropTypes.func,
  },

  getInitialState() {
    return {
      leftNavOpen: false,
    };
  },

  getStyles() {
    return {
      cursor: 'pointer',
      //.mui-font-style-headline
      fontSize: '24px',
      color: Typography.textFullWhite,
      lineHeight: Spacing.desktopKeylineIncrement + 'px',
      fontWeight: Typography.fontWeightLight,
      backgroundColor: Colors.cyan500,
      paddingLeft: Spacing.desktopGutter,
      paddingTop: '0px',
      marginBottom: '8px',
    };
  },

  render() {
    let header = (
      <div style={this.prepareStyles(this.getStyles())} onTouchTap={this._onHeaderClick}>
        local-cast
      </div>
    );

    return (
      <LeftNav
        ref="leftNav"
        docked={false}
        open={this.state.leftNavOpen}
        onRequestChange={this._onLeftNavChangeRequest}
        header={header}
        menuItems={menuItems}
        selectedIndex={this._getSelectedIndex()}
        onChange={this._onLeftNavChange} />
    );
  },

  toggle() {
    this.setState({leftNavOpen: !this.state.leftNavOpen});
  },

  _getSelectedIndex() {
    let currentItem;

    for (let i = menuItems.length - 1; i >= 0; i--) {
      currentItem = menuItems[i];
      if (currentItem.route && this.props.history.isActive(currentItem.route)) return i;
    }
  },

  _onLeftNavChangeRequest(open) {
    this.setState({leftNavOpen: open});
  },

  _onLeftNavChange(e, key, payload) {
    this.props.history.pushState(null, payload.route);
  },

  _onHeaderClick() {
    this.props.history.pushState(null, '/');
    this.setState({leftNavOpen: false});
  },

});

export default AppLeftNav;
