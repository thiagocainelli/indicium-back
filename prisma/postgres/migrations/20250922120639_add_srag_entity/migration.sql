-- CreateEnum
CREATE TYPE "public"."UserType" AS ENUM ('superAdmin', 'users');

-- CreateTable
CREATE TABLE "public"."users" (
    "uuid" UUID NOT NULL,
    "name" VARCHAR(250),
    "email" VARCHAR(250),
    "password" TEXT,
    "type" "public"."UserType" DEFAULT 'users',
    "profileImage" TEXT,
    "refreshToken" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "public"."srag" (
    "uuid" UUID NOT NULL,
    "nuNotific" VARCHAR(32),
    "dtNotific" TIMESTAMP(3),
    "dtSinPri" TIMESTAMP(3),
    "sgUf" VARCHAR(2),
    "coMunRes" VARCHAR(10),
    "csSexo" VARCHAR(1),
    "idadeNumerica" INTEGER,
    "evolucao" INTEGER,
    "uti" INTEGER,
    "dtEntUti" TIMESTAMP(3),
    "dtSaiUti" TIMESTAMP(3),
    "vacinaCov" INTEGER,
    "dose1Cov" TIMESTAMP(3),
    "dose2Cov" TIMESTAMP(3),
    "doseRef" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "srag_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE INDEX "users_type_idx" ON "public"."users"("type");

-- CreateIndex
CREATE INDEX "users_createdAt_idx" ON "public"."users"("createdAt");

-- CreateIndex
CREATE INDEX "users_deletedAt_idx" ON "public"."users"("deletedAt");

-- CreateIndex
CREATE INDEX "srag_dtSinPri_idx" ON "public"."srag"("dtSinPri");

-- CreateIndex
CREATE INDEX "srag_sgUf_dtSinPri_idx" ON "public"."srag"("sgUf", "dtSinPri");

-- CreateIndex
CREATE INDEX "srag_coMunRes_dtSinPri_idx" ON "public"."srag"("coMunRes", "dtSinPri");

-- CreateIndex
CREATE INDEX "srag_evolucao_idx" ON "public"."srag"("evolucao");

-- CreateIndex
CREATE INDEX "srag_uti_idx" ON "public"."srag"("uti");
