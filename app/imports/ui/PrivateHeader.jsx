import React from 'react';
import PropTypes from 'prop-types';
import { Accounts } from 'meteor/accounts-base';

const PrivateHeader = (props) => {
  return (
    <div className="row bg-light mb-2">
      <div className="col-sm-10">
        <h1 className="display-4">{props.title}</h1>
      </div>
      <div className="col-sm-2 my-3">
        <button type="button" className="btn btn-primary" onClick={() => Accounts.logout()}>Logout</button>
      </div>

    </div>
  );
};

PrivateHeader.propTypes = {
  title: PropTypes.string.isRequired
};

export default PrivateHeader;
