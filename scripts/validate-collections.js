const fs = require('fs');
const path = require('path');

const requiredEnvironmentKeys = ['base_url', 'namespace', 'api_key'];
const forbiddenPatterns = [
  { name: 'baseUrl', pattern: /{{baseUrl}}/ },
  { name: 'apiKey', pattern: /{{apiKey}}/ },
  { name: 'host', pattern: /{{host}}/ },
  { name: 'embedded Fleetbase bearer key', pattern: /Bearer flb_(live|test)_[A-Za-z0-9]+/ },
];

function walk(dir, predicate, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== '.git') {
        walk(fullPath, predicate, files);
      }
    } else if (predicate(fullPath)) {
      files.push(fullPath);
    }
  }

  return files;
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const checkedFiles = walk('.', (file) => {
  if (file === 'scripts/validate-collections.js') {
    return false;
  }

  return ['.json', '.yaml', '.yml', '.md', '.js'].includes(path.extname(file));
});

for (const file of checkedFiles) {
  const text = fs.readFileSync(file, 'utf8');
  if (file.endsWith('.json')) {
    JSON.parse(text);
  }

  for (const forbidden of forbiddenPatterns) {
    assert(!forbidden.pattern.test(text), `${file} contains forbidden ${forbidden.name} variable or secret`);
  }
}

const collectionFiles = walk('postman/collections', (file) => {
  if (!file.endsWith('/.resources/definition.yaml')) {
    return false;
  }

  return path.dirname(path.dirname(path.dirname(file))) === 'postman/collections';
});

for (const file of collectionFiles) {
  const collection = fs.readFileSync(file, 'utf8');
  assert(collection.includes('$kind: collection'), `${file} is missing a Native Git collection marker`);

  for (const key of requiredEnvironmentKeys) {
    assert(collection.includes(`${key}:`), `${file} is missing collection variable ${key}`);
  }
}

const environmentFiles = walk('postman/environments', (file) => file.endsWith('.environment.yaml'));

for (const file of environmentFiles) {
  const environment = fs.readFileSync(file, 'utf8');

  for (const key of requiredEnvironmentKeys) {
    assert(environment.includes(`key: ${key}`), `${file} is missing environment variable ${key}`);
  }
}

assert(collectionFiles.length === 3, `Expected 3 Postman collections, found ${collectionFiles.length}`);
assert(environmentFiles.length === 3, `Expected 3 environment templates, found ${environmentFiles.length}`);

console.log(`Validated ${collectionFiles.length} Postman Native Git collections and ${environmentFiles.length} environments.`);
