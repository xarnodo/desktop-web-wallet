import React, { FC, useState, useCallback, useEffect, useMemo, memo } from 'react';
import { Col, Row, Container, Button } from 'reactstrap';
import { AccountCreateProcess } from '~/view/components/account/AccountCreateProccess';
import { connect } from 'react-redux';
import * as ACCOUNT_ACTIONS from '~/redux/account/actions';
import { selectAccountCreate } from '~/redux/account/selectors';
import { ACCOUNT_CREATION_STAGES, IAccountState } from '~/redux/account';
import shuffle from 'lodash/shuffle';
import styles from './styles.module.scss';
import { DialogInfo } from '~/view/components/dialogs/DialogInfo';
import { DialogPrompt } from '~/view/components/dialogs/DialogPrompt';
import { pick } from 'ramda';
import { IState } from '~/redux/store';

const mapStateToProps = (state: IState): Pick<IAccountState['create'], 'mnemonic'> =>
  pick(['mnemonic'], selectAccountCreate(state));

const mapDispatchToProps = {
  accountCreateSetConfirm: ACCOUNT_ACTIONS.accountCreateSetConfirm,
  accountSetCreateStage: ACCOUNT_ACTIONS.accountSetCreateStage,
  accountCreateCancel: ACCOUNT_ACTIONS.accountCreateCancel,
};

type IProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & {};

const AccountCreateConfirmUnconnected: FC<IProps> = memo(
  ({ accountSetCreateStage, accountCreateCancel, accountCreateSetConfirm, mnemonic }) => {
    const [selected, setSelected] = useState<string[]>([]);
    const [is_cancel_modal_opened, setIsCancelModalOpened] = useState(false);
    const [is_incorrect_modal_visible, setIsIncorrectModalVisible] = useState(false);
    const shuffled_mnemonics = useMemo(() => shuffle(mnemonic && mnemonic.split(' ')), [mnemonic]);

    const is_next_disabled = useMemo(() => mnemonic !== selected.join(' '), [mnemonic, selected]);

    const onBackPressed = useCallback(
      () => accountSetCreateStage(ACCOUNT_CREATION_STAGES.CREDENTIALS),
      [accountSetCreateStage]
    );

    const onCancelModalOpen = useCallback(() => {
      setIsCancelModalOpened(true);
    }, [setIsCancelModalOpened]);

    const onCancelModalClose = useCallback(() => {
      setIsCancelModalOpened(false);
    }, [setIsCancelModalOpened]);

    const onIncorrectModalClose = useCallback(() => {
      setIsIncorrectModalVisible(false);
    }, [setIsIncorrectModalVisible]);

    const onSubmit = useCallback(() => {
      if (is_next_disabled) return setIsIncorrectModalVisible(true);
      accountCreateSetConfirm();
    }, [is_next_disabled, accountCreateSetConfirm]);

    const onMnemonicRemove = useCallback(
      item => () => {
        setSelected(selected.filter(el => el !== item));
      },
      [setSelected, selected]
    );

    const onMnemonicSelect = useCallback(
      item => () => {
        setSelected([...selected, item]);
      },
      [setSelected, selected]
    );

    useEffect(() => {
      if (!mnemonic) onBackPressed();
    });

    return (
      <div>
        <AccountCreateProcess stepNo={3} />

        <section className={styles.content}>
          <Container>
            <Row>
              <Col>
                <div className={styles.mnemonics}>
                  <h2>Enter your mnemonics in the correct order to create your account below</h2>

                  <Row className={styles.selectors}>
                    <Col>
                      <div className={styles.mnemonic_container}>
                        {selected.map(item => (
                          <div key={item} className={styles.item}>
                            <Button color="primary" onClick={onMnemonicRemove(item)}>
                              {item}
                            </Button>
                          </div>
                        ))}
                      </div>

                      <div className={styles.mnemonic_selector}>
                        {shuffled_mnemonics.map(item => (
                          <div key={item} className={styles.item}>
                            <Button
                              color="primary"
                              onClick={onMnemonicSelect(item)}
                              disabled={selected.includes(item)}
                            >
                              {item}
                            </Button>
                          </div>
                        ))}
                      </div>
                    </Col>
                  </Row>
                  <div className={styles.buttons}>
                    <Button color="primary bordered" onClick={onSubmit}>
                      Create Wallet
                    </Button>
                    <Button className="secondary bordered" onClick={onCancelModalOpen}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>

          <DialogPrompt
            title="Cancel Wallet"
            body="Are you sure you want to cancel the create wallet process?"
            onConfirm={accountCreateCancel}
            onClose={onCancelModalClose}
            isOpened={is_cancel_modal_opened}
          />

          <DialogInfo
            isOpened={is_incorrect_modal_visible}
            onClose={onIncorrectModalClose}
            body="The mnemonics you entered are incorrect"
            title="Incorrect Mnemonics"
          />
        </section>
      </div>
    );
  }
);

const AccountCreateConfirm = connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountCreateConfirmUnconnected);

export { AccountCreateConfirm, AccountCreateConfirmUnconnected };
