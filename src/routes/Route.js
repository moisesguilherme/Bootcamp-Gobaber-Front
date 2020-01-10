import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

// import { Container } from './styles';

export default function RouteWrapper({
  component: Component,
  isPrivate,
  ...rest
}) {
  // logado: false
  const signed = false;

  /**
   * Se tentar acessar um rota diretamento
   * Não estando logado, será direcionado
   * para a tela de login
   */
  if (!signed && isPrivate) {
    return <Redirect to="/" />;
  }

  /**
   * Se estiver logado e tentando acessar a tela de login,
   * será direcionado para o Dashboard,
   * pois já está logado.
   */
  if (signed && !isPrivate) {
    return <Redirect to="/dashboard" />;
  }

  return <Route {...rest} component={Component} />;
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};
