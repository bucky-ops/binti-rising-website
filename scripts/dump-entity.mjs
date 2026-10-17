// Generates ENTITY_DATA.json from the typed source of truth (spec DoD #10).
// Run: node scripts/dump-entity.mjs   (after any organization.ts change)
import { writeFileSync } from "node:fs";
import { execSync } from "node:child_process";
const out = execSync(
  `bun -e "import {ORG, PENDING_HUMAN_INPUT} from './src/lib/data/organization.ts'; import {PROGRAMS} from './src/lib/data/programs.ts'; import {COMMUNITIES} from './src/lib/data/communities.ts'; console.log(JSON.stringify({ORG, PENDING_HUMAN_INPUT, programs: PROGRAMS, communities: COMMUNITIES}, null, 2))"`,
  { encoding: "utf8" }
);
writeFileSync("ENTITY_DATA.json", out);
console.log("ENTITY_DATA.json written");
