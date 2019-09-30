import { InjectionToken } from '@angular/core';
import dataPackage from './mock-datapackage-response.js';
import dataFile1 from './mock-datafile-1-response.js';
import dataFile2 from './mock-datafile-2-response.js';
import collection from './mock-collection-response.js';

export class MockResponseMap extends Map<string, any> {}

export const MOCK_RESPONSE_MAP: InjectionToken<MockResponseMap> = new InjectionToken<MockResponseMap>('mockResponseMap');

export const mockResponseMap: MockResponseMap = new Map([
  [ '/core/items/datapackage', dataPackage ],
  [ '/core/items/datafile1', dataFile1 ],
  [ '/core/items/datafile2', dataFile2 ],
  [ '/core/collections/data', collection ],
]);
