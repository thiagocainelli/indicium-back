import { Request, Response } from 'express';
import { UserTypeEnum } from '../../users/enum/userType.enum';

export const createMockRequest = (overrides: Partial<Request> = {}): Partial<Request> => ({
  body: {},
  query: {},
  params: {},
  headers: {},
  ...overrides,
});

export const createMockResponse = (): Partial<Response> => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

// Dados de teste para usuários
export const mockUserData = {
  uuid: '123e4567-e89b-12d3-a456-426614174000',
  name: 'Test User',
  email: 'test@example.com',
  password: 'encrypted:password',
  type: UserTypeEnum.users,
  profileImage: null,
  refreshToken: null,
  createdAt: new Date('2024-01-01T00:00:00.000Z'),
  updatedAt: new Date('2024-01-01T00:00:00.000Z'),
  deletedAt: null,
};

// Dados de teste para super admin
export const mockSuperAdminData = {
  ...mockUserData,
  uuid: '123e4567-e89b-12d3-a456-426614174001',
  name: 'Super Admin',
  email: 'admin@example.com',
  type: UserTypeEnum.superAdmin,
};

// Helper para limpar mocks
export const clearAllMocks = () => {
  jest.clearAllMocks();
  jest.resetAllMocks();
};
