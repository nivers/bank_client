//node modules
import React from 'react';
import { Link } from 'react-router';

//local
import { MANAGE_ACCOUNT_ROUTE } from '../routes';

export default function() {
  return (
    <div className="landing-page">

      <div className="ui row">
        <h1>
          Welcome to Iron Bank Of Braavos - Online Banking
        </h1>
        <h2>
          Valar Financus
        </h2>
      </div>

      <div className="ui row">
        <Link to={MANAGE_ACCOUNT_ROUTE}>
          Manage Account
        </Link>
      </div>

    </div>
  );
}
