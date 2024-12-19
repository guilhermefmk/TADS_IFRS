import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createCategory = async (req, res) => {
  const { name } = req.body;
  const userId = req.userId;

  try {
    const category = await prisma.category.create({
      data: { name, userId }
    });

    res.status(201).json(category);
  } catch (error) {
    console.error('Erro ao criar categoria:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

export const getCategories = async (req, res) => {
  const userId = req.userId;

  try {
    const categories = await prisma.category.findMany({
      where: {
        OR: [
          { userId: userId },
          { sharedWith: { some: { id: userId } } }
        ]
      },
      include: { 
        todos: true,
        user: {
          select: {
            id: true,
            email: true
          }
        },
        sharedWith: {
          select: {
            id: true,
            email: true
          }
        }
      }
    });

    const formattedCategories = categories.map(category => ({
      ...category,
      isOwner: category.userId === userId,
      sharedBy: category.userId !== userId ? category.user.email : null,
      sharedWith: category.sharedWith.map(user => user.email)
    }));

    res.json(formattedCategories);
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

export const shareCategory = async (req, res) => {
  const { id } = req.params;
  const { email } = req.body;
  const userId = req.userId;

  try {
    const category = await prisma.category.findUnique({
      where: { id: parseInt(id) },
      include: { user: true }
    });

    if (!category || category.userId !== userId) {
      return res.status(403).json({ error: 'Acesso negado ou categoria não encontrada' });
    }

    const userToShare = await prisma.user.findUnique({ where: { email } });
    if (!userToShare) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const updatedCategory = await prisma.category.update({
      where: { id: parseInt(id) },
      data: {
        sharedWith: {
          connect: { id: userToShare.id }
        }
      },
      include: {
        sharedWith: {
          select: {
            id: true,
            email: true
          }
        }
      }
    });

    res.json({
      message: 'Categoria compartilhada com sucesso',
      category: {
        ...updatedCategory,
        sharedWith: updatedCategory.sharedWith.map(user => user.email)
      }
    });
  } catch (error) {
    console.error('Erro ao compartilhar categoria:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

export const getSharedCategories = async (req, res) => {
  const userId = req.userId;

  try {
    const sharedCategories = await prisma.category.findMany({
      where: {
        sharedWith: {
          some: { id: userId }
        }
      },
      include: { 
        todos: true,
        user: {
          select: {
            id: true,
            email: true
          }
        },
        sharedWith: {
          select: {
            id: true,
            email: true
          }
        }
      }
    });

    const formattedCategories = sharedCategories.map(category => ({
      ...category,
      isOwner: false,
      sharedBy: category.user.email,
      sharedWith: category.sharedWith.map(user => user.email)
    }));

    res.json(formattedCategories);
  } catch (error) {
    console.error('Erro ao buscar categorias compartilhadas:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

export const getAllSharedCategories = async (req, res) => {
  const userId = req.userId;

  try {
    const categoriesSharedByMe = await prisma.category.findMany({
      where: {
        userId: userId,
        sharedWith: { some: {} }
      },
      include: { 
        todos: true,
        user: {
          select: {
            id: true,
            email: true
          }
        },
        sharedWith: {
          select: {
            id: true,
            email: true
          }
        }
      }
    });

    const categoriesSharedWithMe = await prisma.category.findMany({
      where: {
        sharedWith: {
          some: { id: userId }
        }
      },
      include: { 
        todos: true,
        user: {
          select: {
            id: true,
            email: true
          }
        },
        sharedWith: {
          select: {
            id: true,
            email: true
          }
        }
      }
    });

    const formattedCategoriesSharedByMe = categoriesSharedByMe.map(category => ({
      ...category,
      isOwner: true,
      sharedBy: null,
      sharedWith: category.sharedWith.map(user => user.email)
    }));

    const formattedCategoriesSharedWithMe = categoriesSharedWithMe.map(category => ({
      ...category,
      isOwner: false,
      sharedBy: category.user.email,
      sharedWith: category.sharedWith.map(user => user.email)
    }));

    res.json({
      sharedByMe: formattedCategoriesSharedByMe,
      sharedWithMe: formattedCategoriesSharedWithMe
    });
  } catch (error) {
    console.error('Erro ao buscar todas as categorias compartilhadas:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

