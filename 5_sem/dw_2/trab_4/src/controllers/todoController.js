import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const checkCategoryAccess = async (userId, categoryId) => {
  const category = await prisma.category.findFirst({
    where: {
      id: categoryId,
      OR: [
        { userId: userId },
        { sharedWith: { some: { id: userId } } }
      ]
    }
  });
  return !!category;
};

export const createTodo = async (req, res) => {
  const { title, description, dueDate, categoryId } = req.body;
  const userId = req.userId;

  try {
    if (categoryId) {
      const hasAccess = await checkCategoryAccess(userId, parseInt(categoryId));
      if (!hasAccess) {
        return res.status(403).json({ error: 'Você não tem acesso a esta categoria' });
      }
    }

    const todo = await prisma.todo.create({
      data: {
        title,
        description,
        dueDate: dueDate ? new Date(dueDate) : null,
        userId,
        categoryId: categoryId ? parseInt(categoryId) : null
      }
    });

    res.status(201).json(todo);
  } catch (error) {
    console.error('Erro ao criar TODO:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

export const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, description, dueDate, completed, categoryId } = req.body;
  const userId = req.userId;

  try {
    const existingTodo = await prisma.todo.findUnique({
      where: { id: parseInt(id) },
      include: { category: true }
    });

    if (!existingTodo || existingTodo.userId !== userId) {
      return res.status(404).json({ error: 'TODO não encontrado ou acesso negado' });
    }

    if (categoryId && categoryId !== existingTodo.categoryId) {
      const hasAccess = await checkCategoryAccess(userId, parseInt(categoryId));
      if (!hasAccess) {
        return res.status(403).json({ error: 'Você não tem acesso a esta categoria' });
      }
    }

    const updatedTodo = await prisma.todo.update({
      where: { id: parseInt(id) },
      data: {
        title,
        description,
        dueDate: dueDate ? new Date(dueDate) : null,
        completed,
        categoryId: categoryId ? parseInt(categoryId) : null
      }
    });

    res.json(updatedTodo);
  } catch (error) {
    console.error('Erro ao atualizar TODO:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

export const getTodos = async (req, res) => {
  const userId = req.userId;
  const { page = 1, limit = 10, status, category } = req.query;

  try {
    const where = {
      OR: [
        { userId: userId },
        { category: { sharedWith: { some: { id: userId } } } }
      ]
    };

    if (status === 'pending') {
      where.completed = false;
    } else if (status === 'overdue') {
      where.completed = false;
      where.dueDate = { lt: new Date() };
    }

    if (category) {
      where.categoryId = parseInt(category);
    }

    const todos = await prisma.todo.findMany({
      where,
      include: { 
        category: {
          include: {
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
        }
      },
      skip: (parseInt(page) - 1) * parseInt(limit),
      take: parseInt(limit),
      orderBy: { dueDate: 'asc' }
    });

    const total = await prisma.todo.count({ where });

    const formattedTodos = todos.map(todo => ({
      ...todo,
      isOwner: todo.userId === userId,
      sharedBy: todo.category && todo.category.userId !== userId ? todo.category.user.email : null,
      categorySharedWith: todo.category ? todo.category.sharedWith.map(user => user.email) : []
    }));

    res.json({
      todos: formattedTodos,
      totalPages: Math.ceil(total / parseInt(limit)),
      currentPage: parseInt(page)
    });
  } catch (error) {
    console.error('Erro ao buscar TODOs:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

export const deleteTodo = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  try {
    const todo = await prisma.todo.findUnique({ where: { id: parseInt(id) } });

    if (!todo || todo.userId !== userId) {
      return res.status(404).json({ error: 'TODO não encontrado ou acesso negado' });
    }

    await prisma.todo.delete({ where: { id: parseInt(id) } });
    res.status(204).send();
  } catch (error) {
    console.error('Erro ao deletar TODO:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

