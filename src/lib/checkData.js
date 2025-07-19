// Temporary script (e.g., src/lib/checkData.js)
import { prisma } from "./prisma";

async function checkData() {
  const tests = await prisma.test.findMany();
  console.log("Available tests:", tests);
}
checkData();