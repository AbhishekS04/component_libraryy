import("./new-component.mjs").catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
