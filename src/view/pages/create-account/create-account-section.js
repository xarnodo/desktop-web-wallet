import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import CreateAccountForm from '../../components/forms/create-account';

export default class CreateAccountSection extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const SELF = this;
    const {
      accountName,
      password,
      reEnteredPassword,
      passwordHint,
      date,
      animateRefreshIcon,
      identiconsId,
      error,
      containNumber,
      containCapitalLetter,
      hasLengthGreaterThanEight,
      selectedIcon,
      onUpdate,
      getRadioIconData,
      onRefresh,
    } = SELF.props;
    return (
      <div id="account-information" className="account-information">
        <section className="bg-dark" style={{ padding: '60px 0' }}>
          <Container>
            <Row>
              <Col>
                <CreateAccountForm
                  accountName={accountName}
                  password={password}
                  error={error}
                  reEnteredPassword={reEnteredPassword}
                  passwordHint={passwordHint}
                  onUpdate={onUpdate}
                  date={date}
                  animateRefreshIcon={animateRefreshIcon}
                  identiconsId={identiconsId}
                  selectedIcon={selectedIcon}
                  onRefresh={onRefresh}
                  getRadioIconData={getRadioIconData}
                  containNumber={containNumber}
                  containCapitalLetter={containCapitalLetter}
                  hasLengthGreaterThanEight={hasLengthGreaterThanEight}
                />
              </Col>
            </Row>
          </Container>
        </section>
      </div>
    );
  }
}
