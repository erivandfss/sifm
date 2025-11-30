-- DropForeignKey
ALTER TABLE "checklists" DROP CONSTRAINT "checklists_motoristaId_fkey";

-- DropForeignKey
ALTER TABLE "checklists" DROP CONSTRAINT "checklists_veiculoId_fkey";

-- AddForeignKey
ALTER TABLE "checklists" ADD CONSTRAINT "checklists_veiculoId_fkey" FOREIGN KEY ("veiculoId") REFERENCES "veiculos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "checklists" ADD CONSTRAINT "checklists_motoristaId_fkey" FOREIGN KEY ("motoristaId") REFERENCES "motoristas"("id") ON DELETE CASCADE ON UPDATE CASCADE;
