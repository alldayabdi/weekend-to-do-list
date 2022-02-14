CREATE TABLE "tasktable" (
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR(250) NOT NULL,
	"isCompleted" BOOLEAN DEFAULT FALSE
);

INSERT INTO "tasktable"("task", "isCompleted")
VALUES('Do weekend challenge', false);

SELECT * FROM "tasktable";