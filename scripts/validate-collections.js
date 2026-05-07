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

const jsonFiles = walk('.', (file) => file.endsWith('.json'));

for (const file of jsonFiles) {
  const text = fs.readFileSync(file, 'utf8');
  JSON.parse(text);

  for (const forbidden of forbiddenPatterns) {
    assert(!forbidden.pattern.test(text), `${file} contains forbidden ${forbidden.name} variable or secret`);
  }
}

const collectionFiles = walk('collections', (file) => file.endsWith('.postman_collection.json'));

for (const file of collectionFiles) {
  const collection = JSON.parse(fs.readFileSync(file, 'utf8'));
  assert(collection.info, `${file} is missing collection info`);
  assert(collection.info.schema === 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json', `${file} must be Postman collection v2.1 JSON`);

  const variableKeys = new Set((collection.variable || []).map((variable) => variable.key));
  for (const key of requiredEnvironmentKeys) {
    assert(variableKeys.has(key), `${file} is missing collection variable ${key}`);
  }
}

const environmentFiles = walk('environments', (file) => file.endsWith('.template.json'));

for (const file of environmentFiles) {
  const environment = JSON.parse(fs.readFileSync(file, 'utf8'));
  const keys = (environment.values || []).map((variable) => variable.key);
  assert(keys.length === requiredEnvironmentKeys.length, `${file} should only define ${requiredEnvironmentKeys.join(', ')}`);

  for (const key of requiredEnvironmentKeys) {
    assert(keys.includes(key), `${file} is missing environment variable ${key}`);
  }
}

console.log(`Validated ${collectionFiles.length} Postman collections and ${environmentFiles.length} environment templates.`);
