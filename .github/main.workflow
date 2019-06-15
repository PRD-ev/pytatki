workflow "Test" {
  on = "push"
  resolves = ["GitHub Action for npm"]
}

action "Install dependencies and run tests" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  runs = "npm install -D && npm run test:unit"
}
