import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pool from './pool';

const adapter = new PrismaPg(pool as any);
const prisma = new PrismaClient({ adapter });

export default prisma;