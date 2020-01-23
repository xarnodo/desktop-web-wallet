// @ flow
import {
  delegateByAddresses,
  getValidatorsList,
  delegateByStakerId,
  STAKE_ACTIONS,
  delegateByAddressFailure,
  getValidatorsListSuccess,
  delegateByAddressSuccess,
  setAmountUnstaked,
  delegateAmountSuccess,
} from './actions';
import { InitialStateType } from './index';

// const setValidators = (
//   state: InitialStateType,
//   { publicKey }: ReturnType<typeof delegateByAddressSuccess>
// ) => ({ ...state, publicKey });

export const setValidatorsList = (
  state: InitialStateType,
  { validators }: ReturnType<typeof getValidatorsListSuccess>
) => ({ ...state, validators });

export const getValidatorsListFailure = () => ({
  type: `${STAKE_ACTIONS.VALIDATORS_LIST}_FAILURE`,
});

export const amountUnstakedSuccess = (
  state: InitialStateType,
  { publicKey }: ReturnType<typeof setAmountUnstaked>
) => {
  const { data } = state;
  const stakes = data.slice();
  if (state && state.data.length > 0) {
    const selectedAddressIndex = stakes.findIndex(
      d => d.publicKey === publicKey
    );
    if (selectedAddressIndex > -1) {
      stakes.splice(selectedAddressIndex, 1, {
        ...stakes[selectedAddressIndex],
        publicKey,
        isDeligated: false,
        isAmountUnstaked: false,
      });
    }
  }

  return { ...state, data: stakes };
};

export const delegateAmountSuccessHandler = (
  state: InitialStateType,
  { response }: ReturnType<typeof delegateAmountSuccess>
) => {
  return { ...state, errors: false };
};

export const delegateAmountFailureHandler = (state: InitialStateType) => {
  return { ...state, errors: true };
};

export const setDelegatorByAddress = (
  state: InitialStateType,
  { response }: ReturnType<typeof delegateByAddressSuccess>
) => {

  const data = [
    {
      ...state.data,
      publicKey: response.address,
      claimedRewards: response.claimedRewards,
      pendingRewards: `${response.pendingRewards}`,
      isDeligated:
        response.amount && response.amount !== '' && response.amount !== '0',
      stakedAmount: response.amount,
      isAmountUnstaked: false,
      toStakerID: response.toStakerID,
      deactivatedEpoch: response.deactivatedEpoch,
      deactivatedTime: response.deactivatedTime,
    },
  ];
  return { ...state, data };
};

export const setDelegatorByAddressFailure = (
  state: InitialStateType,
  { publicKey }: ReturnType<typeof delegateByAddressFailure>
) => {
  const { data } = state;
  const stakes = data && data.slice() || [];
  if (state&& state.data && state.data.length > 0) {
    const selectedAddressIndex = stakes.findIndex(
      d => d.publicKey === publicKey
    );
    if (selectedAddressIndex > -1) {
      stakes.splice(1, selectedAddressIndex, {
        ...stakes[selectedAddressIndex],
        publicKey,
        isDeligated: false,
      });
    }
  } else {
    stakes.push({
      publicKey,
      isDeligated: false,
      amount: 0,
      pendingRewards: 0,
      claimedRewards: 0,
      stakedAmount: '0',
      isAmountUnstaked: false,
      toStakerID: '0',
      deactivatedEpoch: '0',
      deactivatedTime: '0',
    });
  }
  return { ...state, data: stakes };
};

// export const setDelegatorByAddresses = ({
//   publicKey,
// }: TDelegateByAddress) => ({
//   type: `${STAKE_ACTIONS.DELEGATE_BY_ADDRESSES}_SUCCESS`,
//   payload: { publicKey },
// });

// export const delegateByAddressesFailure = ({
//   publicKey,
// }: TDelegateByAddress) => ({
//   type: `${STAKE_ACTIONS.DELEGATE_BY_ADDRESSES}_FAILURE`,
//   payload: { publicKey },
// });${STAKE_ACTIONS.DELEGATE_BY_ADDRESS}_SUCCESS

export const ACCOUNT_HANDLERS = {
  [`${STAKE_ACTIONS.DELEGATE_BY_ADDRESS}_SUCCESS`]: setDelegatorByAddress,
  [`${STAKE_ACTIONS.DELEGATE_BY_ADDRESS}_FAILURE`]: setDelegatorByAddressFailure,
  [STAKE_ACTIONS.DELEGATE_BY_ADDRESSES]: delegateByAddresses,
  // [`${STAKE_ACTIONS.DELEGATE_BY_ADDRESSES}_SUCCESS`]: setDelegatorByAddresses,
  // [`${STAKE_ACTIONS.DELEGATE_BY_ADDRESSES}_FAILURE`]: delegateByAddressesFailure,
  [STAKE_ACTIONS.VALIDATORS_LIST]: getValidatorsList,
  [`${STAKE_ACTIONS.VALIDATORS_LIST}_SUCCESS`]: setValidatorsList,
  [`${STAKE_ACTIONS.VALIDATORS_LIST}_FAILURE`]: getValidatorsListFailure,
  [STAKE_ACTIONS.DELEGATE_BY_STAKER_ID]: delegateByStakerId,
  [`${STAKE_ACTIONS.DELEGATE_AMOUNT}_SUCCESS`]: delegateAmountSuccessHandler,
  [`${STAKE_ACTIONS.DELEGATE_AMOUNT}_FAILURE`]: delegateAmountFailureHandler,

  [`${STAKE_ACTIONS.UNSTAKE_AMOUNT}_SET`]: amountUnstakedSuccess,
};
