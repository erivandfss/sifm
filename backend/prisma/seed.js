// prisma/seed.js
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // Criar usuários iniciais
  const usuarios = await Promise.all([
    prisma.usuario.upsert({
      where: { email: 'admin@aguas.com' },
      update: {},
      create: {
        nome: 'Administrador Master',
        email: 'admin@aguas.com',
        senha: bcrypt.hashSync('123', 10),
        role: 'admin'
      },
    }),
    prisma.usuario.upsert({
      where: { email: 'portaria@aguas.com' },
      update: {},
      create: {
        nome: 'Operador Portaria',
        email: 'portaria@aguas.com',
        senha: bcrypt.hashSync('123', 10),
        role: 'operador'
      },
    }),
    prisma.usuario.upsert({
      where: { email: 'manutencao@aguas.com' },
      update: {},
      create: {
        nome: 'Técnico Manutenção',
        email: 'manutencao@aguas.com',
        senha: bcrypt.hashSync('123', 10),
        role: 'mantenedor'
      },
    }),
  ]);

  // Criar veículos iniciais
  const veiculos = await Promise.all([
    prisma.veiculo.upsert({
      where: { placa: 'ABC-1234' },
      update: {},
      create: {
        nome: 'Hilux 04',
        placa: 'ABC-1234',
        tipo: 'Caminhonete',
        kmAtual: 87400,
        status: 'ATIVO'
      },
    }),
    prisma.veiculo.upsert({
      where: { placa: 'XYZ-8899' },
      update: {},
      create: {
        nome: 'Saveiro 03',
        placa: 'XYZ-8899',
        tipo: 'Utilitário',
        kmAtual: 65200,
        status: 'ATIVO'
      },
    }),
    prisma.veiculo.upsert({
      where: { placa: 'PPP-5521' },
      update: {},
      create: {
        nome: 'Caminhão 01',
        placa: 'PPP-5521',
        tipo: 'Caminhão',
        kmAtual: 152540,
        status: 'ATIVO'
      },
    }),
  ]);

  // Criar motoristas iniciais
  const motoristas = await Promise.all([
    prisma.motorista.upsert({
      where: { cnh: '12345678900' },
      update: {},
      create: {
        nome: 'João Silva',
        cnh: '12345678900',
        validadeCnh: new Date('2026-05-10'),
        telefone: '(65) 99999-1111'
      },
    }),
    prisma.motorista.upsert({
      where: { cnh: '98765432100' },
      update: {},
      create: {
        nome: 'Maria Souza',
        cnh: '98765432100',
        validadeCnh: new Date('2027-01-20'),
        telefone: '(65) 98888-2222'
      },
    }),
    prisma.motorista.upsert({
      where: { cnh: '11223344550' },
      update: {},
      create: {
        nome: 'Carlos Pereira',
        cnh: '11223344550',
        validadeCnh: new Date('2025-12-15'),
        telefone: '(65) 97777-3333'
      },
    }),
  ]);

  console.log('✅ Seed concluído com sucesso!');
  console.log(`👤 ${usuarios.length} usuários criados`);
  console.log(`🚗 ${veiculos.length} veículos criados`);
  console.log(`👨‍✈️ ${motoristas.length} motoristas criados`);
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });