export const API =
  process.env.NODE_ENV === 'production'
    ? '/_api'
    : 'http://localhost:4000/_api';

export const getConfigurationUrl = () => `${API}/configuration`;
export const putConfigurationUrl = () => `${API}/configuration`;

export const collectionAPIUrl = (collection_name, directory) =>
  directory
    ? `${API}/collections/${collection_name}/entries/${directory}`
    : `${API}/collections/${collection_name}/entries`;
export const documentAPIUrl = (collection_name, directory, filename) =>
  directory
    ? `${API}/collections/${collection_name}/${directory}/${filename}`
    : `${API}/collections/${collection_name}/${filename}`;
