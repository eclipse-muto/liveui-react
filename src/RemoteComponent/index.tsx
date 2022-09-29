/**
 * Copyright Composiv Inc and its affiliates
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 *
 * RemoteComponent
 *
 */

import React, { useState, useEffect } from 'react';
import { Registry, ViewBuilder } from '@eclipse-muto/liveui-core';
import PropTypes from 'prop-types';

export const ComponentStatus = {
  loading: 'loading',
  success: 'success',
  error: 'error',
  cancelled: 'cancelled',
};

const Status = ({ status, form, action }) => {
  return (
    <div className="liveui-remotecomp-status">
      {form?.component} status: {status}
      <button
        onClick={() => {
          action && action();
        }}
      >
        Retry
      </button>
    </div>
  );
};

function RemoteComponent(props) {
  const {
    url,
    name,
    source,
    form,
    onError,
    placeholder,
    lruCache,
    ...compProps
  } = props;
  const [exports, setExports] = useState<any>();
  const [status, setStatus] = useState(ComponentStatus.loading);
  const [error, setError] = useState({ message: '' });

  useEffect(() => {
    fetchComponent();
  }, []);

  function fetchComponent() {
    setStatus(ComponentStatus.loading);
    const key = form?.from || name;
    if (url) {
      handleRequest(url);
    } else if (key) {
      const componentUrl = Registry.getComponentUrl(key);
      handleRequest(componentUrl);
    } else if (source) {
      const _exports = ViewBuilder.build(source, onError);
      setExports(_exports);
    }
  }

  function handleRequest(componentUrl) {
    const _cached = lruCache && lruCache.get(componentUrl);
    if (_cached) {
      setExports(_cached);
      setStatus(ComponentStatus.success);
      return;
    }
    fetch(componentUrl, { method: 'GET' })
      .then(response => response.text())
      .then(js => {
        const _exports = ViewBuilder.build(js, onError);
        lruCache && lruCache.put(componentUrl, _exports);
        setExports(_exports);
        setStatus(ComponentStatus.success);
      })
      .catch(e => {
        const _exports = onError('Remote Component fetch failed', -200, e);
        lruCache && lruCache.delete(componentUrl);
        setExports(_exports);
        setError(e);
        if (!_exports) setStatus(ComponentStatus.error);
      });
  }

  const Component =
    (exports && exports[form?.component || name]) || exports?.default;
  const StatusDisplayComponent = placeholder || Status;

  if (!Component && status !== ComponentStatus.success) {
    return (
      (!!StatusDisplayComponent && (
        <StatusDisplayComponent
          form={form || { component: name }}
          status={status}
          action={fetchComponent}
          error={error}
          {...props}
        />
      )) ||
      null
    );
  }
  return (!!Component && <Component {...compProps} />) || null;
}

RemoteComponent.defaultProps = {
  onError: (message, code, error) => {
    console.log(message, code, error);
    return null;
  },
  cached: false,
};

RemoteComponent.propTypes = {
  url: PropTypes.string,
  name: PropTypes.string,
  form: PropTypes.object,
  placeholder: PropTypes.func,
  source: PropTypes.string,
  onError: PropTypes.func,
  cached: PropTypes.bool,
};

export default RemoteComponent;
