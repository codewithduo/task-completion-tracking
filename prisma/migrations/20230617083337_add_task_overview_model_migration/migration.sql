-- CreateTable
CREATE TABLE "task_overviews" (
    "id" SERIAL NOT NULL,
    "task_id" INTEGER NOT NULL,
    "user_interface" TEXT,
    "task_behavior" TEXT,
    "task_interaction" TEXT,

    CONSTRAINT "task_overviews_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "task_overviews_task_id_key" ON "task_overviews"("task_id");

-- AddForeignKey
ALTER TABLE "task_overviews" ADD CONSTRAINT "task_overviews_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
