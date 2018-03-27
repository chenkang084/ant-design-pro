import React from 'react';
import CheckPermissions from './CheckPermissions';
// import request from '../../utils/request';
import { openStackApi } from '../../services/api';
// import { openStackService } from '../../services/axios.service';

function checkLoginStatus() {
  return openStackApi({
    url: '/api/identity/v3/auth/tokens',
    method: 'GET',
  });
}

class Authorized extends React.Component {
  render() {
    const { children, noMatch = null } = this.props;
    const childrenRender = typeof children === 'undefined' ? null : children;
    return CheckPermissions(checkLoginStatus(), childrenRender, noMatch);
  }
}

export default Authorized;
