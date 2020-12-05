import { createAction } from '@reduxjs/toolkit';
import { AuthInfo } from '../interfaces';
import { ActionTypes } from './types';

const withPayloadType = <T>() => (t: T) => ({ payload: t });

export const loginActionCreator = createAction(
  ActionTypes.LOGIN,
  withPayloadType<AuthInfo>()
);
