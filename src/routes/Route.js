import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import AuthLayout from '../pages/_layouts/auth';
import DefaultLayout from '../pages/_layouts/dafault';

export default function RouteWrapper({
  component: Component,
  isPrivate,
  ...rest
}) {
  // logado: false
  const signed = false;

  /**
   * Se tentar acessar uma rota direto não estando logado,
   * será direcionado para tela de login
   */
  if (!signed && isPrivate) {
    return <Redirect to="/" />;
  }

  /**
   * Se estiver logado e tentando acessar a tela de login,
   * será direcionado para o Dashboard, pois já está logado.
   */
  if (signed && !isPrivate) {
    return <Redirect to="/dashboard" />;
  }

  const Layout = signed ? DefaultLayout : AuthLayout;

  return (
    <Route
      {...rest}
      render={props => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
}

// Validações
RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};
