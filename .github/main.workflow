workflow "Test" {
  on = "push"
  resolves = ["Run e2e tests"]
}

action "Install dependencies" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  runs = "npm install -D"
}

action "Run linter" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  runs = "npm run lint"
  needs = ["Install dependencies"]
}

action "Run unit tests" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  runs = "npm run test:unit"
  needs = ["Run linter"]
}

action "Run e2e tests" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  runs = "npm run test:e2e"
  needs = ["Run unit tests"]
}
