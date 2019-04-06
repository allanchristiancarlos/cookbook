import React from 'react';
import { Button } from '../Core';

function ToggleButton(props) {
  const { active = false, children, ...buttonProps } = props;

  return (
    <Button {...buttonProps} look={active ? 'flat' : 'outline'}>
      {children}
    </Button>
  );
}

export default ToggleButton;
