import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import _ from 'underscore';
import { toTitleCase, slugify } from '../utils/helpers';
import { ADMIN_PREFIX } from '../constants';

export default function Breadcrumbs({ splat, type, history }) {
  let base = `${ADMIN_PREFIX}/pages/${type}`;

  let links;
  if (splat) {
    const paths = splat.split('/');
    links = _.map(paths, (path, i) => {
      const before = i == 0 ? '' : paths.slice(0, i).join('/') + '/';
      const decodedPath = toTitleCase(decodeURIComponent(path));
      return {
        href: `${base}/${before}${path}`,
        label: decodedPath,
      };
    });
  }

  let handleClickLink = (event, to) => {
    event.preventDefault();

    history.push(to);
  };

  let nodes = _.map(
    links,
    (link, i) =>
      link.href ? (
        <li key={i}>
          <Link
            onClick={event => handleClickLink(event, link.href)}
            to={link.href}
          >
            {link.label}
          </Link>
        </li>
      ) : (
        <li key={i}>{toTitleCase(link.label)}</li>
      )
  );

  return (
    <ul className="breadcrumbs">
      <li>
        <Link to={base}>{toTitleCase(type)}</Link>
      </li>
      {nodes}
    </ul>
  );
}

Breadcrumbs.propTypes = {
  splat: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
