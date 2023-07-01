-- CreateTable
CREATE TABLE "task_edge_cases" (
    "id" SERIAL NOT NULL,
    "task_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "solution" TEXT NOT NULL,

    CONSTRAINT "task_edge_cases_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "task_edge_cases" ADD CONSTRAINT "task_edge_cases_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
