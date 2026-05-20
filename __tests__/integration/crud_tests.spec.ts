import { server, prisma } from '../../app';


jest.mock('@prisma/client', () => {
  const mPrisma = {
    user: {
      create: jest.fn(),
    },
    post: {
      create: jest.fn(),
    },
  };
  return {
    PrismaClient: jest.fn(() => mPrisma),
  };
});


afterAll(async() => {
  await server.close();
}); 


describe('IT: CRUD Validatipon', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });


  describe('IT: POST /api/v1/users', () => {
    

    it('should create a user with valid input', async () => {
      const mockUser = { id: 1, name: 'Alice', email: 'alice@example.com' };
      
      (prisma.user.create as jest.Mock).mockResolvedValue(mockUser);

      const response = await server.inject({
        method: 'POST',
        url: '/api/v1/users',
        payload: {
          name: 'Alice',
          email: 'alice@example.com',
        },
      });

      expect(response.statusCode).toBe(201);
      
      const body = JSON.parse(response.body);
      expect(body).toHaveProperty('user');
      expect(body.user.name).toBe('Alice');
      expect(prisma.user.create).toHaveBeenCalledTimes(1);

    });

  });

  describe('IT: POST /api/v1/posts', () => {
  
    it('should create a post and link it to a user', async () => {
      const mockPost = {
        id: 101,
        title: 'Test-Post',
        content: 'Test.',
        userId: 1
      };

      (prisma.post.create as jest.Mock).mockResolvedValue(mockPost);

      const response = await server.inject({
        method: 'POST',
        url: '/api/v1/posts',
        payload: {
          title: 'Test-Post',
          content: 'Test.',
          userId: 1
        }
      });

      // Assertions
      expect(response.statusCode).toBe(201);
      
      const body = JSON.parse(response.body);
      expect(body).toHaveProperty('post');
      expect(body.post.title).toBe('Test-Post');
      expect(body.post.userId).toBe(1);
      

      expect(prisma.post.create).toHaveBeenCalledWith({
        data: {
          title: 'Test-Post',
          content: 'Test.',
          user: {
            connect: { id: 1 }
          }
        }
      });
    });
  });
});
