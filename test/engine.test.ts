import { describe, it, expect } from 'vitest';
import { Config, render } from '../src';
import { getTestFiles, loadTestCase } from './testcase';

describe('TemplateEngine', () => {
    describe('render', () => {
        describe('loose', () => {
            const testFiles = getTestFiles('loose');
            testFiles.forEach((testFile) => {
                it(`should render: ${testFile}`, () => {
                    const { template, data, expected } = loadTestCase(testFile);
                    const result = render(template, data);

                    expect(result).toBe(expected);
                });
            });
        });

        describe('strict', () => {
            const config: Config = {
                strict: true,
            };

            const testFiles = getTestFiles('strict');
            testFiles.forEach((testFile) => {
                it(`should render: ${testFile}`, () => {
                    const { template, data, expected } = loadTestCase(testFile);

                    expect(() => {
                        return render(template, data, config);
                    }).toThrowError(expected);
                });
            });
        });

        describe('filter', () => {
            const config: Config = {
                filters: {
                    explode: (val: string) => val.split('').join(' '),
                    upper: (val: string) => val.toUpperCase(),
                },
            };

            const testFiles = getTestFiles('filters');
            testFiles.forEach((testFile) => {
                it(`should render: ${testFile}`, () => {
                    const { template, data, expected } = loadTestCase(testFile);
                    const result = render(template, data, config);

                    expect(result).toBe(expected);
                });
            });
        });
    });
});
