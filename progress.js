// Reads and writes each user's level/unit progress in Firestore.

async function getProgress(uid) {
  const doc = await db.collection("users").doc(uid).get();
  return doc.exists ? doc.data() : { currentLevel: "level0", completedUnits: [] };
}

async function markUnitComplete(uid, unitId, levelId) {
  const ref = db.collection("users").doc(uid);
  await ref.update({
    completedUnits: firebase.firestore.FieldValue.arrayUnion(unitId)
  });

  // Auto-advance the current level once every unit in it is complete.
  const level = CURRICULUM.find((l) => l.id === levelId);
  const progress = await getProgress(uid);
  const allDone = level.units.every((u) => progress.completedUnits.includes(u.id));
  if (allDone) {
    const idx = CURRICULUM.findIndex((l) => l.id === levelId);
    const next = CURRICULUM[idx + 1];
    if (next) {
      await ref.update({ currentLevel: next.id });
    }
  }
}

function levelIsUnlocked(levelId, progress) {
  const idx = CURRICULUM.findIndex((l) => l.id === levelId);
  const currentIdx = CURRICULUM.findIndex((l) => l.id === progress.currentLevel);
  return idx <= currentIdx;
}

function levelCompletionPct(level, progress) {
  const done = level.units.filter((u) => progress.completedUnits.includes(u.id)).length;
  return Math.round((done / level.units.length) * 100);
}
