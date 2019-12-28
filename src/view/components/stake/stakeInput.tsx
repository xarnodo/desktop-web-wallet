import React from 'react';
import {Card, Button} from 'reactstrap'
import { DashboardInput } from 'src/view/components/forms';

const StakeInputCard = ({stakeValue, handleChange, validatorBtn, handleStep, errors }) => {
  return (<Card
    className="mx-auto text-center pt-5 pb-6"
    style={{ maxWidth: 670 }}
  >
    <h2>How much FTM would you like to stake?</h2>
    <div className="mx-auto w-100" style={{ maxWidth: 480 }}>
      <DashboardInput
        lg
        type='number'
        
        placeholder="0"
        rightLabel="Max"
        value={stakeValue}
        error={{
          isError: errors.stakeValueInvalid || errors.stakeValueMax,
          errorText:'Invalid stake amount',
            
        }}
        handleChange={val => {
          handleChange(val);
        }}
      />
      <Button className={validatorBtn} onClick={handleStep}>
      Select a validator
        <i className="fas fa-chevron-right" />
      </Button>
    </div>
          </Card>)

}

export default StakeInputCard