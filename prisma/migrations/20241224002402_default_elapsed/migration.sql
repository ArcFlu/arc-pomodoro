-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Timer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "targetDuration" INTEGER NOT NULL,
    "elapsedTime" INTEGER NOT NULL DEFAULT 0,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Timer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Timer" ("createdAt", "elapsedTime", "id", "isCompleted", "targetDuration", "updatedAt", "userId") SELECT "createdAt", "elapsedTime", "id", "isCompleted", "targetDuration", "updatedAt", "userId" FROM "Timer";
DROP TABLE "Timer";
ALTER TABLE "new_Timer" RENAME TO "Timer";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
