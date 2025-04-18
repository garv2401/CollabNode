-- CreateTable
CREATE TABLE "_UserLikedPosts" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_UserLikedPosts_A_fkey" FOREIGN KEY ("A") REFERENCES "Post" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_UserLikedPosts_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_UserSavedPosts" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_UserSavedPosts_A_fkey" FOREIGN KEY ("A") REFERENCES "Post" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_UserSavedPosts_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserLikedPosts_AB_unique" ON "_UserLikedPosts"("A", "B");

-- CreateIndex
CREATE INDEX "_UserLikedPosts_B_index" ON "_UserLikedPosts"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UserSavedPosts_AB_unique" ON "_UserSavedPosts"("A", "B");

-- CreateIndex
CREATE INDEX "_UserSavedPosts_B_index" ON "_UserSavedPosts"("B");
