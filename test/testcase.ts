import { resolve } from 'node:path';
import fs, { readdirSync } from 'node:fs';

interface TestCase {
    template: string;
    data: Record<string, unknown>;
    expected: string;
}

const parseTestFile = (content: string): TestCase => {
    const parts = content.split('---').map((part) => part.trim());
    if (parts.length !== 3) {
        throw new Error('Test file must have exactly 3 parts separated by ---');
    }

    const [template, jsonData, expected] = parts;

    return {
        template,
        data: JSON.parse(jsonData),
        expected: expected,
    };
};

export const loadTestCase = (name: string): TestCase => {
    const path = resolve(__dirname, 'fixtures', name);
    const content = fs.readFileSync(path, 'utf-8');

    return parseTestFile(content);
};

export const getTestFiles = (type: 'loose' | 'strict' | 'filters'): string[] => {
    const fixturesPath = resolve(__dirname, 'fixtures', type);
    const files = readdirSync(fixturesPath);

    return files
        .filter((file) => file.endsWith(''))
        .map((file) => [type, file].join('/'));
};
