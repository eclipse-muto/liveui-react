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

import LruCache from '../lru';

describe('LRUCache', () => {
  const max = 200;
  let lruCache = new LruCache(max);

  const components = { test: 'test' };

  beforeEach(() => {
    lruCache = new LruCache(max);

    lruCache.put('test', components);
    lruCache.put('foo', 'bar');
  });

  test('Test cached item', () => {
    expect(lruCache.get('test')).toBe(components);
    expect(lruCache.get('foo')).toBe('bar');
  });

  test('Test replace cached item', () => {
    expect(lruCache.put('foo', 'bar2')).toBeUndefined();
    expect(lruCache.get('foo')).toBe('bar2');
  });

  test('Test add MAX LRU cached item', () => {
    for (let index = 0; index < max; index++) {
      expect(lruCache.put(`foo-${index}`, `foo-${index}`)).toBeUndefined();
    }
    expect(lruCache.get('foo')).toBeUndefined();
  });

  test('Test delete cached item', () => {
    expect(lruCache.get('foo')).toBe('bar');
    expect(lruCache.delete('foo')).toBeUndefined();
    expect(lruCache.get('foo')).toBeUndefined();
  });

  test('Test delete unknown item', () => {
    expect(lruCache.delete('boo')).toBeUndefined();
    expect(lruCache.get('boo')).toBeUndefined();
  });
});
