require('dotenv').config({ path: '/Users/dushyantbeniwal/Desktop/Major Project/server/.env' });
const { explanationAgent } = require('/Users/dushyantbeniwal/Desktop/Major Project/server/agents/explanationAgent');

async function test() {
  const res = await explanationAgent("clean syntax", "good optimization", "[TIME: O(N)]");
  console.log("RESULT:", res);
}
test();
