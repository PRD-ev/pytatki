workflow "Test" {
  on = "push"
  resolves = ["GitHub Action for npm-1"]
}
