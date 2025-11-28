import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getVeiculos = async (req, res) => {
  const veiculos = await prisma.veiculo.findMany();
  res.json(veiculos);
};

export const createVeiculo = async (req, res) => {
  const { nome, placa, tipo, kmAtual } = req.body;
  const veiculo = await prisma.veiculo.create({
    data: { nome, placa: placa.toUpperCase(), tipo, kmAtual: Number(kmAtual) }
  });
  res.status(201).json(veiculo);
};

export const deleteVeiculo = async (req, res) => {
  await prisma.veiculo.delete({ where: { id: Number(req.params.id) } });
  res.json({ message: "Excluído" });
};