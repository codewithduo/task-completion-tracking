-- CreateTable
CREATE TABLE "task_solving" (
    "id" SERIAL NOT NULL,
    "task_id" INTEGER NOT NULL,
    "task_scope" TEXT NOT NULL,
    "task_context" TEXT NOT NULL,
    "optimal_solution" TEXT NOT NULL,
    "isNeedPoc" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "task_solving_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "task_solving_task_id_key" ON "task_solving"("task_id");

-- AddForeignKey
ALTER TABLE "task_solving" ADD CONSTRAINT "task_solving_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
