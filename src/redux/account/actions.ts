import { IAccountState } from '.';
import { ACCOUNT_ACTIONS } from './constants';
import { IAccount } from './types';

export const accountSetCreate = (create: Partial<IAccountState['create']>) => ({
  type: ACCOUNT_ACTIONS.SET_CREATE,
  create,
});

export const accountSetCreateStage = (
  stage: Partial<IAccountState['create']['stage']>
) => ({
  type: ACCOUNT_ACTIONS.SET_CREATE_STAGE,
  stage,
});

export const accountCreateSetCredentials = (
  create: Partial<IAccountState['create']>
) => ({
  type: ACCOUNT_ACTIONS.CREATE_SET_CREDENTIALS,
  create,
});

export const accountCreateSetRestoreCredentials = (
  create: Partial<IAccountState['create']>
) => ({
  type: ACCOUNT_ACTIONS.CREATE_SET_RESTORE_CREDENTIALS,
  create,
});

export const accountCreateSetInfo = () => ({
  type: ACCOUNT_ACTIONS.CREATE_SET_INFO,
});

export const accountCreateSetConfirm = () => ({
  type: ACCOUNT_ACTIONS.CREATE_SET_CONFIRM,
});

export const accountCreateRestoreMnemonics = ({
  mnemonic,
}: Pick<IAccountState['create'], 'mnemonic'>) => ({
  type: ACCOUNT_ACTIONS.CREATE_RESTORE_MNEMONICS,
  mnemonic,
});

export const accountCreateCancel = () => ({
  type: ACCOUNT_ACTIONS.CREATE_CANCEL,
});

export const accountCreateClear = () => ({
  type: ACCOUNT_ACTIONS.CREATE_CLEAR,
});

export const accountSetList = (list: IAccountState['list']) => ({
  type: ACCOUNT_ACTIONS.SET_LIST,
  list,
});

export const accountAddAccount = (account: IAccount) => ({
  type: ACCOUNT_ACTIONS.ADD_ACCOUNT,
  account,
});

export const accountGetBalance = (id: IAccount['publicAddress']) => ({
  type: ACCOUNT_ACTIONS.GET_BALANCE,
  id,
});

export const accountSetAccount = (
  id: IAccount['publicAddress'],
  data: Partial<IAccount>
) => ({
  type: ACCOUNT_ACTIONS.SET_ACCOUNT,
  id,
  data,
});

export const accountSendFunds = ({
  from,
  to,
  password,
  amount,
  message,
}: {
  from: IAccount['publicAddress'];
  to: IAccount['publicAddress'];
  password: string;
  amount: string;
  message: string;
}) => ({
  type: ACCOUNT_ACTIONS.SEND_FUNDS,
  from,
  to,
  password,
  amount,
  message,
});

export const accountTransferClear = () => ({
  type: ACCOUNT_ACTIONS.TRANSFER_CLEAR,
});

export const accountSetTransferErrors = (
  errors: IAccountState['transfer']['errors']
) => ({
  type: ACCOUNT_ACTIONS.SET_TRANSFER_ERRORS,
  errors,
});

export const accountSetTransfer = (
  transfer: Partial<IAccountState['transfer']>
) => ({
  type: ACCOUNT_ACTIONS.SET_TRANSFER,
  transfer,
});

export const accountGetTransferFee = ({
  from,
  to,
  amount,
  message,
}: {
  from: IAccount['publicAddress'];
  to: IAccount['publicAddress'];
  amount: string;
  message: string;
}) => ({
  type: ACCOUNT_ACTIONS.GET_TRANSFER_FEE,
  from,
  to,
  amount,
  message,
});

export const accountSetTransferFee = (
  fee: IAccountState['transfer']['fee']
) => ({
  type: ACCOUNT_ACTIONS.SET_TRANSFER_FEE,
  fee,
});

export const accountUploadKeystore = (file: File) => ({
  type: ACCOUNT_ACTIONS.UPLOAD_KEYSTORE,
  file,
});

export const accountSet = (account: Partial<IAccountState>) => ({
  type: ACCOUNT_ACTIONS.SET,
  account,
});

export const accountSetConnection = (
  connection: Partial<IAccountState['connection']>
) => ({
  type: ACCOUNT_ACTIONS.SET_CONNECTION,
  connection,
});

export const accountChangeProvider = (
  provider: IAccountState['connection']['current_node']
) => ({
  type: ACCOUNT_ACTIONS.CHANGE_PROVIDER,
  provider,
});

export const accountAddProvider = (name: string, address: string) => ({
  type: ACCOUNT_ACTIONS.ADD_PROVIDER,
  name,
  address,
});

export const accountReconnectProvider = () => ({
  type: ACCOUNT_ACTIONS.RECONNECT_PROVIDER,
});

export const accountProviderConnected = () => ({
  type: ACCOUNT_ACTIONS.PROVIDER_CONNECTED,
});
