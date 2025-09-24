export const mockPrisma = {
  users: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    count: jest.fn(),
  },
  $transaction: jest.fn(),
  $connect: jest.fn(),
  $disconnect: jest.fn(),
};

jest.mock('../../_core/prisma.pg', () => ({
  __esModule: true,
  default: mockPrisma,
}));

export default mockPrisma;
