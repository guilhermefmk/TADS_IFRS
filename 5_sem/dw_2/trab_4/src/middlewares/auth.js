import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const parts = authHeader.split(' ');

  if (parts.length !== 2) {
    return res.status(401).json({ error: 'Token error' });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ error: 'Token malformatted' });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Token invalid' });

    req.userId = decoded.id;
    next();
  });
};

export const authorize = (resource) => {
  return async (req, res, next) => {
    const { id } = req.params;
    const userId = req.userId;

    try {
      const item = await prisma[resource].findUnique({
        where: { id: parseInt(id) },
        include: { user: true }
      });

      if (!item || item.userId !== userId) {
        return res.status(403).json({ error: 'Not authorized' });
      }

      next();
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
};

