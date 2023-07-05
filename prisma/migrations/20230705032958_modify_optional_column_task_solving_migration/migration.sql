-- AlterTable
ALTER TABLE "task_solving" ALTER COLUMN "task_scope" DROP NOT NULL,
ALTER COLUMN "task_context" DROP NOT NULL,
ALTER COLUMN "optimal_solution" DROP NOT NULL;
