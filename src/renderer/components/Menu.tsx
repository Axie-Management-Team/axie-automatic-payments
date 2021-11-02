import React from 'react';
import InternalLink from './Buttons/InternalLink';
import {
  useGuardPrivateEndpoints,
  usePayments,
} from '../state/application/hooks';

const Menu = () => {
  const havePaymentFile = usePayments().length > 0;
  const haveAccessToPrivateEndpoints = useGuardPrivateEndpoints();
  return (
    <>
      <InternalLink text="Load payment file" path="/load/payments" icon="🔑" />

      <InternalLink
        text="Generate Secrets"
        path="/generate/secrets"
        icon="🔑"
        disabled={!havePaymentFile}
      />
      <InternalLink
        text="Claim SLP"
        path="/claims"
        icon="🔑"
        disabled={!haveAccessToPrivateEndpoints}
      />
      <InternalLink
        text="Payments"
        path="/payments"
        icon="🔑"
        disabled={!haveAccessToPrivateEndpoints}
      />
    </>
  );
};

export default React.memo(Menu);
