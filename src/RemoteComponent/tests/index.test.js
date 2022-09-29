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

/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/order */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
import React from 'react';
import Enzyme, { mount } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Registry } from '@eclipse-muto/liveui-core';
import RemoteComponent from '../../RemoteComponent';
import 'whatwg-fetch';
Enzyme.configure({ adapter: new Adapter() });
const onError = function error() {
  return Function;
};
describe('ExampleComponent', () => {
  const externals = 'test';
  const components = { test: 'test' };
  Registry.register(
    externals,
    components,
    new Error(
      'There is no renderer.  Please register a renderer for Open canvas using Registry.register...'
    )
  );
  beforeEach(() => {
    window.fetch = jest.fn();
  });
  beforeEach(() => {
    const res = new Response(
      'module.exports=function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=3)}([function(e,t){e.exports=require("react")},function(e,t){e.exports=require("@composiv/liveflow-react")},,function(e,t,n){"use strict";n.r(t),n.d(t,"SuccessScreen",(function(){return l}));var r=n(0),o=n.n(r),u=n(1),l=function(){var e,t,n=Object(u.useLiveFlow)(),r=n.flowState,l=n.completeTask;return o.a.createElement("div",null,o.a.createElement("strong",null,"İşleminiz Tamamlanmıştır")," ",o.a.createElement("hr",null),o.a.createElement("p",null,null===(e=r.variables)||void 0===e||null===(t=e.transfer)||void 0===t?void 0:t.amount)," ",o.a.createElement("hr",null),o.a.createElement("button",{onClick:function(){return l({})}},"Home"))};t.default=l}]);',
      {
        status: 200,
        headers: {
          'Content-type': 'application/json',
        },
      }
    );
    window.fetch.mockReturnValue(Promise.resolve(res));
  });
  jest.spyOn(React, 'useEffect').mockImplementation(f => f());
  test('should have default handleChange', () => {
    expect(RemoteComponent.defaultProps.onError).toBeDefined();
  });

  test('Default Props', () => {
    const result = RemoteComponent.defaultProps.onError();
    expect(result).toBe(null);
  });
  test('renders prop url', () => {
    try {
      expect(mount(<RemoteComponent url="http://localhost" />));
      expect(mount(<RemoteComponent url="http://localhost" />));
    } catch (error) {
      expect(mount(<RemoteComponent url="http://localhost" />)).toBe(error);
    }
  });
  test('renders prop name', () => {
    try {
      expect(mount(<RemoteComponent name="componentName" />));
    } catch (error) {
      expect(mount(<RemoteComponent name="componentName" />)).toBe(error);
    }
  });
  test('renders prop source', () => {
    try {
      expect(mount(<RemoteComponent source="null" />));
    } catch (error) {
      expect(mount(<RemoteComponent source="null" />)).toBe(error);
    }
  });
  test('renders', () => {
    try {
      expect(mount(<RemoteComponent />));
    } catch (error) {
      expect(mount(<RemoteComponent />)).toBe(error);
    }
  });
});
