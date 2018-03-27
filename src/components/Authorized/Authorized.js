import React from 'react';
import CheckPermissions from './CheckPermissions';
import request from '../../utils/request';
import { openStackService } from '../../services/axios.service';

function checkLoginStatus() {
  return request(`http://10.240.217.223:9001/api/identity/v3/auth/tokens`, {
    method: 'GET'
  });
}
//
// checkLoginStatus();

class Authorized extends React.Component {
  render() {
    const { children, authority, noMatch = null } = this.props;
    const childrenRender = typeof children === 'undefined' ? null : children;
    return CheckPermissions(checkLoginStatus(), childrenRender, noMatch);
  }
}

export default Authorized;
