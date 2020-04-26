import { IRootReduxState } from './types';

export const authData = ({auth: {token, userId}}: IRootReduxState) => ({token, userId});
