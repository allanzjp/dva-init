
import RenderAuthorize from 'ant-design-pro/lib/Authorized';
import { getAuthority } from './authority';

let Authorized = RenderAuthorize(getAuthority()); // eslint-disable-line

// Reload the rights component
const reloadAuthorized = () => {
  Authorized = RenderAuthorize(getAuthority());
};

export { reloadAuthorized };
export default Authorized;